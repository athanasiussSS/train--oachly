<template>
  <div class="register-page">
    <AuthWrapper>
      <Form initial-mode="register" />
    </AuthWrapper>
  </div>
</template>

<script setup lang="ts">
import AuthWrapper from '~/components/auth/AuthWrapper.vue';
import Form from '~/components/auth/Form.vue';
// Использование layout для страниц авторизации
definePageMeta({
  layout: 'authorization'
})

// Логика регистрации
// - Управление шагами (step 1, step 2)
// - Валидация формы на каждом шаге
// - Отправка кода подтверждения на шаге 1
// - Проверка кода на шаге 2
// - Создание аккаунта
// - Сохранение токена и данных в store
// - Редирект в ЛК
</script>

<style scoped lang="scss">
.register-page {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: rem(20);
}
</style>
