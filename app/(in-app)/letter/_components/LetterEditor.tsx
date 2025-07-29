import {
  FontSizeEnum,
  FontWeightEnum,
  ILetterTemplate,
  Page,
  TextAlignEnum,
} from '@/utils/types/letter'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { CustomDragLayer } from './CustomDragLayer'
import { DraggableLetterPage } from './DraggableLetterPage'

// Debounce utility
const debounce = <T extends (...args: any[]) => void>(
  func: T,
  delay: number
): T => {
  let timeoutId: NodeJS.Timeout
  return ((...args: any[]) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => func(...args), delay)
  }) as T
}

interface LetterEditorProps {
  pages: Page[]
  onPagesChange: (pages: Page[]) => void
  currentPageIndex: number
  onCurrentPageChange: (index: number) => void
  letterConfig: ILetterTemplate
  font_size: FontSizeEnum
  font_family: string
  font_weight: FontWeightEnum
  text_align: TextAlignEnum
  font_color: string
  letter_spacing: number
  onLetterCountChange?: (count: number) => void
  textareaRefs?: React.MutableRefObject<(HTMLTextAreaElement | null)[]>
  movePages?: (dragIndex: number, hoverIndex: number) => void
}

export const LetterEditor = ({
  pages,
  onPagesChange,
  currentPageIndex,
  onCurrentPageChange,
  letterConfig,
  font_size,
  font_family,
  font_weight,
  text_align,
  font_color,
  letter_spacing,
  onLetterCountChange,
  textareaRefs: externalTextareaRefs,
  movePages,
}: LetterEditorProps) => {
  const localTextareaRefs = useRef<(HTMLTextAreaElement | null)[]>([])
  const textareaRefs = externalTextareaRefs || localTextareaRefs
  const [isComposing, setIsComposing] = useState(false)
  const [lastKeyEvent, setLastKeyEvent] = useState<KeyboardEvent | null>(null)
  // Constants from PHP write2.php - memoized to prevent infinite loops
  const PAPER_WIDTH = useMemo(
    () => letterConfig.context_width || 400,
    [letterConfig.context_width]
  )
  const PAPER_HEIGHT = useMemo(
    () => letterConfig.context_height || 576,
    [letterConfig.context_height]
  )
  const LINE_HEIGHT = useMemo(
    () => letterConfig.context_line_height || 32,
    [letterConfig.context_line_height]
  )
  const TOP_PADDING = useMemo(
    () => letterConfig.top_padding || 60,
    [letterConfig.top_padding]
  )
  const MAX_LINES = useMemo(
    () => letterConfig.max_line || 18,
    [letterConfig.max_line]
  )

  // Helper function to get caret coordinates (from textarea-caret-position.js) - optimized
  const getCaretCoordinates = useCallback(
    (element: HTMLTextAreaElement, position: number) => {
      // Cache div creation for better performance
      const div = document.createElement('div')
      const computedStyle = getComputedStyle(element)

      // Pre-built style string for better performance
      const styleProps = {
        fontFamily: computedStyle.fontFamily,
        fontSize: computedStyle.fontSize,
        fontWeight: computedStyle.fontWeight,
        letterSpacing: computedStyle.letterSpacing,
        lineHeight: computedStyle.lineHeight,
        padding: computedStyle.padding,
        border: computedStyle.border,
        boxSizing: computedStyle.boxSizing,
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
        overflowWrap: computedStyle.overflowWrap,
        width: computedStyle.width,
        textAlign: computedStyle.textAlign,
        textTransform: computedStyle.textTransform,
        fontStyle: computedStyle.fontStyle,
        fontVariant: computedStyle.fontVariant,
        position: 'absolute',
        visibility: 'hidden',
        height: 'auto',
        maxHeight: 'none',
        overflow: 'hidden',
      }

      // Batch style assignment
      Object.assign(div.style, styleProps)

      const textBeforeCursor = element.value.substring(0, position)
      div.textContent = textBeforeCursor

      const span = document.createElement('span')
      span.textContent = element.value.substring(position, position + 1) || '|'
      div.appendChild(span)

      document.body.appendChild(div)

      const coordinates = {
        top: span.offsetTop,
        left: span.offsetLeft,
      }

      document.body.removeChild(div)
      return coordinates
    },
    []
  )

  // Check if content exceeds max height (like PHP scrollHeight check)
  const exceedsMaxHeight = useCallback(
    (textarea: HTMLTextAreaElement): boolean => {
      // The textarea height is set to PAPER_HEIGHT, and has TOP_PADDING
      // So the available text height is PAPER_HEIGHT - TOP_PADDING
      // But we also need to account for bottom padding/margin
      const availableTextHeight = PAPER_HEIGHT - TOP_PADDING
      const exceeds = textarea.scrollHeight > PAPER_HEIGHT

      // Debug logging
      if (exceeds) {
        console.log('Height exceeded:', {
          scrollHeight: textarea.scrollHeight,
          PAPER_HEIGHT,
          availableTextHeight,
          TOP_PADDING,
          LINE_HEIGHT,
          MAX_LINES,
          calculatedMax: Math.ceil(LINE_HEIGHT * MAX_LINES + TOP_PADDING),
          textareaHeight: textarea.style.height,
          actualHeight: textarea.clientHeight,
        })
      }

      return exceeds
    },
    [PAPER_HEIGHT, TOP_PADDING, LINE_HEIGHT, MAX_LINES]
  )

  // Get current line number (like PHP logic)
  const getCurrentLineNumber = useCallback(
    (textarea: HTMLTextAreaElement): number => {
      const coordinates = getCaretCoordinates(textarea, textarea.selectionStart)
      return Math.ceil(coordinates.top / LINE_HEIGHT)
    },
    [getCaretCoordinates, LINE_HEIGHT]
  )

  // Update page content (equivalent to PHP actionInput) - debounced for performance
  const actionInputImmediate = useCallback(
    (pageIndex: number) => {
      const textarea = textareaRefs.current[pageIndex]
      if (!textarea) return

      const newPages = [...pages]
      newPages[pageIndex] = {
        ...newPages[pageIndex],
        content: textarea.value,
      }
      onPagesChange(newPages)

      // Update letter count
      if (onLetterCountChange) {
        onLetterCountChange(newPages.length)
      }
    },
    [pages, onPagesChange, onLetterCountChange]
  )

  const actionInput = useMemo(
    () => debounce(actionInputImmediate, 100),
    [actionInputImmediate]
  )

  // Set letter form styling (equivalent to PHP setLetterForm)
  const setLetterForm = useCallback(() => {
    textareaRefs.current.forEach((textarea) => {
      if (!textarea) return

      textarea.style.fontSize = `${font_size}px`
      textarea.style.fontFamily = font_family
      textarea.style.fontWeight = font_weight
      textarea.style.textAlign = text_align
      textarea.style.color = font_color
      textarea.style.letterSpacing = `${letter_spacing}px`
      textarea.style.lineHeight = `${LINE_HEIGHT}px`
      textarea.style.width = `${PAPER_WIDTH}px`
      textarea.style.height = `${PAPER_HEIGHT}px`
      textarea.style.paddingTop = `${TOP_PADDING}px`
      textarea.style.padding = '0'
      textarea.style.margin = '0'
      textarea.style.border = 'none'
      textarea.style.outline = 'none'
      textarea.style.background = 'transparent'
      textarea.style.resize = 'none'
      textarea.style.overflow = 'hidden'
      textarea.style.whiteSpace = 'pre-wrap'
      textarea.style.wordWrap = 'break-word'
      textarea.style.overflowWrap = 'break-word'
    })
  }, [
    font_size,
    font_family,
    font_weight,
    text_align,
    font_color,
    letter_spacing,
    LINE_HEIGHT,
    PAPER_WIDTH,
    PAPER_HEIGHT,
    TOP_PADDING,
  ])

  // Add new letter page (equivalent to PHP addLetterForm)
  const addLetterForm = useCallback(
    (currentPages?: Page[]) => {
      const pagesArray = currentPages || pages
      const newPage: Page = {
        id: String(Date.now()),
        content: '',
      }

      const newPages = [...pagesArray, newPage]
      onPagesChange(newPages)

      // Update letter count
      if (onLetterCountChange) {
        onLetterCountChange(newPages.length)
      }

      // Apply styling and focus new page
      setTimeout(() => {
        setLetterForm()

        // Focus on the new page
        const newPageIndex = newPages.length - 1
        const newTextarea = textareaRefs.current[newPageIndex]
        if (newTextarea) {
          newTextarea.focus()
          onCurrentPageChange(newPageIndex)
        }
      }, 50)

      return newPages
    },
    [
      pages,
      onPagesChange,
      setLetterForm,
      onLetterCountChange,
      onCurrentPageChange,
    ]
  )

  // Handle text overflow and redistribution (core PHP logic)
  const handleTextOverflow = useCallback(
    (pageIndex: number, textarea: HTMLTextAreaElement) => {
      const currentText = textarea.value
      const cursorPosition = textarea.selectionStart
      const currentLineNumber = getCurrentLineNumber(textarea)

      let newPages = [...pages]
      let removedChars = ''
      let updatedText = currentText

      // Main overflow logic from PHP
      if (exceedsMaxHeight(textarea)) {
        if (!isComposing) {
          // Store the original cursor position
          const originalCursor = cursorPosition

          // Remove characters until it fits (PHP logic)
          while (exceedsMaxHeight(textarea)) {
            removedChars = updatedText.slice(-1) + removedChars
            updatedText = updatedText.slice(0, -1)
            textarea.value = updatedText
          }

          // Check if cursor was at the end when overflow happened
          const wasAtEnd = originalCursor >= currentText.length

          // Restore cursor position if it's within the valid range
          const newCursorPosition = Math.min(originalCursor, updatedText.length)

          // Only restore cursor if we're not at the end (to prevent jumping to end)
          if (!wasAtEnd && originalCursor < currentText.length) {
            textarea.setSelectionRange(newCursorPosition, newCursorPosition)
          }
        }

        // Handle page creation and text movement
        if (removedChars.length > 0) {
          // Ensure next page exists
          if (pageIndex + 1 >= newPages.length) {
            const newPage: Page = {
              id: String(Date.now()),
              content: '',
            }
            newPages = [...newPages, newPage]
          }

          const nextPage = newPages[pageIndex + 1]

          // Move overflow text to next page
          if (removedChars.trim() !== '') {
            // Remove leading newline if it's just a line break
            const cleanedChars = removedChars.replace(/^\n/, '')
            newPages[pageIndex + 1] = {
              ...nextPage,
              content: cleanedChars + nextPage.content,
            }
          }

          // Update current page
          newPages[pageIndex] = {
            ...newPages[pageIndex],
            content: updatedText,
          }

          onPagesChange(newPages)

          // Update letter count
          if (onLetterCountChange) {
            onLetterCountChange(newPages.length)
          }

          // Check if we should move cursor to next page (like PHP logic)
          const wasTypingAtEnd =
            cursorPosition >= currentText.length - removedChars.length
          const isLastLine = currentLineNumber >= MAX_LINES

          if (wasTypingAtEnd && isLastLine) {
            // Move cursor to next page
            setTimeout(() => {
              const nextTextarea = textareaRefs.current[pageIndex + 1]
              if (nextTextarea) {
                nextTextarea.focus()
                // Position cursor at the beginning of overflow text
                const cursorPosInOverflow = Math.max(
                  0,
                  removedChars.length - (currentText.length - cursorPosition)
                )
                nextTextarea.setSelectionRange(
                  cursorPosInOverflow,
                  cursorPosInOverflow
                )
                onCurrentPageChange(pageIndex + 1)
              }
            }, 10)
          }

          // Cascade to next page if needed
          setTimeout(() => {
            const nextTextarea = textareaRefs.current[pageIndex + 1]
            if (nextTextarea && nextTextarea.value.length > 0) {
              if (exceedsMaxHeight(nextTextarea)) {
                handleTextOverflow(pageIndex + 1, nextTextarea)
              }
            }
          }, 20)
        } else {
          // Just update the current page without overflow content
          newPages[pageIndex] = {
            ...newPages[pageIndex],
            content: updatedText,
          }
          onPagesChange(newPages)
        }
      } else {
        // Normal update - no overflow
        newPages[pageIndex] = {
          ...newPages[pageIndex],
          content: currentText,
        }
        onPagesChange(newPages)
      }
    },
    [
      pages,
      onPagesChange,
      getCurrentLineNumber,
      exceedsMaxHeight,
      isComposing,
      onLetterCountChange,
      MAX_LINES,
      onCurrentPageChange,
    ]
  )

  // Handle text input (main input handler) - optimized with immediate state update
  const handleTextChange = useCallback(
    (pageIndex: number, value: string) => {
      const textarea = textareaRefs.current[pageIndex]
      if (!textarea) return

      // Store cursor position before any changes
      const cursorPosition = textarea.selectionStart
      const wasAtEnd = cursorPosition >= (textarea.value?.length || 0)

      // Update the page content in state immediately for responsiveness
      const newPages = [...pages]
      newPages[pageIndex] = {
        ...newPages[pageIndex],
        content: value,
      }
      onPagesChange(newPages)

      // Update letter count
      if (onLetterCountChange) {
        onLetterCountChange(newPages.length)
      }

      // Debounce overflow checking for better performance
      const checkOverflow = () => {
        if (exceedsMaxHeight(textarea)) {
          const currentLineNumber = getCurrentLineNumber(textarea)
          const isOnLastLine = currentLineNumber >= MAX_LINES

          // If user was typing at the end and on last line, they should move to next page
          if (wasAtEnd && isOnLastLine) {
            handleTextOverflow(pageIndex, textarea)
          } else {
            // Normal overflow handling without cursor movement
            handleTextOverflow(pageIndex, textarea)
          }
        }
      }

      // Immediate check for typing responsiveness, debounced for performance
      if (value.length > (pages[pageIndex]?.content?.length || 0)) {
        setTimeout(checkOverflow, 16) // Next frame
      } else {
        checkOverflow()
      }
    },
    [
      pages,
      onPagesChange,
      onLetterCountChange,
      exceedsMaxHeight,
      handleTextOverflow,
      getCurrentLineNumber,
      MAX_LINES,
    ]
  )

  // Korean input composition start
  const handleCompositionStart = useCallback(
    (pageIndex: number) => {
      setIsComposing(true)
      actionInput(pageIndex)
    },
    [actionInput]
  )

  // Korean input composition end
  const handleCompositionEnd = useCallback(
    (pageIndex: number, e: React.CompositionEvent<HTMLTextAreaElement>) => {
      setIsComposing(false)

      const textarea = e.currentTarget
      const coordinates = getCaretCoordinates(textarea, textarea.selectionStart)
      const currentLineNumber = Math.ceil(coordinates.top / LINE_HEIGHT)
      const savedCursorPosition = textarea.selectionStart

      actionInput(pageIndex)

      const isLastLine =
        currentLineNumber > MAX_LINES &&
        savedCursorPosition - 1 === textarea.value.length

      if (isLastLine) {
        let newPages = [...pages]
        if (pageIndex + 1 >= newPages.length) {
          const newPage: Page = {
            id: String(Date.now()),
            content: '',
          }
          newPages = [...newPages, newPage]
          onPagesChange(newPages)

          if (onLetterCountChange) {
            onLetterCountChange(newPages.length)
          }
        }

        setTimeout(() => {
          const nextTextarea = textareaRefs.current[pageIndex + 1]
          if (nextTextarea) {
            nextTextarea.focus()
            nextTextarea.setSelectionRange(0, 0)
            onCurrentPageChange(pageIndex + 1)
          }
        }, 50)
      }

      handleTextOverflow(pageIndex, textarea)
    },
    [
      getCaretCoordinates,
      LINE_HEIGHT,
      actionInput,
      MAX_LINES,
      pages,
      onPagesChange,
      onLetterCountChange,
      onCurrentPageChange,
      handleTextOverflow,
    ]
  )

  // Handle key events
  const handleKeyDown = useCallback(
    (pageIndex: number, e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      setLastKeyEvent(e.nativeEvent)

      // Handle Backspace at the beginning of a page (move to previous page)
      if (e.key === 'Backspace') {
        const textarea = e.currentTarget
        const cursorPosition = textarea.selectionStart

        // If we're at the beginning of a page that's not the first page
        if (cursorPosition === 0 && pageIndex > 0) {
          e.preventDefault() // Prevent default backspace behavior

          const previousTextarea = textareaRefs.current[pageIndex - 1]

          if (previousTextarea) {
            const previousContent = previousTextarea.value

            // Just move cursor to end of previous page without deleting anything
            setTimeout(() => {
              previousTextarea.focus()
              const newCursorPosition = previousContent.length
              previousTextarea.setSelectionRange(
                newCursorPosition,
                newCursorPosition
              )
              onCurrentPageChange(pageIndex - 1)
            }, 10)
          }

          return // Don't process further
        }
      }

      // Handle Delete at the end of a page (delete first character of next page)
      if (e.key === 'Delete') {
        const textarea = e.currentTarget
        const cursorPosition = textarea.selectionStart
        const textLength = textarea.value.length

        // If we're at the end of a page and there's a next page
        if (cursorPosition === textLength && pageIndex < pages.length - 1) {
          e.preventDefault() // Prevent default delete behavior

          const nextTextarea = textareaRefs.current[pageIndex + 1]

          if (nextTextarea) {
            const nextPageContent = nextTextarea.value

            // If next page has content, remove the first character
            if (nextPageContent.length > 0) {
              const newNextContent = nextPageContent.slice(1)

              // Update next page content
              const newPages = [...pages]
              newPages[pageIndex + 1] = {
                ...newPages[pageIndex + 1],
                content: newNextContent,
              }
              onPagesChange(newPages)
            }

            // Keep focus on current page
            setTimeout(() => {
              textarea.focus()
              textarea.setSelectionRange(textLength, textLength)
            }, 10)
          }

          return // Don't process further
        }
      }

      // Check if we're at the last line and might need to move to next page
      if (e.key === 'Enter' || e.key.length === 1) {
        const textarea = e.currentTarget
        const cursorPosition = textarea.selectionStart
        const currentLineNumber = getCurrentLineNumber(textarea)

        // If we're on the last line and typing, prepare for potential page switch
        if (currentLineNumber >= MAX_LINES) {
          // Let the key be processed, then check for overflow
          setTimeout(() => {
            if (exceedsMaxHeight(textarea)) {
              const isAtEnd = cursorPosition >= textarea.value.length - 1
              if (isAtEnd) {
                // This will trigger overflow handling and cursor movement
                handleTextOverflow(pageIndex, textarea)
              }
            }
          }, 0)
        }
      }

      actionInput(pageIndex)
    },
    [
      actionInput,
      getCurrentLineNumber,
      MAX_LINES,
      exceedsMaxHeight,
      handleTextOverflow,
      pages,
      onPagesChange,
      onCurrentPageChange,
    ]
  )

  const handleKeyUp = useCallback(
    (pageIndex: number) => {
      actionInput(pageIndex)
    },
    [actionInput]
  )

  const handleFocus = useCallback(
    (pageIndex: number) => {
      onCurrentPageChange(pageIndex)
    },
    [onCurrentPageChange]
  )

  // Handle paste events
  const handlePaste = useCallback(
    (pageIndex: number, e: React.ClipboardEvent<HTMLTextAreaElement>) => {
      e.preventDefault()

      const textarea = e.currentTarget
      const pastedText = e.clipboardData.getData('text')
      const cursorPosition = textarea.selectionStart
      const currentValue = textarea.value

      const beforeCursor = currentValue.slice(0, cursorPosition)
      const afterCursor = currentValue.slice(textarea.selectionEnd)
      const newValue = beforeCursor + pastedText + afterCursor

      handleTextChange(pageIndex, newValue)

      setTimeout(() => {
        const newCursorPosition = Math.min(
          beforeCursor.length + pastedText.length,
          newValue.length
        )
        textarea.setSelectionRange(newCursorPosition, newCursorPosition)
      }, 0)
    },
    [handleTextChange]
  )

  // Memoized style object to reduce DOM updates
  const textareaStyles = useMemo(
    () => ({
      fontSize: `${font_size}px`,
      fontFamily: font_family,
      fontWeight: font_weight,
      textAlign: text_align,
      color: font_color,
      letterSpacing: `${letter_spacing}px`,
      lineHeight: `${LINE_HEIGHT}px`,
      width: `${PAPER_WIDTH}px`,
      height: `${PAPER_HEIGHT}px`,
      paddingTop: `${TOP_PADDING}px`,
      padding: '0',
      margin: '0',
      border: 'none',
      outline: 'none',
      background: 'transparent',
      resize: 'none' as const,
      overflow: 'hidden' as const,
      whiteSpace: 'pre-wrap' as const,
      wordBreak: 'break-word' as const,
      overflowWrap: 'break-word' as const,
    }),
    [
      font_size,
      font_family,
      font_weight,
      text_align,
      font_color,
      letter_spacing,
      LINE_HEIGHT,
      PAPER_WIDTH,
      PAPER_HEIGHT,
      TOP_PADDING,
    ]
  )

  // Apply styling when props change - optimized with requestAnimationFrame
  useEffect(() => {
    const applyStyles = () => {
      textareaRefs.current.forEach((textarea) => {
        if (!textarea) return

        // Batch DOM updates
        Object.assign(textarea.style, textareaStyles)
      })
    }

    // Use requestAnimationFrame for better performance
    const animationId = requestAnimationFrame(applyStyles)

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [textareaStyles, pages.length])

  return (
    <DndProvider backend={HTML5Backend}>
      <CustomDragLayer pages={pages} />
      <div className="flex-1 p-6">
        <div className="space-y-6">
          {pages.map((page, pageIndex) => (
            <DraggableLetterPage
              key={page.id}
              page={page}
              pageIndex={pageIndex}
              onMove={movePages || (() => {})}
              currentPageIndex={currentPageIndex}
              onCurrentPageChange={onCurrentPageChange}
              letterConfig={letterConfig}
              fontSize={font_size}
              fontFamily={font_family}
              fontWeight={font_weight}
              textAlign={text_align}
              textColor={font_color}
              letterSpacing={letter_spacing}
              onTextChange={handleTextChange}
              onCompositionStart={handleCompositionStart}
              onCompositionEnd={handleCompositionEnd}
              onKeyDown={handleKeyDown}
              onKeyUp={handleKeyUp}
              onPaste={handlePaste}
              onFocus={handleFocus}
              textareaRef={(el: HTMLTextAreaElement | null) => {
                textareaRefs.current[pageIndex] = el
              }}
              PAPER_WIDTH={PAPER_WIDTH}
              PAPER_HEIGHT={PAPER_HEIGHT}
              LINE_HEIGHT={LINE_HEIGHT}
              TOP_PADDING={TOP_PADDING}
              MAX_LINES={MAX_LINES}
            />
          ))}
        </div>
      </div>
    </DndProvider>
  )
}
