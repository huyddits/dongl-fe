import { FONT_LIST } from '@/utils/constants/fonts'
import {
  ILetterTemplate,
  FontSettings,
  FontSizeEnum,
  FontWeightEnum,
  TextAlignEnum,
  Page,
} from '@/utils/types/letter'
import { v4 as uuid } from 'uuid'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface WriteLetterParams {
  templateId: string
  contents: Page[]
  fontSettings: FontSettings
}

interface WriteLetterStore {
  writeLetterParams: WriteLetterParams
  selectedTemplate: ILetterTemplate | null
  setTemplateId: (templateId: string) => void
  setTemplateWithDetails: (template: ILetterTemplate) => void
  clearTemplate: () => void
  setContents: (contents: Page[]) => void
  updateContent: (index: number, text: string) => void
  updatePage: (index: number, page: Page) => void
  addContent: (text: string) => void
  removeContent: (index: number) => void
  movePages: (dragIndex: number, hoverIndex: number) => void
  setFontSettings: (fontSettings: FontSettings) => void
  updateFontFamily: (fontFamily: string) => void
  updateFontSize: (fontSize: FontSizeEnum) => void
  updateFontWeight: (fontWeight: FontWeightEnum) => void
  updateTextAlign: (textAlign: TextAlignEnum) => void
  updateColor: (color: string) => void
  reset: () => void
}

const initialState: WriteLetterParams = {
  templateId: '',
  contents: [
    { id: uuid(), content: '' },
    { id: uuid(), content: '' },
    { id: uuid(), content: '' },
  ],
  fontSettings: {
    fontFamily: FONT_LIST[0].value,
    fontSize: FontSizeEnum.LARGE,
    fontWeight: FontWeightEnum.LIGHT,
    textAlign: TextAlignEnum.LEFT,
    color: '#000000',
  },
}

export const useWriteLetterStore = create<WriteLetterStore>()(
  devtools((set) => ({
    writeLetterParams: initialState,
    selectedTemplate: null,

    setTemplateId: (templateId: string) =>
      set((state) => ({
        writeLetterParams: {
          ...state.writeLetterParams,
          templateId,
        },
      })),

    setTemplateWithDetails: (template: ILetterTemplate) =>
      set((state) => ({
        selectedTemplate: template,
        writeLetterParams: {
          ...state.writeLetterParams,
          templateId: String(template.id),
        },
      })),

    clearTemplate: () =>
      set((state) => ({
        selectedTemplate: null,
        writeLetterParams: {
          ...state.writeLetterParams,
          templateId: '',
        },
      })),

    setContents: (contents: Page[]) =>
      set((state) => ({
        writeLetterParams: {
          ...state.writeLetterParams,
          contents,
        },
      })),

    updateContent: (index: number, text: string) =>
      set((state) => ({
        writeLetterParams: {
          ...state.writeLetterParams,
          contents: state.writeLetterParams.contents.map((page, i) =>
            i === index ? { ...page, content: text } : page
          ),
        },
      })),

    updatePage: (index: number, page: Page) =>
      set((state) => ({
        writeLetterParams: {
          ...state.writeLetterParams,
          contents: state.writeLetterParams.contents.map((p, i) =>
            i === index ? page : p
          ),
        },
      })),

    addContent: (text: string) =>
      set((state) => ({
        writeLetterParams: {
          ...state.writeLetterParams,
          contents: [
            ...state.writeLetterParams.contents,
            { id: uuid(), content: text },
          ],
        },
      })),

    removeContent: (index: number) =>
      set((state) => ({
        writeLetterParams: {
          ...state.writeLetterParams,
          contents: state.writeLetterParams.contents.filter(
            (_, i) => i !== index
          ),
        },
      })),

    movePages: (dragIndex: number, hoverIndex: number) =>
      set((state) => {
        const newContents = [...state.writeLetterParams.contents]
        const draggedPage = newContents[dragIndex]

        // Remove the dragged page and insert it at the new position
        newContents.splice(dragIndex, 1)
        newContents.splice(hoverIndex, 0, draggedPage)

        return {
          writeLetterParams: {
            ...state.writeLetterParams,
            contents: newContents,
          },
        }
      }),

    setFontSettings: (fontSettings: FontSettings) =>
      set((state) => ({
        writeLetterParams: {
          ...state.writeLetterParams,
          fontSettings,
        },
      })),

    updateFontFamily: (fontFamily: string) =>
      set((state) => ({
        writeLetterParams: {
          ...state.writeLetterParams,
          fontSettings: {
            ...state.writeLetterParams.fontSettings,
            fontFamily,
          },
        },
      })),

    updateFontSize: (fontSize: FontSizeEnum) =>
      set((state) => ({
        writeLetterParams: {
          ...state.writeLetterParams,
          fontSettings: {
            ...state.writeLetterParams.fontSettings,
            fontSize,
          },
        },
      })),

    updateFontWeight: (fontWeight: FontWeightEnum) =>
      set((state) => ({
        writeLetterParams: {
          ...state.writeLetterParams,
          fontSettings: {
            ...state.writeLetterParams.fontSettings,
            fontWeight,
          },
        },
      })),

    updateTextAlign: (textAlign: TextAlignEnum) =>
      set((state) => ({
        writeLetterParams: {
          ...state.writeLetterParams,
          fontSettings: {
            ...state.writeLetterParams.fontSettings,
            textAlign,
          },
        },
      })),

    updateColor: (color: string) =>
      set((state) => ({
        writeLetterParams: {
          ...state.writeLetterParams,
          fontSettings: {
            ...state.writeLetterParams.fontSettings,
            color,
          },
        },
      })),

    reset: () =>
      set({ writeLetterParams: initialState, selectedTemplate: null }),
  }))
)
