'use client'

import { Button } from '@/components/ui/button'
import { Select } from '@/components/ui/select'
import { MinusIcon, PlusIcon, Trash2Icon } from 'lucide-react'
import Image from 'next/image'

export function SelectedDocumentsList() {
  return (
    <div className="mb-10">
      <div className="rounded-lg border border-blue-100 bg-white">
        <div className="flex items-center justify-between border-b border-blue-100 p-6">
          <h3 className="text-h4 text-text-primary font-semibold">
            <span className="text-primary">선택한 계좌</span> (3)
          </h3>
          <div className="flex gap-2">
            <Button color="primary">원복 일괄복사</Button>
            <Button color="black">목록 일괄삭제</Button>
          </div>
        </div>

        <div className="space-y-4 p-6">
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0">
              <div className="overflow-hidden">
                <Image
                  src="/image/sample-letter-bg.png"
                  alt="나는 나에게돔"
                  width={75}
                  height={75}
                  className="size-[75px] object-cover"
                />
              </div>
            </div>

            <div className="flex-1 space-y-1">
              <h4 className="text-text-primary text-large font-medium">
                나는 나에게돔(9p)
              </h4>
              <p className="text-text-secondary text-small truncate">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </p>
              <div className="flex w-fit flex-shrink-0 items-center divide-x divide-blue-100 rounded-md border border-blue-100">
                <Button
                  size="sm"
                  variant="link"
                  icon={<MinusIcon />}
                  className="size-6 rounded-none"
                />
                <span className="text-medium flex size-6 items-center justify-center-safe font-medium">
                  2
                </span>
                <Button
                  size="sm"
                  variant="link"
                  icon={<PlusIcon />}
                  className="size-6"
                />
              </div>
            </div>

            <div className="flex flex-shrink-0 items-center gap-2">
              <Select placeholder="컬러" />
              <Button
                icon={<Trash2Icon />}
                variant="link"
                size="icon"
                color="destructive"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
