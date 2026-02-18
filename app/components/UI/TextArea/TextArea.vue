<!--
  TextArea Component
  
  Пример использования:
  
  <TextArea
    v-model="text"
    variant="normal"
    size="m"
    placeholder="Введите текст..."
    :rows="4"
    :clearable="true"
    :error="hasError"
    error-mode="outline"
    error-message="Поле обязательно для заполнения"
    :max-length="500"
    label="Описание"
  >
    <template #hint>Дополнительная подсказка</template>
    <template #additional>
      <span>Дополнительный контент</span>
    </template>
  </TextArea>
  
  Авто-высота:
  <TextArea
    v-model="text"
    rows="auto"
    :min-rows="2"
  />
-->

<template>
  <div class="text-area-wrapper">
    <!-- Label (внешний) -->
    <label
      v-if="slots.label || label"
      :for="textareaId"
      class="text-area__label"
    >
      <slot name="label">{{ label }}</slot>
    </label>

    <!-- Основной контейнер -->
    <div class="text-area" :class="textareaClasses">
      <!-- Textarea элемент -->
      <textarea
        ref="textareaRef"
        :id="textareaId"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :maxlength="maxLength"
        :minlength="minLength"
        :required="required"
        :name="name"
        :autofocus="autofocus"
        :aria-label="ariaLabel || label"
        :aria-describedby="ariaDescribedBy"
        :aria-invalid="hasError"
        :aria-required="required"
        :aria-disabled="disabled"
        :rows="computedRows"
        class="text-area__textarea"
        :style="textareaStyle"
        @input="handleInput"
        @change="handleChange"
        @focus="handleFocus"
        @blur="handleBlur"
        @keydown="handleKeydown"
        @keyup="handleKeyup"
        v-bind="$attrs"
      />

      <!-- Кнопка очистки -->
      <button
        v-if="showClearButton"
        type="button"
        class="text-area__clear"
        :aria-label="clearButtonAriaLabel"
        @click="handleClear"
      >
        <slot name="clear-button">
          <span class="text-area__clear-icon">×</span>
        </slot>
      </button>

      <!-- Иконка ошибки (inline) -->
      <div
        v-if="hasError && errorMode === 'inline'"
        class="text-area__error-icon"
        :title="computedErrorMessage"
        :aria-label="computedErrorMessage"
      >
        <slot name="error-icon">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="8" cy="8" r="7" stroke="currentColor" stroke-width="1.5" />
            <path
              d="M8 4V8M8 12H8.01"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
            />
          </svg>
        </slot>
      </div>

      <!-- Дополнительный контент справа внизу -->
      <div v-if="slots.additional || showCharCounter" class="text-area__additional">
        <slot name="additional">
          <span v-if="showCharCounter" class="text-area__char-counter">
            {{ currentLength }} / {{ maxLength }}
          </span>
        </slot>
      </div>
    </div>

    <!-- Hint (подсказка) -->
    <div
      v-if="slots.hint"
      :id="`text-area-hint-${generatedId}`"
      class="text-area__hint"
    >
      <slot name="hint" />
    </div>

    <!-- Сообщение об ошибке (outline) -->
    <div
      v-if="hasError && errorMode === 'outline' && computedErrorMessage"
      :id="errorMessageId"
      class="text-area__error-message"
    >
      {{ computedErrorMessage }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, useId, useSlots, watch, nextTick, onMounted } from 'vue'

interface TextAreaProps {
  // v-model
  modelValue?: string

  // Варианты
  variant?: 'normal' | 'clear'

  // Размеры
  size?: 's' | 'm' | 'l' | 'xl'

  // Авто-высота
  rows?: number | 'auto'
  minRows?: number

  // Валидация
  error?: boolean | string
  errorMessage?: string
  errorMode?: 'inline' | 'outline'

  // Кнопка очистки
  clearable?: boolean

  // HTML атрибуты
  placeholder?: string
  disabled?: boolean
  readonly?: boolean
  maxLength?: number
  minLength?: number
  required?: boolean
  autofocus?: boolean
  name?: string

  // Label
  label?: string

  // Accessibility
  ariaLabel?: string
  ariaDescribedBy?: string
  textareaId?: string
}

interface TextAreaEmits {
  (e: 'update:modelValue', value: string): void
  (e: 'input', event: Event): void
  (e: 'change', event: Event): void
  (e: 'focus', event: FocusEvent): void
  (e: 'blur', event: FocusEvent): void
  (e: 'clear'): void
  (e: 'keydown', event: KeyboardEvent): void
  (e: 'keyup', event: KeyboardEvent): void
}

const props = withDefaults(defineProps<TextAreaProps>(), {
  modelValue: '',
  variant: 'normal',
  size: 'm',
  rows: 4,
  minRows: 2,
  error: false,
  errorMessage: '',
  errorMode: 'outline',
  clearable: true,
  placeholder: '',
  disabled: false,
  readonly: false,
  required: false,
  autofocus: false
})

const emit = defineEmits<TextAreaEmits>()

const textareaRef = ref<HTMLTextAreaElement | null>(null)
const isFocused = ref(false)
const generatedId = useId()
const slots = useSlots()

const textareaId = computed(() => props.textareaId || `text-area-${generatedId}`)
const errorMessageId = computed(() => `text-area-error-${generatedId}`)

// Вычисляемое значение для отображения кнопки очистки
const showClearButton = computed(() => {
  return (
    props.clearable &&
    !props.disabled &&
    !props.readonly &&
    modelValueLength.value > 0
  )
})

// Длина текущего значения
const modelValueLength = computed(() => {
  return props.modelValue?.length || 0
})

const currentLength = computed(() => modelValueLength.value)

// Показывать счетчик символов
const showCharCounter = computed(() => {
  return !!props.maxLength
})

// Вычисляемое состояние ошибки
const hasError = computed(() => {
  if (typeof props.error === 'string') {
    return props.error.length > 0
  }
  return props.error === true
})

// Текст ошибки
const computedErrorMessage = computed(() => {
  if (typeof props.error === 'string') {
    return props.error
  }
  return props.errorMessage
})

// Вычисляемые rows
const computedRows = computed(() => {
  if (props.rows === 'auto') {
    return props.minRows || 2
  }
  return props.rows
})

// Стили для авто-высоты
const textareaStyle = ref<Record<string, string>>({})

// Функция для расчета высоты
const calculateHeight = async () => {
  if (props.rows !== 'auto' || !textareaRef.value) {
    return
  }

  await nextTick()

  const textarea = textareaRef.value
  const computedStyle = getComputedStyle(textarea)
  const lineHeight = parseFloat(computedStyle.lineHeight) || 20
  const paddingTop = parseFloat(computedStyle.paddingTop) || 0
  const paddingBottom = parseFloat(computedStyle.paddingBottom) || 0
  const borderTop = parseFloat(computedStyle.borderTopWidth) || 0
  const borderBottom = parseFloat(computedStyle.borderBottomWidth) || 0

  // Минимальная высота для minRows строк
  const minRows = props.minRows || 2
  const minHeight = minRows * lineHeight + paddingTop + paddingBottom + borderTop + borderBottom

  // Сбрасываем высоту для правильного расчета scrollHeight
  const currentHeight = textarea.style.height
  textarea.style.height = 'auto'

  // Вычисляем новую высоту
  const scrollHeight = textarea.scrollHeight
  const newHeight = Math.max(minHeight, scrollHeight)

  textareaStyle.value = {
    height: `${newHeight}px`,
    overflow: 'hidden'
  }
}

// Классы компонента
const textareaClasses = computed(() => {
  return [
    `text-area--${props.variant}`,
    `text-area--${props.size}`,
    {
      'text-area--focused': isFocused.value,
      'text-area--disabled': props.disabled,
      'text-area--readonly': props.readonly,
      'text-area--error-inline': hasError.value && props.errorMode === 'inline',
      'text-area--error-outline': hasError.value && props.errorMode === 'outline',
      'text-area--has-clear': showClearButton.value,
      'text-area--has-additional': !!slots.additional || showCharCounter.value,
      'text-area--auto-resize': props.rows === 'auto'
    }
  ]
})

// ARIA label для кнопки очистки
const clearButtonAriaLabel = computed(() => {
  return props.ariaLabel || props.label
    ? `Очистить ${props.ariaLabel || props.label}`
    : 'Очистить поле'
})

// ARIA described by
const ariaDescribedBy = computed(() => {
  const ids: string[] = []
  if (slots.hint) {
    ids.push(`text-area-hint-${generatedId}`)
  }
  if (hasError.value && props.errorMode === 'outline' && computedErrorMessage.value) {
    ids.push(errorMessageId.value)
  }
  return ids.length > 0 ? ids.join(' ') : props.ariaDescribedBy
})

// Обработчики событий
const handleInput = (event: Event) => {
  const target = event.target as HTMLTextAreaElement
  emit('update:modelValue', target.value)
  emit('input', event)

  // Пересчитываем высоту при авто-ресайзе
  if (props.rows === 'auto') {
    calculateHeight()
  }
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
  // Фокус на textarea после очистки
  nextTick(() => {
    textareaRef.value?.focus()
  })
}

const handleKeydown = (event: KeyboardEvent) => {
  emit('keydown', event)
}

const handleKeyup = (event: KeyboardEvent) => {
  emit('keyup', event)
}

// Следим за изменением modelValue для авто-ресайза
watch(
  () => props.modelValue,
  () => {
    if (props.rows === 'auto') {
      calculateHeight()
    }
  },
  { immediate: false }
)

// Инициализация авто-высоты при монтировании
onMounted(() => {
  if (props.rows === 'auto') {
    calculateHeight()
  }
})

// Публичные методы
defineExpose({
  focus: () => textareaRef.value?.focus(),
  blur: () => textareaRef.value?.blur(),
  select: () => textareaRef.value?.select(),
  textarea: textareaRef
})
</script>

<style scoped lang="scss">
@import "./TextArea.scss";
</style>