# TextArea

### Usage example

```vue
<TextArea
  v-model="text"
  variant="normal"
  size="m"
  placeholder="Введите текст..."
  :rows="4"
  :clearable="true"
  :error="hasError"
  error-mode="outline"
  error-message="Поле обязательно для заполнения"
  :max-length="500"
  label="Описание"
>
  <template #hint>Дополнительная подсказка</template>
  <template #additional>
    <span>Дополнительный контент</span>
  </template>
</TextArea>
```

### Usage with spread props

```vue
<template>
  <TextArea v-bind="textareaProps" @input="handleInput" />
</template>

<script setup lang="ts">
const textareaProps = {
  modelValue: '',
  variant: 'normal',
  size: 'm',
  rows: 4,
  placeholder: 'Введите описание...',
  clearable: true,
  required: true,
  maxLength: 500,
  label: 'Описание',
  // Можно также передавать HTML атрибуты
  name: 'description',
  'data-testid': 'description-textarea',
  'aria-label': 'Описание проекта'
}

const handleInput = (event: Event) => {
  console.log('Textarea changed', event)
}
</script>
```

### Props

```typescript
modelValue?: string
  // Значение textarea (v-model)
  // Default: ''

variant?: 'normal' | 'clear'
  // Вариант отображения
  // 'normal' - Есть обводка (1px), внутренние отступы, скругления. Используется в формах
  // 'clear' - Нет обводки, контент прижат к краям. Используется для минимализма
  // Default: 'normal'

size?: 's' | 'm' | 'l' | 'xl'
  // Размер textarea
  // 's' - Small
  // 'm' - Medium
  // 'l' - Large
  // 'xl' - Extra Large
  // Default: 'm'

rows?: number | 'auto'
  // Количество строк или 'auto' для авто-высоты
  // При 'auto' textarea автоматически подстраивает высоту под содержимое
  // Default: 4

minRows?: number
  // Минимальное количество строк при авто-высоте
  // Default: 2

error?: boolean | string
  // Наличие ошибки (boolean или текст ошибки)
  // Default: false

errorMessage?: string
  // Текст сообщения об ошибке
  // Default: ''

errorMode?: 'inline' | 'outline'
  // Режим отображения ошибки
  // 'inline' - Иконка ошибки внутри поля с tooltip
  // 'outline' - Текст ошибки выводится снизу слева
  // Default: 'outline'

clearable?: boolean
  // Показывать кнопку очистки
  // Default: true

placeholder?: string
  // Placeholder текст
  // Default: ''

disabled?: boolean
  // Отключенное состояние
  // Default: false

readonly?: boolean
  // Только для чтения
  // Default: false

maxLength?: number
  // Максимальная длина (показывает счетчик символов)
  // Default: undefined

minLength?: number
  // Минимальная длина
  // Default: undefined

required?: boolean
  // Обязательное поле
  // Default: false

autofocus?: boolean
  // Автофокус при монтировании
  // Default: false

name?: string
  // Имя поля (для форм)
  // Default: undefined

label?: string
  // Текст label
  // Default: undefined

ariaLabel?: string
  // ARIA label для доступности
  // Default: undefined

ariaDescribedBy?: string
  // ARIA described by для доступности
  // Default: undefined

textareaId?: string
  // ID для textarea элемента
  // Default: undefined (генерируется автоматически)
```

### Events

```typescript
@update:modelValue: (value: string) => void
  // Событие обновления значения (v-model)

@input: (event: Event) => void
  // Событие ввода текста

@change: (event: Event) => void
  // Событие изменения значения

@focus: (event: FocusEvent) => void
  // Событие получения фокуса

@blur: (event: FocusEvent) => void
  // Событие потери фокуса

@clear: () => void
  // Событие очистки значения

@keydown: (event: KeyboardEvent) => void
  // Событие нажатия клавиши

@keyup: (event: KeyboardEvent) => void
  // Событие отпускания клавиши
```

### Slots

```vue
#label
  // Кастомный label

#hint
  // Подсказка под полем

#additional
  // Дополнительный контент справа внизу (например, счетчик символов)

#error-message
  // Кастомное сообщение об ошибке

#clear-button
  // Кастомная кнопка очистки

#error-icon
  // Кастомная иконка ошибки
```

### Examples

#### Basic usage

```vue
<TextArea v-model="text" placeholder="Введите текст..." />
```

#### With label and hint

```vue
<TextArea
  v-model="description"
  label="Описание"
  placeholder="Введите описание..."
>
  <template #hint>Максимум 500 символов</template>
</TextArea>
```

#### Auto resize

```vue
<TextArea
  v-model="text"
  rows="auto"
  :min-rows="2"
  placeholder="Автоматическая высота (начните вводить текст)"
/>
```

#### With character counter

```vue
<TextArea
  v-model="text"
  placeholder="Введите текст..."
  :max-length="500"
/>
```

#### Error states

```vue
<!-- Inline error -->
<TextArea
  v-model="text"
  :error="true"
  error-message="Поле обязательно для заполнения"
  error-mode="inline"
/>

<!-- Outline error -->
<TextArea
  v-model="text"
  :error="true"
  error-message="Поле обязательно для заполнения"
  error-mode="outline"
/>

<!-- Error as string -->
<TextArea
  v-model="text"
  error="Поле содержит недопустимые символы"
  error-mode="outline"
/>
```

#### Disabled and readonly

```vue
<TextArea v-model="text" :disabled="true" placeholder="Отключено" />
<TextArea v-model="text" :readonly="true" placeholder="Только чтение" />
```

#### Different variants

```vue
<TextArea v-model="text" variant="normal" placeholder="Normal вариант" />
<TextArea v-model="text" variant="clear" placeholder="Clear вариант" />
```

#### Different sizes

```vue
<TextArea v-model="text" size="s" :rows="3" placeholder="Размер S" />
<TextArea v-model="text" size="m" :rows="4" placeholder="Размер M" />
<TextArea v-model="text" size="l" :rows="5" placeholder="Размер L" />
<TextArea v-model="text" size="xl" :rows="6" placeholder="Размер XL" />
```

#### Without clear button

```vue
<TextArea v-model="text" :clearable="false" placeholder="Без кнопки очистки" />
```

#### With custom additional content

```vue
<TextArea v-model="text" placeholder="Введите текст...">
  <template #additional>
    <span style="font-size: 0.875rem; color: #6b7280;">
      {{ text.length }} символов
    </span>
  </template>
</TextArea>
```

#### In form

```vue
<form @submit.prevent="handleSubmit">
  <TextArea
    v-model="form.description"
    label="Описание проекта"
    :rows="6"
    required
    :max-length="1000"
    name="description"
  >
    <template #hint>
      Опишите ваш проект подробно. Будьте конкретны и информативны.
    </template>
  </TextArea>
  <ButtonUi type="submit">Отправить</ButtonUi>
</form>
```

#### With HTML attributes

```vue
<TextArea
  v-model="text"
  name="comment"
  required
  :max-length="500"
  data-testid="comment-textarea"
  aria-label="Комментарий"
  @input="handleInput"
/>
```

#### With spread props

```vue
<template>
  <TextArea v-bind="textareaConfig" @input="handleInput" />
</template>

<script setup lang="ts">
const textareaConfig = {
  modelValue: '',
  variant: 'normal',
  size: 'm',
  rows: 4,
  placeholder: 'Введите текст...',
  clearable: true,
  maxLength: 500
}

const handleInput = (event: Event) => {
  console.log('Textarea changed', event)
}
</script>
```