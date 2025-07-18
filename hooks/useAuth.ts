import { useLogin, useRegister, useLogout } from '@/services/auth'
import { deleteToken, saveToken } from '@/utils/actions/cookie'

export const useAuth = () => {
  const { mutateAsync: login, isPending: isLogging } = useLogin()
  const { mutateAsync: register, isPending: isRegistering } = useRegister()
  const { mutateAsync: logout, isPending: isLoggingOut } = useLogout()

  const onLogin = async () => {
    const cookie = await login({})
    if (cookie) {
      return saveToken(cookie)
    }
  }
  const onLogout = async () => {
    await logout()
    await deleteToken()
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
