import { useLogin, useRegister, useLogout } from '@/services/auth'
import {
  deleteTokenAndNavigateLogin,
  saveTokenAndNavigateHome,
} from '@/utils/actions/token'

export const useAuth = () => {
  const { mutateAsync: login, isPending: isLogging } = useLogin()
  const { mutateAsync: register, isPending: isRegistering } = useRegister()
  const { mutateAsync: logout, isPending: isLoggingOut } = useLogout()

  const onLogin = async () => {
    const cookie = await login({})
    if (cookie) {
      return saveTokenAndNavigateHome(cookie)
    }
  }
  const onLogout = async () => {
    await logout()
    await deleteTokenAndNavigateLogin()
  }

  const onRegister = () => {
    return register({})
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
