import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import Select from './Select.vue'

const meta: Meta<typeof Select> = {
  title: 'UI/Select',
  component: Select,
  tags: ['autodocs'],
  argTypes: {
    modelValue: {
      control: 'text',
      description: 'Выбранное значение (v-model)'
    },
    mode: {
      control: 'select',
      options: ['single', 'multiple'],
      description: 'Режим выбора'
    },
    variant: {
      control: 'select',
      options: ['normal', 'clear'],
      description: 'Вариант отображения'
    },
    size: {
      control: 'select',
      options: ['s', 'm', 'l', 'xl'],
      description: 'Размер select'
    },
    error: {
      control: ['boolean', 'text'],
      description: 'Наличие ошибки (boolean или текст ошибки)'
    },
    errorMessage: {
      control: 'text',
      description: 'Текст сообщения об ошибке'
    },
    errorMode: {
      control: 'select',
      options: ['inline', 'outline'],
      description: 'Режим отображения ошибки'
    },
    clearable: {
      control: 'boolean',
      description: 'Показывать кнопку очистки'
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder текст'
    },
    disabled: {
      control: 'boolean',
      description: 'Отключенное состояние'
    },
    required: {
      control: 'boolean',
      description: 'Обязательное поле'
    },
    label: {
      control: 'text',
      description: 'Текст label'
    }
  }
}

export default meta
type Story = StoryObj<typeof Select>

// Базовые опции для примеров
const basicOptions = [
  { value: '1', label: 'Опция 1' },
  { value: '2', label: 'Опция 2' },
  { value: '3', label: 'Опция 3' },
  { value: '4', label: 'Опция 4' },
  { value: '5', label: 'Опция 5' }
]

const optionsWithDisabled = [
  { value: '1', label: 'Опция 1' },
  { value: '2', label: 'Опция 2 (отключена)', disabled: true },
  { value: '3', label: 'Опция 3' },
  { value: '4', label: 'Опция 4 (отключена)', disabled: true },
  { value: '5', label: 'Опция 5' }
]

const manyOptions = Array.from({ length: 20 }, (_, i) => ({
  value: String(i + 1),
  label: `Опция ${i + 1}`
}))

// Базовый пример
export const Default: Story = {
  args: {
    modelValue: null,
    mode: 'single',
    options: basicOptions,
    variant: 'normal',
    size: 'm',
    placeholder: 'Выберите значение...',
    clearable: true
  },
  render: (args) => ({
    components: { Select },
    setup() {
      const value = ref(args.modelValue)
      return { args, value }
    },
    template: '<Select v-model="value" v-bind="args" />'
  })
}

// Варианты
export const Normal: Story = {
  args: {
    modelValue: null,
    mode: 'single',
    options: basicOptions,
    variant: 'normal',
    size: 'm',
    placeholder: 'Normal вариант'
  },
  render: (args) => ({
    components: { Select },
    setup() {
      const value = ref(null)
      return { args, value }
    },
    template: '<Select v-model="value" v-bind="args" />'
  })
}

export const Clear: Story = {
  args: {
    modelValue: null,
    mode: 'single',
    options: basicOptions,
    variant: 'clear',
    size: 'm',
    placeholder: 'Clear вариант'
  },
  render: (args) => ({
    components: { Select },
    setup() {
      const value = ref(null)
      return { args, value }
    },
    template: '<Select v-model="value" v-bind="args" />'
  })
}

// Размеры
export const SizeS: Story = {
  args: {
    modelValue: null,
    mode: 'single',
    options: basicOptions,
    variant: 'normal',
    size: 's',
    placeholder: 'Размер S'
  },
  render: (args) => ({
    components: { Select },
    setup() {
      const value = ref(null)
      return { args, value }
    },
    template: '<Select v-model="value" v-bind="args" />'
  })
}

export const SizeM: Story = {
  args: {
    modelValue: null,
    mode: 'single',
    options: basicOptions,
    variant: 'normal',
    size: 'm',
    placeholder: 'Размер M'
  },
  render: (args) => ({
    components: { Select },
    setup() {
      const value = ref(null)
      return { args, value }
    },
    template: '<Select v-model="value" v-bind="args" />'
  })
}

export const SizeL: Story = {
  args: {
    modelValue: null,
    mode: 'single',
    options: basicOptions,
    variant: 'normal',
    size: 'l',
    placeholder: 'Размер L'
  },
  render: (args) => ({
    components: { Select },
    setup() {
      const value = ref(null)
      return { args, value }
    },
    template: '<Select v-model="value" v-bind="args" />'
  })
}

export const SizeXl: Story = {
  args: {
    modelValue: null,
    mode: 'single',
    options: basicOptions,
    variant: 'normal',
    size: 'xl',
    placeholder: 'Размер XL'
  },
  render: (args) => ({
    components: { Select },
    setup() {
      const value = ref(null)
      return { args, value }
    },
    template: '<Select v-model="value" v-bind="args" />'
  })
}

// Режимы
export const Single: Story = {
  args: {
    modelValue: null,
    mode: 'single',
    options: basicOptions,
    variant: 'normal',
    size: 'm',
    placeholder: 'Выберите одно значение'
  },
  render: (args) => ({
    components: { Select },
    setup() {
      const value = ref(null)
      return { args, value }
    },
    template: '<Select v-model="value" v-bind="args" />'
  })
}

export const Multiple: Story = {
  args: {
    modelValue: [],
    mode: 'multiple',
    options: basicOptions,
    variant: 'normal',
    size: 'm',
    placeholder: 'Выберите несколько значений'
  },
  render: (args) => ({
    components: { Select },
    setup() {
      const value = ref([])
      return { args, value }
    },
    template: '<Select v-model="value" v-bind="args" />'
  })
}

// Состояния
export const Disabled: Story = {
  args: {
    modelValue: '1',
    mode: 'single',
    options: basicOptions,
    variant: 'normal',
    size: 'm',
    disabled: true
  },
  render: (args) => ({
    components: { Select },
    setup() {
      const value = ref(args.modelValue)
      return { args, value }
    },
    template: '<Select v-model="value" v-bind="args" />'
  })
}

export const WithSelectedValue: Story = {
  args: {
    modelValue: '2',
    mode: 'single',
    options: basicOptions,
    variant: 'normal',
    size: 'm',
    placeholder: 'Выберите значение...'
  },
  render: (args) => ({
    components: { Select },
    setup() {
      const value = ref(args.modelValue)
      return { args, value }
    },
    template: '<Select v-model="value" v-bind="args" />'
  })
}

export const MultipleWithSelected: Story = {
  args: {
    modelValue: ['1', '3'],
    mode: 'multiple',
    options: basicOptions,
    variant: 'normal',
    size: 'm',
    placeholder: 'Выберите значения...'
  },
  render: (args) => ({
    components: { Select },
    setup() {
      const value = ref(args.modelValue)
      return { args, value }
    },
    template: '<Select v-model="value" v-bind="args" />'
  })
}

export const Required: Story = {
  args: {
    modelValue: null,
    mode: 'single',
    options: basicOptions,
    variant: 'normal',
    size: 'm',
    placeholder: 'Обязательное поле',
    required: true
  },
  render: (args) => ({
    components: { Select },
    setup() {
      const value = ref(null)
      return { args, value }
    },
    template: '<Select v-model="value" v-bind="args" />'
  })
}

// Валидация
export const ErrorInline: Story = {
  args: {
    modelValue: '1',
    mode: 'single',
    options: basicOptions,
    variant: 'normal',
    size: 'm',
    error: true,
    errorMessage: 'Поле обязательно для заполнения',
    errorMode: 'inline'
  },
  render: (args) => ({
    components: { Select },
    setup() {
      const value = ref(args.modelValue)
      return { args, value }
    },
    template: '<Select v-model="value" v-bind="args" />'
  })
}

export const ErrorOutline: Story = {
  args: {
    modelValue: null,
    mode: 'single',
    options: basicOptions,
    variant: 'normal',
    size: 'm',
    error: true,
    errorMessage: 'Поле обязательно для заполнения',
    errorMode: 'outline'
  },
  render: (args) => ({
    components: { Select },
    setup() {
      const value = ref(null)
      return { args, value }
    },
    template: '<Select v-model="value" v-bind="args" />'
  })
}

export const ErrorAsString: Story = {
  args: {
    modelValue: '1',
    mode: 'single',
    options: basicOptions,
    variant: 'normal',
    size: 'm',
    error: 'Поле содержит недопустимое значение',
    errorMode: 'outline'
  },
  render: (args) => ({
    components: { Select },
    setup() {
      const value = ref(args.modelValue)
      return { args, value }
    },
    template: '<Select v-model="value" v-bind="args" />'
  })
}

export const ErrorClear: Story = {
  args: {
    modelValue: '1',
    mode: 'single',
    options: basicOptions,
    variant: 'clear',
    size: 'm',
    error: true,
    errorMessage: 'Поле обязательно для заполнения',
    errorMode: 'inline'
  },
  render: (args) => ({
    components: { Select },
    setup() {
      const value = ref(args.modelValue)
      return { args, value }
    },
    template: '<Select v-model="value" v-bind="args" />'
  })
}

// С label
export const WithLabel: Story = {
  args: {
    modelValue: null,
    mode: 'single',
    options: basicOptions,
    variant: 'normal',
    size: 'm',
    label: 'Выберите опцию',
    placeholder: 'Выберите значение...'
  },
  render: (args) => ({
    components: { Select },
    setup() {
      const value = ref(null)
      return { args, value }
    },
    template: '<Select v-model="value" v-bind="args" />'
  })
}

export const WithCustomLabel: Story = {
  args: {
    modelValue: null,
    mode: 'single',
    options: basicOptions,
    variant: 'normal',
    size: 'm',
    placeholder: 'Выберите значение...'
  },
  render: (args) => ({
    components: { Select },
    setup() {
      const value = ref(null)
      return { args, value }
    },
    template: `
      <Select v-model="value" v-bind="args">
        <template #label>
          <span style="font-weight: 600;">Кастомный Label</span>
        </template>
      </Select>
    `
  })
}

// С hint
export const WithHint: Story = {
  args: {
    modelValue: null,
    mode: 'single',
    options: basicOptions,
    variant: 'normal',
    size: 'm',
    label: 'Выберите опцию',
    placeholder: 'Выберите значение...'
  },
  render: (args) => ({
    components: { Select },
    setup() {
      const value = ref(null)
      return { args, value }
    },
    template: `
      <Select v-model="value" v-bind="args">
        <template #hint>
          Выберите одну из доступных опций
        </template>
      </Select>
    `
  })
}

// Без кнопки очистки
export const WithoutClear: Story = {
  args: {
    modelValue: '1',
    mode: 'single',
    options: basicOptions,
    variant: 'normal',
    size: 'm',
    clearable: false
  },
  render: (args) => ({
    components: { Select },
    setup() {
      const value = ref(args.modelValue)
      return { args, value }
    },
    template: '<Select v-model="value" v-bind="args" />'
  })
}

// С отключенными опциями
export const WithDisabledOptions: Story = {
  args: {
    modelValue: null,
    mode: 'single',
    options: optionsWithDisabled,
    variant: 'normal',
    size: 'm',
    placeholder: 'Некоторые опции отключены'
  },
  render: (args) => ({
    components: { Select },
    setup() {
      const value = ref(null)
      return { args, value }
    },
    template: '<Select v-model="value" v-bind="args" />'
  })
}

// Много опций
export const ManyOptions: Story = {
  args: {
    modelValue: null,
    mode: 'single',
    options: manyOptions,
    variant: 'normal',
    size: 'm',
    placeholder: 'Выберите из 20 опций...'
  },
  render: (args) => ({
    components: { Select },
    setup() {
      const value = ref(null)
      return { args, value }
    },
    template: '<Select v-model="value" v-bind="args" />'
  })
}

// Кастомный рендер опций
export const CustomOptionRender: Story = {
  args: {
    modelValue: null,
    mode: 'single',
    options: [
      { value: '1', label: 'Опция 1', description: 'Описание опции 1' },
      { value: '2', label: 'Опция 2', description: 'Описание опции 2' },
      { value: '3', label: 'Опция 3', description: 'Описание опции 3' }
    ],
    variant: 'normal',
    size: 'm',
    placeholder: 'Выберите значение...'
  },
  render: (args) => ({
    components: { Select },
    setup() {
      const value = ref(null)
      return { args, value }
    },
    template: `
      <Select v-model="value" v-bind="args">
        <template #option="{ option, selected }">
          <div style="display: flex; flex-direction: column;">
            <span style="font-weight: 500;">{{ option.label }}</span>
            <span style="font-size: 0.875rem; color: #6b7280;">{{ option.description }}</span>
          </div>
        </template>
      </Select>
    `
  })
}

// Полный пример
export const FullExample: Story = {
  args: {
    modelValue: null,
    mode: 'single',
    options: basicOptions,
    variant: 'normal',
    size: 'm',
    placeholder: 'Выберите опцию...',
    required: true,
    clearable: true
  },
  render: (args) => ({
    components: { Select },
    setup() {
      const value = ref(null)
      return { args, value }
    },
    template: `
      <div style="max-width: 400px;">
        <Select v-model="value" v-bind="args" label="Выберите опцию">
          <template #hint>
            Выберите одну из доступных опций. Поле обязательно для заполнения.
          </template>
        </Select>
      </div>
    `
  })
}

// Все размеры вместе
export const AllSizes: Story = {
  render: () => ({
    components: { Select },
    setup() {
      const valueS = ref(null)
      const valueM = ref(null)
      const valueL = ref(null)
      const valueXl = ref(null)
      return { valueS, valueM, valueL, valueXl, basicOptions }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 400px;">
        <Select v-model="valueS" :options="basicOptions" variant="normal" size="s" placeholder="Размер S" />
        <Select v-model="valueM" :options="basicOptions" variant="normal" size="m" placeholder="Размер M" />
        <Select v-model="valueL" :options="basicOptions" variant="normal" size="l" placeholder="Размер L" />
        <Select v-model="valueXl" :options="basicOptions" variant="normal" size="xl" placeholder="Размер XL" />
      </div>
    `
  })
}

// Все варианты вместе
export const AllVariants: Story = {
  render: () => ({
    components: { Select },
    setup() {
      const valueNormal = ref(null)
      const valueClear = ref(null)
      return { valueNormal, valueClear, basicOptions }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 400px;">
        <Select v-model="valueNormal" :options="basicOptions" variant="normal" size="m" placeholder="Normal вариант" />
        <Select v-model="valueClear" :options="basicOptions" variant="clear" size="m" placeholder="Clear вариант" />
      </div>
    `
  })
}

// Режимы вместе
export const ModesComparison: Story = {
  render: () => ({
    components: { Select },
    setup() {
      const valueSingle = ref(null)
      const valueMultiple = ref([])
      return { valueSingle, valueMultiple, basicOptions }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 400px;">
        <div>
          <h3 style="margin-bottom: 0.5rem; font-size: 1rem;">Single режим</h3>
          <Select 
            v-model="valueSingle" 
            :options="basicOptions" 
            mode="single"
            variant="normal" 
            size="m" 
            placeholder="Выберите одно значение"
          />
        </div>
        <div>
          <h3 style="margin-bottom: 0.5rem; font-size: 1rem;">Multiple режим</h3>
          <Select 
            v-model="valueMultiple" 
            :options="basicOptions" 
            mode="multiple"
            variant="normal" 
            size="m" 
            placeholder="Выберите несколько значений"
          />
        </div>
      </div>
    `
  })
}

// Состояния вместе
export const AllStates: Story = {
  render: () => ({
    components: { Select },
    setup() {
      const valueDefault = ref(null)
      const valueSelected = ref('1')
      const valueDisabled = ref('1')
      const valueError = ref(null)
      return { valueDefault, valueSelected, valueDisabled, valueError, basicOptions }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 400px;">
        <Select v-model="valueDefault" :options="basicOptions" variant="normal" size="m" placeholder="Default" />
        <Select v-model="valueSelected" :options="basicOptions" variant="normal" size="m" placeholder="С выбранным значением" />
        <Select v-model="valueDisabled" :options="basicOptions" variant="normal" size="m" :disabled="true" />
        <Select 
          v-model="valueError" 
          :options="basicOptions" 
          variant="normal" 
          size="m" 
          :error="true" 
          error-message="Поле обязательно для заполнения"
          error-mode="outline"
        />
      </div>
    `
  })
}

// Режимы ошибок
export const ErrorModes: Story = {
  render: () => ({
    components: { Select },
    setup() {
      const valueInline = ref('1')
      const valueOutline = ref(null)
      return { valueInline, valueOutline, basicOptions }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 400px;">
        <div>
          <h3 style="margin-bottom: 0.5rem; font-size: 1rem;">Inline ошибка</h3>
          <Select 
            v-model="valueInline" 
            :options="basicOptions" 
            variant="normal" 
            size="m" 
            :error="true" 
            error-message="Ошибка отображается внутри поля"
            error-mode="inline"
          />
        </div>
        <div>
          <h3 style="margin-bottom: 0.5rem; font-size: 1rem;">Outline ошибка</h3>
          <Select 
            v-model="valueOutline" 
            :options="basicOptions" 
            variant="normal" 
            size="m" 
            :error="true" 
            error-message="Ошибка отображается под полем"
            error-mode="outline"
          />
        </div>
      </div>
    `
  })
}