import { useEffect, useRef } from 'react'

interface SplitTextProps {
  text: string
  className?: string
  staggerDelay?: number
}

export function SplitText({ text, className = '', staggerDelay = 0.02 }: SplitTextProps) {
  const containerRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const chars = el.querySelectorAll('.reveal-text__char')
    chars.forEach((char, i) => {
      ;(char as HTMLElement).style.transitionDelay = `${i * staggerDelay}s`
    })

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add('is-visible')
            observer.unobserve(el)
          }
        })
      },
      { threshold: 0.3 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [staggerDelay])

  const chars = text.split('')

  return (
    <span ref={containerRef} className={`reveal-text ${className}`} aria-label={text}>
      {chars.map((char, i) => (
        <span key={i} className="reveal-text__char">
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  )
}
