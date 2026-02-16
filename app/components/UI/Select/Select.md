# Select

### Usage example

```vue
<Select
  v-model="selectedValue"
  :options="options"
  variant="normal"
  size="m"
  placeholder="Выберите значение"
  :clearable="true"
  :disabled="false"
  @change="handleChange"
/>
```

### Usage with spread props

```vue
<template>
  <Select v-bind="selectProps" @change="handleChange" />
</template>

<script setup lang="ts">
const selectProps = {
  modelValue: null,
  mode: 'single',
  options: [
    { value: '1', label: 'Опция 1' },
    { value: '2', label: 'Опция 2' },
    { value: '3', label: 'Опция 3' }
  ],
  variant: 'normal',
  size: 'm',
  placeholder: 'Выберите значение',
  clearable: true,
  required: true,
  label: 'Выберите опцию',
  // Можно также передавать HTML атрибуты
  name: 'select',
  'data-testid': 'select-input',
  'aria-label': 'Выбор опции'
}

const handleChange = (value: string | number | (string | number)[] | null) => {
  console.log('Selected value changed', value)
}
</script>
```

### Props

```typescript
modelValue?: string | number | (string | number)[] | null
  // Выбранное значение (v-model)
  // Для single режима: string | number | null
  // Для multiple режима: (string | number)[]
  // Default: null

mode?: 'single' | 'multiple'
  // Режим выбора
  // 'single' - Выбор одного значения. При выборе список закрывается
  // 'multiple' - Выбор нескольких значений. В списке значения помечаются галочками
  // Default: 'single'

options: SelectOption[]
  // Массив опций для выбора
  // Обязательный проп
  // interface SelectOption {
  //   value: string | number
  //   label: string
  //   disabled?: boolean
  //   [key: string]: any
  // }

variant?: 'normal' | 'clear'
  // Вариант отображения
  // 'normal' - Есть обводка (1px), внутренние отступы, скругления
  // 'clear' - Нет обводки, контент прижат к краям. Используется для минимализма
  // Default: 'normal'

size?: 's' | 'm' | 'l' | 'xl'
  // Размер select
  // 's' - Small (height: 24px, radius: 5px)
  // 'm' - Medium (height: 28px, radius: 6px)
  // 'l' - Large (height: 36px, radius: 8px)
  // 'xl' - Extra Large (height: 44px, radius: 10px)
  // Default: 'm'

error?: boolean | string
  // Наличие ошибки (boolean или текст ошибки)
  // Default: false

errorMessage?: string
  // Текст сообщения об ошибке
  // Default: ''

errorMode?: 'inline' | 'outline'
  // Режим отображения ошибки
  // 'inline' - Иконка ошибки внутри контрола. При наведении — Tooltip с текстом
  // 'outline' - Текст ошибки снизу слева
  // Default: 'outline'

clearable?: boolean
  // Показывать кнопку очистки
  // Default: true

placeholder?: string
  // Placeholder текст
  // Default: 'Выберите значение...'

disabled?: boolean
  // Отключенное состояние
  // Default: false

required?: boolean
  // Обязательное поле
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

triggerId?: string
  // ID для триггера
  // Default: undefined (генерируется автоматически)
```

### Events

```typescript
@update:modelValue: (value: string | number | (string | number)[] | null) => void
  // Событие обновления значения (v-model)

@change: (value: string | number | (string | number)[] | null) => void
  // Событие изменения выбранного значения

@clear: () => void
  // Событие очистки значения

@open: () => void
  // Событие открытия dropdown

@close: () => void
  // Событие закрытия dropdown
```

### Slots

```vue
#label
  // Кастомный label

#hint
  // Подсказка под полем

#option
  // Кастомный рендер опции
  // Параметры: { option: SelectOption, selected: boolean }

#additional
  // Дополнительный контент справа внизу

#error-icon
  // Кастомная иконка ошибки

#clear-button
  // Кастомная кнопка очистки

#chevron
  // Кастомный шеврон

#empty
  // Кастомное сообщение при отсутствии опций
```

### Examples

#### Basic usage

```vue
<Select
  v-model="selected"
  :options="options"
  placeholder="Выберите значение"
/>
```

#### Single mode

```vue
<Select
  v-model="selected"
  mode="single"
  :options="options"
  placeholder="Выберите одно значение"
/>
```

#### Multiple mode

```vue
<Select
  v-model="selected"
  mode="multiple"
  :options="options"
  placeholder="Выберите несколько значений"
/>
```

#### With label and hint

```vue
<Select
  v-model="selected"
  :options="options"
  label="Выберите опцию"
  placeholder="Выберите значение..."
>
  <template #hint>Выберите одну из доступных опций</template>
</Select>
```

#### Error states

```vue
<!-- Inline error -->
<Select
  v-model="selected"
  :options="options"
  :error="true"
  error-message="Поле обязательно для заполнения"
  error-mode="inline"
/>

<!-- Outline error -->
<Select
  v-model="selected"
  :options="options"
  :error="true"
  error-message="Поле обязательно для заполнения"
  error-mode="outline"
/>

<!-- Error as string -->
<Select
  v-model="selected"
  :options="options"
  error="Поле содержит недопустимое значение"
  error-mode="outline"
/>
```

#### Disabled

```vue
<Select
  v-model="selected"
  :options="options"
  :disabled="true"
/>
```

#### Different variants

```vue
<Select v-model="selected" :options="options" variant="normal" placeholder="Normal вариант" />
<Select v-model="selected" :options="options" variant="clear" placeholder="Clear вариант" />
```

#### Different sizes

```vue
<Select v-model="selected" :options="options" size="s" placeholder="Размер S" />
<Select v-model="selected" :options="options" size="m" placeholder="Размер M" />
<Select v-model="selected" :options="options" size="l" placeholder="Размер L" />
<Select v-model="selected" :options="options" size="xl" placeholder="Размер XL" />
```

#### With disabled options

```vue
<Select
  v-model="selected"
  :options="[
    { value: '1', label: 'Опция 1' },
    { value: '2', label: 'Опция 2 (отключена)', disabled: true },
    { value: '3', label: 'Опция 3' }
  ]"
/>
```

#### Without clear button

```vue
<Select
  v-model="selected"
  :options="options"
  :clearable="false"
/>
```

#### Custom option render

```vue
<Select v-model="selected" :options="options">
  <template #option="{ option, selected }">
    <div style="display: flex; flex-direction: column;">
      <span style="font-weight: 500;">{{ option.label }}</span>
      <span style="font-size: 0.875rem; color: #6b7280;">{{ option.description }}</span>
    </div>
  </template>
</Select>
```

#### In form

```vue
<form @submit.prevent="handleSubmit">
  <Select
    v-model="form.category"
    :options="categories"
    label="Категория"
    required
    name="category"
  />
  <ButtonUi type="submit">Отправить</ButtonUi>
</form>
```

#### With HTML attributes

```vue
<Select
  v-model="selected"
  :options="options"
  name="select"
  required
  data-testid="select-input"
  aria-label="Выбор опции"
  @change="handleChange"
/>
```

#### With spread props

```vue
<template>
  <Select v-bind="selectConfig" @change="handleChange" />
</template>

<script setup lang="ts">
const selectConfig = {
  modelValue: null,
  mode: 'single',
  options: [
    { value: '1', label: 'Опция 1' },
    { value: '2', label: 'Опция 2' },
    { value: '3', label: 'Опция 3' }
  ],
  variant: 'normal',
  size: 'm',
  placeholder: 'Выберите значение',
  clearable: true
}

const handleChange = (value: string | number | (string | number)[] | null) => {
  console.log('Selected value changed', value)
}
</script>
```

#### Checkbox group with Select All

```vue
<template>
  <div>
    <Select
      v-model="selectAll"
      :options="options"
      :indeterminate="isIndeterminate"
      label="Выбрать все"
      @change="toggleSelectAll"
    />
    <div style="margin-left: 1.5rem;">
      <Select
        v-for="option in options"
        :key="option.id"
        v-model="option.selected"
        :options="option.items"
        :label="option.label"
        @change="updateSelectAll"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const options = ref([
  { id: '1', label: 'Группа 1', selected: false, items: [...] },
  { id: '2', label: 'Группа 2', selected: false, items: [...] }
])

const selectAll = ref(false)
const isIndeterminate = ref(false)

const toggleSelectAll = () => {
  // Логика выбора всех
}

const updateSelectAll = () => {
  // Логика обновления состояния "Выбрать все"
}
</script>
```