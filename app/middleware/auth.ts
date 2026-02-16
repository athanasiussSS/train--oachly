// Middleware для проверки авторизации
// Перенаправляет на /auth/login если пользователь не авторизован

export default defineNuxtRouteMiddleware((to, from) => {
  // Проверка авторизации через useAuthStore
  // Если не авторизован - редирект на /auth/login
  // Если авторизован - пропускает дальше
})
