<template>
  <div class="layout">
    <div class="layout__wave" />
    <slot />
  </div>
</template>

<script lang="ts" setup>

</script>

<style scoped lang="scss">
.layout {
  width: 100%;
  min-height: 100vh;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  
  background-color: var(--color-bg-primary);
}
</style>