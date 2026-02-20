// Pinia store для управления состоянием авторизации
import { defineStore } from 'pinia'
import type { User } from '~/types/auth'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const token = ref<string | null>(null)
  const isLoading = ref(false)

  const setUser = (userData: User | null) => {
    user.value = userData
  }

  const setToken = (tokenValue: string | null) => {
    token.value = tokenValue
    if (tokenValue) {
      localStorage.setItem('auth_token', tokenValue)
    } else {
      localStorage.removeItem('auth_token')
    }
  }

  const clearAuth = () => {
    user.value = null
    token.value = null
    localStorage.removeItem('auth_token')
  }

  const isAuthenticated = () => !!(token.value && user.value)

  return {
    user,
    token,
    isLoading,
    setUser,
    setToken,
    clearAuth,
    isAuthenticated
  }
})
