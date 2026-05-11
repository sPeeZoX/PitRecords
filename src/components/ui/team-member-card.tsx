'use client'

import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: unknown[]) { return twMerge(clsx(inputs)) }

interface TeamMemberCardProps {
  position?: 'left' | 'right'
  jobPosition?: string
  firstName?: string
  lastName?: string
  imageUrl?: string
  description?: string
  href?: string
  className?: string
}

export default function TeamMemberCard({
  position = 'left',
  jobPosition = '',
  firstName = '',
  lastName = '',
  imageUrl = '',
  description = '',
  href,
  className,
}: TeamMemberCardProps) {
  const fullName = [firstName, lastName].filter(Boolean).join(' ')
  const isRight = position === 'right'

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn('relative my-16 flex flex-col justify-center', className)}
    >
      {/* Genre label */}
      <motion.p
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className={cn(
          'mb-4 text-xs font-medium tracking-[0.3em] text-white/30 uppercase',
          isRight && 'text-right'
        )}
      >
        {jobPosition}
      </motion.p>

      <div className='flex items-center justify-end'>
        {/* Portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            'relative shrink-0 overflow-hidden',
            isRight && 'order-1'
          )}
          style={{ width: '22rem', height: '29rem' }}
        >
          <div className='pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-black/30 via-transparent to-transparent' />
          <img
            src={imageUrl}
            alt={fullName}
            className='h-full w-full object-cover object-top duration-500 hover:scale-105'
            style={{ transition: 'transform 0.5s cubic-bezier(0.22,1,0.36,1)' }}
          />
        </motion.div>

        {/* Info block — overlaps image */}
        <motion.div
          initial={{ opacity: 0, x: isRight ? -40 : 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            'relative z-[2] flex flex-col gap-10',
            isRight ? 'left-8 items-end' : '-left-8',
            'w-[calc(100%-340px)]'
          )}
        >
          {/* Name */}
          <div>
            <p className='text-5xl md:text-6xl leading-[1.05] font-extralight tracking-tight text-white'>
              {firstName}
              {lastName && (
                <>
                  <br />
                  <span className='font-normal'>{lastName}</span>
                </>
              )}
            </p>
          </div>

          {/* CTA + bio */}
          <div className={cn('flex gap-8', isRight && 'justify-end')}>
            <motion.a
              href={href}
              target={href?.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                'group flex h-20 w-20 shrink-0 cursor-pointer items-center justify-center rounded-full border border-white/20 transition-colors duration-300 hover:border-white/60 hover:bg-white/10',
                isRight && 'order-1'
              )}
            >
              <ArrowRight
                size={22}
                className={cn(
                  'text-white/40 transition-all duration-300 group-hover:-rotate-45 group-hover:text-white',
                  isRight && 'rotate-180 group-hover:rotate-[225deg]'
                )}
              />
            </motion.a>

            <div className='w-[40%]'>
              <p className={cn(
                'text-sm leading-[1.8] text-white/40',
                isRight && 'text-right'
              )}>
                {description}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
