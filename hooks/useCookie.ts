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
