<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
// Инициализация темы приложения
const { toggleTheme, setTheme } = useTheme()

// Для быстрого переключения темы в коде:
// toggleTheme()        // переключить
// setTheme('dark')     // установить темную
setTheme('light')    // установить светлую

// Проверка авторизации при загрузке приложения
const route = useRoute()

onMounted(() => {
  // Инициализируем тему (загружает из localStorage или использует системную)
  // useTheme автоматически применит тему при монтировании
  
  // Публичные страницы, доступные без токена
  const publicPages = ['/auth/login', '/auth/register']
  
  // Если текущая страница не публичная
  if (!publicPages.includes(route.path)) {
    // Проверяем наличие токена в localStorage
    const token = localStorage.getItem('auth_token')
    
    // Если токена нет - редирект на страницу входа
    if (!token) {
      navigateTo('/auth/login')
    }
  }
})
</script>