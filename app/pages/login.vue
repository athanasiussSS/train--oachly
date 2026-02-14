<template>
  <div>
    <h1>Login</h1>
    <p>Эта страница доступна только для неавторизованных пользователей</p>
    <button @click="handleLogin">Войти</button>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'guest'
})

const { login } = useAuth()

const handleLogin = () => {
  // Пример: после успешной авторизации
  login('example-token-123')
  navigateTo('/dashboard')
}
</script>

