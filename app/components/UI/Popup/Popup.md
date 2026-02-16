# Popup

Popup – это простое всплывающее окно, появляющееся по наведению или по клику на элемент в интерфейсе. Popup также служит основой для компонента Popover и используется, когда встроенных возможностей компонента Popover недостаточно.

### Когда используется Popup

- Когда во всплывающем элементе содержится действие. В таком случае Popup используется как альтернатива диалоговому окну, если важно не потерять контекст текущей страницы.
- Когда нельзя использовать Popover из-за слишком большого объема содержимого. Например, в подсказке нужно дать более подробную информацию об объекте, включая технические характеристики и детали.

### Стиль

Цвет и стиль попапа не настраивается. Менять можно лишь его расположение.

В тело попапа можно поместить любой контент. В дизайне контента содержимого следует придерживаться базовых отступов компонента Popover и общих гайдлайнов. Старайтесь при этом не перегружать Popup, чтобы он не выглядел громоздким.

### Расположение

Popup может располагаться в любом месте в зависимости от компоновки страницы. Важно, чтобы он перекрывал как можно меньше важной информации на странице.

### Usage example

```vue
<Popup trigger="click" position="bottom">
  <template #trigger>
    <ButtonUi>Открыть Popup</ButtonUi>
  </template>
  <template #content>
    <div>Содержимое попапа</div>
  </template>
</Popup>
```

### Props

```typescript
trigger?: 'hover' | 'click'
  // Триггер открытия
  // 'click' - по клику
  // 'hover' - по наведению
  // Default: 'click'

position?: 'top' | 'bottom' | 'left' | 'right'
  // Позиция popup относительно триггера
  // Default: 'bottom'

offset?: number
  // Отступ от триггера в пикселях
  // Default: 8

disabled?: boolean
  // Отключить popup
  // Default: false
```

### Events

```typescript
@open: () => void
  // Событие открытия popup

@close: () => void
  // Событие закрытия popup
```

### Slots

```vue
#trigger
  // Элемент-триггер (обязательный слот)

#content
  // Содержимое popup (обязательный слот)
```

### Methods

```typescript
open(): void
  // Открыть popup программно

close(): void
  // Закрыть popup программно

toggle(): void
  // Переключить состояние popup

updatePosition(): void
  // Обновить позицию popup
```

### Examples

#### По клику

```vue
<Popup trigger="click">
  <template #trigger>
    <ButtonUi>Открыть Popup</ButtonUi>
  </template>
  <template #content>
    <div>Содержимое попапа</div>
  </template>
</Popup>
```

#### По наведению

```vue
<Popup trigger="hover">
  <template #trigger>
    <span>Наведите на меня</span>
  </template>
  <template #content>
    <div>Подсказка при наведении</div>
  </template>
</Popup>
```

#### Разные позиции

```vue
<!-- Снизу -->
<Popup trigger="click" position="bottom">
  <template #trigger>
    <ButtonUi>Bottom</ButtonUi>
  </template>
  <template #content>
    <div>Popup снизу</div>
  </template>
</Popup>

<!-- Сверху -->
<Popup trigger="click" position="top">
  <template #trigger>
    <ButtonUi>Top</ButtonUi>
  </template>
  <template #content>
    <div>Popup сверху</div>
  </template>
</Popup>

<!-- Слева -->
<Popup trigger="click" position="left">
  <template #trigger>
    <ButtonUi>Left</ButtonUi>
  </template>
  <template #content>
    <div>Popup слева</div>
  </template>
</Popup>

<!-- Справа -->
<Popup trigger="click" position="right">
  <template #trigger>
    <ButtonUi>Right</ButtonUi>
  </template>
  <template #content>
    <div>Popup справа</div>
  </template>
</Popup>
```

#### С большим контентом

```vue
<Popup trigger="click">
  <template #trigger>
    <ButtonUi>Подробнее</ButtonUi>
  </template>
  <template #content>
    <div style="max-width: 400px;">
      <h3 style="margin-bottom: 0.5rem;">Заголовок</h3>
      <p style="margin-bottom: 0.5rem;">
        Это popup с большим объемом содержимого. Здесь может быть подробная информация об объекте, включая технические характеристики и детали.
      </p>
      <ButtonUi size="sm">Действие</ButtonUi>
    </div>
  </template>
</Popup>
```