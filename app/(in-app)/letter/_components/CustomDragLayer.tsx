import { Page } from '@/utils/types/letter'
import React from 'react'
import { useDragLayer } from 'react-dnd'

interface DragItem {
  type: string
  index: number
  id: string
}

const layerStyles: React.CSSProperties = {
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: 100,
  left: 0,
  top: 0,
  width: '100%',
  height: '100%',
}

function getItemStyles(initialOffset: any, currentOffset: any) {
  if (!initialOffset || !currentOffset) {
    return {
      display: 'none',
    }
  }

  const { x, y } = currentOffset

  const transform = `translate(${x}px, ${y}px)`
  return {
    transform,
    WebkitTransform: transform,
  }
}

export const CustomDragLayer: React.FC<{ pages: Page[] }> = ({ pages }) => {
  const { itemType, isDragging, item, initialOffset, currentOffset } =
    useDragLayer((monitor) => ({
      item: monitor.getItem(),
      itemType: monitor.getItemType(),
      initialOffset: monitor.getInitialSourceClientOffset(),
      currentOffset: monitor.getSourceClientOffset(),
      isDragging: monitor.isDragging(),
    }))

  if (!isDragging) {
    return null
  }

  const page = pages.find((p) => p.id === item?.id)
  if (!page) {
    return null
  }

  return (
    <div style={layerStyles}>
      <div style={getItemStyles(initialOffset, currentOffset)}>
        <div className="pointer-events-none rotate-3 transform opacity-90">
          {/* Mini preview of the page */}
          <div
            className="rounded-lg border-2 border-blue-300 bg-white p-3 shadow-xl"
            style={{ width: '200px', minHeight: '120px' }}
          >
            <div className="mb-2 text-xs font-medium text-blue-600">
              {item.index + 1}페이지
            </div>
            <div className="line-clamp-4 text-xs text-gray-600">
              {page.content || '편지를 작성해보세요...'}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
