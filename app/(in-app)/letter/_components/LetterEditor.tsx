import { useState, useRef, useEffect, useCallback } from 'react'

interface Page {
  id: string
  content: string
}

interface LetterPaperConfig {
  category: 'Simple' | 'Theme' | 'Basic'
  name: string
  upperMarginPx: number
  textWindowHorizontalSize: number
  textWindowVerticalSize: number
  lineSpacing: number
  price: number
  maxLines: number
  imgOnebonPath?: string
  imgBackPath?: string
}

interface LetterEditorProps {
  pages: Page[]
  onPagesChange: (pages: Page[]) => void
  currentPageIndex: number
  onCurrentPageChange: (index: number) => void
  letterPaper: LetterPaperConfig
  fontSize?: number
  fontFamily?: string
  fontWeight?: string
  textAlign?: 'left' | 'center' | 'right'
  textColor?: string
  letterSpacing?: number
  onLetterCountChange?: (count: number) => void
  textareaRefs?: React.MutableRefObject<(HTMLTextAreaElement | null)[]>
}

export const LetterEditor = ({
  pages,
  onPagesChange,
  currentPageIndex,
  onCurrentPageChange,
  letterPaper,
  fontSize = 16,
  fontFamily = 'Arial, sans-serif',
  fontWeight = 'normal',
  textAlign = 'left',
  textColor = '#000000',
  letterSpacing = 0,
  onLetterCountChange,
  textareaRefs: externalTextareaRefs,
}: LetterEditorProps) => {
  const localTextareaRefs = useRef<(HTMLTextAreaElement | null)[]>([])
  const textareaRefs = externalTextareaRefs || localTextareaRefs
  const [isComposing, setIsComposing] = useState(false)
  const [lastKeyEvent, setLastKeyEvent] = useState<KeyboardEvent | null>(null)

  // Constants from PHP write2.php
  const PAPER_WIDTH = letterPaper.textWindowHorizontalSize || 400
  const PAPER_HEIGHT = letterPaper.textWindowVerticalSize || 576
  const LINE_HEIGHT = letterPaper.lineSpacing || 32
  const TOP_PADDING = letterPaper.upperMarginPx || 60
  const MAX_LINES = letterPaper.maxLines || 18

  // Helper function to get caret coordinates (from textarea-caret-position.js)
  const getCaretCoordinates = useCallback(
    (element: HTMLTextAreaElement, position: number) => {
      const div = document.createElement('div')
      const computedStyle = getComputedStyle(element)

      // Copy styles like in PHP getCaretCoordinates
      const properties = [
        'fontFamily',
        'fontSize',
        'fontWeight',
        'letterSpacing',
        'lineHeight',
        'padding',
        'border',
        'boxSizing',
        'whiteSpace',
        'wordWrap',
        'overflowWrap',
        'width',
        'textAlign',
        'textTransform',
        'fontStyle',
        'fontVariant',
      ]

      properties.forEach((prop) => {
        div.style[prop as any] = computedStyle[prop as any]
      })

      div.style.position = 'absolute'
      div.style.visibility = 'hidden'
      div.style.height = 'auto'
      div.style.maxHeight = 'none'
      div.style.overflow = 'hidden'
      div.style.whiteSpace = 'pre-wrap'
      div.style.wordWrap = 'break-word'

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
      const maxHeight = Math.ceil(LINE_HEIGHT * MAX_LINES + 1)
      return textarea.scrollHeight > maxHeight
    },
    [LINE_HEIGHT, MAX_LINES]
  )

  // Get current line number (like PHP logic)
  const getCurrentLineNumber = useCallback(
    (textarea: HTMLTextAreaElement): number => {
      const coordinates = getCaretCoordinates(textarea, textarea.selectionStart)
      return Math.ceil(coordinates.top / LINE_HEIGHT)
    },
    [getCaretCoordinates, LINE_HEIGHT]
  )

  // Update page content (equivalent to PHP actionInput)
  const actionInput = useCallback(
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

  // Set letter form styling (equivalent to PHP setLetterForm)
  const setLetterForm = useCallback(() => {
    textareaRefs.current.forEach((textarea) => {
      if (!textarea) return

      textarea.style.fontSize = `${fontSize}px`
      textarea.style.fontFamily = fontFamily
      textarea.style.fontWeight = fontWeight
      textarea.style.textAlign = textAlign
      textarea.style.color = textColor
      textarea.style.letterSpacing = `${letterSpacing}px`
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
    fontSize,
    fontFamily,
    fontWeight,
    textAlign,
    textColor,
    letterSpacing,
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

  // Handle text input (main input handler)
  const handleTextChange = useCallback(
    (pageIndex: number, value: string) => {
      const textarea = textareaRefs.current[pageIndex]
      if (!textarea) return

      // Store cursor position before any changes
      const cursorPosition = textarea.selectionStart
      const wasAtEnd = cursorPosition >= (textarea.value?.length || 0)

      // Update the page content in state
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

      // Check for overflow and handle cursor movement
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

  // Apply styling when props change
  useEffect(() => {
    const timer = setTimeout(() => {
      setLetterForm()
    }, 100)

    return () => clearTimeout(timer)
  }, [setLetterForm, pages.length])

  return (
    <div className="flex-1 p-6">
      <div className="space-y-6">
        {pages.map((page, pageIndex) => (
          <div key={page.id} className="relative">
            {/* Letter Paper Container */}
            <div
              className="letterBox relative mx-auto bg-white shadow-lg"
              style={{
                width: `${PAPER_WIDTH + 80}px`,
                minHeight: `${PAPER_HEIGHT + TOP_PADDING + 40}px`,
                backgroundImage: letterPaper.imgOnebonPath
                  ? `url(${letterPaper.imgOnebonPath})`
                  : undefined,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                paddingTop: `${TOP_PADDING}px`,
                paddingLeft: '40px',
                paddingRight: '40px',
                paddingBottom: '40px',
              }}
            >
              {/* Page number */}
              <div className="absolute top-4 left-4 text-sm font-medium text-gray-600">
                {pageIndex + 1}페이지
              </div>

              {/* Letter lines background */}
              <div
                className="pointer-events-none absolute"
                style={{
                  top: `${TOP_PADDING}px`,
                  left: '40px',
                  right: '40px',
                  backgroundColor: 'rgba(255, 255, 255, 0.3)',
                }}
              >
                {Array.from({ length: MAX_LINES }).map((_, i) => (
                  <div
                    key={i}
                    className="border-b border-gray-400/50"
                    style={{
                      height: `${LINE_HEIGHT}px`,
                      width: `${PAPER_WIDTH}px`,
                    }}
                  />
                ))}
              </div>

              {/* Textarea for writing */}
              <textarea
                ref={(el) => {
                  textareaRefs.current[pageIndex] = el
                  // Apply styling immediately when ref is set
                  if (el) {
                    setTimeout(() => {
                      el.style.fontSize = `${fontSize}px`
                      el.style.fontFamily = fontFamily
                      el.style.fontWeight = fontWeight
                      el.style.textAlign = textAlign
                      el.style.color = textColor
                      el.style.letterSpacing = `${letterSpacing}px`
                      el.style.lineHeight = `${LINE_HEIGHT}px`
                      el.style.width = `${PAPER_WIDTH}px`
                      el.style.height = `${PAPER_HEIGHT}px`
                      el.style.paddingTop = `${TOP_PADDING}px`
                      el.style.padding = '0'
                      el.style.margin = '0'
                      el.style.border = 'none'
                      el.style.outline = 'none'
                      el.style.background = 'transparent'
                      el.style.resize = 'none'
                      el.style.overflow = 'hidden'
                      el.style.whiteSpace = 'pre-wrap'
                      el.style.wordWrap = 'break-word'
                      el.style.overflowWrap = 'break-word'
                    }, 0)
                  }
                }}
                value={page.content}
                onChange={(e) => handleTextChange(pageIndex, e.target.value)}
                onCompositionStart={() => handleCompositionStart(pageIndex)}
                onCompositionEnd={(e) => handleCompositionEnd(pageIndex, e)}
                onKeyDown={(e) => handleKeyDown(pageIndex, e)}
                onKeyUp={() => handleKeyUp(pageIndex)}
                onPaste={(e) => handlePaste(pageIndex, e)}
                onFocus={() => handleFocus(pageIndex)}
                className="letterContent relative z-10"
                placeholder={pageIndex === 0 ? '편지를 작성해보세요...' : ''}
                data-index={pageIndex}
              />
            </div>
          </div>
        ))}

        {/* Add letter page button */}
        <div className="text-center">
          <button
            onClick={() => addLetterForm()}
            className="rounded-lg bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700"
          >
            편지지 추가 + ({letterPaper.price}원)
          </button>
        </div>
      </div>
    </div>
  )
}
