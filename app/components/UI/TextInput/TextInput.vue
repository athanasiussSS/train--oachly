<template>
  <div class="text-input" :class="inputClasses">
    <!-- Иконка слева -->
    <div v-if="slots['left-icon']" class="text-input__left-icon">
      <slot name="left-icon" />
    </div>

    <!-- Основной input -->
    <input
      ref="inputRef"
      :id="inputId"
      :value="modelValue"
      :type="type"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :maxlength="maxlength"
      :minlength="minlength"
      :pattern="pattern"
      :required="required"
      :autocomplete="autocomplete"
      :autofocus="autofocus"
      :name="name"
      :aria-label="ariaLabel"
      :aria-describedby="ariaDescribedBy"
      :aria-invalid="hasError"
      :aria-required="required"
      class="text-input__input"
      @input="handleInput"
      @change="handleChange"
      @focus="handleFocus"
      @blur="handleBlur"
      @keydown="handleKeydown"
      @keyup="handleKeyup"
      v-bind="$attrs"
    />

    <!-- Контент справа (кнопки, иконки) -->
    <div v-if="slots['right-content']" class="text-input__right-content">
      <slot name="right-content" />
    </div>

    <!-- Кнопка очистки -->
    <button
      v-if="showClearButton"
      type="button"
      class="text-input__clear"
      :aria-label="clearButtonAriaLabel"
      @click="handleClear"
    >
      <slot name="clear-button">
        <span class="text-input__clear-icon">×</span>
      </slot>
    </button>

    <!-- Дополнительный контент справа (счетчик, единицы) -->
    <div v-if="slots.additional" class="text-input__additional">
      <slot name="additional" />
    </div>
  </div>

  <!-- Сообщение об ошибке (inline) -->
  <div v-if="error && errorMode === 'inline'" class="text-input__error-message">
    {{ errorMessage }}
  </div>
</template>

<script setup lang="ts">
import { computed, ref, useId, useSlots } from 'vue'

interface Props {
  // v-model
  modelValue?: string | number

  // Варианты
  variant?: 'normal' | 'clear'

  // Размеры
  size?: 's' | 'm' | 'l' | 'xl'

  // Состояния
  state?: 'suggest' | 'default' | 'hover' | 'active' | 'disabled' | 'inline-error' | 'outline-error'

  // Валидация
  error?: boolean
  errorMessage?: string
  errorMode?: 'inline' | 'outline'

  // Кнопка очистки
  showClear?: boolean

  // HTML атрибуты
  type?: string
  placeholder?: string
  disabled?: boolean
  readonly?: boolean
  maxlength?: number
  minlength?: number
  pattern?: string
  required?: boolean
  autocomplete?: string
  autofocus?: boolean
  name?: string

  // Accessibility
  ariaLabel?: string
  ariaDescribedBy?: string
  inputId?: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  variant: 'normal',
  size: 'm',
  state: 'default',
  error: false,
  errorMessage: '',
  errorMode: 'inline',
  showClear: true,
  type: 'text',
  placeholder: '',
  disabled: false,
  readonly: false,
  required: false,
  autofocus: false
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
  input: [event: Event]
  change: [event: Event]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
  clear: []
  keydown: [event: KeyboardEvent]
  keyup: [event: KeyboardEvent]
}>()

const inputRef = ref<HTMLInputElement | null>(null)
const isFocused = ref(false)
const generatedId = useId()
const slots = useSlots()
const inputId = computed(() => props.inputId || `text-input-${generatedId}`)

// Вычисляемое значение для отображения кнопки очистки
const showClearButton = computed(() => {
  return props.showClear && 
         !props.disabled && 
         !props.readonly && 
         (props.modelValue !== '' && props.modelValue !== null && props.modelValue !== undefined)
})

// Вычисляемое состояние ошибки
const hasError = computed(() => {
  return props.error || props.state === 'inline-error' || props.state === 'outline-error'
})

// Классы компонента
const inputClasses = computed(() => {
  return [
    `text-input--${props.variant}`,
    `text-input--${props.size}`,
    {
      'text-input--focused': isFocused.value,
      'text-input--disabled': props.disabled,
      'text-input--readonly': props.readonly,
      'text-input--error-inline': hasError.value && props.errorMode === 'inline',
      'text-input--error-outline': hasError.value && props.errorMode === 'outline',
      'text-input--has-left-icon': !!slots['left-icon'],
      'text-input--has-right-content': !!slots['right-content'],
      'text-input--has-clear': showClearButton.value,
      'text-input--has-additional': !!slots.additional
    }
  ]
})

// ARIA label для кнопки очистки
const clearButtonAriaLabel = computed(() => {
  return props.ariaLabel ? `Очистить ${props.ariaLabel}` : 'Очистить поле'
})

// Обработчики событий
const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
  emit('input', event)
}

const handleChange = (event: Event) => {
  emit('change', event)
}

const handleFocus = (event: FocusEvent) => {
  isFocused.value = true
  emit('focus', event)
}

const handleBlur = (event: FocusEvent) => {
  isFocused.value = false
  emit('blur', event)
}

const handleClear = () => {
  emit('update:modelValue', '')
  emit('clear')
  // Фокус на input после очистки
  inputRef.value?.focus()
}

const handleKeydown = (event: KeyboardEvent) => {
  emit('keydown', event)
}

const handleKeyup = (event: KeyboardEvent) => {
  emit('keyup', event)
}

// Публичные методы
defineExpose({
  focus: () => inputRef.value?.focus(),
  blur: () => inputRef.value?.blur(),
  select: () => inputRef.value?.select()
})
</script>

<style scoped lang="scss">
@use "./TextInput.scss";
</style>
