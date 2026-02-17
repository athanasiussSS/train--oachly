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
    width: rem(400);
    background-color: var(--color-bg-tertiary);
    border-radius: var(--radius-xl);
    box-shadow: var(--shadow-lg);
    display: flex;
    flex-direction: column;
}
</style>