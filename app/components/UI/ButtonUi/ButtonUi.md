# ButtonUi

### Usage example

```vue
<ButtonUi variant="primary"
          size="md"
          pin="round"
          :loading="false"
          :disabled="false"
          :selected="false"
          width="max"
          icon="💾"
          icon-position="left"
          @click="handleClick"
>
    Сохранить
</ButtonUi>
```

### Usage with spread props

```vue
<template>
    <ButtonUi v-bind="buttonProps" @click="handleClick">
        Отправить
    </ButtonUi>
</template>

<script setup lang="ts">
const buttonProps = {
    variant: 'action',
    size: 'lg',
    pin: 'round',
    loading: false,
    disabled: false,
    selected: false,
    width: 'max',
    icon: '🚀',
    iconPosition: 'left',
    // Можно также передавать HTML атрибуты
    type: 'submit',
    'data-testid': 'submit-button',
    'aria-label': 'Отправить форму'
}

const handleClick = (event: MouseEvent) => {
    console.log('Button clicked', event)
}
</script>
```

### Props

```typescript
variant?: 'action' | 'outlined-action' | 'flat-action' | 'primary' | 'outlined' | 'flat' | 'flat-secondary' | 'info' | 'success' | 'warning' | 'danger' | 'raised' | 'contrast'
    // Тип кнопки
    // 'action' - Action (высший приоритет, для ключевых действий)
    // 'outlined-action' - Outlined Action (средний приоритет)
    // 'flat-action' - Flat Action (низкий приоритет)
    // 'primary' - Normal (обычные действия)
    // 'outlined' - Outlined (средний приоритет)
    // 'flat' - Flat (низкий приоритет)
    // 'flat-secondary' - Flat Secondary (второстепенные операции)
    // 'info' - Info (информация, подсказки)
    // 'success' - Success (успешные действия)
    // 'warning' - Warning (предупреждения)
    // 'danger' - Danger (разрушительные действия)
    // 'raised' - Raised (выделение важных действий)
    // 'contrast' - Contrast (на сложном фоне)
    // Default: 'primary'

size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
    // Размер кнопки
    // 'xs' - Extra Small
    // 'sm' - Small
    // 'md' - Medium
    // 'lg' - Large
    // 'xl' - Extra Large
    // Default: 'md'

pin?: 'round' | 'brick' | 'clear' | 'circle'
    // Форма углов кнопки
    // 'round' - Округлая форма (скругленные углы с обеих сторон)
    // 'brick' - Острые углы с обеих сторон (может иметь обводку)
    // 'clear' - Острые углы БЕЗ обводки (убирает border даже у outlined вариантов)
    // 'circle' - Круглая форма (для иконок)
    // Default: 'round'

loading?: boolean
    // Состояние загрузки. При true показывает лоадер и скрывает содержимое кнопки
    // Default: false

disabled?: boolean
    // Отключенное состояние. Кнопка становится недоступной для взаимодействия
    // Default: false

selected?: boolean
    // Выбранное состояние. Используется для переключаемых элементов
    // Default: false

width?: 'auto' | 'max' | undefined
    // Ширина кнопки
    // undefined - Автоматическая ширина (подстраивается под текст)
    // 'auto' - Ограничивает размеры контейнером (с многоточием при переполнении)
    // 'max' - На всю ширину родительского контейнера (с многоточием при переполнении)
    // Default: undefined

icon?: string
    // Текст или символ иконки
    // Default: undefined

iconPosition?: 'left' | 'right' | 'only'
    // Позиция иконки относительно текста
    // 'left' - Иконка слева от текста
    // 'right' - Иконка справа от текста
    // 'only' - Только иконка (текст скрывается, кнопка становится круглой)
    // Default: 'left'
```

### Events

```typescript
@click: (event: MouseEvent) => void
    // Событие клика по кнопке
```

### Examples

#### Basic usage

```vue
<ButtonUi variant="primary" @click="handleClick">
    Нажми меня
</ButtonUi>
```

#### Button with icon

```vue
<ButtonUi variant="primary" 
          icon="💾" 
          icon-position="left" 
          @click="save">
    Сохранить
</ButtonUi>
```

#### Loading button

```vue
<ButtonUi variant="primary" 
          :loading="isSubmitting" 
          @click="submitForm">
    Отправить
</ButtonUi>
```

#### Disabled button

```vue
<ButtonUi variant="primary" 
          :disabled="!isFormValid">
    Сохранить
</ButtonUi>
```

#### Semantic buttons

```vue
<ButtonUi variant="success">Успешно</ButtonUi>
<ButtonUi variant="warning">Предупреждение</ButtonUi>
<ButtonUi variant="danger">Удалить</ButtonUi>
<ButtonUi variant="info">Подробнее</ButtonUi>
```

#### Full width button

```vue
<ButtonUi variant="primary" width="max">
    Полная ширина
</ButtonUi>
```

#### Icon only button

```vue
<ButtonUi variant="primary" 
          icon="🗑️" 
          icon-position="only" 
          aria-label="Удалить" />
```

#### Button with HTML attributes

```vue
<ButtonUi variant="primary"
          type="submit"
          form="my-form"
          data-testid="submit-button"
          aria-label="Отправить форму"
          @click="handleSubmit">
    Отправить
</ButtonUi>
```

#### Button with spread props

```vue
<template>
    <ButtonUi v-bind="buttonConfig" @click="handleClick">
        {{ buttonText }}
    </ButtonUi>
</template>

<script setup lang="ts">
const buttonConfig = {
    variant: 'action',
    size: 'lg',
    pin: 'round',
    loading: false,
    disabled: false,
    width: 'max',
    icon: '🚀',
    iconPosition: 'left'
}

const buttonText = 'Запустить'
const handleClick = (event: MouseEvent) => {
    console.log('Clicked', event)
}
</script>
```
