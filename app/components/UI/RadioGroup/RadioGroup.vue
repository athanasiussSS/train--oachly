<!--
  RadioGroup Component
  
  Пример использования:
  
  Базовый:
  <RadioGroup v-model="selected" :options="options" />
  
  С размером:
  <RadioGroup v-model="selected" :options="options" size="l" />
  
  Горизонтальное расположение:
  <RadioGroup v-model="selected" :options="options" direction="horizontal" />
  
  Без выбранного по умолчанию:
  <RadioGroup v-model="selected" :options="options" :default-selected="false" />
  
  С кастомным рендером:
  <RadioGroup v-model="selected" :options="options">
    <template #option="{ option, checked }">
      <Radio :value="option.value" :checked="checked">
        <template #label>{{ option.label }}</template>
      </Radio>
    </template>
  </RadioGroup>
  
  Опции:
  const options = [
    { value: '1', label: 'Опция 1' },
    { value: '2', label: 'Опция 2', disabled: true },
    { value: '3', label: 'Опция 3' }
  ]
-->

<template>
  <div class="radio-group" :class="radioGroupClasses">
    <Radio
      v-for="(option, index) in options"
      :key="getOptionKey(option, index)"
      :model-value="modelValue"
      :value="option.value"
      :label="option.label"
      :name="name"
      :size="size"
      :disabled="option.disabled || disabled"
      :required="required"
      :input-id="`${name}-${index}`"
      @update:model-value="handleChange"
      @change="handleRadioChange"
      @focus="handleFocus"
      @blur="handleBlur"
    >
      <template v-if="slots.option" #label>
        <slot name="option" :option="option" :checked="isOptionChecked(option)" :index="index" />
      </template>
    </Radio>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, useId, useSlots, watch, onMounted } from 'vue'
import Radio from '../Radio/Radio.vue'

export interface RadioGroupOption {
  value: string | number
  label: string
  disabled?: boolean
  [key: string]: any
}

interface RadioGroupProps {
  // v-model
  modelValue?: string | number | null

  // Опции
  options: RadioGroupOption[]

  // Размеры
  size?: 'm' | 'l'

  // Расположение
  direction?: 'horizontal' | 'vertical'

  // Имя группы
  name?: string

  // Отключить всю группу
  disabled?: boolean

  // Обязательное поле
  required?: boolean

  // Выбрать первый по умолчанию
  defaultSelected?: boolean
}

interface RadioGroupEmits {
  (e: 'update:modelValue', value: string | number | null): void
  (e: 'change', value: string | number | null): void
  (e: 'focus', event: FocusEvent): void
  (e: 'blur', event: FocusEvent): void
}

const props = withDefaults(defineProps<RadioGroupProps>(), {
  modelValue: null,
  options: () => [],
  size: 'm',
  direction: 'vertical',
  name: undefined,
  disabled: false,
  required: false,
  defaultSelected: true
})

const emit = defineEmits<RadioGroupEmits>()

const generatedId = useId()
const slots = useSlots()

const name = computed(() => props.name || `radio-group-${generatedId}`)

// Классы компонента
const radioGroupClasses = computed(() => {
  return [
    `radio-group--${props.direction}`,
    `radio-group--${props.size}`,
    {
      'radio-group--disabled': props.disabled
    }
  ]
})

// Проверка выбора опции
const isOptionChecked = (option: RadioGroupOption): boolean => {
  return props.modelValue === option.value
}

// Получить ключ опции
const getOptionKey = (option: RadioGroupOption, index: number): string | number => {
  return option.value ?? index
}

// Обработчик изменения
const handleChange = (value: string | number) => {
  emit('update:modelValue', value)
}

// Обработчик события change от Radio
const handleRadioChange = (value: string | number, event: Event) => {
  emit('change', value)
}

// Обработчик фокуса
const handleFocus = (event: FocusEvent) => {
  emit('focus', event)
}

// Обработчик blur
const handleBlur = (event: FocusEvent) => {
  emit('blur', event)
}

// Инициализация: выбор первого элемента по умолчанию
watch(
  () => props.options,
  (newOptions) => {
    if (
      props.defaultSelected &&
      props.modelValue === null &&
      newOptions.length > 0 &&
      !props.disabled
    ) {
      const firstEnabledOption = newOptions.find(opt => !opt.disabled)
      if (firstEnabledOption) {
        emit('update:modelValue', firstEnabledOption.value)
      }
    }
  },
  { immediate: true }
)

onMounted(() => {
  if (
    props.defaultSelected &&
    props.modelValue === null &&
    props.options.length > 0 &&
    !props.disabled
  ) {
    const firstEnabledOption = props.options.find(opt => !opt.disabled)
    if (firstEnabledOption) {
      emit('update:modelValue', firstEnabledOption.value)
    }
  }
})
</script>

<style scoped lang="scss">
@use "./RadioGroup.scss";
</style>