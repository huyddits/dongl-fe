import Cookies from 'js-cookie'
import { useState, useEffect, useCallback } from 'react'

/**
 * A hook that returns the value of a cookie
 * @param key The cookie key to read
 * @returns The value of the cookie
 */
export function useCookie<T>(key: string): T | undefined {
  // Get the stored value
  const getStoredValue = useCallback((): T | undefined => {
    try {
      if (typeof window === 'undefined') return undefined

      const item = Cookies.get(key)
      // Parse stored json or return undefined if null
      return item ? (JSON.parse(item) as T) : undefined
    } catch (error) {
      console.error(`Error reading cookie "${key}":`, error)
      return undefined
    }
  }, [key])

  // State to store our value
  const [storedValue, setStoredValue] = useState<T | undefined>(getStoredValue)

  // Listen for changes to the cookie
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === key && event.newValue !== event.oldValue) {
        setStoredValue(getStoredValue())
      }
    }

    // Check cookie value on interval for changes from js-cookie directly
    const intervalId = setInterval(() => {
      const newValue = getStoredValue()
      if (JSON.stringify(newValue) !== JSON.stringify(storedValue)) {
        setStoredValue(newValue)
      }
    }, 1000)

    // Add event listener for storage changes from other tabs
    window.addEventListener('storage', handleStorageChange)

    // Cleanup
    return () => {
      clearInterval(intervalId)
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [key, storedValue, getStoredValue])

  return storedValue
}

export default useCookie
