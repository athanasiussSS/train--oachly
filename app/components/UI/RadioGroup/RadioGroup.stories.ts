import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import RadioGroup from './RadioGroup.vue'

const meta: Meta<typeof RadioGroup> = {
  title: 'UI/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
  argTypes: {
    modelValue: {
      control: 'text',
      description: 'Выбранное значение (v-model)'
    },
    size: {
      control: 'select',
      options: ['m', 'l'],
      description: 'Размер radio'
    },
    direction: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Направление расположения'
    },
    disabled: {
      control: 'boolean',
      description: 'Отключить всю группу'
    },
    required: {
      control: 'boolean',
      description: 'Обязательное поле'
    },
    defaultSelected: {
      control: 'boolean',
      description: 'Выбрать первый по умолчанию'
    }
  }
}

export default meta
type Story = StoryObj<typeof RadioGroup>

// Базовые опции
const basicOptions = [
  { value: 'option1', label: 'Опция 1' },
  { value: 'option2', label: 'Опция 2' },
  { value: 'option3', label: 'Опция 3' }
]

// Базовый пример
export const Default: Story = {
  args: {
    options: basicOptions,
    size: 'm',
    direction: 'vertical',
    defaultSelected: true
  },
  render: (args) => ({
    components: { RadioGroup },
    setup() {
      const selected = ref(null)
      return { args, selected }
    },
    template: '<RadioGroup v-model="selected" v-bind="args" />'
  })
}

// Размеры
export const SizeM: Story = {
  args: {
    options: basicOptions,
    size: 'm',
    direction: 'vertical'
  },
  render: (args) => ({
    components: { RadioGroup },
    setup() {
      const selected = ref(null)
      return { args, selected }
    },
    template: '<RadioGroup v-model="selected" v-bind="args" />'
  })
}

export const SizeL: Story = {
  args: {
    options: basicOptions,
    size: 'l',
    direction: 'vertical'
  },
  render: (args) => ({
    components: { RadioGroup },
    setup() {
      const selected = ref(null)
      return { args, selected }
    },
    template: '<RadioGroup v-model="selected" v-bind="args" />'
  })
}

// Расположение
export const Vertical: Story = {
  args: {
    options: basicOptions,
    size: 'm',
    direction: 'vertical'
  },
  render: (args) => ({
    components: { RadioGroup },
    setup() {
      const selected = ref(null)
      return { args, selected }
    },
    template: '<RadioGroup v-model="selected" v-bind="args" />'
  })
}

export const Horizontal: Story = {
  args: {
    options: basicOptions,
    size: 'm',
    direction: 'horizontal'
  },
  render: (args) => ({
    components: { RadioGroup },
    setup() {
      const selected = ref(null)
      return { args, selected }
    },
    template: '<RadioGroup v-model="selected" v-bind="args" />'
  })
}

// Состояния
export const WithDisabledOptions: Story = {
  args: {
    options: [
      { value: 'option1', label: 'Опция 1' },
      { value: 'option2', label: 'Опция 2 (отключена)', disabled: true },
      { value: 'option3', label: 'Опция 3' }
    ],
    size: 'm',
    direction: 'vertical'
  },
  render: (args) => ({
    components: { RadioGroup },
    setup() {
      const selected = ref(null)
      return { args, selected }
    },
    template: '<RadioGroup v-model="selected" v-bind="args" />'
  })
}

export const Disabled: Story = {
  args: {
    options: basicOptions,
    size: 'm',
    direction: 'vertical',
    disabled: true
  },
  render: (args) => ({
    components: { RadioGroup },
    setup() {
      const selected = ref('option1')
      return { args, selected }
    },
    template: '<RadioGroup v-model="selected" v-bind="args" />'
  })
}

// Без выбранного по умолчанию
export const WithoutDefaultSelected: Story = {
  args: {
    options: basicOptions,
    size: 'm',
    direction: 'vertical',
    defaultSelected: false
  },
  render: (args) => ({
    components: { RadioGroup },
    setup() {
      const selected = ref(null)
      return { args, selected }
    },
    template: '<RadioGroup v-model="selected" v-bind="args" />'
  })
}

// Все размеры вместе
export const AllSizes: Story = {
  render: () => ({
    components: { RadioGroup },
    setup() {
      const selectedM = ref(null)
      const selectedL = ref(null)
      return { selectedM, selectedL, basicOptions }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 2rem;">
        <div>
          <h3 style="margin-bottom: 0.75rem; font-size: 1rem;">Размер M</h3>
          <RadioGroup v-model="selectedM" :options="basicOptions" size="m" />
        </div>
        <div>
          <h3 style="margin-bottom: 0.75rem; font-size: 1rem;">Размер L</h3>
          <RadioGroup v-model="selectedL" :options="basicOptions" size="l" />
        </div>
      </div>
    `
  })
}

// Все направления вместе
export const AllDirections: Story = {
  render: () => ({
    components: { RadioGroup },
    setup() {
      const selectedVertical = ref(null)
      const selectedHorizontal = ref(null)
      return { selectedVertical, selectedHorizontal, basicOptions }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 2rem;">
        <div>
          <h3 style="margin-bottom: 0.75rem; font-size: 1rem;">Вертикальное</h3>
          <RadioGroup v-model="selectedVertical" :options="basicOptions" direction="vertical" />
        </div>
        <div>
          <h3 style="margin-bottom: 0.75rem; font-size: 1rem;">Горизонтальное</h3>
          <RadioGroup v-model="selectedHorizontal" :options="basicOptions" direction="horizontal" />
        </div>
      </div>
    `
  })
}

// Примеры использования
export const UsageExamples: Story = {
  render: () => ({
    components: { RadioGroup },
    setup() {
      const paymentMethod = ref(null)
      const deliveryType = ref(null)
      
      const paymentOptions = [
        { value: 'card', label: 'Банковская карта' },
        { value: 'cash', label: 'Наличные' },
        { value: 'online', label: 'Онлайн-платеж' }
      ]
      
      const deliveryOptions = [
        { value: 'standard', label: 'Стандартная доставка' },
        { value: 'express', label: 'Экспресс-доставка' },
        { value: 'pickup', label: 'Самовывоз' }
      ]
      
      return { paymentMethod, deliveryType, paymentOptions, deliveryOptions }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 2rem; max-width: 500px;">
        <div>
          <h3 style="margin-bottom: 0.75rem; font-size: 1rem;">Способ оплаты:</h3>
          <RadioGroup v-model="paymentMethod" :options="paymentOptions" />
        </div>
        <div>
          <h3 style="margin-bottom: 0.75rem; font-size: 1rem;">Тип доставки:</h3>
          <RadioGroup v-model="deliveryType" :options="deliveryOptions" direction="horizontal" />
        </div>
      </div>
    `
  })
}

// В форме
export const InForm: Story = {
  render: () => ({
    components: { RadioGroup },
    setup() {
      const form = ref({
        type: null
      })
      
      const typeOptions = [
        { value: 'type1', label: 'Тип 1' },
        { value: 'type2', label: 'Тип 2' },
        { value: 'type3', label: 'Тип 3' }
      ]
      
      return { form, typeOptions }
    },
    template: `
      <form @submit.prevent="() => {}" style="max-width: 400px;">
        <div style="margin-bottom: 1rem;">
          <h3 style="margin-bottom: 0.75rem; font-size: 1rem;">Выберите тип:</h3>
          <RadioGroup v-model="form.type" :options="typeOptions" required />
        </div>
        <button type="submit" style="padding: 0.5rem 1rem; background: var(--color-primary); color: white; border: none; border-radius: 4px;">
          Отправить
        </button>
      </form>
    `
  })
}

// С кастомным рендером
export const WithCustomRender: Story = {
  render: () => ({
    components: { RadioGroup },
    setup() {
      const selected = ref(null)
      const options = [
        { value: 'option1', label: 'Опция 1', description: 'Описание опции 1' },
        { value: 'option2', label: 'Опция 2', description: 'Описание опции 2' },
        { value: 'option3', label: 'Опция 3', description: 'Описание опции 3' }
      ]
      return { selected, options }
    },
    template: `
      <RadioGroup v-model="selected" :options="options">
        <template #option="{ option, checked }">
          <div style="display: flex; flex-direction: column;">
            <span style="font-weight: 500;">{{ option.label }}</span>
            <span style="font-size: 0.875rem; color: #6b7280;">{{ option.description }}</span>
          </div>
        </template>
      </RadioGroup>
    `
  })
}