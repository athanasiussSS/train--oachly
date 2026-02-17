<template>
    <div class="wrapper">
        <slot />
    </div>
</template>

<script lang="ts" setup>
defineProps({
    
})
</script>

<style scoped lang="scss">
.wrapper {
    width: 100%;
    max-width: rem(500); // 600px
    height: 600px;
    background-color: var(--color-bg-tertiary);
    border-radius: var(--radius-xl);
}
</style>