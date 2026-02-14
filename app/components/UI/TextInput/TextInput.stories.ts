import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import TextInput from './TextInput.vue'
import ButtonUi from '../ButtonUi/ButtonUi.vue'

const meta: Meta<typeof TextInput> = {
  title: 'UI/TextInput',
  component: TextInput,
  tags: ['autodocs'],
  argTypes: {
    modelValue: {
      control: 'text',
      description: 'Значение input (v-model)'
    },
    variant: {
      control: 'select',
      options: ['normal', 'clear'],
      description: 'Вариант отображения'
    },
    size: {
      control: 'select',
      options: ['s', 'm', 'l', 'xl'],
      description: 'Размер input'
    },
    state: {
      control: 'select',
      options: ['suggest', 'default', 'hover', 'active', 'disabled', 'inline-error', 'outline-error'],
      description: 'Состояние input'
    },
    error: {
      control: 'boolean',
      description: 'Наличие ошибки'
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
    showClear: {
      control: 'boolean',
      description: 'Показывать кнопку очистки'
    },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search'],
      description: 'Тип input'
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
    maxlength: {
      control: 'number',
      description: 'Максимальная длина'
    },
    minlength: {
      control: 'number',
      description: 'Минимальная длина'
    }
  }
}

export default meta
type Story = StoryObj<typeof TextInput>

// Базовый пример
export const Default: Story = {
  args: {
    modelValue: '',
    variant: 'normal',
    size: 'm',
    placeholder: 'Введите текст',
    showClear: true
  },
  render: (args) => ({
    components: { TextInput },
    setup() {
      const value = ref(args.modelValue || '')
      return { args, value }
    },
    template: '<TextInput v-model="value" v-bind="args" />'
  })
}

// Варианты
export const Normal: Story = {
  args: {
    modelValue: '',
    variant: 'normal',
    size: 'm',
    placeholder: 'Normal вариант'
  },
  render: (args) => ({
    components: { TextInput },
    setup() {
      const value = ref('')
      return { args, value }
    },
    template: '<TextInput v-model="value" v-bind="args" />'
  })
}

export const Clear: Story = {
  args: {
    modelValue: '',
    variant: 'clear',
    size: 'm',
    placeholder: 'Clear вариант'
  },
  render: (args) => ({
    components: { TextInput },
    setup() {
      const value = ref('')
      return { args, value }
    },
    template: '<TextInput v-model="value" v-bind="args" />'
  })
}

// Размеры
export const SizeS: Story = {
  args: {
    modelValue: '',
    variant: 'normal',
    size: 's',
    placeholder: 'Размер S'
  },
  render: (args) => ({
    components: { TextInput },
    setup() {
      const value = ref('')
      return { args, value }
    },
    template: '<TextInput v-model="value" v-bind="args" />'
  })
}

export const SizeM: Story = {
  args: {
    modelValue: '',
    variant: 'normal',
    size: 'm',
    placeholder: 'Размер M'
  },
  render: (args) => ({
    components: { TextInput },
    setup() {
      const value = ref('')
      return { args, value }
    },
    template: '<TextInput v-model="value" v-bind="args" />'
  })
}

export const SizeL: Story = {
  args: {
    modelValue: '',
    variant: 'normal',
    size: 'l',
    placeholder: 'Размер L'
  },
  render: (args) => ({
    components: { TextInput },
    setup() {
      const value = ref('')
      return { args, value }
    },
    template: '<TextInput v-model="value" v-bind="args" />'
  })
}

export const SizeXl: Story = {
  args: {
    modelValue: '',
    variant: 'normal',
    size: 'xl',
    placeholder: 'Размер XL'
  },
  render: (args) => ({
    components: { TextInput },
    setup() {
      const value = ref('')
      return { args, value }
    },
    template: '<TextInput v-model="value" v-bind="args" />'
  })
}

// Состояния
export const Disabled: Story = {
  args: {
    modelValue: 'Отключенное поле',
    variant: 'normal',
    size: 'm',
    disabled: true
  },
  render: (args) => ({
    components: { TextInput },
    setup() {
      const value = ref(args.modelValue)
      return { args, value }
    },
    template: '<TextInput v-model="value" v-bind="args" />'
  })
}

export const Readonly: Story = {
  args: {
    modelValue: 'Только для чтения',
    variant: 'normal',
    size: 'm',
    readonly: true
  },
  render: (args) => ({
    components: { TextInput },
    setup() {
      const value = ref(args.modelValue)
      return { args, value }
    },
    template: '<TextInput v-model="value" v-bind="args" />'
  })
}

export const Required: Story = {
  args: {
    modelValue: '',
    variant: 'normal',
    size: 'm',
    placeholder: 'Обязательное поле',
    required: true
  },
  render: (args) => ({
    components: { TextInput },
    setup() {
      const value = ref('')
      return { args, value }
    },
    template: '<TextInput v-model="value" v-bind="args" />'
  })
}

// Валидация
export const ErrorInline: Story = {
  args: {
    modelValue: 'Некорректное значение',
    variant: 'normal',
    size: 'm',
    error: true,
    errorMessage: 'Поле обязательно для заполнения',
    errorMode: 'inline'
  },
  render: (args) => ({
    components: { TextInput },
    setup() {
      const value = ref(args.modelValue)
      return { args, value }
    },
    template: '<TextInput v-model="value" v-bind="args" />'
  })
}

export const ErrorOutline: Story = {
  args: {
    modelValue: 'Некорректное значение',
    variant: 'normal',
    size: 'm',
    error: true,
    errorMessage: 'Поле обязательно для заполнения',
    errorMode: 'outline'
  },
  render: (args) => ({
    components: { TextInput },
    setup() {
      const value = ref(args.modelValue)
      return { args, value }
    },
    template: '<TextInput v-model="value" v-bind="args" />'
  })
}

export const ErrorClear: Story = {
  args: {
    modelValue: 'Ошибка в clear варианте',
    variant: 'clear',
    size: 'm',
    error: true,
    errorMessage: 'Поле обязательно для заполнения',
    errorMode: 'inline'
  },
  render: (args) => ({
    components: { TextInput },
    setup() {
      const value = ref(args.modelValue)
      return { args, value }
    },
    template: '<TextInput v-model="value" v-bind="args" />'
  })
}

// С иконкой слева
export const WithLeftIcon: Story = {
  args: {
    modelValue: '',
    variant: 'normal',
    size: 'm',
    placeholder: 'Поиск...'
  },
  render: (args) => ({
    components: { TextInput },
    setup() {
      const value = ref('')
      return { args, value }
    },
    template: `
      <TextInput v-model="value" v-bind="args">
        <template #left-icon>
          <span style="font-size: 1.25rem;">🔍</span>
        </template>
      </TextInput>
    `
  })
}

// С кнопкой справа
export const WithRightButton: Story = {
  args: {
    modelValue: '',
    variant: 'normal',
    size: 'm',
    placeholder: 'Введите текст'
  },
  render: (args) => ({
    components: { TextInput, ButtonUi },
    setup() {
      const value = ref('')
      return { args, value }
    },
    template: `
      <TextInput v-model="value" v-bind="args">
        <template #right-content>
          <ButtonUi size="s" variant="flat-secondary">Отправить</ButtonUi>
        </template>
      </TextInput>
    `
  })
}

// С дополнительным контентом
export const WithAdditional: Story = {
  args: {
    modelValue: 'Пример текста',
    variant: 'normal',
    size: 'm',
    placeholder: 'Введите текст',
    maxlength: 100
  },
  render: (args) => ({
    components: { TextInput },
    setup() {
      const value = ref(args.modelValue)
      return { args, value }
    },
    template: `
      <TextInput v-model="value" v-bind="args">
        <template #additional>
          <span>{{ value.length }}/100</span>
        </template>
      </TextInput>
    `
  })
}

// Полный пример
export const FullExample: Story = {
  args: {
    modelValue: '',
    variant: 'normal',
    size: 'm',
    placeholder: 'Введите email',
    type: 'email',
    required: true
  },
  render: (args) => ({
    components: { TextInput, ButtonUi },
    setup() {
      const value = ref('')
      return { args, value }
    },
    template: `
      <div style="max-width: 400px;">
        <TextInput v-model="value" v-bind="args">
          <template #left-icon>
            <span style="font-size: 1.25rem;">📧</span>
          </template>
          <template #right-content>
            <ButtonUi size="s" variant="primary">Отправить</ButtonUi>
          </template>
          <template #additional>
            <span style="font-size: 0.875rem; color: #6b7280;">{{ value.length > 0 ? '✓' : '' }}</span>
          </template>
        </TextInput>
      </div>
    `
  })
}

// Без кнопки очистки
export const WithoutClear: Story = {
  args: {
    modelValue: 'Текст без кнопки очистки',
    variant: 'normal',
    size: 'm',
    showClear: false
  },
  render: (args) => ({
    components: { TextInput },
    setup() {
      const value = ref(args.modelValue)
      return { args, value }
    },
    template: '<TextInput v-model="value" v-bind="args" />'
  })
}

// Типы input
export const TypeEmail: Story = {
  args: {
    modelValue: '',
    variant: 'normal',
    size: 'm',
    type: 'email',
    placeholder: 'email@example.com'
  },
  render: (args) => ({
    components: { TextInput },
    setup() {
      const value = ref('')
      return { args, value }
    },
    template: '<TextInput v-model="value" v-bind="args" />'
  })
}

export const TypePassword: Story = {
  args: {
    modelValue: '',
    variant: 'normal',
    size: 'm',
    type: 'password',
    placeholder: 'Введите пароль'
  },
  render: (args) => ({
    components: { TextInput },
    setup() {
      const value = ref('')
      return { args, value }
    },
    template: '<TextInput v-model="value" v-bind="args" />'
  })
}

export const TypeSearch: Story = {
  args: {
    modelValue: '',
    variant: 'normal',
    size: 'm',
    type: 'search',
    placeholder: 'Поиск...'
  },
  render: (args) => ({
    components: { TextInput },
    setup() {
      const value = ref('')
      return { args, value }
    },
    template: '<TextInput v-model="value" v-bind="args" />'
  })
}

// Все размеры вместе
export const AllSizes: Story = {
  render: () => ({
    components: { TextInput },
    setup() {
      const valueS = ref('')
      const valueM = ref('')
      const valueL = ref('')
      const valueXl = ref('')
      return { valueS, valueM, valueL, valueXl }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 400px;">
        <TextInput v-model="valueS" variant="normal" size="s" placeholder="Размер S" />
        <TextInput v-model="valueM" variant="normal" size="m" placeholder="Размер M" />
        <TextInput v-model="valueL" variant="normal" size="l" placeholder="Размер L" />
        <TextInput v-model="valueXl" variant="normal" size="xl" placeholder="Размер XL" />
      </div>
    `
  })
}

// Все варианты вместе
export const AllVariants: Story = {
  render: () => ({
    components: { TextInput },
    setup() {
      const valueNormal = ref('')
      const valueClear = ref('')
      return { valueNormal, valueClear }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 400px;">
        <TextInput v-model="valueNormal" variant="normal" size="m" placeholder="Normal вариант" />
        <TextInput v-model="valueClear" variant="clear" size="m" placeholder="Clear вариант" />
      </div>
    `
  })
}

// Состояния вместе
export const AllStates: Story = {
  render: () => ({
    components: { TextInput },
    setup() {
      const valueDefault = ref('')
      const valueDisabled = ref('Отключено')
      const valueReadonly = ref('Только чтение')
      const valueError = ref('Ошибка')
      return { valueDefault, valueDisabled, valueReadonly, valueError }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 400px;">
        <TextInput v-model="valueDefault" variant="normal" size="m" placeholder="Default" />
        <TextInput v-model="valueDisabled" variant="normal" size="m" :disabled="true" />
        <TextInput v-model="valueReadonly" variant="normal" size="m" :readonly="true" />
        <TextInput 
          v-model="valueError" 
          variant="normal" 
          size="m" 
          :error="true" 
          error-message="Поле обязательно для заполнения"
        />
      </div>
    `
  })
}
