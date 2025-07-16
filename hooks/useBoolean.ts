import { useCallback, useState } from 'react'

interface UseBooleanActions {
  toggle: () => void
  setTrue: () => void
  setFalse: () => void
  set: (value: boolean) => void
}

type UseBooleanReturnType = [boolean, UseBooleanActions]

export const useBoolean = (initialValue = false): UseBooleanReturnType => {
  const [value, setValue] = useState(initialValue)

  const toggle = useCallback(() => setValue((prev) => !prev), [])
  const setTrue = useCallback(() => setValue(true), [])
  const setFalse = useCallback(() => setValue(false), [])
  const set = useCallback((newValue: boolean) => setValue(newValue), [])

  return [value, { toggle, setTrue, setFalse, set }]
}
