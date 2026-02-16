<!--
  Snackbar Component (Toast)
  
  Пример использования:
  
  Базовый:
  <Snackbar
    :show="isVisible"
    @update:show="isVisible = $event"
    type="success"
    title="Успешно!"
    description="Данные успешно сохранены"
  />
  
  С кнопками:
  <Snackbar
    :show="isVisible"
    type="error"
    title="Ошибка"
    description="Произошла ошибка при сохранении"
    :duration="0"
  >
    <template #actions>
      <ButtonUi size="sm" variant="primary">Повторить</ButtonUi>
      <ButtonUi size="sm" variant="flat">Отмена</ButtonUi>
    </template>
  </Snackbar>
  
  Программное управление:
  const snackbar = useSnackbar()
  snackbar.show({
    type: 'success',
    title: 'Успешно!',
    description: 'Операция выполнена'
  })
-->

<template>
  <Teleport to="body">
    <Transition name="snackbar">
      <div
        v-if="isVisible"
        ref="snackbarRef"
        class="snackbar"
        :class="snackbarClasses"
        role="alert"
        :aria-live="ariaLive"
        :aria-atomic="true"
      >
        <!-- Иконка типа (опционально) -->
        <div v-if="showIcon" class="snackbar__icon">
          <slot name="icon">
            <svg
              v-if="type === 'success'"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.6667 5L7.50004 14.1667L3.33337 10"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <svg
              v-else-if="type === 'info'"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="10" cy="10" r="8" stroke="currentColor" stroke-width="1.5" />
              <path
                d="M10 6V10M10 14H10.01"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
              />
            </svg>
            <svg
              v-else-if="type === 'warning'"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 3.33333L2.5 16.6667H17.5L10 3.33333Z"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M10 8.33333V12.5M10 15H10.0083"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
              />
            </svg>
            <svg
              v-else-if="type === 'error'"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="10" cy="10" r="8" stroke="currentColor" stroke-width="1.5" />
              <path
                d="M10 6V10M10 14H10.01"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
              />
            </svg>
          </slot>
        </div>

        <!-- Контент -->
        <div class="snackbar__content">
          <!-- Заголовок (опционально) -->
          <div v-if="slots.title || title" class="snackbar__title">
            <slot name="title">{{ title }}</slot>
          </div>

          <!-- Описание -->
          <div v-if="slots.description || description" class="snackbar__description">
            <slot name="description">{{ description }}</slot>
          </div>

          <!-- Кастомный контент -->
          <div v-if="slots.default" class="snackbar__custom">
            <slot />
          </div>
        </div>

        <!-- Кнопки действий (опционально) -->
        <div v-if="slots.actions" class="snackbar__actions">
          <slot name="actions" />
        </div>

        <!-- Иконка закрытия (обязательна если нет авто-скрытия) -->
        <button
          v-if="showCloseButton"
          type="button"
          class="snackbar__close"
          :aria-label="closeButtonAriaLabel"
          @click="handleClose"
        >
          <slot name="close-icon">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 4L4 12M4 4L12 12"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </slot>
        </button>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, ref, useSlots, watch, onMounted, onUnmounted } from 'vue'

interface SnackbarProps {
  // Управление видимостью
  show?: boolean
  modelValue?: boolean

  // Тип
  type?: 'default' | 'info' | 'success' | 'warning' | 'error'

  // Контент
  title?: string
  description?: string

  // Иконка
  showIcon?: boolean

  // Авто-скрытие
  duration?: number
  // 0 - не скрывать автоматически (требуется кнопка закрытия)
  // > 0 - скрыть через указанное количество миллисекунд

  // Показывать кнопку закрытия
  showCloseButton?: boolean
}

interface SnackbarEmits {
  (e: 'update:show', value: boolean): void
  (e: 'update:modelValue', value: boolean): void
  (e: 'close'): void
}

const props = withDefaults(defineProps<SnackbarProps>(), {
  show: false,
  modelValue: undefined,
  type: 'default',
  title: '',
  description: '',
  showIcon: true,
  duration: 5000,
  showCloseButton: undefined // вычисляется автоматически
})

const emit = defineEmits<SnackbarEmits>()

const snackbarRef = ref<HTMLElement | null>(null)
const slots = useSlots()

// Вычисляемое значение show
const computedShow = computed({
  get: () => {
    if (props.show !== undefined) {
      return props.show
    }
    if (props.modelValue !== undefined) {
      return props.modelValue
    }
    return isVisible.value
  },
  set: (value: boolean) => {
    if (props.show !== undefined) {
      emit('update:show', value)
    }
    if (props.modelValue !== undefined) {
      emit('update:modelValue', value)
    }
    isVisible.value = value
  }
})

const isVisible = ref(false)
let autoCloseTimeout: number | null = null

// Показывать кнопку закрытия
const showCloseButton = computed(() => {
  if (props.showCloseButton !== undefined) {
    return props.showCloseButton
  }
  // Обязательна если нет авто-скрытия
  return props.duration === 0
})

// ARIA live
const ariaLive = computed(() => {
  if (props.type === 'error') {
    return 'assertive'
  }
  return 'polite'
})

// Классы компонента
const snackbarClasses = computed(() => {
  return [
    `snackbar--${props.type}`,
    {
      'snackbar--with-icon': showIcon.value,
      'snackbar--with-actions': !!slots.actions,
      'snackbar--with-close': showCloseButton.value
    }
  ]
})

// Показывать иконку
const showIcon = computed(() => {
  return props.showIcon && (props.type !== 'default' || !!slots.icon)
})

// ARIA label для кнопки закрытия
const closeButtonAriaLabel = computed(() => {
  return 'Закрыть уведомление'
})

// Обработчик закрытия
const handleClose = () => {
  closeSnackbar()
}

// Закрыть snackbar
const closeSnackbar = () => {
  clearAutoClose()
  computedShow.value = false
  emit('close')
}

// Очистить таймер авто-скрытия
const clearAutoClose = () => {
  if (autoCloseTimeout) {
    clearTimeout(autoCloseTimeout)
    autoCloseTimeout = null
  }
}

// Установить авто-скрытие
const setupAutoClose = () => {
  clearAutoClose()

  if (props.duration > 0 && isVisible.value) {
    autoCloseTimeout = window.setTimeout(() => {
      closeSnackbar()
    }, props.duration)
  }
}

// Следим за изменениями
watch(
  () => computedShow.value,
  (newValue) => {
    isVisible.value = newValue
    if (newValue) {
      setupAutoClose()
    } else {
      clearAutoClose()
    }
  },
  { immediate: true }
)

watch(
  () => props.duration,
  () => {
    if (isVisible.value) {
      setupAutoClose()
    }
  }
)

onMounted(() => {
  if (isVisible.value) {
    setupAutoClose()
  }
})

onUnmounted(() => {
  clearAutoClose()
})

// Публичные методы
defineExpose({
  open: () => {
    computedShow.value = true
  },
  close: closeSnackbar
})
</script>

<style scoped lang="scss">
@use "./Snackbar.scss";
</style>