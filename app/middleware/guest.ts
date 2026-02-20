// Middleware для гостевых страниц (login, register)
// Перенаправляет авторизованных пользователей в ЛК

export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore()
  
  if (authStore.isAuthenticated()) {
    return navigateTo('/dashboard')
  }
})
