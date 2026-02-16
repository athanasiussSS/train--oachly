import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import TextArea from './TextArea.vue'

const meta: Meta<typeof TextArea> = {
  title: 'UI/TextArea',
  component: TextArea,
  tags: ['autodocs'],
  argTypes: {
    modelValue: {
      control: 'text',
      description: 'Значение textarea (v-model)'
    },
    variant: {
      control: 'select',
      options: ['normal', 'clear'],
      description: 'Вариант отображения'
    },
    size: {
      control: 'select',
      options: ['s', 'm', 'l', 'xl'],
      description: 'Размер textarea'
    },
    rows: {
      control: ['number', 'text'],
      description: 'Количество строк или "auto" для авто-высоты'
    },
    minRows: {
      control: 'number',
      description: 'Минимальное количество строк при авто-высоте'
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
    readonly: {
      control: 'boolean',
      description: 'Только для чтения'
    },
    required: {
      control: 'boolean',
      description: 'Обязательное поле'
    },
    maxLength: {
      control: 'number',
      description: 'Максимальная длина'
    },
    minLength: {
      control: 'number',
      description: 'Минимальная длина'
    },
    label: {
      control: 'text',
      description: 'Текст label'
    }
  }
}

export default meta
type Story = StoryObj<typeof TextArea>

// Базовый пример
export const Default: Story = {
  args: {
    modelValue: '',
    variant: 'normal',
    size: 'm',
    rows: 4,
    placeholder: 'Введите текст...',
    clearable: true
  },
  render: (args) => ({
    components: { TextArea },
    setup() {
      const value = ref(args.modelValue || '')
      return { args, value }
    },
    template: '<TextArea v-model="value" v-bind="args" />'
  })
}

// Варианты
export const Normal: Story = {
  args: {
    modelValue: '',
    variant: 'normal',
    size: 'm',
    rows: 4,
    placeholder: 'Normal вариант'
  },
  render: (args) => ({
    components: { TextArea },
    setup() {
      const value = ref('')
      return { args, value }
    },
    template: '<TextArea v-model="value" v-bind="args" />'
  })
}

export const Clear: Story = {
  args: {
    modelValue: '',
    variant: 'clear',
    size: 'm',
    rows: 4,
    placeholder: 'Clear вариант'
  },
  render: (args) => ({
    components: { TextArea },
    setup() {
      const value = ref('')
      return { args, value }
    },
    template: '<TextArea v-model="value" v-bind="args" />'
  })
}

// Размеры
export const SizeS: Story = {
  args: {
    modelValue: '',
    variant: 'normal',
    size: 's',
    rows: 3,
    placeholder: 'Размер S'
  },
  render: (args) => ({
    components: { TextArea },
    setup() {
      const value = ref('')
      return { args, value }
    },
    template: '<TextArea v-model="value" v-bind="args" />'
  })
}

export const SizeM: Story = {
  args: {
    modelValue: '',
    variant: 'normal',
    size: 'm',
    rows: 4,
    placeholder: 'Размер M'
  },
  render: (args) => ({
    components: { TextArea },
    setup() {
      const value = ref('')
      return { args, value }
    },
    template: '<TextArea v-model="value" v-bind="args" />'
  })
}

export const SizeL: Story = {
  args: {
    modelValue: '',
    variant: 'normal',
    size: 'l',
    rows: 5,
    placeholder: 'Размер L'
  },
  render: (args) => ({
    components: { TextArea },
    setup() {
      const value = ref('')
      return { args, value }
    },
    template: '<TextArea v-model="value" v-bind="args" />'
  })
}

export const SizeXl: Story = {
  args: {
    modelValue: '',
    variant: 'normal',
    size: 'xl',
    rows: 6,
    placeholder: 'Размер XL'
  },
  render: (args) => ({
    components: { TextArea },
    setup() {
      const value = ref('')
      return { args, value }
    },
    template: '<TextArea v-model="value" v-bind="args" />'
  })
}

// Состояния
export const Disabled: Story = {
  args: {
    modelValue: 'Отключенное поле',
    variant: 'normal',
    size: 'm',
    rows: 4,
    disabled: true
  },
  render: (args) => ({
    components: { TextArea },
    setup() {
      const value = ref(args.modelValue)
      return { args, value }
    },
    template: '<TextArea v-model="value" v-bind="args" />'
  })
}

export const Readonly: Story = {
  args: {
    modelValue: 'Только для чтения',
    variant: 'normal',
    size: 'm',
    rows: 4,
    readonly: true
  },
  render: (args) => ({
    components: { TextArea },
    setup() {
      const value = ref(args.modelValue)
      return { args, value }
    },
    template: '<TextArea v-model="value" v-bind="args" />'
  })
}

export const Required: Story = {
  args: {
    modelValue: '',
    variant: 'normal',
    size: 'm',
    rows: 4,
    placeholder: 'Обязательное поле',
    required: true
  },
  render: (args) => ({
    components: { TextArea },
    setup() {
      const value = ref('')
      return { args, value }
    },
    template: '<TextArea v-model="value" v-bind="args" />'
  })
}

// Валидация
export const ErrorInline: Story = {
  args: {
    modelValue: 'Некорректное значение',
    variant: 'normal',
    size: 'm',
    rows: 4,
    error: true,
    errorMessage: 'Поле обязательно для заполнения',
    errorMode: 'inline'
  },
  render: (args) => ({
    components: { TextArea },
    setup() {
      const value = ref(args.modelValue)
      return { args, value }
    },
    template: '<TextArea v-model="value" v-bind="args" />'
  })
}

export const ErrorOutline: Story = {
  args: {
    modelValue: 'Некорректное значение',
    variant: 'normal',
    size: 'm',
    rows: 4,
    error: true,
    errorMessage: 'Поле обязательно для заполнения',
    errorMode: 'outline'
  },
  render: (args) => ({
    components: { TextArea },
    setup() {
      const value = ref(args.modelValue)
      return { args, value }
    },
    template: '<TextArea v-model="value" v-bind="args" />'
  })
}

export const ErrorAsString: Story = {
  args: {
    modelValue: 'Ошибка передана как строка',
    variant: 'normal',
    size: 'm',
    rows: 4,
    error: 'Поле содержит недопустимые символы',
    errorMode: 'outline'
  },
  render: (args) => ({
    components: { TextArea },
    setup() {
      const value = ref(args.modelValue)
      return { args, value }
    },
    template: '<TextArea v-model="value" v-bind="args" />'
  })
}

export const ErrorClear: Story = {
  args: {
    modelValue: 'Ошибка в clear варианте',
    variant: 'clear',
    size: 'm',
    rows: 4,
    error: true,
    errorMessage: 'Поле обязательно для заполнения',
    errorMode: 'inline'
  },
  render: (args) => ({
    components: { TextArea },
    setup() {
      const value = ref(args.modelValue)
      return { args, value }
    },
    template: '<TextArea v-model="value" v-bind="args" />'
  })
}

// Авто-высота
export const AutoResize: Story = {
  args: {
    modelValue: '',
    variant: 'normal',
    size: 'm',
    rows: 'auto',
    minRows: 2,
    placeholder: 'Автоматическая высота (начните вводить текст)'
  },
  render: (args) => ({
    components: { TextArea },
    setup() {
      const value = ref('')
      return { args, value }
    },
    template: '<TextArea v-model="value" v-bind="args" />'
  })
}

export const AutoResizeWithContent: Story = {
  args: {
    modelValue: 'Это текст, который демонстрирует работу авто-высоты. Попробуйте добавить больше текста, и вы увидите, как поле автоматически расширяется.',
    variant: 'normal',
    size: 'm',
    rows: 'auto',
    minRows: 3
  },
  render: (args) => ({
    components: { TextArea },
    setup() {
      const value = ref(args.modelValue)
      return { args, value }
    },
    template: '<TextArea v-model="value" v-bind="args" />'
  })
}

// С label
export const WithLabel: Story = {
  args: {
    modelValue: '',
    variant: 'normal',
    size: 'm',
    rows: 4,
    label: 'Описание',
    placeholder: 'Введите описание...'
  },
  render: (args) => ({
    components: { TextArea },
    setup() {
      const value = ref('')
      return { args, value }
    },
    template: '<TextArea v-model="value" v-bind="args" />'
  })
}

export const WithCustomLabel: Story = {
  args: {
    modelValue: '',
    variant: 'normal',
    size: 'm',
    rows: 4,
    placeholder: 'Введите текст...'
  },
  render: (args) => ({
    components: { TextArea },
    setup() {
      const value = ref('')
      return { args, value }
    },
    template: `
      <TextArea v-model="value" v-bind="args">
        <template #label>
          <span style="font-weight: 600;">Кастомный Label</span>
        </template>
      </TextArea>
    `
  })
}

// С hint
export const WithHint: Story = {
  args: {
    modelValue: '',
    variant: 'normal',
    size: 'm',
    rows: 4,
    label: 'Комментарий',
    placeholder: 'Введите комментарий...'
  },
  render: (args) => ({
    components: { TextArea },
    setup() {
      const value = ref('')
      return { args, value }
    },
    template: `
      <TextArea v-model="value" v-bind="args">
        <template #hint>
          Максимум 500 символов
        </template>
      </TextArea>
    `
  })
}

// С счетчиком символов
export const WithCharCounter: Story = {
  args: {
    modelValue: 'Пример текста',
    variant: 'normal',
    size: 'm',
    rows: 4,
    placeholder: 'Введите текст...',
    maxLength: 100
  },
  render: (args) => ({
    components: { TextArea },
    setup() {
      const value = ref(args.modelValue)
      return { args, value }
    },
    template: '<TextArea v-model="value" v-bind="args" />'
  })
}

// С дополнительным контентом
export const WithAdditional: Story = {
  args: {
    modelValue: 'Пример текста',
    variant: 'normal',
    size: 'm',
    rows: 4,
    placeholder: 'Введите текст...'
  },
  render: (args) => ({
    components: { TextArea },
    setup() {
      const value = ref(args.modelValue)
      return { args, value }
    },
    template: `
      <TextArea v-model="value" v-bind="args">
        <template #additional>
          <span style="font-size: 0.875rem; color: #6b7280;">{{ value.length }} символов</span>
        </template>
      </TextArea>
    `
  })
}

// Без кнопки очистки
export const WithoutClear: Story = {
  args: {
    modelValue: 'Текст без кнопки очистки',
    variant: 'normal',
    size: 'm',
    rows: 4,
    clearable: false
  },
  render: (args) => ({
    components: { TextArea },
    setup() {
      const value = ref(args.modelValue)
      return { args, value }
    },
    template: '<TextArea v-model="value" v-bind="args" />'
  })
}

// Полный пример
export const FullExample: Story = {
  args: {
    modelValue: '',
    variant: 'normal',
    size: 'm',
    rows: 4,
    placeholder: 'Введите описание проекта...',
    required: true,
    maxLength: 500
  },
  render: (args) => ({
    components: { TextArea },
    setup() {
      const value = ref('')
      return { args, value }
    },
    template: `
      <div style="max-width: 600px;">
        <TextArea v-model="value" v-bind="args" label="Описание проекта">
          <template #hint>
            Опишите ваш проект подробно. Будьте конкретны и информативны.
          </template>
        </TextArea>
      </div>
    `
  })
}

// Все размеры вместе
export const AllSizes: Story = {
  render: () => ({
    components: { TextArea },
    setup() {
      const valueS = ref('')
      const valueM = ref('')
      const valueL = ref('')
      const valueXl = ref('')
      return { valueS, valueM, valueL, valueXl }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 600px;">
        <TextArea v-model="valueS" variant="normal" size="s" rows="3" placeholder="Размер S" />
        <TextArea v-model="valueM" variant="normal" size="m" rows="4" placeholder="Размер M" />
        <TextArea v-model="valueL" variant="normal" size="l" rows="5" placeholder="Размер L" />
        <TextArea v-model="valueXl" variant="normal" size="xl" rows="6" placeholder="Размер XL" />
      </div>
    `
  })
}

// Все варианты вместе
export const AllVariants: Story = {
  render: () => ({
    components: { TextArea },
    setup() {
      const valueNormal = ref('')
      const valueClear = ref('')
      return { valueNormal, valueClear }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 600px;">
        <TextArea v-model="valueNormal" variant="normal" size="m" rows="4" placeholder="Normal вариант" />
        <TextArea v-model="valueClear" variant="clear" size="m" rows="4" placeholder="Clear вариант" />
      </div>
    `
  })
}

// Состояния вместе
export const AllStates: Story = {
  render: () => ({
    components: { TextArea },
    setup() {
      const valueDefault = ref('')
      const valueDisabled = ref('Отключено')
      const valueReadonly = ref('Только чтение')
      const valueError = ref('Ошибка')
      return { valueDefault, valueDisabled, valueReadonly, valueError }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 600px;">
        <TextArea v-model="valueDefault" variant="normal" size="m" rows="4" placeholder="Default" />
        <TextArea v-model="valueDisabled" variant="normal" size="m" rows="4" :disabled="true" />
        <TextArea v-model="valueReadonly" variant="normal" size="m" rows="4" :readonly="true" />
        <TextArea 
          v-model="valueError" 
          variant="normal" 
          size="m" 
          rows="4"
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
    components: { TextArea },
    setup() {
      const valueInline = ref('Ошибка inline')
      const valueOutline = ref('Ошибка outline')
      return { valueInline, valueOutline }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 600px;">
        <TextArea 
          v-model="valueInline" 
          variant="normal" 
          size="m" 
          rows="4"
          :error="true" 
          error-message="Ошибка отображается внутри поля"
          error-mode="inline"
        />
        <TextArea 
          v-model="valueOutline" 
          variant="normal" 
          size="m" 
          rows="4"
          :error="true" 
          error-message="Ошибка отображается под полем"
          error-mode="outline"
        />
      </div>
    `
  })
}

// Авто-высота сравнение
export const AutoResizeComparison: Story = {
  render: () => ({
    components: { TextArea },
    setup() {
      const valueFixed = ref('Фиксированная высота (4 строки)')
      const valueAuto = ref('Автоматическая высота (минимум 2 строки)')
      return { valueFixed, valueAuto }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 600px;">
        <div>
          <h3 style="margin-bottom: 0.5rem; font-size: 1rem;">Фиксированная высота</h3>
          <TextArea 
            v-model="valueFixed" 
            variant="normal" 
            size="m" 
            :rows="4"
            placeholder="Попробуйте ввести много текста..."
          />
        </div>
        <div>
          <h3 style="margin-bottom: 0.5rem; font-size: 1rem;">Автоматическая высота</h3>
          <TextArea 
            v-model="valueAuto" 
            variant="normal" 
            size="m" 
            rows="auto"
            :min-rows="2"
            placeholder="Попробуйте ввести много текста..."
          />
        </div>
      </div>
    `
  })
}