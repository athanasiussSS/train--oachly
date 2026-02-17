import type { Meta, StoryObj } from '@storybook/vue3'
import Link from './Link.vue'

const meta: Meta<typeof Link> = {
  title: 'UI/Link',
  component: Link,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'muted', 'success', 'danger', 'warning', 'info']
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl']
    },
    disabled: {
      control: 'boolean'
    },
    underline: {
      control: 'boolean'
    },
    icon: {
      control: 'text'
    },
    iconPosition: {
      control: 'select',
      options: ['left', 'right', 'only']
    },
    target: {
      control: 'select',
      options: ['_blank', '_self', '_parent', '_top']
    }
  }
}

export default meta
type Story = StoryObj<typeof Link>

// Варианты стилей
export const Primary: Story = {
  args: {
    href: '#',
    variant: 'primary',
    size: 'md'
  },
  render: (args) => ({
    components: { Link },
    setup() {
      return { args }
    },
    template: '<Link v-bind="args">Основная ссылка</Link>'
  })
}

export const Secondary: Story = {
  args: {
    href: '#',
    variant: 'secondary',
    size: 'md'
  },
  render: (args) => ({
    components: { Link },
    setup() {
      return { args }
    },
    template: '<Link v-bind="args">Вторичная ссылка</Link>'
  })
}

export const Muted: Story = {
  args: {
    href: '#',
    variant: 'muted',
    size: 'md'
  },
  render: (args) => ({
    components: { Link },
    setup() {
      return { args }
    },
    template: '<Link v-bind="args">Приглушенная ссылка</Link>'
  })
}

export const Success: Story = {
  args: {
    href: '#',
    variant: 'success',
    size: 'md'
  },
  render: (args) => ({
    components: { Link },
    setup() {
      return { args }
    },
    template: '<Link v-bind="args">Успешное действие</Link>'
  })
}

export const Danger: Story = {
  args: {
    href: '#',
    variant: 'danger',
    size: 'md'
  },
  render: (args) => ({
    components: { Link },
    setup() {
      return { args }
    },
    template: '<Link v-bind="args">Опасное действие</Link>'
  })
}

export const Warning: Story = {
  args: {
    href: '#',
    variant: 'warning',
    size: 'md'
  },
  render: (args) => ({
    components: { Link },
    setup() {
      return { args }
    },
    template: '<Link v-bind="args">Предупреждение</Link>'
  })
}

export const Info: Story = {
  args: {
    href: '#',
    variant: 'info',
    size: 'md'
  },
  render: (args) => ({
    components: { Link },
    setup() {
      return { args }
    },
    template: '<Link v-bind="args">Информация</Link>'
  })
}

// Размеры
export const Sizes: Story = {
  render: () => ({
    components: { Link },
    template: `
      <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
        <Link href="#" variant="primary" size="xs">Очень маленькая</Link>
        <Link href="#" variant="primary" size="sm">Маленькая</Link>
        <Link href="#" variant="primary" size="md">Средняя</Link>
        <Link href="#" variant="primary" size="lg">Большая</Link>
        <Link href="#" variant="primary" size="xl">Очень большая</Link>
      </div>
    `
  })
}

// Подчеркивание
export const Underline: Story = {
  render: () => ({
    components: { Link },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <Link href="#" variant="primary" :underline="true">С подчеркиванием (по умолчанию)</Link>
        <Link href="#" variant="primary" :underline="false">Без подчеркивания (появляется при hover)</Link>
      </div>
    `
  })
}

// С иконками
export const WithIcon: Story = {
  args: {
    href: '#',
    icon: '→',
    iconPosition: 'left'
  },
  render: (args) => ({
    components: { Link },
    setup() {
      return { args }
    },
    template: '<Link v-bind="args">Перейти</Link>'
  })
}

export const IconPositions: Story = {
  render: () => ({
    components: { Link },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <Link href="#" variant="primary" icon="→" icon-position="left">Иконка слева</Link>
        <Link href="#" variant="primary" icon="→" icon-position="right">Иконка справа</Link>
        <Link href="#" variant="primary" icon="🔗" icon-position="only" />
      </div>
    `
  })
}

// Внешние ссылки
export const ExternalLink: Story = {
  args: {
    href: 'https://example.com',
    target: '_blank'
  },
  render: (args) => ({
    components: { Link },
    setup() {
      return { args }
    },
    template: '<Link v-bind="args">Открыть в новой вкладке</Link>'
  })
}

// Отключенное состояние
export const Disabled: Story = {
  args: {
    href: '#',
    disabled: true
  },
  render: (args) => ({
    components: { Link },
    setup() {
      return { args }
    },
    template: '<Link v-bind="args">Отключенная ссылка</Link>'
  })
}

// Все варианты
export const AllVariants: Story = {
  render: () => ({
    components: { Link },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <Link href="#" variant="primary">Primary</Link>
        <Link href="#" variant="secondary">Secondary</Link>
        <Link href="#" variant="muted">Muted</Link>
        <Link href="#" variant="success">Success</Link>
        <Link href="#" variant="danger">Danger</Link>
        <Link href="#" variant="warning">Warning</Link>
        <Link href="#" variant="info">Info</Link>
      </div>
    `
  })
}

// Примеры использования
export const Examples: Story = {
  render: () => ({
    components: { Link },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1.5rem; padding: 1rem;">
        <div>
          <h3 style="margin-bottom: 0.5rem;">Обычные ссылки</h3>
          <p>
            Это <Link href="#" variant="primary">основная ссылка</Link> в тексте.
            А это <Link href="#" variant="secondary">вторичная ссылка</Link>.
            И <Link href="#" variant="muted">приглушенная ссылка</Link> для менее важных случаев.
          </p>
        </div>
        
        <div>
          <h3 style="margin-bottom: 0.5rem;">Семантические ссылки</h3>
          <p>
            <Link href="#" variant="success">Успешно выполнено</Link> | 
            <Link href="#" variant="danger">Опасное действие</Link> | 
            <Link href="#" variant="warning">Предупреждение</Link> | 
            <Link href="#" variant="info">Подробнее</Link>
          </p>
        </div>
        
        <div>
          <h3 style="margin-bottom: 0.5rem;">С иконками</h3>
          <p>
            <Link href="#" variant="primary" icon="→" icon-position="right">Читать далее</Link> | 
            <Link href="#" variant="info" icon="📖" icon-position="left">Документация</Link> | 
            <Link href="#" variant="secondary" icon="🔗" icon-position="only" />
          </p>
        </div>
        
        <div>
          <h3 style="margin-bottom: 0.5rem;">Внешние ссылки</h3>
          <p>
            <Link href="https://example.com" target="_blank" variant="primary">
              Открыть внешний сайт
            </Link>
          </p>
        </div>
      </div>
    `
  })
}
