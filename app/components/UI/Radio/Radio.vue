<!--
  Radio Component
  
  Пример использования:
  
  Базовый:
  <Radio v-model="selected" value="option1" label="Опция 1" name="group1" />
  <Radio v-model="selected" value="option2" label="Опция 2" name="group1" />
  
  С размером:
  <Radio v-model="selected" value="option1" label="Опция 1" name="group1" size="l" />
  
  Disabled:
  <Radio v-model="selected" value="option1" label="Отключенная опция" name="group1" :disabled="true" />
  
  В форме:
  <form>
    <Radio v-model="form.type" value="type1" label="Тип 1" name="type" required />
    <Radio v-model="form.type" value="type2" label="Тип 2" name="type" required />
  </form>
  
  Группа:
  <div>
    <Radio v-model="selected" value="1" label="Опция 1" name="group" />
    <Radio v-model="selected" value="2" label="Опция 2" name="group" />
    <Radio v-model="selected" value="3" label="Опция 3" name="group" />
  </div>
-->

<template>
  <label
    class="radio"
    :class="radioClasses"
    :for="inputId"
  >
    <!-- Нативный input (скрыт визуально, но в DOM для доступности) -->
    <input
      ref="inputRef"
      :id="inputId"
      type="radio"
      :name="name"
      :value="value"
      :checked="isChecked"
      :disabled="disabled"
      :required="required"
      :aria-checked="isChecked"
      :aria-disabled="disabled"
      :aria-labelledby="labelId"
      class="radio__input"
      @change="handleChange"
      @focus="handleFocus"
      @blur="handleBlur"
      v-bind="$attrs"
    />

    <!-- Визуальный контейнер (круг) -->
    <span class="radio__container">
      <!-- Точка внутри (когда выбрано) -->
      <span v-if="isChecked" class="radio__dot" />
    </span>

    <!-- Текстовый лейбл -->
    <span
      v-if="slots.label || label"
      :id="labelId"
      class="radio__label"
      @click="handleLabelClick"
    >
      <slot name="label">{{ label }}</slot>
    </span>
  </label>
</template>

<script setup lang="ts">
import { computed, ref, useId, useSlots } from 'vue'

interface RadioProps {
  // v-model
  modelValue?: string | number | null

  // Значение radio (обязательно для группировки)
  value: string | number

  // Размеры
  size?: 'm' | 'l'

  // Состояния
  disabled?: boolean

  // HTML атрибуты
  label?: string
  name?: string
  required?: boolean

  // Accessibility
  inputId?: string
}

interface RadioEmits {
  (e: 'update:modelValue', value: string | number): void
  (e: 'change', value: string | number, event: Event): void
  (e: 'focus', event: FocusEvent): void
  (e: 'blur', event: FocusEvent): void
}

const props = withDefaults(defineProps<RadioProps>(), {
  modelValue: null,
  size: 'm',
  disabled: false,
  required: false
})

const emit = defineEmits<RadioEmits>()

const inputRef = ref<HTMLInputElement | null>(null)
const isFocused = ref(false)
const generatedId = useId()
const slots = useSlots()

const inputId = computed(() => props.inputId || `radio-${generatedId}`)
const labelId = computed(() => `radio-label-${generatedId}`)

// Вычисляемое состояние checked
const isChecked = computed(() => {
  return props.modelValue === props.value
})

// Классы компонента
const radioClasses = computed(() => {
  return [
    `radio--${props.size}`,
    {
      'radio--checked': isChecked.value,
      'radio--disabled': props.disabled,
      'radio--focused': isFocused.value
    }
  ]
})

// Обработчик изменения
const handleChange = (event: Event) => {
  if (props.disabled) {
    return
  }

  const target = event.target as HTMLInputElement
  if (target.checked) {
    emit('update:modelValue', props.value)
    emit('change', props.value, event)
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

// Публичные методы
defineExpose({
  focus: () => inputRef.value?.focus(),
  blur: () => inputRef.value?.blur(),
  input: inputRef
})
</script>

<style scoped lang="scss">
@use "./Radio.scss";
</style>