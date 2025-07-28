import { ApiResponse } from '@/utils/types/common'

export interface ILoginFormValues {
  phone_number: string
  password: string
}

export interface ISignupFormValues {
  name: string
  email: string
  phone_number: string
  password: string
}

export type ILoginResponse = ApiResponse<{
  access_token: string
  refresh_token: string
  user: {
    id: string
    email: string
    phone_number: string
    role: any
  }
}>
//
// {
//   "success": true,
//   "message": "Success",
//   "data": {
//   "id": "78f7648c-ae4a-4a99-b92f-e00ecd0f21ce",
//     "email": "huytn2@iceteasoftware.com",
//     "phone_number": "11111111111",
//     "role": "user",
//     "is_active": true,
//     "is_verified": false,
//     "email_verified_at": null,
//     "phone_verified_at": null,
//     "last_login_at": null,
//     "created_at": "2025-07-21T19:24:17.535Z",
//     "updated_at": "2025-07-21T19:24:17.535Z",
//     "profile": {
//     "user_profile_id": "7fc39f18-7eb7-405c-9b03-21d8bc1380b5",
//       "user_id": "78f7648c-ae4a-4a99-b92f-e00ecd0f21ce",
//       "nickname": null,
//       "display_name": null,
//       "name": "Huy Tran",
//       "avatar_url": null,
//       "bio": null,
//       "birth_date": null,
//       "gender": null,
//       "timezone": "Asia/Seoul",
//       "language": "ko",
//       "points": 0,
//       "preferences": {},
//     "created_at": "2025-07-21T19:24:17.541Z",
//       "updated_at": "2025-07-21T19:24:17.541Z"
//   }
// },
//   "timestamp": "2025-07-22T03:24:02.366Z",
//   "path": "/api/v1/auth/profile"
// }

export type IUserProfile = ApiResponse<{
  id: string
  email: string
  phone_number: string
  role: string
  is_active: boolean
  is_verified: boolean
  email_verified_at: string | null
  phone_verified_at: string | null
  last_login_at: string | null
  created_at: string
  updated_at: string
  user_profile_id: string
  user_id: string
  nickname: string | null
  display_name: string | null
  name: string
  avatar_url: string | null
  bio: string | null
  birth_date: string
}>
