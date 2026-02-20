<template>
  <div class="text-input-wrapper">
    <!-- Label над полем -->
    <label 
      v-if="label || slots.label" 
      :for="inputId" 
      class="text-input__label"
    >
      <span class="text-input__label-text">
        <slot name="label">{{ label }}</slot>
      </span>
      <Tooltip 
        v-if="tooltip" 
        :content="tooltip"
        position="top"
        class="text-input__tooltip"
      />
    </label>
    
    <div 
      class="text-input" 
      :class="inputClasses"
      :data-error="errorMode === 'inline' && hasError ? displayErrorMessage : ''"
    >
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
</div>
</template>

<script setup lang="ts">
import { computed, ref, useId, useSlots, watch } from 'vue'
import { useFieldValidation, type ValidationRule, fieldTypeRules, validationRules } from '~/composables/useFieldValidation'
import Tooltip from '../Tooltip/Tooltip.vue'

interface Props {
  // v-model
  modelValue?: string | number

  // Варианты
  variant?: 'normal' | 'clear'

  // Размеры
  size?: 's' | 'm' | 'l' | 'xl'

  // Состояния
  state?: 'suggest' | 'default' | 'hover' | 'active' | 'disabled' | 'inline-error' | 'outline-error'

  // Валидация (ручное управление)
  error?: boolean
  errorMessage?: string
  errorMode?: 'inline' | 'outline'

  // Встроенная валидация
  validate?: boolean
  validationRules?: ValidationRule[]
  validateOnBlur?: boolean
  validateOnInput?: boolean
  validateOnMount?: boolean

  // Кнопка очистки
  showClear?: boolean

  // Label
  label?: string
  tooltip?: string

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
  validate: false,
  validationRules: () => [],
  validateOnBlur: true,
  validateOnInput: false,
  validateOnMount: false,
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
  'validation-error': [error: string]
  'validation-success': []
}>()

const inputRef = ref<HTMLInputElement | null>(null)
const isFocused = ref(false)
const generatedId = useId()
const slots = useSlots()
const inputId = computed(() => props.inputId || `text-input-${generatedId}`)

// Встроенная валидация
const valueRef = ref(props.modelValue)

watch(() => props.modelValue, (newValue) => {
  valueRef.value = newValue
})

const validationRulesComputed = computed((): ValidationRule[] => {
  if (!props.validate) return []
  if (props.validationRules?.length) return props.validationRules
  const typeRules = fieldTypeRules[props.type]
  if (typeRules) return typeRules
  return props.required ? [validationRules.required()] : []
})

// Используем composable для валидации
const {
  error: validationError,
  touched,
  isValid,
  validate: validateField,
  reset: resetValidation,
  handleBlur: handleValidationBlur
} = useFieldValidation(
  valueRef,
  validationRulesComputed,
  {
    validateOnBlur: props.validateOnBlur,
    validateOnInput: props.validateOnInput,
    validateOnMount: props.validateOnMount
  }
)

watch(validationRulesComputed, () => {
  if (props.validate && touched.value) {
    validateField()
  }
}, { deep: true })

watch(validationError, (error) => {
  if (error) {
    emit('validation-error', error)
  } else if (touched.value) {
    emit('validation-success')
  }
})

const showClearButton = computed(() => 
  props.showClear && !props.disabled && !props.readonly && !!props.modelValue
)

const hasError = computed(() => 
  props.error || 
  (props.validate && !!validationError.value) ||
  props.state === 'inline-error' || 
  props.state === 'outline-error'
)

const displayErrorMessage = computed(() => 
  props.error ? props.errorMessage : validationError.value || ''
)

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

const clearButtonAriaLabel = computed(() => 
  props.ariaLabel ? `Очистить ${props.ariaLabel}` : 'Очистить поле'
)

// Обработчики событий
const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  const newValue = target.value
  valueRef.value = newValue
  emit('update:modelValue', newValue)
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
  if (props.validate) {
    handleValidationBlur()
  }
  emit('blur', event)
}

const handleClear = () => {
  emit('update:modelValue', '')
  emit('clear')
  inputRef.value?.focus()
}

const handleKeydown = (event: KeyboardEvent) => {
  emit('keydown', event)
}

const handleKeyup = (event: KeyboardEvent) => {
  emit('keyup', event)
}

defineExpose({
  focus: () => inputRef.value?.focus(),
  blur: () => inputRef.value?.blur(),
  select: () => inputRef.value?.select(),
  validate: () => props.validate ? validateField() : true,
  reset: () => props.validate && resetValidation(),
  isValid: computed(() => isValid.value)
})
</script>

<style scoped lang="scss">
@import "./TextInput.scss";
</style>
