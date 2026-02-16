<!--
  Popup Component
  
  Простое всплывающее окно
  
  Пример использования:
  
  По клику:
  <Popup trigger="click">
    <template #trigger>
      <ButtonUi>Открыть Popup</ButtonUi>
    </template>
    <template #content>
      <div>Содержимое попапа</div>
    </template>
  </Popup>
  
  По наведению:
  <Popup trigger="hover">
    <template #trigger>
      <span>Наведите на меня</span>
    </template>
    <template #content>
      <div>Подсказка</div>
    </template>
  </Popup>
-->

<template>
  <div class="popup-wrapper" ref="wrapperRef">
    <!-- Триггер -->
    <div
      ref="triggerRef"
      class="popup__trigger"
      @click="handleClick"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
    >
      <slot name="trigger" />
    </div>

    <!-- Popup -->
    <Teleport to="body">
      <Transition name="popup">
        <div
          v-if="isVisible"
          ref="popupRef"
          class="popup"
          :style="popupStyle"
          @click.stop
        >
          <slot name="content" />
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick, onMounted, onUnmounted } from 'vue'

interface PopupProps {
  // Триггер
  trigger?: 'hover' | 'click'

  // Позиция
  position?: 'top' | 'bottom' | 'left' | 'right'

  // Отступ
  offset?: number

  // Отключить
  disabled?: boolean
}

interface PopupEmits {
  (e: 'open'): void
  (e: 'close'): void
}

const props = withDefaults(defineProps<PopupProps>(), {
  trigger: 'click',
  position: 'bottom',
  offset: 8,
  disabled: false
})

const emit = defineEmits<PopupEmits>()

const wrapperRef = ref<HTMLElement | null>(null)
const triggerRef = ref<HTMLElement | null>(null)
const popupRef = ref<HTMLElement | null>(null)

const isVisible = ref(false)
const isHovered = ref(false)

// Стили для позиционирования
const popupStyle = ref<Record<string, string>>({})

// Позиционирование
const updatePosition = async () => {
  if (!isVisible.value || !triggerRef.value || !popupRef.value) {
    return
  }

  await nextTick()

  const triggerRect = triggerRef.value.getBoundingClientRect()
  const popup = popupRef.value
  const popupWidth = popup.offsetWidth
  const popupHeight = popup.offsetHeight
  const viewportWidth = window.innerWidth
  const viewportHeight = window.innerHeight

  let top = 0
  let left = 0

  // Позиционирование
  switch (props.position) {
    case 'top':
      top = triggerRect.top - popupHeight - props.offset
      left = triggerRect.left + triggerRect.width / 2 - popupWidth / 2
      break
    case 'bottom':
      top = triggerRect.bottom + props.offset
      left = triggerRect.left + triggerRect.width / 2 - popupWidth / 2
      break
    case 'left':
      top = triggerRect.top + triggerRect.height / 2 - popupHeight / 2
      left = triggerRect.left - popupWidth - props.offset
      break
    case 'right':
      top = triggerRect.top + triggerRect.height / 2 - popupHeight / 2
      left = triggerRect.right + props.offset
      break
  }

  // Проверка границ
  if (left < 10) left = 10
  if (left + popupWidth > viewportWidth - 10) {
    left = viewportWidth - popupWidth - 10
  }
  if (top < 10) top = 10
  if (top + popupHeight > viewportHeight - 10) {
    top = viewportHeight - popupHeight - 10
  }

  popupStyle.value = {
    position: 'fixed',
    top: `${top}px`,
    left: `${left}px`,
    zIndex: '1000'
  }
}

// Открыть
const open = () => {
  if (props.disabled || isVisible.value) return
  isVisible.value = true
  emit('open')
  nextTick(() => updatePosition())
}

// Закрыть
const close = () => {
  if (!isVisible.value) return
  isVisible.value = false
  emit('close')
}

// Переключить
const toggle = () => {
  if (isVisible.value) {
    close()
  } else {
    open()
  }
}

// Обработчики
const handleClick = () => {
  if (props.trigger !== 'click' || props.disabled) return
  toggle()
}

const handleMouseEnter = () => {
  if (props.trigger !== 'hover' || props.disabled) return
  isHovered.value = true
  open()
}

const handleMouseLeave = () => {
  if (props.trigger !== 'hover') return
  isHovered.value = false
  setTimeout(() => {
    if (!isHovered.value) {
      close()
    }
  }, 100)
}

// Клик вне области
const handleClickOutside = (event: MouseEvent) => {
  if (
    props.trigger === 'click' &&
    isVisible.value &&
    !triggerRef.value?.contains(event.target as Node) &&
    !popupRef.value?.contains(event.target as Node)
  ) {
    close()
  }
}

// Escape
const handleEscape = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && isVisible.value) {
    close()
  }
}

// Следим за изменениями
watch(isVisible, (newValue) => {
  if (newValue) {
    nextTick(() => {
      updatePosition()
      if (props.trigger === 'click') {
        document.addEventListener('click', handleClickOutside)
      }
      document.addEventListener('keydown', handleEscape)
      window.addEventListener('resize', updatePosition)
      window.addEventListener('scroll', updatePosition, true)
    })
  } else {
    document.removeEventListener('click', handleClickOutside)
    document.removeEventListener('keydown', handleEscape)
    window.removeEventListener('resize', updatePosition)
    window.removeEventListener('scroll', updatePosition, true)
  }
})

onMounted(() => {
  if (isVisible.value) {
    updatePosition()
  }
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  document.removeEventListener('keydown', handleEscape)
  window.removeEventListener('resize', updatePosition)
  window.removeEventListener('scroll', updatePosition, true)
})

// Публичные методы
defineExpose({
  open,
  close,
  toggle,
  updatePosition
})
</script>

<style scoped lang="scss">
@use "./Popup.scss";
</style>