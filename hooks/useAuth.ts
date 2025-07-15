import { useLogin, useRegister, useLogout } from '@/services/auth'

export const useAuth = () => {
  const { mutateAsync: login, isPending: isLogging } = useLogin()
  const { mutateAsync: register, isPending: isRegistering } = useRegister()
  const { mutateAsync: logout, isPending: isLoggingOut } = useLogout()

  const onLogin = () => {
    return login({})
  }
  const onLogout = () => {
    return logout()
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
