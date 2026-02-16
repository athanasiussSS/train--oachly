import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import Radio from './Radio.vue'

const meta: Meta<typeof Radio> = {
  title: 'UI/Radio',
  component: Radio,
  tags: ['autodocs'],
  argTypes: {
    modelValue: {
      control: 'text',
      description: 'Выбранное значение (v-model)'
    },
    value: {
      control: 'text',
      description: 'Значение radio (обязательно)'
    },
    size: {
      control: 'select',
      options: ['m', 'l'],
      description: 'Размер radio'
    },
    disabled: {
      control: 'boolean',
      description: 'Отключенное состояние'
    },
    label: {
      control: 'text',
      description: 'Текст лейбла'
    },
    name: {
      control: 'text',
      description: 'Имя группы (для группировки)'
    },
    required: {
      control: 'boolean',
      description: 'Обязательное поле'
    }
  }
}

export default meta
type Story = StoryObj<typeof Radio>

// Базовый пример (группа)
export const Default: Story = {
  render: () => ({
    components: { Radio },
    setup() {
      const selected = ref('option1')
      return { selected }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 0.75rem;">
        <Radio v-model="selected" value="option1" label="Опция 1" name="group1" />
        <Radio v-model="selected" value="option2" label="Опция 2" name="group1" />
        <Radio v-model="selected" value="option3" label="Опция 3" name="group1" />
      </div>
    `
  })
}

// Размеры
export const SizeM: Story = {
  render: () => ({
    components: { Radio },
    setup() {
      const selected = ref('option1')
      return { selected }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 0.75rem;">
        <Radio v-model="selected" value="option1" label="Размер M" name="group-m" size="m" />
        <Radio v-model="selected" value="option2" label="Размер M" name="group-m" size="m" />
        <Radio v-model="selected" value="option3" label="Размер M" name="group-m" size="m" />
      </div>
    `
  })
}

export const SizeL: Story = {
  render: () => ({
    components: { Radio },
    setup() {
      const selected = ref('option1')
      return { selected }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 0.75rem;">
        <Radio v-model="selected" value="option1" label="Размер L" name="group-l" size="l" />
        <Radio v-model="selected" value="option2" label="Размер L" name="group-l" size="l" />
        <Radio v-model="selected" value="option3" label="Размер L" name="group-l" size="l" />
      </div>
    `
  })
}

// Состояния
export const Checked: Story = {
  render: () => ({
    components: { Radio },
    setup() {
      const selected = ref('option2')
      return { selected }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 0.75rem;">
        <Radio v-model="selected" value="option1" label="Опция 1" name="group-checked" />
        <Radio v-model="selected" value="option2" label="Опция 2 (выбрана)" name="group-checked" />
        <Radio v-model="selected" value="option3" label="Опция 3" name="group-checked" />
      </div>
    `
  })
}

export const Disabled: Story = {
  render: () => ({
    components: { Radio },
    setup() {
      const selected = ref('option1')
      return { selected }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 0.75rem;">
        <Radio v-model="selected" value="option1" label="Опция 1" name="group-disabled" />
        <Radio v-model="selected" value="option2" label="Опция 2 (отключена)" name="group-disabled" :disabled="true" />
        <Radio v-model="selected" value="option3" label="Опция 3" name="group-disabled" />
      </div>
    `
  })
}

export const DisabledChecked: Story = {
  render: () => ({
    components: { Radio },
    setup() {
      const selected = ref('option2')
      return { selected }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 0.75rem;">
        <Radio v-model="selected" value="option1" label="Опция 1" name="group-disabled-checked" />
        <Radio v-model="selected" value="option2" label="Опция 2 (выбрана и отключена)" name="group-disabled-checked" :disabled="true" />
        <Radio v-model="selected" value="option3" label="Опция 3" name="group-disabled-checked" />
      </div>
    `
  })
}

// Все состояния вместе
export const AllStates: Story = {
  render: () => ({
    components: { Radio },
    setup() {
      const selected1 = ref('option1')
      const selected2 = ref('option2')
      const selected3 = ref('option1')
      return { selected1, selected2, selected3 }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1.5rem;">
        <div>
          <h3 style="margin-bottom: 0.75rem; font-size: 1rem;">Default</h3>
          <div style="display: flex; flex-direction: column; gap: 0.75rem;">
            <Radio v-model="selected1" value="option1" label="Опция 1" name="group-default" />
            <Radio v-model="selected1" value="option2" label="Опция 2" name="group-default" />
            <Radio v-model="selected1" value="option3" label="Опция 3" name="group-default" />
          </div>
        </div>
        <div>
          <h3 style="margin-bottom: 0.75rem; font-size: 1rem;">Checked</h3>
          <div style="display: flex; flex-direction: column; gap: 0.75rem;">
            <Radio v-model="selected2" value="option1" label="Опция 1" name="group-checked" />
            <Radio v-model="selected2" value="option2" label="Опция 2 (выбрана)" name="group-checked" />
            <Radio v-model="selected2" value="option3" label="Опция 3" name="group-checked" />
          </div>
        </div>
        <div>
          <h3 style="margin-bottom: 0.75rem; font-size: 1rem;">Disabled</h3>
          <div style="display: flex; flex-direction: column; gap: 0.75rem;">
            <Radio v-model="selected3" value="option1" label="Опция 1" name="group-disabled" />
            <Radio v-model="selected3" value="option2" label="Опция 2 (отключена)" name="group-disabled" :disabled="true" />
            <Radio v-model="selected3" value="option3" label="Опция 3" name="group-disabled" />
          </div>
        </div>
      </div>
    `
  })
}

// С кастомным лейблом
export const WithCustomLabel: Story = {
  render: () => ({
    components: { Radio },
    setup() {
      const selected = ref('option1')
      return { selected }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 0.75rem;">
        <Radio v-model="selected" value="option1" name="group-custom">
          <template #label>
            <span style="font-weight: 600; color: var(--color-primary);">
              Кастомный лейбл 1
            </span>
          </template>
        </Radio>
        <Radio v-model="selected" value="option2" name="group-custom">
          <template #label>
            <span style="font-weight: 600; color: var(--color-primary);">
              Кастомный лейбл 2
            </span>
          </template>
        </Radio>
      </div>
    `
  })
}

// В форме
export const InForm: Story = {
  render: () => ({
    components: { Radio },
    setup() {
      const form = ref({
        type: 'type1'
      })
      return { form }
    },
    template: `
      <form @submit.prevent="() => {}" style="max-width: 400px;">
        <div style="margin-bottom: 1rem;">
          <h3 style="margin-bottom: 0.75rem; font-size: 1rem;">Выберите тип:</h3>
          <div style="display: flex; flex-direction: column; gap: 0.75rem;">
            <Radio v-model="form.type" value="type1" label="Тип 1" name="type" required />
            <Radio v-model="form.type" value="type2" label="Тип 2" name="type" required />
            <Radio v-model="form.type" value="type3" label="Тип 3" name="type" required />
          </div>
        </div>
        <button type="submit" style="padding: 0.5rem 1rem; background: var(--color-primary); color: white; border: none; border-radius: 4px;">
          Отправить
        </button>
      </form>
    `
  })
}

// Горизонтальная группа
export const HorizontalGroup: Story = {
  render: () => ({
    components: { Radio },
    setup() {
      const selected = ref('option1')
      return { selected }
    },
    template: `
      <div style="display: flex; gap: 1.5rem;">
        <Radio v-model="selected" value="option1" label="Опция 1" name="group-horizontal" />
        <Radio v-model="selected" value="option2" label="Опция 2" name="group-horizontal" />
        <Radio v-model="selected" value="option3" label="Опция 3" name="group-horizontal" />
      </div>
    `
  })
}

// Все размеры вместе
export const AllSizes: Story = {
  render: () => ({
    components: { Radio },
    setup() {
      const selectedM = ref('option1')
      const selectedL = ref('option1')
      return { selectedM, selectedL }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1.5rem;">
        <div>
          <h3 style="margin-bottom: 0.75rem; font-size: 1rem;">Размер M</h3>
          <div style="display: flex; flex-direction: column; gap: 0.75rem;">
            <Radio v-model="selectedM" value="option1" label="Опция 1" name="group-m" size="m" />
            <Radio v-model="selectedM" value="option2" label="Опция 2" name="group-m" size="m" />
            <Radio v-model="selectedM" value="option3" label="Опция 3" name="group-m" size="m" />
          </div>
        </div>
        <div>
          <h3 style="margin-bottom: 0.75rem; font-size: 1rem;">Размер L</h3>
          <div style="display: flex; flex-direction: column; gap: 0.75rem;">
            <Radio v-model="selectedL" value="option1" label="Опция 1" name="group-l" size="l" />
            <Radio v-model="selectedL" value="option2" label="Опция 2" name="group-l" size="l" />
            <Radio v-model="selectedL" value="option3" label="Опция 3" name="group-l" size="l" />
          </div>
        </div>
      </div>
    `
  })
}

// Примеры использования
export const UsageExamples: Story = {
  render: () => ({
    components: { Radio },
    setup() {
      const paymentMethod = ref('card')
      const deliveryType = ref('express')
      return { paymentMethod, deliveryType }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 2rem; max-width: 500px;">
        <div>
          <h3 style="margin-bottom: 0.75rem; font-size: 1rem;">Способ оплаты:</h3>
          <div style="display: flex; flex-direction: column; gap: 0.75rem;">
            <Radio v-model="paymentMethod" value="card" label="Банковская карта" name="payment" />
            <Radio v-model="paymentMethod" value="cash" label="Наличные" name="payment" />
            <Radio v-model="paymentMethod" value="online" label="Онлайн-платеж" name="payment" />
          </div>
        </div>
        <div>
          <h3 style="margin-bottom: 0.75rem; font-size: 1rem;">Тип доставки:</h3>
          <div style="display: flex; flex-direction: column; gap: 0.75rem;">
            <Radio v-model="deliveryType" value="standard" label="Стандартная доставка" name="delivery" />
            <Radio v-model="deliveryType" value="express" label="Экспресс-доставка" name="delivery" />
            <Radio v-model="deliveryType" value="pickup" label="Самовывоз" name="delivery" />
          </div>
        </div>
      </div>
    `
  })
}

// С первым выбранным (рекомендуется)
export const WithFirstSelected: Story = {
  render: () => ({
    components: { Radio },
    setup() {
      // Рекомендуется всегда выбирать первый вариант
      const selected = ref('option1')
      return { selected }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 0.75rem;">
        <Radio v-model="selected" value="option1" label="Опция 1 (выбрана по умолчанию)" name="group-first" />
        <Radio v-model="selected" value="option2" label="Опция 2" name="group-first" />
        <Radio v-model="selected" value="option3" label="Опция 3" name="group-first" />
      </div>
    `
  })
}

// Без выбранного (опционально)
export const WithoutSelected: Story = {
  render: () => ({
    components: { Radio },
    setup() {
      // Опционально можно оставлять в невыбранном состоянии
      const selected = ref(null)
      return { selected }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 0.75rem;">
        <Radio v-model="selected" value="option1" label="Опция 1" name="group-none" />
        <Radio v-model="selected" value="option2" label="Опция 2" name="group-none" />
        <Radio v-model="selected" value="option3" label="Опция 3" name="group-none" />
        <p style="margin-top: 0.5rem; font-size: 0.875rem; color: var(--color-text-muted);">
          Ничего не выбрано
        </p>
      </div>
    `
  })
}