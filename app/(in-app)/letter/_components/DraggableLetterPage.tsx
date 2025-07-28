import { Button } from '@/components/ui/button'
import {
  FontSizeEnum,
  FontWeightEnum,
  ILetterTemplate,
  Page,
  TextAlignEnum,
} from '@/utils/types/letter'
import { ChevronsUpDown } from 'lucide-react'
import React, { useRef, useState, useEffect, memo } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { getEmptyImage } from 'react-dnd-html5-backend'

interface DragItem {
  type: string
  index: number
  id: string
}

interface DraggableLetterPageProps {
  page: Page
  pageIndex: number
  onMove: (dragIndex: number, hoverIndex: number) => void
  currentPageIndex: number
  onCurrentPageChange: (index: number) => void
  letterConfig: ILetterTemplate
  fontSize: FontSizeEnum
  fontFamily: string
  fontWeight: FontWeightEnum
  textAlign: TextAlignEnum
  textColor: string
  letterSpacing: number
  onTextChange: (pageIndex: number, value: string) => void
  onCompositionStart: (pageIndex: number) => void
  onCompositionEnd: (
    pageIndex: number,
    e: React.CompositionEvent<HTMLTextAreaElement>
  ) => void
  onKeyDown: (
    pageIndex: number,
    e: React.KeyboardEvent<HTMLTextAreaElement>
  ) => void
  onKeyUp: (pageIndex: number) => void
  onPaste: (
    pageIndex: number,
    e: React.ClipboardEvent<HTMLTextAreaElement>
  ) => void
  onFocus: (pageIndex: number) => void
  textareaRef: (el: HTMLTextAreaElement | null) => void
  PAPER_WIDTH: number
  PAPER_HEIGHT: number
  LINE_HEIGHT: number
  TOP_PADDING: number
  MAX_LINES: number
}

const ITEM_TYPE = 'LETTER_PAGE'

const DraggableLetterPageComponent: React.FC<DraggableLetterPageProps> = ({
  page,
  pageIndex,
  onMove,
  currentPageIndex,
  onCurrentPageChange,
  letterConfig,
  fontSize,
  fontFamily,
  fontWeight,
  textAlign,
  textColor,
  letterSpacing,
  onTextChange,
  onCompositionStart,
  onCompositionEnd,
  onKeyDown,
  onKeyUp,
  onPaste,
  onFocus,
  textareaRef,
  PAPER_WIDTH,
  PAPER_HEIGHT,
  LINE_HEIGHT,
  TOP_PADDING,
  MAX_LINES,
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)

  const [{ handlerId }, drop] = useDrop<DragItem, void, { handlerId: any }>({
    accept: ITEM_TYPE,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = pageIndex

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return
      }

      setIsHovering(true)

      // Time to actually perform the action
      onMove(dragIndex, hoverIndex)

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex
    },
    drop() {
      setIsHovering(false)
    },
  })

  const [{ isDragging }, drag, preview] = useDrag<
    DragItem,
    void,
    { isDragging: boolean }
  >({
    type: ITEM_TYPE,
    item: () => {
      return { id: page.id, index: pageIndex, type: ITEM_TYPE }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  // Use empty image as drag preview to create custom drag layer
  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true })
  }, [preview])

  // Create drag handle ref
  const dragHandleRef = useRef<HTMLButtonElement>(null)
  drag(dragHandleRef)
  drop(ref)

  return (
    <div
      ref={ref}
      data-handler-id={handlerId}
      className="letter-page-zoom relative mb-6"
      style={{
        opacity: isDragging ? 0.5 : 1,
        transition: 'opacity 0.2s ease',
      }}
    >
      {/* Letter Paper Container */}
      <div
        className="letterBox relative mx-auto bg-white shadow-md"
        style={{
          width: `${PAPER_WIDTH + 80}px`,
          minHeight: `${PAPER_HEIGHT + TOP_PADDING + 40}px`,
          backgroundImage: letterConfig.thumbnail_original
            ? `url(${letterConfig.thumbnail_original})`
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
        <Button
          size="icon"
          ref={dragHandleRef}
          title="Drag to reorder pages"
          className={`absolute top-1/2 -left-4 z-30`}
          icon={<ChevronsUpDown />}
        />
        {/* Page number */}
        <div className="text-text-primary absolute top-4 left-4 text-sm font-bold">
          {pageIndex + 1}페이지
        </div>

        <textarea
          ref={(el) => {
            textareaRef(el)
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
          onChange={(e) => onTextChange(pageIndex, e.target.value)}
          onCompositionStart={() => onCompositionStart(pageIndex)}
          onCompositionEnd={(e) => onCompositionEnd(pageIndex, e)}
          onKeyDown={(e) => onKeyDown(pageIndex, e)}
          onKeyUp={() => onKeyUp(pageIndex)}
          onPaste={(e) => onPaste(pageIndex, e)}
          onFocus={() => onFocus(pageIndex)}
          className="letterContent relative z-10"
          placeholder={pageIndex === 0 ? '편지를 작성해보세요...' : ''}
          data-index={pageIndex}
        />
      </div>
    </div>
  )
}

// Memoize the component to prevent unnecessary re-renders
export const DraggableLetterPage = memo(
  DraggableLetterPageComponent,
  (prevProps, nextProps) => {
    // Custom comparison function for better performance
    return (
      prevProps.page.id === nextProps.page.id &&
      prevProps.page.content === nextProps.page.content &&
      prevProps.pageIndex === nextProps.pageIndex &&
      prevProps.currentPageIndex === nextProps.currentPageIndex &&
      prevProps.fontSize === nextProps.fontSize &&
      prevProps.fontFamily === nextProps.fontFamily &&
      prevProps.fontWeight === nextProps.fontWeight &&
      prevProps.textAlign === nextProps.textAlign &&
      prevProps.textColor === nextProps.textColor &&
      prevProps.letterSpacing === nextProps.letterSpacing &&
      prevProps.PAPER_WIDTH === nextProps.PAPER_WIDTH &&
      prevProps.PAPER_HEIGHT === nextProps.PAPER_HEIGHT &&
      prevProps.LINE_HEIGHT === nextProps.LINE_HEIGHT &&
      prevProps.TOP_PADDING === nextProps.TOP_PADDING &&
      prevProps.MAX_LINES === nextProps.MAX_LINES
    )
  }
)
