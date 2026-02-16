<!--
  Select Component
  
  Пример использования:
  
  Single режим:
  <Select
    v-model="selectedValue"
    :options="options"
    placeholder="Выберите значение"
    variant="normal"
    size="m"
    :clearable="true"
  />
  
  Multiple режим:
  <Select
    v-model="selectedValues"
    mode="multiple"
    :options="options"
    placeholder="Выберите значения"
  />
  
  С ошибкой:
  <Select
    v-model="value"
    :options="options"
    :error="true"
    error-message="Поле обязательно"
    error-mode="outline"
  />
  
  Опции:
  const options = [
    { value: '1', label: 'Опция 1' },
    { value: '2', label: 'Опция 2', disabled: true },
    { value: '3', label: 'Опция 3' }
  ]
-->

<template>
  <div class="select-wrapper">
    <!-- Label (внешний) -->
    <label
      v-if="slots.label || label"
      :for="triggerId"
      class="select__label"
    >
      <slot name="label">{{ label }}</slot>
    </label>

    <!-- Основной контейнер -->
    <div
      ref="selectRef"
      class="select"
      :class="selectClasses"
      @keydown="handleKeydown"
    >
      <!-- Триггер (Control) -->
      <button
        ref="triggerRef"
        :id="triggerId"
        type="button"
        class="select__trigger"
        :disabled="disabled"
        :aria-expanded="isOpen"
        :aria-haspopup="'listbox'"
        :aria-controls="listboxId"
        :aria-label="ariaLabel || label"
        :aria-invalid="hasError"
        :aria-required="required"
        :aria-disabled="disabled"
        @click="handleTriggerClick"
        @keydown.enter.prevent="handleTriggerKeydown"
        @keydown.space.prevent="handleTriggerKeydown"
      >
        <!-- Текст значения или placeholder -->
        <span class="select__value" :class="{ 'select__value--placeholder': !displayText }">
          {{ displayText || placeholder }}
        </span>

        <!-- Иконка ошибки (inline) -->
        <div
          v-if="hasError && errorMode === 'inline'"
          class="select__error-icon"
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

        <!-- Кнопка очистки -->
        <button
          v-if="showClearButton"
          type="button"
          class="select__clear"
          :aria-label="clearButtonAriaLabel"
          @click.stop="handleClear"
        >
          <slot name="clear-button">
            <span class="select__clear-icon">×</span>
          </slot>
        </button>

        <!-- Шеврон -->
        <span class="select__chevron" :class="{ 'select__chevron--open': isOpen }">
          <slot name="chevron">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 6L8 10L12 6"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </slot>
        </span>
      </button>

      <!-- Дополнительный контент справа внизу -->
      <div v-if="slots.additional" class="select__additional">
        <slot name="additional" />
      </div>
    </div>

    <!-- Hint (подсказка) -->
    <div
      v-if="slots.hint"
      :id="`select-hint-${generatedId}`"
      class="select__hint"
    >
      <slot name="hint" />
    </div>

    <!-- Сообщение об ошибке (outline) -->
    <div
      v-if="hasError && errorMode === 'outline' && computedErrorMessage"
      :id="errorMessageId"
      class="select__error-message"
    >
      {{ computedErrorMessage }}
    </div>

    <!-- Dropdown (через Teleport) -->
    <Teleport to="body">
      <Transition name="select-dropdown">
        <div
          v-if="isOpen"
          ref="dropdownRef"
          :id="listboxId"
          class="select__dropdown"
          :class="dropdownClasses"
          :style="dropdownStyle"
          role="listbox"
          :aria-label="ariaLabel || label"
          @click.stop
        >
          <div
            v-for="(option, index) in options"
            :key="getOptionKey(option, index)"
            ref="optionRefs"
            class="select__option"
            :class="{
              'select__option--selected': isOptionSelected(option),
              'select__option--focused': focusedIndex === index,
              'select__option--disabled': option.disabled
            }"
            role="option"
            :aria-selected="isOptionSelected(option)"
            :aria-disabled="option.disabled"
            :tabindex="option.disabled ? -1 : 0"
            @click="handleOptionClick(option)"
            @mouseenter="focusedIndex = index"
          >
            <!-- Чекбокс для multiple -->
            <span v-if="mode === 'multiple'" class="select__option-checkbox">
              <svg
                v-if="isOptionSelected(option)"
                width="16"
                height="16"
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
            </span>

            <!-- Кастомный рендер опции -->
            <slot name="option" :option="option" :selected="isOptionSelected(option)">
              <span class="select__option-label">{{ option.label }}</span>
            </slot>
          </div>

          <!-- Пустое состояние -->
          <div v-if="options.length === 0" class="select__option select__option--empty">
            <slot name="empty">Нет доступных опций</slot>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, useId, useSlots, watch, nextTick, onMounted, onUnmounted } from 'vue'

export interface SelectOption {
  value: string | number
  label: string
  disabled?: boolean
  [key: string]: any
}

interface SelectProps {
  // v-model
  modelValue?: string | number | (string | number)[] | null

  // Режим выбора
  mode?: 'single' | 'multiple'

  // Опции
  options: SelectOption[]

  // Варианты
  variant?: 'normal' | 'clear'

  // Размеры
  size?: 's' | 'm' | 'l' | 'xl'

  // Валидация
  error?: boolean | string
  errorMessage?: string
  errorMode?: 'inline' | 'outline'

  // Кнопка очистки
  clearable?: boolean

  // HTML атрибуты
  placeholder?: string
  disabled?: boolean
  required?: boolean
  name?: string

  // Label
  label?: string

  // Accessibility
  ariaLabel?: string
  ariaDescribedBy?: string
  triggerId?: string
}

interface SelectEmits {
  (e: 'update:modelValue', value: string | number | (string | number)[] | null): void
  (e: 'change', value: string | number | (string | number)[] | null): void
  (e: 'clear'): void
  (e: 'open'): void
  (e: 'close'): void
}

const props = withDefaults(defineProps<SelectProps>(), {
  modelValue: null,
  mode: 'single',
  options: () => [],
  variant: 'normal',
  size: 'm',
  error: false,
  errorMessage: '',
  errorMode: 'outline',
  clearable: true,
  placeholder: 'Выберите значение...',
  disabled: false,
  required: false
})

const emit = defineEmits<SelectEmits>()

const selectRef = ref<HTMLElement | null>(null)
const triggerRef = ref<HTMLButtonElement | null>(null)
const dropdownRef = ref<HTMLElement | null>(null)
const optionRefs = ref<(HTMLElement | null)[]>([])

const isOpen = ref(false)
const focusedIndex = ref(-1)
const generatedId = useId()
const slots = useSlots()

const triggerId = computed(() => props.triggerId || `select-trigger-${generatedId}`)
const listboxId = computed(() => `select-listbox-${generatedId}`)
const errorMessageId = computed(() => `select-error-${generatedId}`)

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

// Показывать кнопку очистки
const showClearButton = computed(() => {
  if (!props.clearable || props.disabled) {
    return false
  }
  if (props.mode === 'multiple') {
    return Array.isArray(props.modelValue) && props.modelValue.length > 0
  }
  return props.modelValue !== null && props.modelValue !== undefined && props.modelValue !== ''
})

// Отображаемый текст
const displayText = computed(() => {
  if (props.mode === 'multiple') {
    if (!Array.isArray(props.modelValue) || props.modelValue.length === 0) {
      return ''
    }
    const selectedOptions = props.options.filter(opt =>
      props.modelValue?.includes(opt.value)
    )
    return selectedOptions.map(opt => opt.label).join(', ')
  } else {
    if (props.modelValue === null || props.modelValue === undefined || props.modelValue === '') {
      return ''
    }
    const option = props.options.find(opt => opt.value === props.modelValue)
    return option?.label || ''
  }
})

// Классы компонента
const selectClasses = computed(() => {
  return [
    `select--${props.variant}`,
    `select--${props.size}`,
    {
      'select--open': isOpen.value,
      'select--disabled': props.disabled,
      'select--error-inline': hasError.value && props.errorMode === 'inline',
      'select--error-outline': hasError.value && props.errorMode === 'outline',
      'select--has-clear': showClearButton.value,
      'select--has-additional': !!slots.additional,
      'select--multiple': props.mode === 'multiple'
    }
  ]
})

// Классы dropdown
const dropdownClasses = computed(() => {
  return [
    `select__dropdown--${props.size}`,
    {
      'select__dropdown--multiple': props.mode === 'multiple'
    }
  ]
})

// Стили для позиционирования dropdown
const dropdownStyle = ref<Record<string, string>>({})

// Проверка выбора опции
const isOptionSelected = (option: SelectOption): boolean => {
  if (props.mode === 'multiple') {
    return Array.isArray(props.modelValue) && props.modelValue.includes(option.value)
  }
  return props.modelValue === option.value
}

// Получить ключ опции
const getOptionKey = (option: SelectOption, index: number): string | number => {
  return option.value ?? index
}

// ARIA label для кнопки очистки
const clearButtonAriaLabel = computed(() => {
  return props.ariaLabel || props.label
    ? `Очистить ${props.ariaLabel || props.label}`
    : 'Очистить выбор'
})

// ARIA described by
const ariaDescribedBy = computed(() => {
  const ids: string[] = []
  if (slots.hint) {
    ids.push(`select-hint-${generatedId}`)
  }
  if (hasError.value && props.errorMode === 'outline' && computedErrorMessage.value) {
    ids.push(errorMessageId.value)
  }
  return ids.length > 0 ? ids.join(' ') : props.ariaDescribedBy
})

// Позиционирование dropdown
const updateDropdownPosition = async () => {
  if (!isOpen.value || !selectRef.value || !dropdownRef.value) {
    return
  }

  await nextTick()

  const triggerRect = selectRef.value.getBoundingClientRect()
  const dropdown = dropdownRef.value
  const viewportHeight = window.innerHeight
  const viewportWidth = window.innerWidth
  const dropdownHeight = dropdown.offsetHeight || 200 // примерная высота
  const spaceBelow = viewportHeight - triggerRect.bottom
  const spaceAbove = triggerRect.top

  // Определяем позицию (снизу или сверху)
  const positionBelow = spaceBelow >= dropdownHeight || spaceBelow >= spaceAbove

  // Ширина dropdown = ширина триггера
  const width = triggerRect.width

  // Позиция по горизонтали
  let left = triggerRect.left

  // Проверка выхода за правую границу
  if (left + width > viewportWidth) {
    left = viewportWidth - width - 10
  }

  // Проверка выхода за левую границу
  if (left < 10) {
    left = 10
  }

  dropdownStyle.value = {
    position: 'fixed',
    top: `${positionBelow ? triggerRect.bottom : triggerRect.top - dropdownHeight}px`,
    left: `${left}px`,
    width: `${width}px`,
    minWidth: `${width}px`,
    maxWidth: `${width}px`,
    zIndex: '1000'
  }
}

// Обработчик клика по триггеру
const handleTriggerClick = () => {
  if (props.disabled) {
    return
  }
  toggleDropdown()
}

// Обработчик клавиатуры на триггере
const handleTriggerKeydown = () => {
  if (props.disabled) {
    return
  }
  if (!isOpen.value) {
    openDropdown()
  }
}

// Переключение dropdown
const toggleDropdown = () => {
  if (isOpen.value) {
    closeDropdown()
  } else {
    openDropdown()
  }
}

// Открыть dropdown
const openDropdown = async () => {
  if (props.disabled || isOpen.value) {
    return
  }
  isOpen.value = true
  focusedIndex.value = -1
  emit('open')
  await nextTick()
  updateDropdownPosition()
  // Фокус на первую опцию
  if (props.options.length > 0) {
    const firstEnabledIndex = props.options.findIndex(opt => !opt.disabled)
    if (firstEnabledIndex >= 0) {
      focusedIndex.value = firstEnabledIndex
    }
  }
}

// Закрыть dropdown
const closeDropdown = () => {
  if (!isOpen.value) {
    return
  }
  isOpen.value = false
  focusedIndex.value = -1
  emit('close')
  // Возвращаем фокус на триггер
  nextTick(() => {
    triggerRef.value?.focus()
  })
}

// Обработчик клика по опции
const handleOptionClick = (option: SelectOption) => {
  if (option.disabled) {
    return
  }

  if (props.mode === 'multiple') {
    // Toggle значение в массиве
    const currentValue = Array.isArray(props.modelValue) ? [...props.modelValue] : []
    const index = currentValue.indexOf(option.value)
    
    if (index >= 0) {
      currentValue.splice(index, 1)
    } else {
      currentValue.push(option.value)
    }
    
    emit('update:modelValue', currentValue)
    emit('change', currentValue)
  } else {
    // Single режим - выбираем и закрываем
    emit('update:modelValue', option.value)
    emit('change', option.value)
    closeDropdown()
  }
}

// Обработчик очистки
const handleClear = (event: Event) => {
  event.stopPropagation()
  if (props.disabled) {
    return
  }
  
  const newValue = props.mode === 'multiple' ? [] : null
  emit('update:modelValue', newValue)
  emit('clear')
  
  // Фокус остается на триггере
  nextTick(() => {
    triggerRef.value?.focus()
  })
}

// Навигация с клавиатуры
const handleKeydown = (event: KeyboardEvent) => {
  if (props.disabled) {
    return
  }

  if (!isOpen.value) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      openDropdown()
    }
    return
  }

  switch (event.key) {
    case 'Escape':
      event.preventDefault()
      closeDropdown()
      break

    case 'ArrowDown':
      event.preventDefault()
      moveFocus(1)
      break

    case 'ArrowUp':
      event.preventDefault()
      moveFocus(-1)
      break

    case 'Enter':
    case ' ':
      event.preventDefault()
      if (focusedIndex.value >= 0 && focusedIndex.value < props.options.length) {
        const option = props.options[focusedIndex.value]
        if (!option.disabled) {
          handleOptionClick(option)
        }
      }
      break

    case 'Home':
      event.preventDefault()
      moveFocusToFirst()
      break

    case 'End':
      event.preventDefault()
      moveFocusToLast()
      break
  }
}

// Перемещение фокуса
const moveFocus = (direction: number) => {
  const options = props.options
  let newIndex = focusedIndex.value

  do {
    newIndex += direction
    if (newIndex < 0) {
      newIndex = options.length - 1
    } else if (newIndex >= options.length) {
      newIndex = 0
    }
  } while (options[newIndex]?.disabled && newIndex !== focusedIndex.value)

  focusedIndex.value = newIndex
  scrollToFocusedOption()
}

// Переместить фокус на первую опцию
const moveFocusToFirst = () => {
  const firstEnabledIndex = props.options.findIndex(opt => !opt.disabled)
  if (firstEnabledIndex >= 0) {
    focusedIndex.value = firstEnabledIndex
    scrollToFocusedOption()
  }
}

// Переместить фокус на последнюю опцию
const moveFocusToLast = () => {
  for (let i = props.options.length - 1; i >= 0; i--) {
    if (!props.options[i].disabled) {
      focusedIndex.value = i
      scrollToFocusedOption()
      break
    }
  }
}

// Прокрутка к сфокусированной опции
const scrollToFocusedOption = () => {
  nextTick(() => {
    if (focusedIndex.value >= 0 && optionRefs.value[focusedIndex.value] && dropdownRef.value) {
      const optionElement = optionRefs.value[focusedIndex.value]
      if (optionElement) {
        optionElement.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
      }
    }
  })
}

// Обработчик клика вне компонента
const handleClickOutside = (event: MouseEvent) => {
  if (!selectRef.value || !dropdownRef.value) {
    return
  }

  const target = event.target as Node
  if (
    isOpen.value &&
    !selectRef.value.contains(target) &&
    !dropdownRef.value.contains(target)
  ) {
    closeDropdown()
  }
}

// Обработчик изменения размера окна
const handleResize = () => {
  if (isOpen.value) {
    updateDropdownPosition()
  }
}

// Следим за изменениями
watch(isOpen, (newValue) => {
  if (newValue) {
    updateDropdownPosition()
    document.addEventListener('click', handleClickOutside)
    window.addEventListener('resize', handleResize)
    window.addEventListener('scroll', updateDropdownPosition, true)
  } else {
    document.removeEventListener('click', handleClickOutside)
    window.removeEventListener('resize', handleResize)
    window.removeEventListener('scroll', updateDropdownPosition, true)
  }
})

watch(() => props.options, () => {
  if (isOpen.value) {
    updateDropdownPosition()
  }
}, { deep: true })

onMounted(() => {
  if (isOpen.value) {
    updateDropdownPosition()
  }
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  window.removeEventListener('resize', handleResize)
  window.removeEventListener('scroll', updateDropdownPosition, true)
})

// Публичные методы
defineExpose({
  open: openDropdown,
  close: closeDropdown,
  toggle: toggleDropdown,
  focus: () => triggerRef.value?.focus(),
  blur: () => triggerRef.value?.blur()
})
</script>

<style scoped lang="scss">
@use "./Select.scss";
</style>