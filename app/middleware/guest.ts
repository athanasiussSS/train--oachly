// Middleware для гостевых страниц (login, register)
// Перенаправляет авторизованных пользователей в ЛК

export default defineNuxtRouteMiddleware((to, from) => {
  // Проверка авторизации через useAuthStore
  // Если авторизован - редирект в Личный Кабинет
  // Если не авторизован - пропускает дальше
})
