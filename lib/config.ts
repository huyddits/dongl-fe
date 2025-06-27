export const config = {
    app: {
      name: 'Dongl Project',
      description: 'A Next.js dongl project with TypeScript',
      version: '1.0.0',
      env: process.env.NEXT_PUBLIC_APP_ENV || 'development',
      url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
      apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
    },
    auth: {
      secret: process.env.NEXTAUTH_SECRET,
      url: process.env.NEXTAUTH_URL,
    },
    external: {
      apiKey: process.env.EXTERNAL_API_KEY,
    },
    logging: {
      level: process.env.LOG_LEVEL || 'info',
    },
  } as const
  
  export const isDevelopment = config.app.env === 'development'
  export const isStaging = config.app.env === 'staging'
  export const isUAT = config.app.env === 'uat'
  export const isProduction = config.app.env === 'production'