import { toast } from '@/components/ui/sonner'
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
  const { mutateAsync: logout, isPending: isLoggingOut } = useLogout()
  const router = useRouter()
  const onLogin = async (values: ILoginFormValues) => {
    const cookie = await login(values)
    if (cookie) {
      return saveTokenAndNavigateHome(cookie)
    }
  }
  const onLogout = async () => {
    await logout()
    await deleteTokenAndNavigateLogin()
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
