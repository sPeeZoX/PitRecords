'use client'
import React, { useState, useCallback, useRef } from 'react'

interface PerspectiveState {
  rotateX: number
  rotateY: number
}

interface SpotlightConfig {
  spotlightSize?: number
  overlayOpacity?: number
  className?: string
}

interface ImageSpotlightProps {
  src: string
  alt: string
  orientation?: 'landscape' | 'portrait'
  width?: number
  height?: number
  config?: SpotlightConfig
}

export default function ImageSpotlight({
  src,
  alt,
  orientation = 'landscape',
  width,
  height,
  config = {},
}: ImageSpotlightProps) {
  const defaultConfig: Required<SpotlightConfig> = {
    spotlightSize: 80,
    overlayOpacity: 0.6,
    className: '',
  }

  const finalConfig = { ...defaultConfig, ...config }

  const [perspective, setPerspective] = useState<PerspectiveState>({ rotateX: 0, rotateY: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width) * 100
    const y = ((event.clientY - rect.top) / rect.height) * 100
    containerRef.current.style.setProperty('--mouse-x', `${x}%`)
    containerRef.current.style.setProperty('--mouse-y', `${y}%`)
    const rotateY = ((x - 50) / 50) * 8
    const rotateX = ((50 - y) / 50) * 8
    setPerspective({ rotateX, rotateY })
  }, [])

  const handleMouseLeave = () => {
    setPerspective({ rotateX: 0, rotateY: 0 })
  }

  const getContainerDimensions = (): React.CSSProperties => {
    if (width && height) return { width: `${width}px`, height: `${height}px`, maxWidth: '100%' }
    if (orientation === 'landscape') return { width: '800px', height: '450px', maxWidth: '100%' }
    return { width: '450px', height: '600px', maxWidth: '100%' }
  }

  return (
    <div className="flex items-center justify-center">
      <div
        ref={containerRef}
        className={`relative overflow-hidden cursor-none shadow-md ${finalConfig.className}`}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => {}}
        onMouseLeave={handleMouseLeave}
        role="img"
        aria-label={alt}
        tabIndex={0}
        style={{
          ...getContainerDimensions(),
          '--mouse-x': '50%',
          '--mouse-y': '50%',
          '--spotlight-size': `${finalConfig.spotlightSize}px`,
          '--overlay-opacity': finalConfig.overlayOpacity,
          transform: `perspective(1000px) rotateX(${perspective.rotateX}deg) rotateY(${perspective.rotateY}deg)`,
          transformStyle: 'preserve-3d',
          transition: 'transform 0.2s ease-out',
        } as React.CSSProperties}
      >
        {/* Blurred base */}
        <img
          src={src}
          alt={alt}
          className="absolute inset-0 w-full h-full object-cover object-top"
          draggable={false}
          style={{ filter: 'blur(5px)' }}
        />

        {/* Sharp image through spotlight mask */}
        <img
          src={src}
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-top"
          draggable={false}
          style={{
            maskImage: `radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), black ${finalConfig.spotlightSize * 0.4}px, transparent ${finalConfig.spotlightSize * 1.6}px)`,
            WebkitMaskImage: `radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), black ${finalConfig.spotlightSize * 0.4}px, transparent ${finalConfig.spotlightSize * 1.6}px)`,
            zIndex: 2,
          }}
        />

        {/* Dark overlay with spotlight hole */}
        <div
          className="absolute inset-0 bg-black will-change-[mask-position] transition-all duration-100 ease-out"
          style={{
            opacity: finalConfig.overlayOpacity,
            maskImage: `radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), transparent ${finalConfig.spotlightSize * 0.4}px, black ${finalConfig.spotlightSize * 1.6}px)`,
            WebkitMaskImage: `radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), transparent ${finalConfig.spotlightSize * 0.4}px, black ${finalConfig.spotlightSize * 1.6}px)`,
            zIndex: 10,
          }}
        />
      </div>
    </div>
  )
}
