import { ofetch } from 'ofetch'

// Create a pre-configured API instance
export const fetcher = ofetch.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.example.com',
  headers: {
    'Content-Type': 'application/json',
  },
  // You can add interceptors or other options here
})
