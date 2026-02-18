<!--
  Tooltip Component
  
  Пример использования:
  
  Базовый:
  <Tooltip content="Подсказка">
    <ButtonUi>Наведите на меня</ButtonUi>
  </Tooltip>
  
  С кастомным контентом:
  <Tooltip>
    <template #trigger>
      <ButtonUi>Наведите</ButtonUi>
    </template>
    <template #content>
      <div>Произвольный контент</div>
    </template>
  </Tooltip>
  
  С задержкой:
  <Tooltip content="Подсказка" :hover-delay="500">
    <ButtonUi>С задержкой</ButtonUi>
  </Tooltip>
  
  С позицией:
  <Tooltip content="Подсказка" position="top">
    <ButtonUi>Сверху</ButtonUi>
  </Tooltip>
-->

<template>
  <Popup
    ref="popupRef"
    :trigger="'hover'"
    :position="position"
    :show-arrow="showArrow"
    :offset="offset"
    :hover-delay="hoverDelay"
    :hide-delay="0"
    :close-on-click-outside="false"
    :close-on-escape="false"
    :disabled="disabled"
    @open="handleOpen"
    @close="handleClose"
  >
    <template #trigger>
      <slot />
    </template>
    <template #content>
      <slot name="content">
        <span v-if="content">{{ content }}</span>
      </slot>
    </template>
  </Popup>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Popup from '../Popup/Popup.vue'

interface TooltipProps {
  // Контент (текст)
  content?: string

  // Позиционирование
  position?:
    | 'top'
    | 'bottom'
    | 'left'
    | 'right'
    | 'top-left'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-right'
    | 'left-top'
    | 'left-bottom'
    | 'right-top'
    | 'right-bottom'

  // Хвостик
  showArrow?: boolean

  // Отступ от триггера
  offset?: number

  // Задержка перед показом (в миллисекундах)
  hoverDelay?: number

  // Отключить
  disabled?: boolean
}

interface TooltipEmits {
  (e: 'open'): void
  (e: 'close'): void
}

const props = withDefaults(defineProps<TooltipProps>(), {
  content: '',
  position: 'top',
  showArrow: true,
  offset: 8,
  hoverDelay: 250,
  disabled: false
})

const emit = defineEmits<TooltipEmits>()

const popupRef = ref<InstanceType<typeof Popup> | null>(null)

// Обработчики событий
const handleOpen = () => {
  emit('open')
}

const handleClose = () => {
  emit('close')
}

// Публичные методы
defineExpose({
  open: () => popupRef.value?.open(),
  close: () => popupRef.value?.close(),
  toggle: () => popupRef.value?.toggle(),
  updatePosition: () => popupRef.value?.updatePosition()
})
</script>

<style scoped lang="scss">
@import "./Tooltip.scss";
</style>