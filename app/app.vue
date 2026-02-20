<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
const { setTheme } = useTheme()
setTheme('dark')

const route = useRoute()

onMounted(() => {
  const publicPages = ['/auth/login', '/auth/register']
  
  if (!publicPages.includes(route.path) && !localStorage.getItem('auth_token')) {
    navigateTo('/auth/login')
  }
})
</script>