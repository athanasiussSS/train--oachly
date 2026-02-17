<template>
  <div class="login-page">
    <AuthWrapper>
      <Form initial-mode="login" />
    </AuthWrapper>
  </div>
</template>

<script setup lang="ts">
import AuthWrapper from '~/components/auth/AuthWrapper.vue';
import Form from '~/components/auth/Form.vue';

definePageMeta({
  layout: 'authorization'
})
</script>

<style scoped lang="scss">
.login-page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: rem(20);
}
</style>