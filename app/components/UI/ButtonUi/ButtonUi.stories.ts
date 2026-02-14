import type { Meta, StoryObj } from '@storybook/vue3'
import ButtonUi from './ButtonUi.vue'

const meta: Meta<typeof ButtonUi> = {
  title: 'UI/ButtonUi',
  component: ButtonUi,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary']
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md']
    },
    pin: {
      control: 'select',
      options: ['round', 'brick', 'circle', 'square']
    },
    loading: {
      control: 'boolean'
    },
    disabled: {
      control: 'boolean'
    },
    block: {
      control: 'boolean'
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
    template: '<ButtonUi v-bind="args">Кнопка</ButtonUi>'
  })
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    size: 'md',
    pin: 'round'
  },
  render: (args) => ({
    components: { ButtonUi },
    setup() {
      return { args }
    },
    template: '<ButtonUi v-bind="args">Вторичная кнопка</ButtonUi>'
  })
}

export const Sizes: Story = {
  render: () => ({
    components: { ButtonUi },
    template: `
      <div style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap;">
        <ButtonUi size="xs">Extra Small</ButtonUi>
        <ButtonUi size="sm">Small</ButtonUi>
        <ButtonUi size="md">Medium</ButtonUi>
      </div>
    `
  })
}

export const Pins: Story = {
  render: () => ({
    components: { ButtonUi },
    template: `
      <div style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap;">
        <ButtonUi pin="round">Round</ButtonUi>
        <ButtonUi pin="brick">Brick</ButtonUi>
        <ButtonUi pin="circle">Circle</ButtonUi>
        <ButtonUi pin="square">Square</ButtonUi>
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
    loading: true
  },
  render: (args) => ({
    components: { ButtonUi },
    setup() {
      return { args }
    },
    template: '<ButtonUi v-bind="args" size="md"></ButtonUi>'
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

export const Block: Story = {
  args: {
    block: true
  },
  render: (args) => ({
    components: { ButtonUi },
    setup() {
      return { args }
    },
    template: '<ButtonUi v-bind="args">Блочная кнопка</ButtonUi>'
  })
}
