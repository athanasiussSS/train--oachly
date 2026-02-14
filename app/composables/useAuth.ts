export const useAuth = () => {
  // Пример composable для работы с авторизацией
  const token = useCookie('auth-token', {
    default: () => null,
    secure: true,
    sameSite: 'strict'
  })

  const isAuthenticated = computed(() => !!token.value)

  const login = (userToken: string) => {
    token.value = userToken
  }

  const logout = () => {
    token.value = null
  }

  return {
    isAuthenticated,
    login,
    logout
  }
}

