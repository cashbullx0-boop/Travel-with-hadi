import { useEffect, useRef } from 'react'

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const pos = useRef({ x: 0, y: 0 })
  const target = useRef({ x: 0, y: 0 })
  const isHovering = useRef(false)

  useEffect(() => {
    // Skip on touch devices
    if ('ontouchstart' in window) return

    const cursor = cursorRef.current
    if (!cursor) return

    const onMouseMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY }
    }

    const onMouseOver = (e: MouseEvent) => {
      const targetEl = e.target as HTMLElement
      if (
        targetEl.tagName === 'A' ||
        targetEl.tagName === 'BUTTON' ||
        targetEl.closest('a') ||
        targetEl.closest('button') ||
        targetEl.classList.contains('interactive')
      ) {
        isHovering.current = true
      }
    }

    const onMouseOut = () => {
      isHovering.current = false
    }

    let rafId: number
    const animate = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.15
      pos.current.y += (target.current.y - pos.current.y) * 0.15

      const size = isHovering.current ? 32 : 4
      const border = isHovering.current ? '1px solid #F5F2E8' : 'none'
      const bg = isHovering.current ? 'transparent' : '#1E5B3A'

      cursor.style.transform = `translate(${pos.current.x - size / 2}px, ${pos.current.y - size / 2}px)`
      cursor.style.width = `${size}px`
      cursor.style.height = `${size}px`
      cursor.style.border = border
      cursor.style.background = bg

      rafId = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseover', onMouseOver)
    document.addEventListener('mouseout', onMouseOut)
    rafId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseover', onMouseOver)
      document.removeEventListener('mouseout', onMouseOut)
      cancelAnimationFrame(rafId)
    }
  }, [])

  // Don't render on touch devices
  if (typeof window !== 'undefined' && 'ontouchstart' in window) return null

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full mix-blend-difference transition-[width,height,background,border] duration-200 ease-cinematic hidden md:block"
      style={{ width: 4, height: 4, background: '#1E5B3A' }}
    />
  )
}
