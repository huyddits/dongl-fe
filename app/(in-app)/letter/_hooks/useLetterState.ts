import { useState, useRef } from 'react'

export interface Page {
  id: string
  content: string
}

export interface FontSettings {
  fontFamily: string
  fontSize: number
  fontWeight: string
  textAlign: 'left' | 'center' | 'right'
  color: string
}

export const useLetterState = () => {
  const [pages, setPages] = useState<Page[]>([{ id: '1', content: '' }])
  const [currentPageIndex, setCurrentPageIndex] = useState(0)
  const [letterCount, setLetterCount] = useState(1)
  const textareaRefs = useRef<(HTMLTextAreaElement | null)[]>([])

  // Font settings state
  const [fontSettings, setFontSettings] = useState<FontSettings>({
    fontFamily: 'Arial, sans-serif',
    fontSize: 16,
    fontWeight: 'normal',
    textAlign: 'left',
    color: '#000000',
  })

  const addNewPage = () => {
    const newPage: Page = {
      id: String(pages.length + 1),
      content: '',
    }
    setPages((prev) => [...prev, newPage])
    setCurrentPageIndex(pages.length)
    setLetterCount(pages.length + 1)

    // Focus new page after state update
    setTimeout(() => {
      const newPageTextarea = textareaRefs.current[pages.length]
      if (newPageTextarea) {
        newPageTextarea.focus()
      }
    }, 0)
  }

  const updatePages = (newPages: Page[]) => {
    setPages(newPages)
    setLetterCount(newPages.length)
  }

  const handleLetterCountChange = (count: number) => {
    setLetterCount(count)
  }

  // Font control functions
  const updateFontFamily = (fontFamily: string) => {
    setFontSettings((prev) => ({ ...prev, fontFamily }))
  }

  const updateFontSize = (fontSize: number) => {
    setFontSettings((prev) => ({ ...prev, fontSize }))
  }

  const updateFontWeight = (fontWeight: string) => {
    setFontSettings((prev) => ({ ...prev, fontWeight }))
  }

  const updateTextAlign = (textAlign: 'left' | 'center' | 'right') => {
    setFontSettings((prev) => ({ ...prev, textAlign }))
  }

  const updateColor = (color: string) => {
    setFontSettings((prev) => ({ ...prev, color }))
  }

  const updateCurrentPageIndex = (index: number) => {
    console.log('Updating current page index to:', index)
    setCurrentPageIndex(index)
  }

  // Debug function to check refs
  const debugRefs = () => {
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
    console.log('==================')
  }

  // Emoji insertion function
  const insertEmoji = (emoji: string) => {
    debugRefs()

    const currentTextarea = textareaRefs.current[currentPageIndex]
    if (!currentTextarea) {
      console.error('No textarea found for current page:', currentPageIndex)
      return
    }

    // Focus textarea first to ensure we get correct cursor position
    currentTextarea.focus()

    // Get cursor position after focusing
    const start = currentTextarea.selectionStart || 0
    const end = currentTextarea.selectionEnd || 0
    const currentContent = pages[currentPageIndex].content || ''

    const newContent =
      currentContent.slice(0, start) + emoji + currentContent.slice(end)

    console.log('New content:', newContent)

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
  }

  return {
    pages,
    currentPageIndex,
    letterCount,
    textareaRefs,
    fontSettings,
    addNewPage,
    updatePages,
    setCurrentPageIndex: updateCurrentPageIndex,
    handleLetterCountChange,
    updateFontFamily,
    updateFontSize,
    updateFontWeight,
    updateTextAlign,
    updateColor,
    insertEmoji,
    debugRefs,
  }
}
