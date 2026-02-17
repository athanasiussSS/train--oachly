<template>
  <AuthWrapper>
    <!-- Контент формы входа будет здесь -->
  </AuthWrapper>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'authorization'
})

// Логика авторизации
// - Валидация формы
// - Отправка запроса на бекенд
// - Обработка ответа (токен + данные пользователя)
// - Сохранение в store
// - Редирект в ЛК
</script>

<style scoped lang="scss">
// Стили страницы авторизации
</style>
