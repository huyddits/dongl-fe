import { useWriteLetterStore } from '@/stores/useWriteLetterStore'
import { Page } from '@/utils/types/letter'
import { useState, useRef, useCallback, useEffect, useMemo } from 'react'

export const useLetterState = () => {
  const {
    writeLetterParams,
    setContent,
    updateContent,
    addContent,
    movePages: storeMovePages,
    updateFontFamily,
    updateFontSize,
    updateFontWeight,
    updateTextAlign,
    updateLetterSpacing,
    updateFontColor,
  } = useWriteLetterStore()

  // Pages are now directly from store content (already Page objects with UUIDs)
  const pages = writeLetterParams.content

  // UI-only state (not sent to API)
  const [currentPageIndex, setCurrentPageIndexState] = useState(0)
  const [letterCount, setLetterCount] = useState(
    writeLetterParams.content.length
  )
  const textareaRefs = useRef<(HTMLTextAreaElement | null)[]>([])

  // Derive letter config from selected template using consistent keys
  const letterConfig = useMemo(() => {
    if (writeLetterParams.selectedTemplate) {
      return writeLetterParams.selectedTemplate
    }

    // Fallback to default config with same structure
    return {
      id: 0,
      letter_category_id: 1,
      name: '그린',
      price: 1000,
      thumbnail: '/image/sample-letter-bg.png',
      thumbnail_back: '/image/sample-letter-bg.png',
      thumbnail_original: '/image/sample-letter-bg.png',
      top_padding: 54,
      context_width: 462,
      context_height: 431,
      context_line_height: 24,
      max_line: 18,
      sort_order: 0,
      is_active: true,
      count: 0,
      tags: null,
      created_at: '',
      updated_at: '',
    }
  }, [writeLetterParams.selectedTemplate])

  // Update letter count when contents change
  useEffect(() => {
    setLetterCount(writeLetterParams.content.length)
  }, [writeLetterParams.content.length])

  // Page management - now works directly with store
  const addNewPage = useCallback(() => {
    addContent('')
    setCurrentPageIndexState(writeLetterParams.content.length)

    // Focus new page after state update
    setTimeout(() => {
      const newPageTextarea =
        textareaRefs.current[writeLetterParams.content.length]
      newPageTextarea?.focus()
    }, 0)
  }, [addContent, writeLetterParams.content.length])

  const updatePages = useCallback(
    (newPages: Page[]) => {
      setContent(newPages)
    },
    [setContent]
  )

  const setCurrentPageIndex = useCallback((index: number) => {
    setCurrentPageIndexState(index)
  }, [])

  const movePages = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      storeMovePages(dragIndex, hoverIndex)

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
    },
    [storeMovePages]
  )

  const handleLetterCountChange = useCallback((count: number) => {
    setLetterCount(count)
  }, [])

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
      const currentPage = writeLetterParams.content[currentPageIndex]
      const currentContent = currentPage?.content || ''
      const newContent =
        currentContent.slice(0, start) + emoji + currentContent.slice(end)

      // Update the store content directly
      updateContent(currentPageIndex, newContent)

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
    [
      currentPageIndex,
      writeLetterParams.content,
      getCurrentTextarea,
      updateContent,
    ]
  )

  const debugRefs = useCallback(() => {
    console.log('=== DEBUG REFS ===')
    console.log('Current page index:', currentPageIndex)
    console.log('Total pages:', writeLetterParams.content.length)
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
  }, [currentPageIndex, writeLetterParams.content.length])

  return {
    // State
    pages,
    currentPageIndex,
    letterCount,
    styling: writeLetterParams.styling,
    textareaRefs,
    letterConfig,

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
    updateLetterSpacing,
    updateFontColor,

    // Utilities
    insertEmoji,
    debugRefs,
  }
}
