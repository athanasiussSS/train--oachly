// Pinia store для управления состоянием авторизации
import { defineStore } from 'pinia'
import type { User } from '~/types/auth'

export const useAuthStore = defineStore('auth', () => {
  // ========== СОСТОЯНИЕ ==========
  // user - текущий пользователь (null если не авторизован)
  // token - токен доступа (access token)
  // isLoading - статус загрузки (для показа спиннера)
  
  // ========== ACTIONS ==========
  // setUser(user) - установить данные пользователя
  // setToken(token) - установить токен
  // clearAuth() - очистить токен и данные (для logout)
  // isAuthenticated() - проверка авторизации (есть ли токен и user)
  
  return {
    // State и actions
  }
})
