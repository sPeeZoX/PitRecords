"use client"

import React, { useState, useEffect, useRef, useCallback, forwardRef } from "react"
import { gsap } from "gsap"
import ScrambleTextPlugin from "gsap/ScrambleTextPlugin"
import { useRouter } from "next/navigation"

gsap.registerPlugin(ScrambleTextPlugin)

export interface PortfolioProject {
  id: number
  artist: string
  album: string
  category: string
  label: string
  year: string
  image: string
  href: string
  external?: boolean
}

interface PortfolioConfig {
  timeZone?: string
  timeUpdateInterval?: number
  idleDelay?: number
}

interface MusicPortfolioProps {
  projects: PortfolioProject[]
  config?: PortfolioConfig
}

// ── Time display ─────────────────────────────────────────────────────────────
const TimeDisplay = ({ timeZone = "Africa/Casablanca" }: { timeZone?: string }) => {
  const [time, setTime] = useState({ hours: "", minutes: "", dayPeriod: "" })

  useEffect(() => {
    const update = () => {
      const formatter = new Intl.DateTimeFormat("en-US", {
        timeZone,
        hour12: true,
        hour: "numeric",
        minute: "numeric",
      })
      const parts = formatter.formatToParts(new Date())
      setTime({
        hours: parts.find((p) => p.type === "hour")?.value ?? "",
        minutes: parts.find((p) => p.type === "minute")?.value ?? "",
        dayPeriod: parts.find((p) => p.type === "dayPeriod")?.value ?? "",
      })
    }
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [timeZone])

  return (
    <time className="mp-corner bottom-right">
      {time.hours}
      <span className="mp-blink">:</span>
      {time.minutes} {time.dayPeriod}
    </time>
  )
}

// ── Project row ───────────────────────────────────────────────────────────────
interface RowProps {
  project: PortfolioProject
  index: number
  isActive: boolean
  isIdle: boolean
  onMouseEnter: (i: number, img: string) => void
  onMouseLeave: () => void
  onClick: () => void
}

const ProjectRow = forwardRef<HTMLLIElement, RowProps>(
  ({ project, index, isActive, isIdle, onMouseEnter, onMouseLeave, onClick }, ref) => {
    const artistRef  = useRef<HTMLSpanElement>(null)
    const albumRef   = useRef<HTMLSpanElement>(null)
    const catRef     = useRef<HTMLSpanElement>(null)
    const labelRef   = useRef<HTMLSpanElement>(null)
    const yearRef    = useRef<HTMLSpanElement>(null)

    useEffect(() => {
      const fields: [React.RefObject<HTMLSpanElement | null>, string][] = [
        [artistRef, project.artist],
        [albumRef,  project.album],
        [catRef,    project.category],
        [labelRef,  project.label],
        [yearRef,   project.year],
      ]

      if (isActive) {
        fields.forEach(([r, text]) => {
          if (!r.current) return
          gsap.killTweensOf(r.current)
          gsap.to(r.current, {
            duration: 0.7,
            scrambleText: { text, chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", revealDelay: 0.2, speed: 0.5 },
          })
        })
      } else {
        fields.forEach(([r, text]) => {
          if (!r.current) return
          gsap.killTweensOf(r.current)
          r.current.textContent = text
        })
      }
    }, [isActive, project])

    return (
      <li
        ref={ref}
        className={`mp-row${isActive ? " active" : ""}${isIdle ? " idle" : ""}`}
        onMouseEnter={() => onMouseEnter(index, project.image)}
        onMouseLeave={onMouseLeave}
        onClick={onClick}
      >
        <span ref={artistRef}  className="mp-cell artist">{project.artist}</span>
        <span ref={albumRef}   className="mp-cell album">{project.album}</span>
        <span ref={catRef}     className="mp-cell category">{project.category}</span>
        <span ref={labelRef}   className="mp-cell label">{project.label}</span>
        <span ref={yearRef}    className="mp-cell year">{project.year}</span>
      </li>
    )
  }
)
ProjectRow.displayName = "ProjectRow"

// ── Main component ────────────────────────────────────────────────────────────
export default function MusicPortfolio({ projects, config = {} }: MusicPortfolioProps) {
  const { timeZone = "Africa/Casablanca", idleDelay = 4000 } = config

  const [activeIndex, setActiveIndex]   = useState(-1)
  const [isIdle, setIsIdle]             = useState(true)
  const backgroundRef                   = useRef<HTMLDivElement>(null)
  const idleTimerRef                    = useRef<NodeJS.Timeout | null>(null)
  const idleAnimRef                     = useRef<gsap.core.Timeline | null>(null)
  const rowRefs                         = useRef<(HTMLLIElement | null)[]>([])
  const router                          = useRouter()

  // Preload cover images
  useEffect(() => {
    projects.forEach((p) => {
      if (p.image) {
        const img = new window.Image()
        img.src = p.image
      }
    })
  }, [projects])

  const stopIdleAnim = useCallback(() => {
    if (idleAnimRef.current) {
      idleAnimRef.current.kill()
      idleAnimRef.current = null
      rowRefs.current.forEach((el) => { if (el) gsap.set(el, { opacity: 1 }) })
    }
  }, [])

  const startIdleAnim = useCallback(() => {
    if (idleAnimRef.current) return
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 2 })
    rowRefs.current.forEach((el, i) => {
      if (!el) return
      tl.to(el, { opacity: 0.06, duration: 0.1, ease: "power2.inOut" }, i * 0.05)
      tl.to(el, { opacity: 1,    duration: 0.1, ease: "power2.inOut" }, projects.length * 0.05 * 0.5 + i * 0.05)
    })
    idleAnimRef.current = tl
  }, [projects.length])

  const startIdleTimer = useCallback(() => {
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current)
    idleTimerRef.current = setTimeout(() => {
      setIsIdle(true)
      startIdleAnim()
    }, idleDelay)
  }, [idleDelay, startIdleAnim])

  const stopIdleTimer = useCallback(() => {
    if (idleTimerRef.current) { clearTimeout(idleTimerRef.current); idleTimerRef.current = null }
  }, [])

  useEffect(() => {
    startIdleTimer()
    return () => { stopIdleTimer(); stopIdleAnim() }
  }, [startIdleTimer, stopIdleTimer, stopIdleAnim])

  const handleEnter = useCallback((i: number, img: string) => {
    stopIdleAnim(); stopIdleTimer(); setIsIdle(false)
    if (activeIndex === i) return
    setActiveIndex(i)
    const bg = backgroundRef.current
    if (bg && img) {
      bg.style.transition = "none"
      bg.style.transform = "scale(1.06)"
      bg.style.backgroundImage = `url(${img})`
      bg.style.opacity = "0.18"
      requestAnimationFrame(() => requestAnimationFrame(() => {
        bg.style.transition = "opacity 0.6s ease, transform 0.8s cubic-bezier(0.25,0.46,0.45,0.94)"
        bg.style.transform = "scale(1)"
      }))
    }
  }, [activeIndex, stopIdleAnim, stopIdleTimer])

  const handleLeave = useCallback(() => {}, [])

  const handleContainerLeave = useCallback(() => {
    setActiveIndex(-1)
    if (backgroundRef.current) backgroundRef.current.style.opacity = "0"
    startIdleTimer()
  }, [startIdleTimer])

  const handleClick = useCallback((project: PortfolioProject) => {
    if (project.external) {
      window.open(project.href, "_blank", "noopener noreferrer")
    } else {
      router.push(project.href)
    }
  }, [router])

  return (
    <div className="mp-wrapper">
      {/* Background image */}
      <div ref={backgroundRef} className="mp-bg" aria-hidden="true" />

      {/* Column headers */}
      <div className="mp-head">
        <span className="mp-head-cell">ARTIST</span>
        <span className="mp-head-cell">RELEASE</span>
        <span className="mp-head-cell category">TYPE</span>
        <span className="mp-head-cell label">COLLECTIVE</span>
        <span className="mp-head-cell year">YEAR</span>
      </div>

      {/* Project list */}
      <ul
        className="mp-list"
        role="list"
        onMouseLeave={handleContainerLeave}
      >
        {projects.map((project, i) => (
          <ProjectRow
            key={project.id}
            ref={(el) => { rowRefs.current[i] = el }}
            project={project}
            index={i}
            isActive={activeIndex === i}
            isIdle={isIdle}
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
            onClick={() => handleClick(project)}
          />
        ))}
      </ul>

      {/* Corner elements */}
      <div className="mp-corners" aria-hidden="true">
        <div className="mp-corner top-left">
          <span className="mp-corner-sq" />
        </div>
        <nav className="mp-corner top-right">
          <a href="https://instagram.com/thepit_off" target="_blank" rel="noopener noreferrer">@THEPIT_OFF</a>
          {" · "}
          <a href="mailto:contact@pitrecords.org">CONTACT</a>
        </nav>
        <div className="mp-corner bottom-left">OUJDA × BRUGES</div>
        <TimeDisplay timeZone={timeZone} />
      </div>
    </div>
  )
}
