import { toast } from '@/components/ui/sonner'
import { useBoolean } from '@/hooks/useBoolean'
import { useLogin, useRegister, useLogout } from '@/services/auth'
import {
  deleteTokenAndNavigateLogin,
  saveTokenAndNavigateHome,
} from '@/utils/actions/token'
import { ROUTES } from '@/utils/constants/routes'
import { ILoginFormValues, ISignupFormValues } from '@/utils/types/auth'
import { useRouter } from 'next/navigation'

export const useAuth = () => {
  const { mutateAsync: login, isPending: isLogging } = useLogin()
  const { mutateAsync: register, isPending: isRegistering } = useRegister()
  const [isLoggingOut, { set: setIsLoggingOut }] = useBoolean()
  const router = useRouter()
  const onLogin = async (values: ILoginFormValues) => {
    void login(values, {
      onSuccess: ({ data: { access_token, refresh_token } }) => {
        if (access_token && refresh_token) {
          return saveTokenAndNavigateHome(access_token, refresh_token)
        } else toast.error('로그인에 실패했습니다')
      },
      onError: () => {
        toast.error('로그인에 실패했습니다')
      },
    })
  }
  const onLogout = async () => {
    setIsLoggingOut(true)
    await deleteTokenAndNavigateLogin()
    setIsLoggingOut(false)
  }

  const onRegister = (values: ISignupFormValues) => {
    void register(values, {
      onSuccess: () => {
        toast.success('회원가입이 완료되었습니다.')
        router.push(ROUTES.LOGIN)
      },
      onError: () => {
        toast.error('회원가입에 실패했습니다')
      },
    })
  }

  return {
    onLogin,
    onLogout,
    onRegister,
    isLogging,
    isLoggingOut,
    isRegistering,
  }
}
