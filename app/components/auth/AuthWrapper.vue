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
    max-width: rem(400); // 600px
    min-height: rem(400);
    background-color: var(--color-bg-tertiary);
    border-radius: var(--radius-xl);
    box-shadow: var(--shadow-lg);
}
</style>