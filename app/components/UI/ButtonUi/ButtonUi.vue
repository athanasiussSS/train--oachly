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
                'btn--selected': selected,
                'btn--width-auto': width === 'auto',
                'btn--width-max': width === 'max',
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
    // Акцентные
    | 'action'           // Action (высший приоритет)
    | 'outlined-action'  // Outlined Action (средний приоритет)
    | 'flat-action'      // Flat Action (низкий приоритет)
    // Основные
    | 'primary'          // Normal (обычные действия)
    | 'outlined'         // Outlined (средний приоритет)
    | 'flat'             // Flat (низкий приоритет)
    | 'flat-secondary'   // Flat Secondary (второстепенные операции)
    // Семантические
    | 'info'             // Info (информация, подсказки)
    | 'success'          // Success (успешные действия)
    | 'warning'          // Warning (предупреждения)
    | 'danger'           // Danger (разрушительные действия)
    // Приподнятые
    | 'raised'           // Raised (выделение важных действий)
    // Контрастные
    | 'contrast'         // Contrast (на сложном фоне)

    // Размер
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'

    // Форма углов
    pin?: 'round' | 'brick' | 'clear' | 'circle'
    
    // Состояния
    loading?: boolean
    disabled?: boolean
    selected?: boolean
    
    // Ширина
    width?: 'auto' | 'max'  // auto - ограничивает размеры, max - на всю ширину
    
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
    selected: false,
    width: undefined,
    iconPosition: 'left'
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()
</script>

<style scoped lang="scss">
@import "./ButtonUi.scss";
</style>