export default defineNuxtRouteMiddleware((to, from) => {
  // Middleware для страниц, доступных только для неавторизованных пользователей
  const token = useCookie('auth-token')
  
  if (token.value) {
    return navigateTo('/')
  }
})

