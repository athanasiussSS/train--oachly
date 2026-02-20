// Middleware для проверки авторизации
// Перенаправляет на /auth/login если пользователь не авторизован

export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore()
  
  if (!authStore.isAuthenticated()) {
    return navigateTo('/auth/login')
  }
})
