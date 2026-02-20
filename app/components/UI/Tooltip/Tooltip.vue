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
    :position="computedPosition"
    :offset="offset"
    :disabled="disabled"
    @open="handleOpen"
    @close="handleClose"
  >
    <template #trigger>
      <slot>
        <!-- Дефолтная иконка вопросительного знака -->
        <span 
          v-if="useDefaultTrigger"
          class="tooltip__default-trigger"
          :aria-label="content || 'Подсказка'"
        >
          <svg 
            width="16" 
            height="16" 
            viewBox="0 0 16 16" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            class="tooltip__icon"
          >
            <circle cx="8" cy="8" r="7" stroke="currentColor" stroke-width="1.2" fill="none"/>
            <path d="M6.5 6.5C6.5 5.67157 7.17157 5 8 5C8.82843 5 9.5 5.67157 9.5 6.5C9.5 7.32843 8.82843 8 8 8V9.5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
            <circle cx="8" cy="11.5" r="0.75" fill="currentColor"/>
          </svg>
        </span>
      </slot>
    </template>
    <template #content>
      <slot name="content">
        <span class="content__text" v-if="content">{{ content }}</span>
      </slot>
    </template>
  </Popup>
</template>

<script setup lang="ts">
import { ref, useSlots, computed } from 'vue'
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

  // Отступ от триггера
  offset?: number

  // Отключить
  disabled?: boolean
}

const slots = useSlots()
const useDefaultTrigger = computed(() => !slots.default)

const computedPosition = computed(() => 
  props.position?.split('-')[0] as 'top' | 'bottom' | 'left' | 'right' || 'top'
)

interface TooltipEmits {
  (e: 'open'): void
  (e: 'close'): void
}

const props = withDefaults(defineProps<TooltipProps>(), {
  content: '',
  position: 'top',
  offset: 8,
  disabled: false
})

const emit = defineEmits<TooltipEmits>()

const popupRef = ref<InstanceType<typeof Popup> | null>(null)

const handleOpen = () => emit('open')
const handleClose = () => emit('close')

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