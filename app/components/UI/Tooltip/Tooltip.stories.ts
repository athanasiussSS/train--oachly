import type { Meta, StoryObj } from '@storybook/vue3'
import Tooltip from './Tooltip.vue'
import ButtonUi from '../ButtonUi/ButtonUi.vue'

const meta: Meta<typeof Tooltip> = {
  title: 'UI/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  argTypes: {
    content: {
      control: 'text',
      description: 'Текст подсказки'
    },
    position: {
      control: 'select',
      options: [
        'top',
        'bottom',
        'left',
        'right',
        'top-left',
        'top-right',
        'bottom-left',
        'bottom-right',
        'left-top',
        'left-bottom',
        'right-top',
        'right-bottom'
      ],
      description: 'Позиция tooltip относительно триггера'
    },
    showArrow: {
      control: 'boolean',
      description: 'Показывать хвостик'
    },
    offset: {
      control: 'number',
      description: 'Отступ от триггера (в пикселях)'
    },
    hoverDelay: {
      control: 'number',
      description: 'Задержка перед показом (в миллисекундах)'
    },
    disabled: {
      control: 'boolean',
      description: 'Отключить tooltip'
    }
  }
}

export default meta
type Story = StoryObj<typeof Tooltip>

// Базовый пример
export const Default: Story = {
  args: {
    content: 'Это базовая подсказка',
    position: 'top',
    showArrow: true,
    hoverDelay: 250
  },
  render: (args) => ({
    components: { Tooltip, ButtonUi },
    setup() {
      return { args }
    },
    template: `
      <div style="padding: 4rem; display: flex; justify-content: center; align-items: center;">
        <Tooltip v-bind="args">
          <ButtonUi>Наведите на меня</ButtonUi>
        </Tooltip>
      </div>
    `
  })
}

// Позиции
export const PositionTop: Story = {
  args: {
    content: 'Tooltip сверху',
    position: 'top',
    showArrow: true
  },
  render: (args) => ({
    components: { Tooltip, ButtonUi },
    setup() {
      return { args }
    },
    template: `
      <div style="padding: 4rem; display: flex; justify-content: center; align-items: center;">
        <Tooltip v-bind="args">
          <ButtonUi>Позиция: top</ButtonUi>
        </Tooltip>
      </div>
    `
  })
}

export const PositionBottom: Story = {
  args: {
    content: 'Tooltip снизу',
    position: 'bottom',
    showArrow: true
  },
  render: (args) => ({
    components: { Tooltip, ButtonUi },
    setup() {
      return { args }
    },
    template: `
      <div style="padding: 4rem; display: flex; justify-content: center; align-items: center;">
        <Tooltip v-bind="args">
          <ButtonUi>Позиция: bottom</ButtonUi>
        </Tooltip>
      </div>
    `
  })
}

export const PositionLeft: Story = {
  args: {
    content: 'Tooltip слева',
    position: 'left',
    showArrow: true
  },
  render: (args) => ({
    components: { Tooltip, ButtonUi },
    setup() {
      return { args }
    },
    template: `
      <div style="padding: 4rem; display: flex; justify-content: center; align-items: center;">
        <Tooltip v-bind="args">
          <ButtonUi>Позиция: left</ButtonUi>
        </Tooltip>
      </div>
    `
  })
}

export const PositionRight: Story = {
  args: {
    content: 'Tooltip справа',
    position: 'right',
    showArrow: true
  },
  render: (args) => ({
    components: { Tooltip, ButtonUi },
    setup() {
      return { args }
    },
    template: `
      <div style="padding: 4rem; display: flex; justify-content: center; align-items: center;">
        <Tooltip v-bind="args">
          <ButtonUi>Позиция: right</ButtonUi>
        </Tooltip>
      </div>
    `
  })
}

// Все позиции
export const AllPositions: Story = {
  render: () => ({
    components: { Tooltip, ButtonUi },
    template: `
      <div style="padding: 4rem; display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; place-items: center;">
        <Tooltip content="Top" position="top" :show-arrow="true">
          <ButtonUi>Top</ButtonUi>
        </Tooltip>
        
        <Tooltip content="Bottom" position="bottom" :show-arrow="true">
          <ButtonUi>Bottom</ButtonUi>
        </Tooltip>
        
        <Tooltip content="Left" position="left" :show-arrow="true">
          <ButtonUi>Left</ButtonUi>
        </Tooltip>
        
        <Tooltip content="Right" position="right" :show-arrow="true">
          <ButtonUi>Right</ButtonUi>
        </Tooltip>
        
        <Tooltip content="Top-Left" position="top-left" :show-arrow="true">
          <ButtonUi>Top-Left</ButtonUi>
        </Tooltip>
        
        <Tooltip content="Top-Right" position="top-right" :show-arrow="true">
          <ButtonUi>Top-Right</ButtonUi>
        </Tooltip>
      </div>
    `
  })
}

// Без хвостика
export const WithoutArrow: Story = {
  args: {
    content: 'Tooltip без хвостика',
    position: 'bottom',
    showArrow: false
  },
  render: (args) => ({
    components: { Tooltip, ButtonUi },
    setup() {
      return { args }
    },
    template: `
      <div style="padding: 4rem; display: flex; justify-content: center; align-items: center;">
        <Tooltip v-bind="args">
          <ButtonUi>Без хвостика</ButtonUi>
        </Tooltip>
      </div>
    `
  })
}

// С задержкой
export const WithDelay: Story = {
  args: {
    content: 'Tooltip с задержкой 500ms',
    position: 'bottom',
    showArrow: true,
    hoverDelay: 500
  },
  render: (args) => ({
    components: { Tooltip, ButtonUi },
    setup() {
      return { args }
    },
    template: `
      <div style="padding: 4rem; display: flex; justify-content: center; align-items: center;">
        <Tooltip v-bind="args">
          <ButtonUi>С задержкой 500ms</ButtonUi>
        </Tooltip>
      </div>
    `
  })
}

// Без задержки
export const WithoutDelay: Story = {
  args: {
    content: 'Tooltip без задержки',
    position: 'bottom',
    showArrow: true,
    hoverDelay: 0
  },
  render: (args) => ({
    components: { Tooltip, ButtonUi },
    setup() {
      return { args }
    },
    template: `
      <div style="padding: 4rem; display: flex; justify-content: center; align-items: center;">
        <Tooltip v-bind="args">
          <ButtonUi>Без задержки</ButtonUi>
        </Tooltip>
      </div>
    `
  })
}

// С кастомным контентом
export const WithCustomContent: Story = {
  render: () => ({
    components: { Tooltip, ButtonUi },
    template: `
      <div style="padding: 4rem; display: flex; justify-content: center; align-items: center;">
        <Tooltip position="bottom" :show-arrow="true">
          <ButtonUi>Кастомный контент</ButtonUi>
          <template #content>
            <div style="padding: 0.5rem;">
              <div style="font-weight: 600; margin-bottom: 0.25rem;">Заголовок</div>
              <div style="font-size: 0.875rem;">Это tooltip с произвольным контентом</div>
            </div>
          </template>
        </Tooltip>
      </div>
    `
  })
}

// С большим контентом
export const WithLargeContent: Story = {
  render: () => ({
    components: { Tooltip, ButtonUi },
    template: `
      <div style="padding: 4rem; display: flex; justify-content: center; align-items: center;">
        <Tooltip position="bottom" :show-arrow="true">
          <ButtonUi>Большой контент</ButtonUi>
          <template #content>
            <div style="padding: 0.75rem; max-width: 200px;">
              <div style="font-weight: 600; margin-bottom: 0.5rem;">Подробная информация</div>
              <div style="font-size: 0.875rem; line-height: 1.5;">
                Это tooltip с большим объемом содержимого. Здесь может быть подробное описание функционала кнопки или дополнительная информация.
              </div>
            </div>
          </template>
        </Tooltip>
      </div>
    `
  })
}

// На разных элементах
export const OnDifferentElements: Story = {
  render: () => ({
    components: { Tooltip, ButtonUi },
    template: `
      <div style="padding: 4rem; display: flex; flex-direction: column; gap: 2rem; align-items: center;">
        <div style="display: flex; gap: 1rem;">
          <Tooltip content="Подсказка на кнопке" position="bottom" :show-arrow="true">
            <ButtonUi>Кнопка</ButtonUi>
          </Tooltip>
          
          <Tooltip content="Подсказка на ссылке" position="bottom" :show-arrow="true">
            <a href="#" style="color: var(--color-primary); text-decoration: underline;">Ссылка</a>
          </Tooltip>
          
          <Tooltip content="Подсказка на иконке" position="bottom" :show-arrow="true">
            <span style="font-size: 1.5rem; cursor: pointer;">ℹ️</span>
          </Tooltip>
        </div>
      </div>
    `
  })
}

// Примеры использования
export const UsageExamples: Story = {
  render: () => ({
    components: { Tooltip, ButtonUi },
    template: `
      <div style="padding: 4rem; display: flex; flex-direction: column; gap: 2rem; align-items: center;">
        <div style="display: flex; gap: 1rem;">
          <Tooltip content="Сохранить изменения" position="top" :show-arrow="true">
            <ButtonUi icon="💾" icon-position="only" />
          </Tooltip>
          
          <Tooltip content="Удалить элемент" position="top" :show-arrow="true">
            <ButtonUi icon="🗑️" icon-position="only" />
          </Tooltip>
          
          <Tooltip content="Редактировать" position="top" :show-arrow="true">
            <ButtonUi icon="✏️" icon-position="only" />
          </Tooltip>
        </div>
        
        <div style="display: flex; gap: 1rem;">
          <Tooltip content="Копировать в буфер обмена" position="bottom" :show-arrow="true" :hover-delay="0">
            <ButtonUi>Копировать</ButtonUi>
          </Tooltip>
          
          <Tooltip content="Это действие нельзя отменить" position="bottom" :show-arrow="true" :hover-delay="500">
            <ButtonUi variant="danger">Удалить</ButtonUi>
          </Tooltip>
        </div>
      </div>
    `
  })
}