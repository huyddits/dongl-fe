'use client'

import { useAttachFilesToLetter, useCreateLetterDraft } from '@/services/letter'
import { ROUTES } from '@/utils/constants/routes'
import { useRouter } from 'next/navigation'
import { JSX } from 'react'
import { toast } from 'sonner'
import { useLetterRequest } from '../_hooks/useLetterRequest'

type Props = {
  render: (onSave: () => void, isPending: boolean) => JSX.Element
  existingDraftId?: number
}

export const SaveDraftButton = ({ render, existingDraftId }: Props) => {
  const router = useRouter()
  const { content, styling, template_id, uploadedPhotos } = useLetterRequest()
  const { mutateAsync: save, isPending } = useCreateLetterDraft()
  const { mutateAsync: attachFiles, isPending: isAttaching } =
    useAttachFilesToLetter()
  const onSave = async () => {
    const { data } = await save({
      content,
      styling,
      template_id,
    })
    const letterId = existingDraftId ?? data?.id
    if (!letterId) {
      toast.error('편지 저장에 실패했습니다. 다시 시도해주세요.')
      return
    }
    if (uploadedPhotos.length > 0) {
      const { success } = await attachFiles({
        letter_id: letterId,
        type: 'photo',
        files: uploadedPhotos,
      })
      if (!success) {
        toast.error('사진 첨부에 실패했습니다. 다시 시도해주세요.')
        return
      }
    }
    toast.success(
      <>
        <div>임시저장되었습니다.</div>
        <div>임시저장된 편지지는 마이페이지에서 확인 가능합니다.</div>
      </>
    )
    router.push(ROUTES.HOME)
  }

  return <>{render(onSave, isPending || isAttaching)}</>
}
