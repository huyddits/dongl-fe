import { FONT_LIST } from '@/utils/constants/fonts'
import {
  ILetterTemplate,
  IStyling,
  FontSizeEnum,
  FontWeightEnum,
  TextAlignEnum,
  Page,
  PhotoItem,
} from '@/utils/types/letter'
import { v4 as uuid } from 'uuid'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface WriteLetterParams {
  selectedTemplate: ILetterTemplate | null
  content: Page[]
  styling: IStyling
  photos: PhotoItem[]
}

interface WriteLetterStore {
  writeLetterParams: WriteLetterParams
  setSelectedTemplate: (template: ILetterTemplate | null) => void
  clearTemplate: () => void
  setContent: (content: Page[]) => void
  updateContent: (index: number, text: string) => void
  updatePage: (index: number, page: Page) => void
  addContent: (text: string) => void
  removeContent: (index: number) => void
  movePages: (dragIndex: number, hoverIndex: number) => void
  setStyling: (styling: IStyling) => void
  updateFontFamily: (font_family: string) => void
  updateFontSize: (font_size: FontSizeEnum) => void
  updateFontWeight: (font_weight: FontWeightEnum) => void
  updateTextAlign: (text_align: TextAlignEnum) => void
  updateLetterSpacing: (letter_spacing: number) => void
  updateFontColor: (font_color: string) => void
  // Photo management actions
  setPhotos: (photos: PhotoItem[]) => void
  addPhoto: (photoData: any) => void
  removePhoto: (index: number) => void
  restorePhoto: (index: number) => void
  updatePhoto: (index: number, photoData: any) => void
  clearRemovedPhotos: () => void
  reset: () => void
}

const initialState: WriteLetterParams = {
  selectedTemplate: null,
  content: [
    { id: uuid(), content: '' },
    { id: uuid(), content: '' },
    { id: uuid(), content: '' },
  ],
  styling: {
    font_family: FONT_LIST[0].value,
    font_size: FontSizeEnum.LARGE,
    font_weight: FontWeightEnum.LIGHT,
    text_align: TextAlignEnum.LEFT,
    letter_spacing: 0,
    font_color: '#000000',
  },
  photos: [],
}

export const useWriteLetterStore = create<WriteLetterStore>()(
  devtools((set) => ({
    writeLetterParams: initialState,

    setSelectedTemplate: (template: ILetterTemplate | null) =>
      set((state) => ({
        writeLetterParams: {
          ...state.writeLetterParams,
          selectedTemplate: template,
        },
      })),

    clearTemplate: () =>
      set((state) => ({
        writeLetterParams: {
          ...state.writeLetterParams,
          selectedTemplate: null,
        },
      })),

    setContent: (content: Page[]) =>
      set((state) => ({
        writeLetterParams: {
          ...state.writeLetterParams,
          content,
        },
      })),

    updateContent: (index: number, text: string) =>
      set((state) => ({
        writeLetterParams: {
          ...state.writeLetterParams,
          content: state.writeLetterParams.content.map((page, i) =>
            i === index ? { ...page, content: text } : page
          ),
        },
      })),

    updatePage: (index: number, page: Page) =>
      set((state) => ({
        writeLetterParams: {
          ...state.writeLetterParams,
          content: state.writeLetterParams.content.map((p, i) =>
            i === index ? page : p
          ),
        },
      })),

    addContent: (text: string) =>
      set((state) => ({
        writeLetterParams: {
          ...state.writeLetterParams,
          content: [
            ...state.writeLetterParams.content,
            { id: uuid(), content: text },
          ],
        },
      })),

    removeContent: (index: number) =>
      set((state) => ({
        writeLetterParams: {
          ...state.writeLetterParams,
          content: state.writeLetterParams.content.filter(
            (_, i) => i !== index
          ),
        },
      })),

    movePages: (dragIndex: number, hoverIndex: number) =>
      set((state) => {
        const newContent = [...state.writeLetterParams.content]
        const draggedPage = newContent[dragIndex]

        // Remove the dragged page and insert it at the new position
        newContent.splice(dragIndex, 1)
        newContent.splice(hoverIndex, 0, draggedPage)

        return {
          writeLetterParams: {
            ...state.writeLetterParams,
            content: newContent,
          },
        }
      }),

    setStyling: (styling: IStyling) =>
      set((state) => ({
        writeLetterParams: {
          ...state.writeLetterParams,
          styling,
        },
      })),

    updateFontFamily: (font_family: string) =>
      set((state) => ({
        writeLetterParams: {
          ...state.writeLetterParams,
          styling: {
            ...state.writeLetterParams.styling,
            font_family,
          },
        },
      })),

    updateFontSize: (font_size: FontSizeEnum) =>
      set((state) => ({
        writeLetterParams: {
          ...state.writeLetterParams,
          styling: {
            ...state.writeLetterParams.styling,
            font_size,
          },
        },
      })),

    updateFontWeight: (font_weight: FontWeightEnum) =>
      set((state) => ({
        writeLetterParams: {
          ...state.writeLetterParams,
          styling: {
            ...state.writeLetterParams.styling,
            font_weight,
          },
        },
      })),

    updateTextAlign: (text_align: TextAlignEnum) =>
      set((state) => ({
        writeLetterParams: {
          ...state.writeLetterParams,
          styling: {
            ...state.writeLetterParams.styling,
            text_align,
          },
        },
      })),

    updateLetterSpacing: (letter_spacing: number) =>
      set((state) => ({
        writeLetterParams: {
          ...state.writeLetterParams,
          styling: {
            ...state.writeLetterParams.styling,
            letter_spacing,
          },
        },
      })),

    updateFontColor: (font_color: string) =>
      set((state) => ({
        writeLetterParams: {
          ...state.writeLetterParams,
          styling: {
            ...state.writeLetterParams.styling,
            font_color,
          },
        },
      })),

    // Photo management actions
    setPhotos: (photos: PhotoItem[]) =>
      set((state) => ({
        writeLetterParams: {
          ...state.writeLetterParams,
          photos,
        },
      })),

    addPhoto: (photoData: any) =>
      set((state) => ({
        writeLetterParams: {
          ...state.writeLetterParams,
          photos: [
            ...state.writeLetterParams.photos,
            { data: photoData, isRemoved: false },
          ],
        },
      })),

    removePhoto: (index: number) =>
      set((state) => ({
        writeLetterParams: {
          ...state.writeLetterParams,
          photos: state.writeLetterParams.photos.map((photo, i) =>
            i === index ? { ...photo, isRemoved: true } : photo
          ),
        },
      })),

    restorePhoto: (index: number) =>
      set((state) => ({
        writeLetterParams: {
          ...state.writeLetterParams,
          photos: state.writeLetterParams.photos.map((photo, i) =>
            i === index ? { ...photo, isRemoved: false } : photo
          ),
        },
      })),

    updatePhoto: (index: number, photoData: any) =>
      set((state) => ({
        writeLetterParams: {
          ...state.writeLetterParams,
          photos: state.writeLetterParams.photos.map((photo, i) =>
            i === index ? { ...photo, data: photoData } : photo
          ),
        },
      })),

    clearRemovedPhotos: () =>
      set((state) => ({
        writeLetterParams: {
          ...state.writeLetterParams,
          photos: state.writeLetterParams.photos.filter(
            (photo) => !photo.isRemoved
          ),
        },
      })),

    reset: () => set({ writeLetterParams: initialState }),
  }))
)
