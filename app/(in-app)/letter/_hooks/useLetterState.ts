import { useWriteLetterStore } from '@/stores/useWriteLetterStore'
import { Page, LetterPaperConfig } from '@/utils/types/letter'
import { useState, useRef, useCallback, useEffect, useMemo } from 'react'

export const useLetterState = () => {
  const {
    selectedTemplate,
    writeLetterParams,
    setContents,
    updateContent,
    addContent,
    removeContent,
    movePages: storeMovePages,
    updateFontFamily,
    updateFontSize,
    updateFontWeight,
    updateTextAlign,
    updateColor,
  } = useWriteLetterStore()

  // Pages are now directly from store contents (already Page objects with UUIDs)
  const pages = writeLetterParams.contents

  // UI-only state (not sent to API)
  const [currentPageIndex, setCurrentPageIndexState] = useState(0)
  const [letterCount, setLetterCount] = useState(
    writeLetterParams.contents.length
  )
  const textareaRefs = useRef<(HTMLTextAreaElement | null)[]>([])

  // Derive letter config from selected template using consistent keys
  const letterConfig = useMemo(() => {
    if (selectedTemplate) {
      return {
        id: selectedTemplate.id,
        letter_category_id: selectedTemplate.letter_category_id,
        name: selectedTemplate.name,
        price: selectedTemplate.price,
        thumbnail: selectedTemplate.thumbnail,
        thumbnail_back: selectedTemplate.thumbnail_back,
        thumbnail_original: selectedTemplate.thumbnail_original,
        top_padding: selectedTemplate.top_padding,
        context_width: selectedTemplate.context_width,
        context_height: selectedTemplate.context_height,
        context_line_height: selectedTemplate.context_line_height,
        max_line: selectedTemplate.max_line,
        sort_order: selectedTemplate.sort_order,
        is_active: selectedTemplate.is_active,
        count: selectedTemplate.count,
        tags: selectedTemplate.tags,
        created_at: selectedTemplate.created_at,
        updated_at: selectedTemplate.updated_at,
      }
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
  }, [selectedTemplate])

  // Update letter count when contents change
  useEffect(() => {
    setLetterCount(writeLetterParams.contents.length)
  }, [writeLetterParams.contents.length])

  // Page management - now works directly with store
  const addNewPage = useCallback(() => {
    addContent('')
    setCurrentPageIndexState(writeLetterParams.contents.length)

    // Focus new page after state update
    setTimeout(() => {
      const newPageTextarea =
        textareaRefs.current[writeLetterParams.contents.length]
      newPageTextarea?.focus()
    }, 0)
  }, [addContent, writeLetterParams.contents.length])

  const updatePages = useCallback(
    (newPages: Page[]) => {
      setContents(newPages)
    },
    [setContents]
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
      const currentPage = writeLetterParams.contents[currentPageIndex]
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
      writeLetterParams.contents,
      getCurrentTextarea,
      updateContent,
    ]
  )

  const debugRefs = useCallback(() => {
    console.log('=== DEBUG REFS ===')
    console.log('Current page index:', currentPageIndex)
    console.log('Total pages:', writeLetterParams.contents.length)
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
  }, [currentPageIndex, writeLetterParams.contents.length])

  return {
    // State
    pages,
    currentPageIndex,
    letterCount,
    fontSettings: writeLetterParams.fontSettings,
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
    updateColor,

    // Utilities
    insertEmoji,
    debugRefs,
  }
}
