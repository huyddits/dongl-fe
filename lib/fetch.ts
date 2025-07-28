import { getCookie } from '@/lib/utils'
import { deleteTokenAndNavigateLogin } from '@/utils/actions/token'
import { TOKEN_KEY } from '@/utils/constants/api'
import { ofetch } from 'ofetch'

export const fetcher = ofetch.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  async onRequest({ options }) {
    const token = await getCookie(TOKEN_KEY)
    if (token) {
      options.headers.set('Authorization', `Bearer ${token}`)
    }
  },
  async onResponseError({ response }) {
    // if (response.status === 401) {
    //   await deleteTokenAndNavigateLogin()
    // }
    throw new Error(
      `Request failed with status ${response.status}: ${response.statusText}`
    )
  },
})
