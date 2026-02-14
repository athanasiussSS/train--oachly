export default defineNuxtRouteMiddleware((to, from) => {
  // Пример валидации параметров маршрута
  // if (to.params.id && isNaN(Number(to.params.id))) {
  //   throw createError({
  //     statusCode: 400,
  //     message: 'Invalid ID parameter'
  //   })
  // }
  
  // Пример проверки query параметров
  // if (to.query.required && !to.query.required) {
  //   return navigateTo({ path: to.path, query: { ...to.query, required: 'default' } })
  // }
})

