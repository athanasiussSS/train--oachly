<template>
  <div>
    <h1>Welcome to Nuxt 4</h1>
    <p>This is the home page.</p>
    <p>Composable state: {{ state }}</p>
  </div>
</template>

<script setup lang="ts">
const state = useSample()
</script>

