import type { Meta, StoryObj } from '@storybook/vue3'
import ButtonUi from './ButtonUi.vue'

const meta: Meta<typeof ButtonUi> = {
  title: 'UI/ButtonUi',
  component: ButtonUi,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        // Акцентные
        'action', 'outlined-action', 'flat-action',
        // Основные
        'primary', 'outlined', 'flat', 'flat-secondary',
        // Семантические
        'info', 'success', 'warning', 'danger',
        // Приподнятые
        'raised',
        // Контрастные
        'contrast'
      ]
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl']
    },
    pin: {
      control: 'select',
      options: ['round', 'brick', 'clear', 'circle']
    },
    loading: {
      control: 'boolean'
    },
    disabled: {
      control: 'boolean'
    },
    selected: {
      control: 'boolean'
    },
    width: {
      control: 'select',
      options: ['auto', 'max']
    },
    icon: {
      control: 'text'
    },
    iconPosition: {
      control: 'select',
      options: ['left', 'right', 'only']
    }
  }
}

export default meta
type Story = StoryObj<typeof ButtonUi>

// Акцентные кнопки
export const Action: Story = {
  args: {
    variant: 'action',
    size: 'md',
    pin: 'round'
  },
  render: (args) => ({
    components: { ButtonUi },
    setup() {
      return { args }
    },
    template: '<ButtonUi v-bind="args">Action</ButtonUi>'
  })
}

export const OutlinedAction: Story = {
  args: {
    variant: 'outlined-action',
    size: 'md',
    pin: 'round'
  },
  render: (args) => ({
    components: { ButtonUi },
    setup() {
      return { args }
    },
    template: '<ButtonUi v-bind="args">Outlined Action</ButtonUi>'
  })
}

export const FlatAction: Story = {
  args: {
    variant: 'flat-action',
    size: 'md',
    pin: 'round'
  },
  render: (args) => ({
    components: { ButtonUi },
    setup() {
      return { args }
    },
    template: '<ButtonUi v-bind="args">Flat Action</ButtonUi>'
  })
}

// Основные кнопки
export const Primary: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    pin: 'round'
  },
  render: (args) => ({
    components: { ButtonUi },
    setup() {
      return { args }
    },
    template: '<ButtonUi v-bind="args">Primary</ButtonUi>'
  })
}

export const Outlined: Story = {
  args: {
    variant: 'outlined',
    size: 'md',
    pin: 'round'
  },
  render: (args) => ({
    components: { ButtonUi },
    setup() {
      return { args }
    },
    template: '<ButtonUi v-bind="args">Outlined</ButtonUi>'
  })
}

export const Flat: Story = {
  args: {
    variant: 'flat',
    size: 'md',
    pin: 'round'
  },
  render: (args) => ({
    components: { ButtonUi },
    setup() {
      return { args }
    },
    template: '<ButtonUi v-bind="args">Flat</ButtonUi>'
  })
}

export const FlatSecondary: Story = {
  args: {
    variant: 'flat-secondary',
    size: 'md',
    pin: 'round'
  },
  render: (args) => ({
    components: { ButtonUi },
    setup() {
      return { args }
    },
    template: '<ButtonUi v-bind="args">Flat Secondary</ButtonUi>'
  })
}

// Семантические кнопки
export const Info: Story = {
  args: {
    variant: 'info',
    size: 'md',
    pin: 'round'
  },
  render: (args) => ({
    components: { ButtonUi },
    setup() {
      return { args }
    },
    template: '<ButtonUi v-bind="args">Info</ButtonUi>'
  })
}

export const Success: Story = {
  args: {
    variant: 'success',
    size: 'md',
    pin: 'round'
  },
  render: (args) => ({
    components: { ButtonUi },
    setup() {
      return { args }
    },
    template: '<ButtonUi v-bind="args">Success</ButtonUi>'
  })
}

export const Warning: Story = {
  args: {
    variant: 'warning',
    size: 'md',
    pin: 'round'
  },
  render: (args) => ({
    components: { ButtonUi },
    setup() {
      return { args }
    },
    template: '<ButtonUi v-bind="args">Warning</ButtonUi>'
  })
}

export const Danger: Story = {
  args: {
    variant: 'danger',
    size: 'md',
    pin: 'round'
  },
  render: (args) => ({
    components: { ButtonUi },
    setup() {
      return { args }
    },
    template: '<ButtonUi v-bind="args">Danger</ButtonUi>'
  })
}

// Приподнятые кнопки
export const Raised: Story = {
  args: {
    variant: 'raised',
    size: 'md',
    pin: 'round'
  },
  render: (args) => ({
    components: { ButtonUi },
    setup() {
      return { args }
    },
    template: '<ButtonUi v-bind="args">Raised</ButtonUi>'
  })
}

// Контрастные кнопки
export const Contrast: Story = {
  args: {
    variant: 'contrast',
    size: 'md',
    pin: 'round'
  },
  render: (args) => ({
    components: { ButtonUi },
    setup() {
      return { args }
    },
    template: '<ButtonUi v-bind="args">Contrast</ButtonUi>'
  })
}

export const Sizes: Story = {
  render: () => ({
    components: { ButtonUi },
    template: `
      <div style="display: flex; gap: 0.625rem; align-items: center; flex-wrap: wrap;">
        <ButtonUi variant="primary" size="xs">XS</ButtonUi>
        <ButtonUi variant="primary" size="sm">S</ButtonUi>
        <ButtonUi variant="primary" size="md">M</ButtonUi>
        <ButtonUi variant="primary" size="lg">L</ButtonUi>
        <ButtonUi variant="primary" size="xl">XL</ButtonUi>
      </div>
    `
  })
}

export const Pins: Story = {
  render: () => ({
    components: { ButtonUi },
    template: `
      <div style="display: flex; gap: 0.625rem; align-items: center; flex-wrap: wrap;">
        <ButtonUi variant="primary" pin="round">Round</ButtonUi>
        <ButtonUi variant="primary" pin="brick">Brick</ButtonUi>
        <ButtonUi variant="primary" pin="clear">Clear</ButtonUi>
        <ButtonUi variant="primary" pin="circle">Circle</ButtonUi>
      </div>
    `
  })
}

export const WithIcon: Story = {
  args: {
    icon: '🚀',
    iconPosition: 'left'
  },
  render: (args) => ({
    components: { ButtonUi },
    setup() {
      return { args }
    },
    template: '<ButtonUi v-bind="args">С иконкой</ButtonUi>'
  })
}

export const Loading: Story = {
  args: {
    loading: true,
    variant: 'primary',
    size: 'md'
  },
  render: (args) => ({
    components: { ButtonUi },
    setup() {
      return { args }
    },
    template: '<ButtonUi v-bind="args">Загрузка</ButtonUi>'
  })
}

export const Disabled: Story = {
  args: {
    disabled: true
  },
  render: (args) => ({
    components: { ButtonUi },
    setup() {
      return { args }
    },
    template: '<ButtonUi v-bind="args">Отключена</ButtonUi>'
  })
}

export const Selected: Story = {
  args: {
    selected: true,
    variant: 'primary',
    size: 'md'
  },
  render: (args) => ({
    components: { ButtonUi },
    setup() {
      return { args }
    },
    template: '<ButtonUi v-bind="args">Выбрано</ButtonUi>'
  })
}

export const Width: Story = {
  render: () => ({
    components: { ButtonUi },
    template: `
      <div style="display: flex; flex-direction: column; gap: 0.625rem; max-width: 20rem;">
        <ButtonUi variant="primary" width="auto">Auto width (ограничена контейнером)</ButtonUi>
        <ButtonUi variant="primary" width="max">Max width (на всю ширину)</ButtonUi>
      </div>
    `
  })
}

export const AllVariants: Story = {
  render: () => ({
    components: { ButtonUi },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <div>
          <h3 style="margin-bottom: 0.5rem;">Акцентные</h3>
          <div style="display: flex; gap: 0.625rem; flex-wrap: wrap;">
            <ButtonUi variant="action">Action</ButtonUi>
            <ButtonUi variant="outlined-action">Outlined Action</ButtonUi>
            <ButtonUi variant="flat-action">Flat Action</ButtonUi>
          </div>
        </div>
        <div>
          <h3 style="margin-bottom: 0.5rem;">Основные</h3>
          <div style="display: flex; gap: 0.625rem; flex-wrap: wrap;">
            <ButtonUi variant="primary">Primary</ButtonUi>
            <ButtonUi variant="outlined">Outlined</ButtonUi>
            <ButtonUi variant="flat">Flat</ButtonUi>
            <ButtonUi variant="flat-secondary">Flat Secondary</ButtonUi>
          </div>
        </div>
        <div>
          <h3 style="margin-bottom: 0.5rem;">Семантические</h3>
          <div style="display: flex; gap: 0.625rem; flex-wrap: wrap;">
            <ButtonUi variant="info">Info</ButtonUi>
            <ButtonUi variant="success">Success</ButtonUi>
            <ButtonUi variant="warning">Warning</ButtonUi>
            <ButtonUi variant="danger">Danger</ButtonUi>
          </div>
        </div>
        <div>
          <h3 style="margin-bottom: 0.5rem;">Приподнятые и Контрастные</h3>
          <div style="display: flex; gap: 0.625rem; flex-wrap: wrap;">
            <ButtonUi variant="raised">Raised</ButtonUi>
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 1rem; border-radius: 0.5rem;">
              <ButtonUi variant="contrast">Contrast</ButtonUi>
            </div>
          </div>
        </div>
      </div>
    `
  })
}
