import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import Checkbox from './Checkbox.vue'

const meta: Meta<typeof Checkbox> = {
  title: 'UI/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    modelValue: {
      control: 'boolean',
      description: 'Состояние чекбокса (v-model)'
    },
    size: {
      control: 'select',
      options: ['m', 'l'],
      description: 'Размер чекбокса'
    },
    indeterminate: {
      control: 'boolean',
      description: 'Промежуточное состояние (частичный выбор)'
    },
    disabled: {
      control: 'boolean',
      description: 'Отключенное состояние'
    },
    label: {
      control: 'text',
      description: 'Текст лейбла'
    },
    required: {
      control: 'boolean',
      description: 'Обязательное поле'
    },
    name: {
      control: 'text',
      description: 'Имя поля (для форм)'
    },
    value: {
      control: 'text',
      description: 'Значение (для форм)'
    }
  }
}

export default meta
type Story = StoryObj<typeof Checkbox>

// Базовый пример
export const Default: Story = {
  args: {
    modelValue: false,
    size: 'm',
    label: 'Подписаться на рассылку'
  },
  render: (args) => ({
    components: { Checkbox },
    setup() {
      const checked = ref(args.modelValue)
      return { args, checked }
    },
    template: '<Checkbox v-model="checked" v-bind="args" />'
  })
}

// Размеры
export const SizeM: Story = {
  args: {
    modelValue: false,
    size: 'm',
    label: 'Размер M (14x14px, шрифт 13px)'
  },
  render: (args) => ({
    components: { Checkbox },
    setup() {
      const checked = ref(false)
      return { args, checked }
    },
    template: '<Checkbox v-model="checked" v-bind="args" />'
  })
}

export const SizeL: Story = {
  args: {
    modelValue: false,
    size: 'l',
    label: 'Размер L (17x17px, шрифт 15px)'
  },
  render: (args) => ({
    components: { Checkbox },
    setup() {
      const checked = ref(false)
      return { args, checked }
    },
    template: '<Checkbox v-model="checked" v-bind="args" />'
  })
}

// Состояния
export const Checked: Story = {
  args: {
    modelValue: true,
    size: 'm',
    label: 'Выбранный чекбокс'
  },
  render: (args) => ({
    components: { Checkbox },
    setup() {
      const checked = ref(true)
      return { args, checked }
    },
    template: '<Checkbox v-model="checked" v-bind="args" />'
  })
}

export const Disabled: Story = {
  args: {
    modelValue: false,
    size: 'm',
    label: 'Отключенный чекбокс',
    disabled: true
  },
  render: (args) => ({
    components: { Checkbox },
    setup() {
      const checked = ref(false)
      return { args, checked }
    },
    template: '<Checkbox v-model="checked" v-bind="args" />'
  })
}

export const DisabledChecked: Story = {
  args: {
    modelValue: true,
    size: 'm',
    label: 'Отключенный выбранный чекбокс',
    disabled: true
  },
  render: (args) => ({
    components: { Checkbox },
    setup() {
      const checked = ref(true)
      return { args, checked }
    },
    template: '<Checkbox v-model="checked" v-bind="args" />'
  })
}

export const Indeterminate: Story = {
  args: {
    modelValue: false,
    size: 'm',
    label: 'Промежуточное состояние (indeterminate)',
    indeterminate: true
  },
  render: (args) => ({
    components: { Checkbox },
    setup() {
      const checked = ref(false)
      const isIndeterminate = ref(true)
      return { args, checked, isIndeterminate }
    },
    template: '<Checkbox v-model="checked" :indeterminate="isIndeterminate" v-bind="args" />'
  })
}

export const IndeterminateChecked: Story = {
  args: {
    modelValue: true,
    size: 'm',
    label: 'Indeterminate с checked',
    indeterminate: true
  },
  render: (args) => ({
    components: { Checkbox },
    setup() {
      const checked = ref(true)
      const isIndeterminate = ref(true)
      return { args, checked, isIndeterminate }
    },
    template: '<Checkbox v-model="checked" :indeterminate="isIndeterminate" v-bind="args" />'
  })
}

// Без лейбла
export const WithoutLabel: Story = {
  args: {
    modelValue: false,
    size: 'm'
  },
  render: (args) => ({
    components: { Checkbox },
    setup() {
      const checked = ref(false)
      return { args, checked }
    },
    template: '<Checkbox v-model="checked" v-bind="args" />'
  })
}

// С кастомным лейблом
export const WithCustomLabel: Story = {
  args: {
    modelValue: false,
    size: 'm'
  },
  render: (args) => ({
    components: { Checkbox },
    setup() {
      const checked = ref(false)
      return { args, checked }
    },
    template: `
      <Checkbox v-model="checked" v-bind="args">
        <template #label>
          <span style="font-weight: 600; color: var(--color-primary);">
            Кастомный лейбл
          </span>
        </template>
      </Checkbox>
    `
  })
}

// С кастомной иконкой
export const WithCustomIcon: Story = {
  args: {
    modelValue: true,
    size: 'm',
    label: 'С кастомной иконкой'
  },
  render: (args) => ({
    components: { Checkbox },
    setup() {
      const checked = ref(true)
      return { args, checked }
    },
    template: `
      <Checkbox v-model="checked" v-bind="args">
        <template #icon>
          <span style="color: white; font-size: 0.75rem;">✓</span>
        </template>
      </Checkbox>
    `
  })
}

// В форме
export const InForm: Story = {
  args: {
    modelValue: false,
    size: 'm',
    label: 'Я согласен с условиями использования',
    required: true,
    name: 'agree'
  },
  render: (args) => ({
    components: { Checkbox },
    setup() {
      const agree = ref(false)
      return { args, agree }
    },
    template: `
      <form @submit.prevent="() => {}" style="max-width: 400px;">
        <div style="margin-bottom: 1rem;">
          <Checkbox v-model="agree" v-bind="args" />
        </div>
        <button type="submit" :disabled="!agree" style="padding: 0.5rem 1rem; background: var(--color-primary); color: white; border: none; border-radius: 4px;">
          Отправить
        </button>
      </form>
    `
  })
}

// Группа чекбоксов
export const CheckboxGroup: Story = {
  render: () => ({
    components: { Checkbox },
    setup() {
      const options = ref([
        { id: '1', label: 'Опция 1', checked: false },
        { id: '2', label: 'Опция 2', checked: false },
        { id: '3', label: 'Опция 3', checked: false }
      ])
      const selectAll = ref(false)
      const isIndeterminate = ref(false)

      const toggleSelectAll = () => {
        const allChecked = options.value.every(opt => opt.checked)
        const newValue = !allChecked
        options.value.forEach(opt => {
          opt.checked = newValue
        })
        selectAll.value = newValue
        isIndeterminate.value = false
      }

      const toggleOption = (option: any) => {
        option.checked = !option.checked
        const checkedCount = options.value.filter(opt => opt.checked).length
        selectAll.value = checkedCount === options.value.length
        isIndeterminate.value = checkedCount > 0 && checkedCount < options.value.length
      }

      return { options, selectAll, isIndeterminate, toggleSelectAll, toggleOption }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 0.75rem; max-width: 400px;">
        <Checkbox 
          :model-value="selectAll"
          :indeterminate="isIndeterminate"
          label="Выбрать все"
          @update:model-value="toggleSelectAll"
        />
        <div style="margin-left: 1.5rem; display: flex; flex-direction: column; gap: 0.5rem;">
          <Checkbox
            v-for="option in options"
            :key="option.id"
            :model-value="option.checked"
            :label="option.label"
            @update:model-value="() => toggleOption(option)"
          />
        </div>
      </div>
    `
  })
}

// Все размеры вместе
export const AllSizes: Story = {
  render: () => ({
    components: { Checkbox },
    setup() {
      const checkedM = ref(false)
      const checkedL = ref(false)
      return { checkedM, checkedL }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <Checkbox v-model="checkedM" size="m" label="Размер M (14x14px)" />
        <Checkbox v-model="checkedL" size="l" label="Размер L (17x17px)" />
      </div>
    `
  })
}

// Все состояния вместе
export const AllStates: Story = {
  render: () => ({
    components: { Checkbox },
    setup() {
      const checked1 = ref(false)
      const checked2 = ref(true)
      const checked3 = ref(false)
      const checked4 = ref(true)
      const checked5 = ref(false)
      const isIndeterminate = ref(true)
      return { checked1, checked2, checked3, checked4, checked5, isIndeterminate }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <Checkbox v-model="checked1" label="Default (не выбран)" />
        <Checkbox v-model="checked2" label="Checked (выбран)" />
        <Checkbox v-model="checked3" label="Disabled (не выбран)" :disabled="true" />
        <Checkbox v-model="checked4" label="Disabled (выбран)" :disabled="true" />
        <Checkbox 
          v-model="checked5" 
          :indeterminate="isIndeterminate"
          label="Indeterminate (промежуточное)" 
        />
      </div>
    `
  })
}

// Примеры использования
export const UsageExamples: Story = {
  render: () => ({
    components: { Checkbox },
    setup() {
      const newsletter = ref(false)
      const terms = ref(false)
      const notifications = ref(true)
      return { newsletter, terms, notifications }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1.5rem; max-width: 500px;">
        <div>
          <h3 style="margin-bottom: 0.75rem; font-size: 1rem;">Настройки уведомлений</h3>
          <div style="display: flex; flex-direction: column; gap: 0.75rem;">
            <Checkbox v-model="newsletter" label="Подписаться на рассылку" />
            <Checkbox v-model="terms" label="Принять условия использования" required />
            <Checkbox v-model="notifications" label="Получать уведомления" />
          </div>
        </div>
      </div>
    `
  })
}

// Таблица с чекбоксами
export const InTable: Story = {
  render: () => ({
    components: { Checkbox },
    setup() {
      const items = ref([
        { id: 1, name: 'Элемент 1', selected: false },
        { id: 2, name: 'Элемент 2', selected: false },
        { id: 3, name: 'Элемент 3', selected: false }
      ])
      const selectAll = ref(false)
      const isIndeterminate = ref(false)

      const toggleSelectAll = () => {
        const newValue = !selectAll.value
        items.value.forEach(item => {
          item.selected = newValue
        })
        selectAll.value = newValue
        isIndeterminate.value = false
      }

      const toggleItem = (item: any) => {
        item.selected = !item.selected
        const selectedCount = items.value.filter(i => i.selected).length
        selectAll.value = selectedCount === items.value.length
        isIndeterminate.value = selectedCount > 0 && selectedCount < items.value.length
      }

      return { items, selectAll, isIndeterminate, toggleSelectAll, toggleItem }
    },
    template: `
      <div style="max-width: 600px;">
        <table style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr style="border-bottom: 1px solid var(--color-border);">
              <th style="padding: 0.75rem; text-align: left;">
                <Checkbox 
                  :model-value="selectAll"
                  :indeterminate="isIndeterminate"
                  @update:model-value="toggleSelectAll"
                />
              </th>
              <th style="padding: 0.75rem; text-align: left;">Название</th>
            </tr>
          </thead>
          <tbody>
            <tr 
              v-for="item in items" 
              :key="item.id"
              style="border-bottom: 1px solid var(--color-border);"
            >
              <td style="padding: 0.75rem;">
                <Checkbox 
                  :model-value="item.selected"
                  @update:model-value="() => toggleItem(item)"
                />
              </td>
              <td style="padding: 0.75rem;">{{ item.name }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    `
  })
}