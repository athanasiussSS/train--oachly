# TextInput

### Usage example

```vue
<TextInput
  v-model="text"
  variant="normal"
  size="m"
  placeholder="Введите текст"
  :show-clear="true"
  :disabled="false"
  :required="false"
  @input="handleInput"
  @change="handleChange"
/>
```

### Usage with spread props

```vue
<template>
  <TextInput v-bind="inputProps" @input="handleInput" />
</template>

<script setup lang="ts">
const inputProps = {
  modelValue: '',
  variant: 'normal',
  size: 'm',
  placeholder: 'Введите email',
  type: 'email',
  showClear: true,
  required: true,
  // Можно также передавать HTML атрибуты
  name: 'email',
  'data-testid': 'email-input',
  'aria-label': 'Email адрес'
}

const handleInput = (event: Event) => {
  console.log('Input changed', event)
}
</script>
```

### Props

```typescript
modelValue?: string | number
  // Значение input (v-model)
  // Default: ''

variant?: 'normal' | 'clear'
  // Вариант отображения
  // 'normal' - Есть обводка (1px), внутренние отступы, скругления. Используется в формах
  // 'clear' - Нет обводки, контент прижат к краям. Используется для минимализма
  // Default: 'normal'

size?: 's' | 'm' | 'l' | 'xl'
  // Размер input
  // 's' - Small
  // 'm' - Medium
  // 'l' - Large
  // 'xl' - Extra Large
  // Default: 'm'

state?: 'suggest' | 'default' | 'hover' | 'active' | 'disabled' | 'inline-error' | 'outline-error'
  // Состояние input
  // Default: 'default'

error?: boolean
  // Наличие ошибки
  // Default: false

errorMessage?: string
  // Текст сообщения об ошибке
  // Default: ''

errorMode?: 'inline' | 'outline'
  // Режим отображения ошибки
  // 'inline' - Иконка ошибки внутри поля
  // 'outline' - Текст ошибки выводится снизу слева
  // Default: 'inline'

showClear?: boolean
  // Показывать кнопку очистки
  // Default: true

type?: string
  // Тип input (text, email, password, number, tel, url, search и т.д.)
  // Default: 'text'

placeholder?: string
  // Placeholder текст
  // Default: ''

disabled?: boolean
  // Отключенное состояние
  // Default: false

readonly?: boolean
  // Только для чтения
  // Default: false

maxlength?: number
  // Максимальная длина
  // Default: undefined

minlength?: number
  // Минимальная длина
  // Default: undefined

pattern?: string
  // Паттерн для валидации
  // Default: undefined

required?: boolean
  // Обязательное поле
  // Default: false

autocomplete?: string
  // Автозаполнение
  // Default: undefined

autofocus?: boolean
  // Автофокус при монтировании
  // Default: false

name?: string
  // Имя поля (для форм)
  // Default: undefined

ariaLabel?: string
  // ARIA label для доступности
  // Default: undefined

ariaDescribedBy?: string
  // ARIA described by для доступности
  // Default: undefined

inputId?: string
  // ID для input элемента
  // Default: undefined (генерируется автоматически)

label?: string
  // Текст label над полем
  // Default: undefined

tooltip?: string
  // Текст подсказки, отображаемой рядом с label
  // При наведении на иконку вопроса показывается tooltip
  // Default: undefined

// Встроенная валидация
validate?: boolean
  // Включить встроенную валидацию
  // Default: false

validationRules?: ValidationRule[]
  // Массив правил валидации
  // Если не указан, используются правила по типу поля (email, password)
  // Default: []

validateOnBlur?: boolean
  // Валидировать при потере фокуса
  // Default: true

validateOnInput?: boolean
  // Валидировать при вводе текста
  // Default: false

validateOnMount?: boolean
  // Валидировать при монтировании компонента
  // Default: false
```

### Events

```typescript
@update:modelValue: (value: string | number) => void
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

@validation-error: (error: string) => void
  // Событие ошибки валидации

@validation-success: () => void
  // Событие успешной валидации
```

### Slots

```vue
#left-icon
  // Иконка слева от input

#right-content
  // Контент справа (кнопки, иконки)

#additional
  // Дополнительный контент справа (счетчик, единицы)

#clear-button
  // Кастомная кнопка очистки

#label
  // Кастомный label (альтернатива пропу label)
```

### Examples

#### Basic usage

```vue
<TextInput v-model="text" placeholder="Введите текст" />
```

#### With label

```vue
<TextInput
  v-model="email"
  label="Email"
  placeholder="email@example.com"
  type="email"
  required
/>
```

#### With label and tooltip

```vue
<TextInput
  v-model="password"
  label="Пароль"
  tooltip="Латиница, одна заглавная, одна цифра, один знак препинания минимум 6 символов"
  type="password"
  required
/>
```

#### With left icon

```vue
<TextInput v-model="search" placeholder="Поиск...">
  <template #left-icon>
    <span style="font-size: 1.25rem;">🔍</span>
  </template>
</TextInput>
```

#### With right button

```vue
<TextInput v-model="text" placeholder="Введите текст">
  <template #right-content>
    <ButtonUi size="s" variant="flat-secondary">Отправить</ButtonUi>
  </template>
</TextInput>
```

#### With character counter

```vue
<TextInput
  v-model="text"
  placeholder="Введите текст"
  :maxlength="100"
>
  <template #additional>
    <span>{{ text.length }}/100</span>
  </template>
</TextInput>
```

#### Error states

```vue
<!-- Inline error -->
<TextInput
  v-model="text"
  :error="true"
  error-message="Поле обязательно для заполнения"
  error-mode="inline"
/>

<!-- Outline error -->
<TextInput
  v-model="text"
  :error="true"
  error-message="Поле обязательно для заполнения"
  error-mode="outline"
/>
```

#### Disabled and readonly

```vue
<TextInput v-model="text" :disabled="true" placeholder="Отключено" />
<TextInput v-model="text" :readonly="true" placeholder="Только чтение" />
```

#### Different variants

```vue
<TextInput v-model="text" variant="normal" placeholder="Normal вариант" />
<TextInput v-model="text" variant="clear" placeholder="Clear вариант" />
```

#### Different sizes

```vue
<TextInput v-model="text" size="s" placeholder="Размер S" />
<TextInput v-model="text" size="m" placeholder="Размер M" />
<TextInput v-model="text" size="l" placeholder="Размер L" />
<TextInput v-model="text" size="xl" placeholder="Размер XL" />
```

#### Without clear button

```vue
<TextInput v-model="text" :show-clear="false" placeholder="Без кнопки очистки" />
```

#### In form

```vue
<form @submit.prevent="handleSubmit">
  <TextInput
    v-model="form.email"
    label="Email"
    type="email"
    required
    name="email"
  />
  <TextInput
    v-model="form.password"
    label="Пароль"
    type="password"
    required
    name="password"
  />
  <ButtonUi type="submit">Отправить</ButtonUi>
</form>
```

#### With HTML attributes

```vue
<TextInput
  v-model="text"
  type="email"
  name="email"
  autocomplete="email"
  data-testid="email-input"
  aria-label="Email адрес"
  @input="handleInput"
/>
```

#### With built-in validation

```vue
<template>
  <TextInput
    ref="emailInputRef"
    v-model="email"
    label="Email"
    type="email"
    :validate="true"
    :validate-on-blur="true"
    @validation-error="handleValidationError"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import TextInput from '~/components/UI/TextInput/TextInput.vue'
import { validationRules } from '~/composables/useFieldValidation'

const email = ref('')
const emailInputRef = ref<InstanceType<typeof TextInput> | null>(null)

// Кастомные правила валидации
const customRules = [
  validationRules.required('Обязательное поле'),
  validationRules.email('Некорректный email')
]

const handleValidationError = (error: string) => {
  console.log('Validation error:', error)
}

// Программная валидация
const validateForm = () => {
  emailInputRef.value?.validate()
}
</script>
```

#### With spread props

```vue
<template>
  <TextInput v-bind="inputConfig" @input="handleInput" />
</template>

<script setup lang="ts">
const inputConfig = {
  modelValue: '',
  variant: 'normal',
  size: 'm',
  placeholder: 'Введите текст',
  showClear: true,
  required: false
}

const handleInput = (event: Event) => {
  console.log('Input changed', event)
}
</script>
```

### Methods

```typescript
focus(): void
  // Установить фокус на input

blur(): void
  // Убрать фокус с input

select(): void
  // Выделить весь текст в input

validate(): boolean
  // Валидировать поле (только если validate=true)
  // Возвращает true если валидация прошла успешно

reset(): void
  // Сбросить состояние валидации (только если validate=true)

isValid: ComputedRef<boolean>
  // Computed свойство, указывающее на валидность поля
```