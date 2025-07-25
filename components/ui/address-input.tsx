'use client'

import { cn } from '@/lib'
import { useEffect, useRef, useState } from 'react'
import { Input } from './input'
import { Popover, PopoverContent, PopoverTrigger } from './popover'

interface AddressData {
  zonecode: string // 우편번호
  roadAddress: string // 도로명주소
  jibunAddress: string // 지번주소
  autoRoadAddress?: string // 예상 도로명 주소
  autoJibunAddress?: string // 예상 지번 주소
  bname: string // 법정동명
  buildingName: string // 건물명
  apartment: string // 공동주택 여부 (Y/N)
  userSelectedType: string // 사용자가 선택한 주소 타입 (R: 도로명, J: 지번)
}

interface AddressInputProps {
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  className?: string
  disabled?: boolean
}

declare global {
  interface Window {
    daum: any
  }
}

export const AddressInput = ({
  value,
  onChange,
  placeholder = '주소를 검색하세요',
  className,
  disabled,
}: AddressInputProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const wrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Load Daum Postcode script
    const script = document.createElement('script')
    script.src = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js'
    script.async = true
    document.head.appendChild(script)

    return () => {
      // Cleanup script on unmount
      if (document.head.contains(script)) {
        document.head.removeChild(script)
      }
    }
  }, [])

  const handleOpenDaum = () => {
    if (disabled) return

    if (!window.daum) {
      console.error('Daum Postcode API not loaded')
      return
    }

    setTimeout(() => {
      if (wrapRef.current) {
        new window.daum.Postcode({
          oncomplete: function (data: AddressData) {
            // 각 주소의 노출 규칙에 따라 주소를 조합한다.
            let addr = '' // 주소 변수
            let extraAddr = '' // 참고항목 변수

            // 사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
            if (data.userSelectedType === 'R') {
              // 사용자가 도로명 주소를 선택했을 경우
              addr = data.roadAddress
            } else {
              // 사용자가 지번 주소를 선택했을 경우(J)
              addr = data.jibunAddress
            }

            // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
            if (data.userSelectedType === 'R') {
              // 법정동명이 있을 경우 추가한다. (법정리는 제외)
              // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
              if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
                extraAddr += data.bname
              }
              // 건물명이 있고, 공동주택일 경우 추가한다.
              if (data.buildingName !== '' && data.apartment === 'Y') {
                extraAddr +=
                  extraAddr !== ''
                    ? ', ' + data.buildingName
                    : data.buildingName
              }
              // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
              if (extraAddr !== '') {
                extraAddr = ' (' + extraAddr + ')'
              }
            }
            console.log(addr)
            // Update the input value using onChange
            onChange?.(addr)

            // Close the popover
            setIsOpen(false)
          },
          // 우편번호 찾기 화면 크기가 조정되었을때 실행할 코드를 작성하는 부분.
          onresize: function (size: { height: number }) {
            if (wrapRef.current) {
              wrapRef.current.style.height = size.height + 'px'
            }
          },
          width: '100%',
          height: '100%',
        }).embed(wrapRef.current)
      }
    }, 100)
  }
  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Input
          value={value}
          placeholder={placeholder}
          readOnly
          onClick={handleOpenDaum}
          className={cn('cursor-pointer text-left', className)}
          disabled={disabled}
        />
      </PopoverTrigger>
      <PopoverContent
        className="h-[400px] w-[500px] overflow-auto p-0"
        align="start"
        side="bottom"
        sideOffset={5}
      >
        <div className="relative h-full w-full">
          <div
            ref={wrapRef}
            className="h-full w-full overflow-hidden rounded-md"
            style={{ border: 'none' }}
          />
        </div>
      </PopoverContent>
    </Popover>
  )
}
