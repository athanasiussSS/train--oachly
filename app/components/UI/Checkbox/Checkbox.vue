<!--
  Checkbox Component
  
  Пример использования:
  
  Базовый:
  <Checkbox v-model="checked" label="Подписаться на рассылку" />
  
  С размером:
  <Checkbox v-model="checked" label="Принять условия" size="l" />
  
  Indeterminate:
  <Checkbox 
    v-model="checked" 
    :indeterminate="isIndeterminate"
    label="Выбрать все"
    @change="handleChange"
  />
  
  Disabled:
  <Checkbox v-model="checked" label="Отключенный чекбокс" :disabled="true" />
  
  Без лейбла:
  <Checkbox v-model="checked" />
  
  В форме:
  <form>
    <Checkbox v-model="agree" label="Я согласен с условиями" required />
  </form>
-->

<template>
  <label
    class="checkbox"
    :class="checkboxClasses"
    :for="inputId"
  >
    <!-- Нативный input (скрыт, но в DOM для доступности) -->
    <input
      ref="inputRef"
      :id="inputId"
      type="checkbox"
      :checked="isChecked"
      :indeterminate="indeterminate"
      :disabled="disabled"
      :required="required"
      :name="name"
      :value="value"
      :aria-checked="ariaChecked"
      :aria-disabled="disabled"
      :aria-labelledby="labelId"
      class="checkbox__input"
      @change="handleChange"
      @focus="handleFocus"
      @blur="handleBlur"
      @keydown="handleKeydown"
      v-bind="$attrs"
    />

    <!-- Визуальный контейнер -->
    <span class="checkbox__container">
      <!-- Галочка или индикатор indeterminate -->
      <span v-if="showCheckmark" class="checkbox__icon">
        <slot name="icon">
          <svg
            v-if="!indeterminate"
            width="100%"
            height="100%"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.5 4L6 11.5L2.5 8"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <svg
            v-else
            width="100%"
            height="100%"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 8H13"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
            />
          </svg>
        </slot>
      </span>
    </span>

    <!-- Текстовый лейбл -->
    <span
      v-if="slots.label || label"
      :id="labelId"
      class="checkbox__label"
      @click="handleLabelClick"
    >
      <slot name="label">{{ label }}</slot>
    </span>
  </label>
</template>

<script setup lang="ts">
import { computed, ref, useId, useSlots, watch, onMounted } from 'vue'

interface CheckboxProps {
  // v-model
  modelValue?: boolean

  // Размеры
  size?: 'm' | 'l'

  // Состояния
  indeterminate?: boolean
  disabled?: boolean

  // HTML атрибуты
  label?: string
  name?: string
  value?: string | number
  required?: boolean

  // Accessibility
  inputId?: string
}

interface CheckboxEmits {
  (e: 'update:modelValue', value: boolean): void
  (e: 'change', value: boolean, event: Event): void
  (e: 'focus', event: FocusEvent): void
  (e: 'blur', event: FocusEvent): void
}

const props = withDefaults(defineProps<CheckboxProps>(), {
  modelValue: false,
  size: 'm',
  indeterminate: false,
  disabled: false,
  required: false
})

const emit = defineEmits<CheckboxEmits>()

const inputRef = ref<HTMLInputElement | null>(null)
const isFocused = ref(false)
const generatedId = useId()
const slots = useSlots()

const inputId = computed(() => props.inputId || `checkbox-${generatedId}`)
const labelId = computed(() => `checkbox-label-${generatedId}`)

// Вычисляемое состояние checked
const isChecked = computed(() => {
  return props.modelValue === true
})

// Показывать галочку
const showCheckmark = computed(() => {
  // Indeterminate имеет приоритет
  if (props.indeterminate) {
    return true
  }
  return isChecked.value
})

// ARIA checked (true/false/mixed)
const ariaChecked = computed(() => {
  if (props.indeterminate) {
    return 'mixed'
  }
  return isChecked.value ? 'true' : 'false'
})

// Классы компонента
const checkboxClasses = computed(() => {
  return [
    `checkbox--${props.size}`,
    {
      'checkbox--checked': isChecked.value && !props.indeterminate,
      'checkbox--indeterminate': props.indeterminate,
      'checkbox--disabled': props.disabled,
      'checkbox--focused': isFocused.value,
      'checkbox--no-label': !slots.label && !props.label
    }
  ]
})

// Обработчик изменения
const handleChange = (event: Event) => {
  if (props.disabled) {
    return
  }

  const target = event.target as HTMLInputElement
  const newValue = target.checked

  // Если был indeterminate, при клике переходим в checked
  if (props.indeterminate) {
    emit('update:modelValue', true)
    emit('change', true, event)
  } else {
    emit('update:modelValue', newValue)
    emit('change', newValue, event)
  }
}

// Обработчик фокуса
const handleFocus = (event: FocusEvent) => {
  isFocused.value = true
  emit('focus', event)
}

// Обработчик blur
const handleBlur = (event: FocusEvent) => {
  isFocused.value = false
  emit('blur', event)
}

// Обработчик клика по лейблу
const handleLabelClick = (event: MouseEvent) => {
  if (props.disabled) {
    return
  }
  // Фокус на input для правильной работы навигации с клавиатуры
  inputRef.value?.focus()
}

// Обработчик клавиатуры
const handleKeydown = (event: KeyboardEvent) => {
  if (props.disabled) {
    return
  }

  // Space и Enter переключают состояние
  if (event.key === ' ' || event.key === 'Enter') {
    event.preventDefault()
    if (inputRef.value) {
      inputRef.value.checked = !inputRef.value.checked
      handleChange(event as any)
    }
  }
}

// Синхронизация indeterminate с нативным input
watch(
  () => props.indeterminate,
  (newValue) => {
    if (inputRef.value) {
      inputRef.value.indeterminate = newValue
    }
  },
  { immediate: true }
)

// Предупреждение в консоли, если используется без лейбла в формах
onMounted(() => {
  if (!props.label && !slots.label) {
    const form = inputRef.value?.closest('form')
    if (form) {
      console.warn(
        '[Checkbox] Компонент используется без лейбла в форме. ' +
        'Рекомендуется добавить лейбл для улучшения доступности.'
      )
    }
  }
})

// Публичные методы
defineExpose({
  focus: () => inputRef.value?.focus(),
  blur: () => inputRef.value?.blur(),
  input: inputRef
})
</script>

<style scoped lang="scss">
@import "./Checkbox.scss";
</style>