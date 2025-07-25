import React from 'react'

interface MessageIconProps {
  width?: number
  height?: number
  className?: string
}

export const MessageIcon: React.FC<MessageIconProps> = ({
  width = 176,
  height = 176,
  className,
}) => {
  return (
    <div className={className} style={{ width, height }}>
      {/* For complex SVGs with patterns/images, we'll keep the original image */}
      <img
        src="/image/Message_perspective_matte.svg"
        alt="Message perspective"
        width={width}
        height={height}
      />
    </div>
  )
}
