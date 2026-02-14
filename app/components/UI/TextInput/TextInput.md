# TextInput

### Usage example

```vue
<TextInput v-model="value"
           variant="normal"
           size="m"
           placeholder="Введите текст"
           :show-clear="true"
           :error="hasError"
           error-message="Поле обязательно для заполнения"
           @clear="handleClear"
>
    <template #left-icon>
        <span>🔍</span>
    </template>
    <template #right-content>
        <ButtonUi size="s" variant="flat-secondary">Отправить</ButtonUi>
    </template>
    <template #additional>
        <span>{{ value.length }}/100</span>
    </template>
</TextInput>
```

### Usage with spread props

```vue
<template>
    <TextInput v-model="value" v-bind="inputProps" @clear="handleClear">
        Отправить
    </TextInput>
</template>

<script setup lang="ts">
const inputProps = {
    variant: 'normal',
    size: 'm',
    type: 'email',
    placeholder: 'Введите email',
    showClear: true,
    required: true,
    // Можно также передавать HTML атрибуты
    autocomplete: 'email',
    'data-testid': 'email-input',
    'aria-label': 'Email адрес'
}

const value = ref('')
const handleClear = () => {
    console.log('Input cleared')
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
    // 'normal' - Обычный input с рамкой
    // 'clear' - Input без рамки, только нижняя граница
    // Default: 'normal'

size?: 's' | 'm' | 'l' | 'xl'
    // Размер input
    // 's' - Small (для компактных форм)
    // 'm' - Medium (основной размер)
    // 'l' - Large (для выделения важных полей)
    // 'xl' - Extra Large (для лендингов)
    // Default: 'm'

state?: 'suggest' | 'default' | 'hover' | 'active' | 'disabled' | 'inline-error' | 'outline-error'
    // Состояние input
    // 'suggest' - Подсказка (подсветка)
    // 'default' - Обычное состояние
    // 'hover' - При наведении
    // 'active' - Активное (в фокусе)
    // 'disabled' - Отключено
    // 'inline-error' - Ошибка (inline режим)
    // 'outline-error' - Ошибка (outline режим)
    // Default: 'default'

error?: boolean
    // Наличие ошибки валидации
    // Default: false

errorMessage?: string
    // Текст сообщения об ошибке (отображается в inline режиме)
    // Default: ''

errorMode?: 'inline' | 'outline'
    // Режим отображения ошибки
    // 'inline' - Сообщение об ошибке под полем
    // 'outline' - Только подсветка рамки
    // Default: 'inline'

showClear?: boolean
    // Показывать кнопку очистки (показывается при наличии значения)
    // Default: true

type?: string
    // Тип HTML input (text, email, password, number, tel, url, search и т.д.)
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

required?: boolean
    // Обязательное поле
    // Default: false

maxlength?: number
    // Максимальная длина ввода
    // Default: undefined

minlength?: number
    // Минимальная длина ввода
    // Default: undefined

pattern?: string
    // Регулярное выражение для валидации
    // Default: undefined

autocomplete?: string
    // Автозаполнение (on, off, email, username и т.д.)
    // Default: undefined

autofocus?: boolean
    // Автофокус при загрузке
    // Default: false

name?: string
    // Имя поля (для форм)
    // Default: undefined

ariaLabel?: string
    // ARIA label для доступности
    // Default: undefined

ariaDescribedBy?: string
    // ARIA describedby для доступности
    // Default: undefined

inputId?: string
    // ID для input элемента (если не указан, генерируется автоматически)
    // Default: undefined
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
    // Событие очистки поля

@keydown: (event: KeyboardEvent) => void
    // Событие нажатия клавиши

@keyup: (event: KeyboardEvent) => void
    // Событие отпускания клавиши
```

### Slots

```typescript
left-icon
    // Иконка слева от input
    // Пример: <template #left-icon><Icon name="search" /></template>

right-content
    // Контент справа (кнопки, иконки, максимум 2 элемента)
    // Пример: <template #right-content><ButtonUi>Отправить</ButtonUi></template>

additional
    // Дополнительный контент справа (счетчик, единицы измерения)
    // Пример: <template #additional><span>{{ value.length }}/100</span></template>

clear-button
    // Кастомная кнопка очистки
    // Пример: <template #clear-button><Icon name="close" /></template>
```

### Examples

#### Basic usage

```vue
<TextInput v-model="value" placeholder="Введите текст" />
```

#### With icon

```vue
<TextInput v-model="value" placeholder="Поиск...">
    <template #left-icon>
        <span>🔍</span>
    </template>
</TextInput>
```

#### With button

```vue
<TextInput v-model="value" placeholder="Введите текст">
    <template #right-content>
        <ButtonUi size="s" variant="primary">Отправить</ButtonUi>
    </template>
</TextInput>
```

#### With counter

```vue
<TextInput v-model="value" placeholder="Введите текст" :maxlength="100">
    <template #additional>
        <span>{{ value.length }}/100</span>
    </template>
</TextInput>
```

#### Full example

```vue
<TextInput 
    v-model="email"
    variant="normal"
    size="m"
    type="email"
    placeholder="Введите email"
    :required="true"
    :error="hasError"
    error-message="Некорректный email"
>
    <template #left-icon>
        <span>📧</span>
    </template>
    <template #right-content>
        <ButtonUi size="s" variant="primary">Отправить</ButtonUi>
    </template>
    <template #additional>
        <span v-if="email.length > 0">✓</span>
    </template>
</TextInput>
```

#### Disabled input

```vue
<TextInput v-model="value" :disabled="true" placeholder="Отключено" />
```

#### Readonly input

```vue
<TextInput v-model="value" :readonly="true" placeholder="Только чтение" />
```

#### Error states

```vue
<!-- Inline error -->
<TextInput 
    v-model="value"
    :error="true"
    error-message="Поле обязательно для заполнения"
    error-mode="inline"
/>

<!-- Outline error -->
<TextInput 
    v-model="value"
    :error="true"
    error-message="Поле обязательно для заполнения"
    error-mode="outline"
/>
```

#### Different variants

```vue
<!-- Normal variant -->
<TextInput v-model="value1" variant="normal" placeholder="Normal" />

<!-- Clear variant -->
<TextInput v-model="value2" variant="clear" placeholder="Clear" />
```

#### Different sizes

```vue
<TextInput v-model="value1" size="s" placeholder="Size S" />
<TextInput v-model="value2" size="m" placeholder="Size M" />
<TextInput v-model="value3" size="l" placeholder="Size L" />
<TextInput v-model="value4" size="xl" placeholder="Size XL" />
```

#### Different types

```vue
<!-- Email -->
<TextInput v-model="email" type="email" placeholder="email@example.com" />

<!-- Password -->
<TextInput v-model="password" type="password" placeholder="Введите пароль" />

<!-- Search -->
<TextInput v-model="search" type="search" placeholder="Поиск..." />

<!-- Number -->
<TextInput v-model="number" type="number" placeholder="Введите число" />
```

#### Without clear button

```vue
<TextInput v-model="value" :show-clear="false" placeholder="Без кнопки очистки" />
```

#### With HTML attributes

```vue
<TextInput 
    v-model="value"
    type="email"
    autocomplete="email"
    name="user-email"
    data-testid="email-input"
    aria-label="Email адрес"
    aria-describedby="email-hint"
/>
```

#### With spread props

```vue
<template>
    <TextInput v-model="value" v-bind="inputConfig" @clear="handleClear" />
</template>

<script setup lang="ts">
const inputConfig = {
    variant: 'normal',
    size: 'm',
    type: 'email',
    placeholder: 'Введите email',
    showClear: true,
    required: true,
    autocomplete: 'email'
}

const value = ref('')
const handleClear = () => {
    console.log('Cleared')
}
</script>
```
