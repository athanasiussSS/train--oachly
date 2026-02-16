import type { Meta, StoryObj } from '@storybook/vue3'
import Popup from './Popup.vue'
import ButtonUi from '../ButtonUi/ButtonUi.vue'

const meta: Meta<typeof Popup> = {
  title: 'UI/Popup',
  component: Popup,
  tags: ['autodocs'],
  argTypes: {
    trigger: {
      control: 'select',
      options: ['hover', 'click'],
      description: 'Триггер открытия'
    },
    position: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
      description: 'Позиция popup'
    },
    offset: {
      control: 'number',
      description: 'Отступ от триггера'
    },
    disabled: {
      control: 'boolean',
      description: 'Отключить popup'
    }
  }
}

export default meta
type Story = StoryObj<typeof Popup>

// По клику
export const Click: Story = {
  args: {
    trigger: 'click',
    position: 'bottom'
  },
  render: (args) => ({
    components: { Popup, ButtonUi },
    setup() {
      return { args }
    },
    template: `
      <div style="padding: 4rem; display: flex; justify-content: center;">
        <Popup v-bind="args">
          <template #trigger>
            <ButtonUi>Открыть Popup</ButtonUi>
          </template>
          <template #content>
            <div>Содержимое попапа</div>
          </template>
        </Popup>
      </div>
    `
  })
}

// По наведению
export const Hover: Story = {
  args: {
    trigger: 'hover',
    position: 'bottom'
  },
  render: (args) => ({
    components: { Popup, ButtonUi },
    setup() {
      return { args }
    },
    template: `
      <div style="padding: 4rem; display: flex; justify-content: center;">
        <Popup v-bind="args">
          <template #trigger>
            <ButtonUi>Наведите на меня</ButtonUi>
          </template>
          <template #content>
            <div>Подсказка при наведении</div>
          </template>
        </Popup>
      </div>
    `
  })
}

// Позиции
export const PositionTop: Story = {
  args: {
    trigger: 'click',
    position: 'top'
  },
  render: (args) => ({
    components: { Popup, ButtonUi },
    setup() {
      return { args }
    },
    template: `
      <div style="padding: 4rem; display: flex; justify-content: center; align-items: center; min-height: 200px;">
        <Popup v-bind="args">
          <template #trigger>
            <ButtonUi>Top</ButtonUi>
          </template>
          <template #content>
            <div>Popup сверху</div>
          </template>
        </Popup>
      </div>
    `
  })
}

export const PositionBottom: Story = {
  args: {
    trigger: 'click',
    position: 'bottom'
  },
  render: (args) => ({
    components: { Popup, ButtonUi },
    setup() {
      return { args }
    },
    template: `
      <div style="padding: 4rem; display: flex; justify-content: center;">
        <Popup v-bind="args">
          <template #trigger>
            <ButtonUi>Bottom</ButtonUi>
          </template>
          <template #content>
            <div>Popup снизу</div>
          </template>
        </Popup>
      </div>
    `
  })
}

export const PositionLeft: Story = {
  args: {
    trigger: 'click',
    position: 'left'
  },
  render: (args) => ({
    components: { Popup, ButtonUi },
    setup() {
      return { args }
    },
    template: `
      <div style="padding: 4rem; display: flex; justify-content: center;">
        <Popup v-bind="args">
          <template #trigger>
            <ButtonUi>Left</ButtonUi>
          </template>
          <template #content>
            <div>Popup слева</div>
          </template>
        </Popup>
      </div>
    `
  })
}

export const PositionRight: Story = {
  args: {
    trigger: 'click',
    position: 'right'
  },
  render: (args) => ({
    components: { Popup, ButtonUi },
    setup() {
      return { args }
    },
    template: `
      <div style="padding: 4rem; display: flex; justify-content: center;">
        <Popup v-bind="args">
          <template #trigger>
            <ButtonUi>Right</ButtonUi>
          </template>
          <template #content>
            <div>Popup справа</div>
          </template>
        </Popup>
      </div>
    `
  })
}

// Все позиции
export const AllPositions: Story = {
  render: () => ({
    components: { Popup, ButtonUi },
    template: `
      <div style="padding: 4rem; display: grid; grid-template-columns: repeat(2, 1fr); gap: 2rem; place-items: center;">
        <Popup trigger="click" position="top">
          <template #trigger>
            <ButtonUi>Top</ButtonUi>
          </template>
          <template #content>
            <div>Popup сверху</div>
          </template>
        </Popup>

        <Popup trigger="click" position="bottom">
          <template #trigger>
            <ButtonUi>Bottom</ButtonUi>
          </template>
          <template #content>
            <div>Popup снизу</div>
          </template>
        </Popup>

        <Popup trigger="click" position="left">
          <template #trigger>
            <ButtonUi>Left</ButtonUi>
          </template>
          <template #content>
            <div>Popup слева</div>
          </template>
        </Popup>

        <Popup trigger="click" position="right">
          <template #trigger>
            <ButtonUi>Right</ButtonUi>
          </template>
          <template #content>
            <div>Popup справа</div>
          </template>
        </Popup>
      </div>
    `
  })
}

// С большим контентом
export const WithLargeContent: Story = {
  render: () => ({
    components: { Popup, ButtonUi },
    template: `
      <div style="padding: 4rem; display: flex; justify-content: center;">
        <Popup trigger="click">
          <template #trigger>
            <ButtonUi>Подробнее</ButtonUi>
          </template>
          <template #content>
            <div style="max-width: 400px;">
              <h3 style="margin-bottom: 0.5rem; font-size: 1rem;">Заголовок</h3>
              <p style="margin-bottom: 0.5rem; font-size: 0.875rem;">
                Это popup с большим объемом содержимого. Здесь может быть подробная информация об объекте, включая технические характеристики и детали.
              </p>
              <ButtonUi size="sm">Действие</ButtonUi>
            </div>
          </template>
        </Popup>
      </div>
    `
  })
}

// Примеры использования
export const UsageExamples: Story = {
  render: () => ({
    components: { Popup, ButtonUi },
    template: `
      <div style="padding: 4rem; display: flex; flex-direction: column; gap: 2rem; align-items: center;">
        <!-- Действие -->
        <Popup trigger="click">
          <template #trigger>
            <ButtonUi>Выполнить действие</ButtonUi>
          </template>
          <template #content>
            <div>
              <p style="margin-bottom: 0.5rem;">Вы уверены, что хотите выполнить это действие?</p>
              <div style="display: flex; gap: 0.5rem;">
                <ButtonUi size="sm" variant="primary">Да</ButtonUi>
                <ButtonUi size="sm" variant="flat">Отмена</ButtonUi>
              </div>
            </div>
          </template>
        </Popup>

        <!-- Подсказка -->
        <Popup trigger="hover">
          <template #trigger>
            <ButtonUi>Наведите для подсказки</ButtonUi>
          </template>
          <template #content>
            <div>Это подсказка с дополнительной информацией</div>
          </template>
        </Popup>
      </div>
    `
  })
}