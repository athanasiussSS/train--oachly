<template>
    <button
        class="btn"
        :class="[
            `btn--${variant}`,
            `btn--${size}`,
            `btn--${pin}`,
            { 
                'btn--loading': loading,
                'btn--disabled': disabled,
                'btn--block': block,
                'btn--icon-only': icon && iconPosition === 'only'
            }
        ]"
        :disabled="disabled || loading"
        @click="emit('click', $event)"
    >
        <!-- Иконка слева -->
        <span v-if="icon && iconPosition === 'left'" class="btn__icon">
            {{ icon }}
        </span>
        
        <!-- Текст (если не только иконка) -->
        <span v-if="iconPosition !== 'only'">
            <slot />
        </span>
        
        <!-- Иконка справа -->
        <span v-if="icon && iconPosition === 'right'" class="btn__icon">
            {{ icon }}
        </span>
        
        <!-- Лоадер -->
        <span v-if="loading" class="btn__loader"></span>
    </button>
</template>

<script setup lang="ts">
interface Props {
    // Тип кнопки
    variant?:     
    | 'primary'    // Основная
    | 'secondary'  // Второстепенная

    // Размер
    size?: 'xs' | 'sm' | 'md'

    // Форма углов
    pin?: 'round' | 'brick' | 'circle' | 'square'
    
    // Состояния
    loading?: boolean
    disabled?: boolean
    
    // Ширина
    block?: boolean
    
    // Иконка
    icon?: string
    iconPosition?: 'left' | 'right' | 'only'
}

const props = withDefaults(defineProps<Props>(), {
    variant: 'primary',
    size: 'md',
    pin: 'round',
    loading: false,
    disabled: false,
    block: false,
    iconPosition: 'left'
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()
</script>

<style scoped lang="scss">
@use "./ButtonUi.scss";
</style>