export enum LetterStepEnum {
  THEME = 'THEME',
  WRITE = 'WRITE',
  PHOTO = 'PHOTO',
  DOCUMENTS = 'DOCUMENTS',
  ADDRESSES = 'ADDRESSES',
  PAYMENT = 'PAYMENT',
}

export enum CategoryValueEnum {
  ALL = 'all',
  ORIGINAL = 'original',
  IMAGE = 'image',
  POSTCARD = 'postcard',
}

// Font and styling enums
export enum FontSizeEnum {
  LARGE = '14.8',
  MEDIUM = '12.8',
  SMALL = '10.8',
  VERY_SMALL = '8.8',
}

export enum FontWeightEnum {
  LIGHT = '500',
  BOLD = '800',
}

export enum TextAlignEnum {
  LEFT = 'left',
  CENTER = 'center',
  RIGHT = 'right',
}

// Letter-related interfaces
export interface Page {
  id: string
  content: string
}

export interface FontSettings {
  fontFamily: string
  fontSize: FontSizeEnum
  fontWeight: FontWeightEnum
  textAlign: TextAlignEnum
  color: string
}

export interface LetterPaperConfig {
  category: 'Simple' | 'Theme' | 'Basic'
  name: string
  upperMarginPx: number
  textWindowHorizontalSize: number
  textWindowVerticalSize: number
  lineSpacing: number
  price: number
  maxLines: number
  imgOnebonPath?: string
  imgBackPath?: string
}
