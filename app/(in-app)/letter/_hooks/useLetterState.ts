import {
  FontSizeEnum,
  FontWeightEnum,
  TextAlignEnum,
  FontSettings,
  Page,
} from '@/utils/types/letter'
import { useState, useRef, useCallback } from 'react'
import { v4 as uuid } from 'uuid'

export const useLetterState = () => {
  const [pages, setPages] = useState<Page[]>([{ id: uuid(), content: '' }])
  const [currentPageIndex, setCurrentPageIndexState] = useState(0)
  const [letterCount, setLetterCount] = useState(1)
  const textareaRefs = useRef<(HTMLTextAreaElement | null)[]>([])

  // Font settings state with proper default values
  const [fontSettings, setFontSettings] = useState<FontSettings>({
    fontFamily: 'Arial, sans-serif',
    fontSize: FontSizeEnum.LARGE,
    fontWeight: FontWeightEnum.LIGHT,
    textAlign: TextAlignEnum.LEFT,
    color: '#000000',
  })

  // Page management
  const addNewPage = useCallback(() => {
    const newPage: Page = {
      id: uuid(),
      content: '',
    }
    setPages((prev) => [...prev, newPage])
    setCurrentPageIndexState(pages.length)
    setLetterCount(pages.length + 1)

    // Focus new page after state update
    setTimeout(() => {
      const newPageTextarea = textareaRefs.current[pages.length]
      newPageTextarea?.focus()
    }, 0)
  }, [pages.length])

  const updatePages = useCallback((newPages: Page[]) => {
    setPages(newPages)
    setLetterCount(newPages.length)
  }, [])

  const setCurrentPageIndex = useCallback((index: number) => {
    setCurrentPageIndexState(index)
  }, [])

  const movePages = useCallback((dragIndex: number, hoverIndex: number) => {
    setPages((prevPages) => {
      const newPages = [...prevPages]
      const draggedPage = newPages[dragIndex]

      // Remove the dragged page and insert it at the new position
      newPages.splice(dragIndex, 1)
      newPages.splice(hoverIndex, 0, draggedPage)

      return newPages
    })

    // Update current page index if it was affected by the move
    setCurrentPageIndexState((prevIndex) => {
      if (prevIndex === dragIndex) {
        return hoverIndex
      } else if (prevIndex > dragIndex && prevIndex <= hoverIndex) {
        return prevIndex - 1
      } else if (prevIndex < dragIndex && prevIndex >= hoverIndex) {
        return prevIndex + 1
      }
      return prevIndex
    })
  }, [])

  const handleLetterCountChange = useCallback((count: number) => {
    setLetterCount(count)
  }, [])

  // Font settings updates - using useCallback for performance
  const updateFontFamily = useCallback(
    (fontFamily: string) =>
      setFontSettings((prev) => ({ ...prev, fontFamily })),
    []
  )

  const updateFontSize = useCallback(
    (fontSize: FontSizeEnum) =>
      setFontSettings((prev) => ({ ...prev, fontSize })),
    []
  )

  const updateFontWeight = useCallback(
    (fontWeight: FontWeightEnum) =>
      setFontSettings((prev) => ({ ...prev, fontWeight })),
    []
  )

  const updateTextAlign = useCallback(
    (textAlign: TextAlignEnum) =>
      setFontSettings((prev) => ({ ...prev, textAlign })),
    []
  )

  const updateColor = useCallback(
    (color: string) => setFontSettings((prev) => ({ ...prev, color })),
    []
  )

  // Utility functions
  const getCurrentTextarea = useCallback(
    () => textareaRefs.current[currentPageIndex],
    [currentPageIndex]
  )

  const insertEmoji = useCallback(
    (emoji: string) => {
      const currentTextarea = getCurrentTextarea()
      if (!currentTextarea) {
        console.error('No textarea found for current page:', currentPageIndex)
        return
      }

      currentTextarea.focus()

      const start = currentTextarea.selectionStart || 0
      const end = currentTextarea.selectionEnd || 0
      const currentContent = pages[currentPageIndex].content || ''
      const newContent =
        currentContent.slice(0, start) + emoji + currentContent.slice(end)

      // Update the page content
      const newPages = [...pages]
      newPages[currentPageIndex] = {
        ...newPages[currentPageIndex],
        content: newContent,
      }

      updatePages(newPages)

      // Set cursor position after emoji and trigger change event
      setTimeout(() => {
        const newCursorPosition = start + emoji.length
        currentTextarea.value = newContent
        currentTextarea.focus()
        currentTextarea.setSelectionRange(newCursorPosition, newCursorPosition)

        // Trigger change event to ensure LetterEditor processes the content
        const event = new Event('input', { bubbles: true })
        currentTextarea.dispatchEvent(event)
      }, 10)
    },
    [currentPageIndex, pages, getCurrentTextarea, updatePages]
  )

  const debugRefs = useCallback(() => {
    console.log('=== DEBUG REFS ===')
    console.log('Current page index:', currentPageIndex)
    console.log('Total pages:', pages.length)
    console.log('Available textareas:', textareaRefs.current.length)
    console.log(
      'Textareas detail:',
      textareaRefs.current.map((ref, index) => ({
        index,
        exists: !!ref,
        hasValue: ref?.value?.length || 0,
        isFocused: ref === document.activeElement,
      }))
    )
  }, [currentPageIndex, pages.length])

  return {
    // State
    pages,
    currentPageIndex,
    letterCount,
    fontSettings,
    textareaRefs,

    // Page actions
    addNewPage,
    updatePages,
    setCurrentPageIndex,
    movePages,
    handleLetterCountChange,

    // Font actions
    updateFontFamily,
    updateFontSize,
    updateFontWeight,
    updateTextAlign,
    updateColor,

    // Utilities
    insertEmoji,
    debugRefs,
  }
}
