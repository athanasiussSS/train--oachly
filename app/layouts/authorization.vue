<template>
  <div class="layout">
    <Header />
    <div class="layout__wave">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
import Header from '~/components/Header/Header.vue';


</script>

<style scoped lang="scss">
.layout {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: var(--color-bg-primary);
  
  &__wave {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>