'use client'

import { Button } from '@/components/ui/button'
import { XIcon } from 'lucide-react'
import Image from 'next/image'

export function SelectedDocumentsList() {
  return (
    <div className="mb-10">
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-text-primary text-lg font-semibold">
            선택한 계좌 <span className="text-primary">(3)</span>
          </h3>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" color="primary">
              원복 일괄복사
            </Button>
            <Button size="sm" variant="default" color="destructive">
              목록 일괄삭제
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          {/* Mock Document 1 */}
          <div className="flex items-center gap-4 border-b border-gray-100 py-4">
            <div className="flex-shrink-0">
              <div className="h-20 w-16 overflow-hidden rounded border border-gray-200">
                <Image
                  src="/image/sample-letter-bg.png"
                  alt="나는 나에게돔"
                  width={64}
                  height={80}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            <div className="min-w-0 flex-1">
              <h4 className="text-text-primary mb-1 font-medium">
                나는 나에게돔(9p)
              </h4>
              <p className="text-text-secondary text-sm">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </p>
            </div>

            <div className="flex flex-shrink-0 items-center gap-2">
              <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                -
              </Button>
              <span className="w-8 text-center text-sm font-medium">2</span>
              <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                +
              </Button>
            </div>

            <div className="flex-shrink-0">
              <select className="h-10 w-20 rounded-md border border-gray-200 bg-white px-3 py-2 text-sm">
                <option value="컬러">컬러</option>
                <option value="흑백">흑백</option>
              </select>
            </div>

            <div className="flex-shrink-0">
              <Button
                icon={<XIcon />}
                size="sm"
                variant="outline"
                color="destructive"
                title="삭제"
              />
            </div>
          </div>

          {/* Mock Document 2 */}
          <div className="flex items-center gap-4 border-b border-gray-100 py-4">
            <div className="flex-shrink-0">
              <div className="h-20 w-16 overflow-hidden rounded border border-gray-200">
                <Image
                  src="/image/sample-letter-bg.png"
                  alt="19금 편지지"
                  width={64}
                  height={80}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            <div className="min-w-0 flex-1">
              <h4 className="text-text-primary mb-1 font-medium">
                19금 편지지(11p)
              </h4>
              <p className="text-text-secondary text-sm">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </p>
            </div>

            <div className="flex flex-shrink-0 items-center gap-2">
              <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                -
              </Button>
              <span className="w-8 text-center text-sm font-medium">2</span>
              <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                +
              </Button>
            </div>

            <div className="flex-shrink-0">
              <select className="h-10 w-20 rounded-md border border-gray-200 bg-white px-3 py-2 text-sm">
                <option value="컬러">컬러</option>
                <option value="흑백">흑백</option>
              </select>
            </div>

            <div className="flex-shrink-0">
              <Button
                icon={<XIcon />}
                size="sm"
                variant="outline"
                color="destructive"
                title="삭제"
              />
            </div>
          </div>

          {/* Mock Document 3 */}
          <div className="flex items-center gap-4 py-4">
            <div className="flex-shrink-0">
              <div className="h-20 w-16 overflow-hidden rounded border border-gray-200">
                <Image
                  src="/image/sample-letter-bg.png"
                  alt="MZ축집"
                  width={64}
                  height={80}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            <div className="min-w-0 flex-1">
              <h4 className="text-text-primary mb-1 font-medium">
                MZ축집(17p)
              </h4>
              <p className="text-text-secondary text-sm">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </p>
            </div>

            <div className="flex flex-shrink-0 items-center gap-2">
              <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                -
              </Button>
              <span className="w-8 text-center text-sm font-medium">2</span>
              <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                +
              </Button>
            </div>

            <div className="flex-shrink-0">
              <select className="h-10 w-20 rounded-md border border-gray-200 bg-white px-3 py-2 text-sm">
                <option value="컬러">컬러</option>
                <option value="흑백">흑백</option>
              </select>
            </div>

            <div className="flex-shrink-0">
              <Button
                icon={<XIcon />}
                size="sm"
                variant="outline"
                color="destructive"
                title="삭제"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
