import React from 'react'

interface HeroIllustrationProps {
  width?: number
  height?: number
  className?: string
}

export const HeroIllustration: React.FC<HeroIllustrationProps> = ({
  width = 534,
  height = 534,
  className,
}) => {
  return (
    <div className={className} style={{ width, height }}>
      {/* For complex SVGs with patterns/images, we'll keep the original image */}
      <img
        src="/image/be2e9a59-8495-4031-bfa2-362791918a10 1.svg"
        alt="Hero illustration"
        width={width}
        height={height}
        className="rounded-full"
      />
    </div>
  )
}
