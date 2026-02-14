export default defineNuxtRouteMiddleware((to, from) => {
  // Проверка авторизации
  const token = useCookie('auth-token')
  
  if (!token.value) {
    return navigateTo('/login')
  }
})

