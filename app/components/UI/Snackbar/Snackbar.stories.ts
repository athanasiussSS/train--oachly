import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import Snackbar from './Snackbar.vue'
import ButtonUi from '../ButtonUi/ButtonUi.vue'

const meta: Meta<typeof Snackbar> = {
  title: 'UI/Snackbar',
  component: Snackbar,
  tags: ['autodocs'],
  argTypes: {
    show: {
      control: 'boolean',
      description: 'Видимость snackbar'
    },
    type: {
      control: 'select',
      options: ['default', 'info', 'success', 'warning', 'error'],
      description: 'Тип snackbar'
    },
    title: {
      control: 'text',
      description: 'Заголовок'
    },
    description: {
      control: 'text',
      description: 'Описание'
    },
    showIcon: {
      control: 'boolean',
      description: 'Показывать иконку типа'
    },
    duration: {
      control: 'number',
      description: 'Длительность отображения (мс). 0 - не скрывать автоматически'
    },
    showCloseButton: {
      control: 'boolean',
      description: 'Показывать кнопку закрытия'
    }
  }
}

export default meta
type Story = StoryObj<typeof Snackbar>

// Типы
export const Default: Story = {
  args: {
    show: true,
    type: 'default',
    title: 'Уведомление',
    description: 'Это уведомление по умолчанию',
    showIcon: false,
    duration: 5000
  },
  render: (args) => ({
    components: { Snackbar },
    setup() {
      const isVisible = ref(args.show)
      return { args, isVisible }
    },
    template: '<Snackbar v-model:show="isVisible" v-bind="args" />'
  })
}

export const Info: Story = {
  args: {
    show: true,
    type: 'info',
    title: 'Информация',
    description: 'Данные успешно отправлены',
    showIcon: true,
    duration: 5000
  },
  render: (args) => ({
    components: { Snackbar },
    setup() {
      const isVisible = ref(args.show)
      return { args, isVisible }
    },
    template: '<Snackbar v-model:show="isVisible" v-bind="args" />'
  })
}

export const Success: Story = {
  args: {
    show: true,
    type: 'success',
    title: 'Успешно!',
    description: 'Данные успешно сохранены',
    showIcon: true,
    duration: 5000
  },
  render: (args) => ({
    components: { Snackbar },
    setup() {
      const isVisible = ref(args.show)
      return { args, isVisible }
    },
    template: '<Snackbar v-model:show="isVisible" v-bind="args" />'
  })
}

export const Warning: Story = {
  args: {
    show: true,
    type: 'warning',
    title: 'Предупреждение',
    description: 'Необходимо заполнить обязательное поле',
    showIcon: true,
    duration: 5000
  },
  render: (args) => ({
    components: { Snackbar },
    setup() {
      const isVisible = ref(args.show)
      return { args, isVisible }
    },
    template: '<Snackbar v-model:show="isVisible" v-bind="args" />'
  })
}

export const Error: Story = {
  args: {
    show: true,
    type: 'error',
    title: 'Ошибка',
    description: 'Произошла ошибка при сохранении данных',
    showIcon: true,
    duration: 0
  },
  render: (args) => ({
    components: { Snackbar, ButtonUi },
    setup() {
      const isVisible = ref(args.show)
      return { args, isVisible }
    },
    template: `
      <Snackbar v-model:show="isVisible" v-bind="args">
        <template #actions>
          <ButtonUi size="sm" variant="primary">Повторить</ButtonUi>
        </template>
      </Snackbar>
    `
  })
}

// Без иконки
export const WithoutIcon: Story = {
  args: {
    show: true,
    type: 'success',
    title: 'Успешно!',
    description: 'Операция выполнена',
    showIcon: false,
    duration: 5000
  },
  render: (args) => ({
    components: { Snackbar },
    setup() {
      const isVisible = ref(args.show)
      return { args, isVisible }
    },
    template: '<Snackbar v-model:show="isVisible" v-bind="args" />'
  })
}

// Только заголовок
export const TitleOnly: Story = {
  args: {
    show: true,
    type: 'info',
    title: 'Информация',
    description: '',
    showIcon: true,
    duration: 5000
  },
  render: (args) => ({
    components: { Snackbar },
    setup() {
      const isVisible = ref(args.show)
      return { args, isVisible }
    },
    template: '<Snackbar v-model:show="isVisible" v-bind="args" />'
  })
}

// Только описание
export const DescriptionOnly: Story = {
  args: {
    show: true,
    type: 'info',
    title: '',
    description: 'Это уведомление содержит только описание',
    showIcon: true,
    duration: 5000
  },
  render: (args) => ({
    components: { Snackbar },
    setup() {
      const isVisible = ref(args.show)
      return { args, isVisible }
    },
    template: '<Snackbar v-model:show="isVisible" v-bind="args" />'
  })
}

// С одной кнопкой
export const WithOneButton: Story = {
  args: {
    show: true,
    type: 'info',
    title: 'Информация',
    description: 'Дополнительная информация доступна',
    showIcon: true,
    duration: 0
  },
  render: (args) => ({
    components: { Snackbar, ButtonUi },
    setup() {
      const isVisible = ref(args.show)
      return { args, isVisible }
    },
    template: `
      <Snackbar v-model:show="isVisible" v-bind="args">
        <template #actions>
          <ButtonUi size="sm" variant="primary">Подробнее</ButtonUi>
        </template>
      </Snackbar>
    `
  })
}

// С двумя кнопками
export const WithTwoButtons: Story = {
  args: {
    show: true,
    type: 'error',
    title: 'Ошибка',
    description: 'Произошла ошибка при выполнении операции',
    showIcon: true,
    duration: 0
  },
  render: (args) => ({
    components: { Snackbar, ButtonUi },
    setup() {
      const isVisible = ref(args.show)
      return { args, isVisible }
    },
    template: `
      <Snackbar v-model:show="isVisible" v-bind="args">
        <template #actions>
          <ButtonUi size="sm" variant="primary">Повторить</ButtonUi>
          <ButtonUi size="sm" variant="flat">Отмена</ButtonUi>
        </template>
      </Snackbar>
    `
  })
}

// Без авто-скрытия (обязательна кнопка закрытия)
export const WithoutAutoClose: Story = {
  args: {
    show: true,
    type: 'warning',
    title: 'Предупреждение',
    description: 'Это уведомление не скрывается автоматически',
    showIcon: true,
    duration: 0
  },
  render: (args) => ({
    components: { Snackbar },
    setup() {
      const isVisible = ref(args.show)
      return { args, isVisible }
    },
    template: '<Snackbar v-model:show="isVisible" v-bind="args" />'
  })
}

// С кастомным контентом
export const WithCustomContent: Story = {
  args: {
    show: true,
    type: 'info',
    showIcon: true,
    duration: 5000
  },
  render: (args) => ({
    components: { Snackbar },
    setup() {
      const isVisible = ref(args.show)
      return { args, isVisible }
    },
    template: `
      <Snackbar v-model:show="isVisible" v-bind="args">
        <div style="display: flex; flex-direction: column; gap: 0.5rem;">
          <div style="font-weight: 600;">Кастомный контент</div>
          <div style="font-size: 0.875rem; color: var(--color-text-secondary);">
            Это snackbar с произвольным контентом внутри
          </div>
        </div>
      </Snackbar>
    `
  })
}

// Все типы вместе
export const AllTypes: Story = {
  render: () => ({
    components: { Snackbar },
    setup() {
      const showDefault = ref(false)
      const showInfo = ref(false)
      const showSuccess = ref(false)
      const showWarning = ref(false)
      const showError = ref(false)

      const showSnackbar = (type: string) => {
        if (type === 'default') showDefault.value = true
        if (type === 'info') showInfo.value = true
        if (type === 'success') showSuccess.value = true
        if (type === 'warning') showWarning.value = true
        if (type === 'error') showError.value = true
      }

      return {
        showDefault,
        showInfo,
        showSuccess,
        showWarning,
        showError,
        showSnackbar
      }
    },
    template: `
      <div style="padding: 4rem; display: flex; flex-direction: column; gap: 1rem; align-items: center;">
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          <ButtonUi @click="showSnackbar('default')">Default</ButtonUi>
          <ButtonUi @click="showSnackbar('info')">Info</ButtonUi>
          <ButtonUi @click="showSnackbar('success')">Success</ButtonUi>
          <ButtonUi @click="showSnackbar('warning')">Warning</ButtonUi>
          <ButtonUi @click="showSnackbar('error')">Error</ButtonUi>
        </div>

        <Snackbar v-model:show="showDefault" type="default" title="Уведомление" description="Это уведомление по умолчанию" />
        <Snackbar v-model:show="showInfo" type="info" title="Информация" description="Данные успешно отправлены" />
        <Snackbar v-model:show="showSuccess" type="success" title="Успешно!" description="Данные успешно сохранены" />
        <Snackbar v-model:show="showWarning" type="warning" title="Предупреждение" description="Необходимо заполнить обязательное поле" />
        <Snackbar v-model:show="showError" type="error" title="Ошибка" description="Произошла ошибка при сохранении" />
      </div>
    `
  })
}

// Примеры использования
export const UsageExamples: Story = {
  render: () => ({
    components: { Snackbar, ButtonUi },
    setup() {
      const showSuccess = ref(false)
      const showError = ref(false)
      const showWarning = ref(false)

      const handleSave = () => {
        // Симуляция сохранения
        showSuccess.value = true
      }

      const handleError = () => {
        showError.value = true
      }

      const handleWarning = () => {
        showWarning.value = true
      }

      return {
        showSuccess,
        showError,
        showWarning,
        handleSave,
        handleError,
        handleWarning
      }
    },
    template: `
      <div style="padding: 4rem; display: flex; flex-direction: column; gap: 1rem; align-items: center;">
        <div style="display: flex; gap: 0.5rem;">
          <ButtonUi @click="handleSave">Сохранить (Success)</ButtonUi>
          <ButtonUi @click="handleError" variant="danger">Ошибка</ButtonUi>
          <ButtonUi @click="handleWarning" variant="warning">Предупреждение</ButtonUi>
        </div>

        <Snackbar
          v-model:show="showSuccess"
          type="success"
          title="Успешно!"
          description="Данные успешно сохранены"
        />

        <Snackbar
          v-model:show="showError"
          type="error"
          title="Ошибка"
          description="Произошла ошибка при сохранении"
          :duration="0"
        >
          <template #actions>
            <ButtonUi size="sm" variant="primary">Повторить</ButtonUi>
          </template>
        </Snackbar>

        <Snackbar
          v-model:show="showWarning"
          type="warning"
          title="Предупреждение"
          description="Не все поля заполнены"
        />
      </div>
    `
  })
}

// Использование композабла useSnackbar
export const WithComposable: Story = {
  render: () => ({
    components: { ButtonUi },
    setup() {
      // В реальном приложении импортируйте useSnackbar
      // import { useSnackbar } from '@/components/UI/Snackbar/useSnackbar'
      // const snackbar = useSnackbar()
      
      // Для демонстрации в Storybook используем прямой вызов
      const showSnackbar = (type: string) => {
        // В реальном приложении:
        // snackbar[type]('Сообщение', { title: 'Заголовок' })
        console.log(`Show ${type} snackbar`)
      }

      return { showSnackbar }
    },
    template: `
      <div style="padding: 4rem; display: flex; flex-direction: column; gap: 1rem; align-items: center;">
        <p style="margin-bottom: 1rem; color: var(--color-text-secondary);">
          Используйте композабл useSnackbar для программного управления уведомлениями
        </p>
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          <ButtonUi @click="() => showSnackbar('success')">Success</ButtonUi>
          <ButtonUi @click="() => showSnackbar('error')">Error</ButtonUi>
          <ButtonUi @click="() => showSnackbar('info')">Info</ButtonUi>
          <ButtonUi @click="() => showSnackbar('warning')">Warning</ButtonUi>
        </div>
      </div>
    `
  })
}