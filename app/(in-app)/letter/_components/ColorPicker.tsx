import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Chrome } from '@uiw/react-color'
import { PropsWithChildren } from 'react'

type Props = {
  value?: string
  onChange?: (value: string) => void
} & PropsWithChildren

export const ColorPicker = ({ children, value, onChange }: Props) => {
  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="!w-fit overflow-hidden p-1.5">
        <Chrome
          className="!rounded-2xl !border-none"
          color={value}
          style={{
            // @ts-expect-error variant css
            '--github-box-shadow': 'transparent',
            '--github-arrow-border-color': 'transparent',
          }}
          onChange={(color) => onChange?.(color.hex)}
        />
      </PopoverContent>
    </Popover>
  )
}
