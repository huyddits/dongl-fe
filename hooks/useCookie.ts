'use client'

import Cookies from 'js-cookie'
import { useState, useEffect, useCallback } from 'react'

/**
 * A hook that returns the value of a cookie
 * @param key The cookie key to read
 * @param isObject Whether the cookie value should be parsed as JSON object
 * @returns The value of the cookie (parsed as JSON if isObject is true, otherwise raw string)
 */
export function useCookie<T>(key: string, isObject?: boolean): T | undefined {
  // Get the stored value
  const getStoredValue = useCallback((): T | undefined => {
    try {
      if (typeof window === 'undefined') return undefined

      const item = Cookies.get(key)
      if (!item) return undefined

      // If isObject is false, return the raw string value
      if (!isObject) {
        return item as T
      }

      // Parse stored json if isObject is true
      return JSON.parse(item) as T
    } catch (error) {
      console.error(`Error reading cookie "${key}":`, error)
      return undefined
    }
  }, [key, isObject])

  // State to store our value, initialize as undefined for SSR safety
  const [storedValue, setStoredValue] = useState<T | undefined>(undefined)

  // Read cookie only on client after mount
  useEffect(() => {
    setStoredValue(getStoredValue())

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === key && event.newValue !== event.oldValue) {
        setStoredValue(getStoredValue())
      }
    }

    // Check cookie value on interval for changes from js-cookie directly
    const intervalId = setInterval(() => {
      const newValue = getStoredValue()
      setStoredValue((prev) => {
        if (JSON.stringify(newValue) !== JSON.stringify(prev)) {
          return newValue
        }
        return prev
      })
    }, 1000)

    window.addEventListener('storage', handleStorageChange)
    return () => {
      clearInterval(intervalId)
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [key, getStoredValue])

  return storedValue
}

export default useCookie
