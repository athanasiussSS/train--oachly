<template>
  <AuthWrapper>
    <Form title="Войти"></Form>
  </AuthWrapper>
</template>

<script setup lang="ts">
import AuthWrapper from '~/components/auth/AuthWrapper.vue';
import Form from '~/components/auth/Form.vue';

definePageMeta({
  layout: 'authorization'
})
</script>

