// Composable для работы с авторизацией и регистрацией
import type { LoginCredentials, LoginResponse, RegisterStep1Data, RegisterData, RegisterResponse } from '~/types/auth'
import { useAuthStore } from '~/stores/auth'

export const useAuth = () => {
  const authStore = useAuthStore()

  const login = async (credentials: LoginCredentials): Promise<LoginResponse> => {
    try {
      authStore.isLoading = true
      const response = await $fetch<LoginResponse>('/auth/login', {
        method: 'POST',
        body: credentials
      })
      
      authStore.setToken(response.token)
      authStore.setUser({
        ...response.user,
        role: 'student',
        emailVerified: true
      })
      
      return response
    } finally {
      authStore.isLoading = false
    }
  }

  const registerStep1 = async (data: RegisterStep1Data): Promise<void> => {
    try {
      authStore.isLoading = true
      await $fetch('/auth/register', {
        method: 'POST',
        body: {
          emailOrPhone: data.emailOrPhone,
          password: data.password,
          name: data.name
        }
      })
      
      sessionStorage.setItem('register_emailOrPhone', data.emailOrPhone)
      sessionStorage.setItem('register_password', data.password)
      sessionStorage.setItem('register_name', data.name)
    } finally {
      authStore.isLoading = false
    }
  }

  const sendVerificationCode = async (emailOrPhone: string): Promise<void> => {
    await $fetch('/auth/send-verification-code', {
      method: 'POST',
      body: { emailOrPhone }
    })
  }

  const register = async (data: RegisterData): Promise<RegisterResponse> => {
    try {
      authStore.isLoading = true
      const response = await $fetch<RegisterResponse>('/auth/register', {
        method: 'POST',
        body: {
          emailOrPhone: data.emailOrPhone,
          password: data.password,
          verificationCode: data.verificationCode
        }
      })
      
      authStore.setToken(response.token)
      authStore.setUser({
        ...response.user,
        hasTeacherProfile: false
      })
      
      sessionStorage.removeItem('register_emailOrPhone')
      sessionStorage.removeItem('register_password')
      sessionStorage.removeItem('register_name')
      
      return response
    } finally {
      authStore.isLoading = false
    }
  }

  const refresh = async (): Promise<{ token: string }> => {
    try {
      const response = await $fetch<{ token: string }>('/auth/refresh', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authStore.token}`
        }
      })
      
      authStore.setToken(response.token)
      
      return response
    } catch (error) {
      authStore.clearAuth()
      throw error
    }
  }

  const logout = () => {
    authStore.clearAuth()
    navigateTo('/auth/login')
  }

  const isAuthenticated = () => authStore.isAuthenticated()
  const getCurrentUser = () => authStore.user

  return {
    login,
    registerStep1,
    sendVerificationCode,
    register,
    refresh,
    logout,
    isAuthenticated,
    getCurrentUser
  }
}
