export const config = {
  app: {
    name: '동글',
    description:
      '인터넷서신 폐지? 동글 어플로 간편한 우체국 편지 예쁜 편지지로 지금 바로 마음을 전하세요.',
    version: '1.0.0',
    env: process.env.NEXT_PUBLIC_APP_ENV || 'development',
  },
} as const

export const isDevelopment = config.app.env === 'development'
export const isStaging = config.app.env === 'staging'
export const isUAT = config.app.env === 'uat'
export const isProduction = config.app.env === 'production'
