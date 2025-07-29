import { useEffect, useRef, useState } from 'react'

/**
 * useWindowScroll
 * Returns { isScrolled, isScrollingUp } for scroll position and direction.
 * Includes throttling and smoothing for better performance and UX.
 */
export function useWindowScroll(): {
  isScrolled: boolean
  isScrollingUp: boolean
} {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isScrollingUp, setIsScrollingUp] = useState(true)
  const lastScrollY = useRef(0)
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null)
  const isScrolling = useRef(false)

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY
      const scrollDelta = Math.abs(currentY - lastScrollY.current)

      // Only update if scroll is significant enough (reduces jitter)
      if (scrollDelta > 2) {
        setIsScrolled(currentY > 8)
        setIsScrollingUp(currentY < lastScrollY.current)
        lastScrollY.current = currentY
      }

      // Track scrolling state for smoother transitions
      if (!isScrolling.current) {
        isScrolling.current = true
      }

      // Clear existing timeout
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current)
      }

      // Set timeout to detect when scrolling stops
      scrollTimeout.current = setTimeout(() => {
        isScrolling.current = false
      }, 150)
    }

    // Throttle scroll events using requestAnimationFrame
    let ticking = false
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', throttledScroll, { passive: true })
    handleScroll() // Initialize

    return () => {
      window.removeEventListener('scroll', throttledScroll)
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current)
      }
    }
  }, [])

  return { isScrolled, isScrollingUp }
}
