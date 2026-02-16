# RadioGroup

RadioGroup используется, когда нужно выбрать один из нескольких взаимоисключающих вариантов. Состоит из нескольких компонентов Radio, упрощает работу с группой radio-кнопок.

### Когда стоит применять

Как правило, Radio, как и чекбокс, не запускает действие мгновенно. Запуск действия происходит по нажатии кнопки подтверждения («Сохранить» / «Применить» / «Отправить»).

Пояснительный текст лейбла должен отвечать на вопрос «Как?» или «Какой?».

### Когда не использовать

Не рекомендуется применять как элемент переключения содержимого страницы или меню. Таким функционалом обладают компоненты SegmentedRadioGroup и Tabs.

### Usage example

```vue
<RadioGroup
  v-model="selected"
  :options="options"
  size="m"
  direction="vertical"
  :default-selected="true"
  @change="handleChange"
/>
```

### Usage with spread props

```vue
<template>
  <RadioGroup v-bind="radioGroupProps" @change="handleChange" />
</template>

<script setup lang="ts">
const radioGroupProps = {
  modelValue: null,
  options: [
    { value: 'option1', label: 'Опция 1' },
    { value: 'option2', label: 'Опция 2' },
    { value: 'option3', label: 'Опция 3' }
  ],
  size: 'm',
  direction: 'vertical',
  defaultSelected: true,
  required: true
}

const handleChange = (value: string | number | null) => {
  console.log('RadioGroup changed', value)
}
</script>
```

### Props

```typescript
modelValue?: string | number | null
  // Выбранное значение (v-model)
  // Default: null

options: RadioGroupOption[]
  // Массив опций для выбора
  // Обязательный проп
  // interface RadioGroupOption {
  //   value: string | number
  //   label: string
  //   disabled?: boolean
  //   [key: string]: any
  // }

size?: 'm' | 'l'
  // Размер radio
  // 'm' - Medium (контейнер 16x16px, шрифт лейбла base)
  // 'l' - Large (контейнер 20x20px, шрифт лейбла lg)
  // Выбор размера компонента зависит от размера остальных элементов управления на странице
  // Если на странице используются размеры L для инпутов, кнопок и других элементов, то рекомендуется использовать соответствующий размер
  // Default: 'm'

direction?: 'horizontal' | 'vertical'
  // Направление расположения
  // 'vertical' - Вертикальное расположение (по умолчанию)
  // 'horizontal' - Горизонтальное расположение
  // Default: 'vertical'

name?: string
  // Имя группы
  // Если не указано, генерируется автоматически
  // Default: undefined

disabled?: boolean
  // Отключить всю группу
  // Default: false

required?: boolean
  // Обязательное поле
  // Default: false

defaultSelected?: boolean
  // Выбрать первый элемент по умолчанию
  // По умолчанию всегда выбран первый пункт
  // Опционально можно оставлять переключатели в невыбранном состоянии
  // Default: true
```

### Events

```typescript
@update:modelValue: (value: string | number | null) => void
  // Событие обновления значения (v-model)

@change: (value: string | number | null) => void
  // Событие изменения выбранного значения

@focus: (event: FocusEvent) => void
  // Событие получения фокуса

@blur: (event: FocusEvent) => void
  // Событие потери фокуса
```

### Slots

```vue
#option
  // Кастомный рендер опции
  // Параметры: { option: RadioGroupOption, checked: boolean, index: number }
```

### Examples

#### Basic usage

```vue
<template>
  <RadioGroup v-model="selected" :options="options" />
</template>

<script setup lang="ts">
const selected = ref(null)

const options = [
  { value: 'option1', label: 'Опция 1' },
  { value: 'option2', label: 'Опция 2' },
  { value: 'option3', label: 'Опция 3' }
]
</script>
```

#### Different sizes

```vue
<!-- Размер M -->
<RadioGroup v-model="selected" :options="options" size="m" />

<!-- Размер L -->
<RadioGroup v-model="selected" :options="options" size="l" />
```

#### Different directions

```vue
<!-- Вертикальное расположение -->
<RadioGroup v-model="selected" :options="options" direction="vertical" />

<!-- Горизонтальное расположение -->
<RadioGroup v-model="selected" :options="options" direction="horizontal" />
```

#### With first selected (рекомендуется)

```vue
<template>
  <!-- По умолчанию всегда выбран первый пункт -->
  <RadioGroup v-model="selected" :options="options" :default-selected="true" />
</template>

<script setup lang="ts">
const selected = ref(null)

const options = [
  { value: 'option1', label: 'Опция 1' },
  { value: 'option2', label: 'Опция 2' },
  { value: 'option3', label: 'Опция 3' }
]
</script>
```

#### Without selected (опционально)

```vue
<template>
  <!-- Опционально можно оставлять переключатели в невыбранном состоянии -->
  <RadioGroup v-model="selected" :options="options" :default-selected="false" />
</template>

<script setup lang="ts">
const selected = ref(null)

const options = [
  { value: 'option1', label: 'Опция 1' },
  { value: 'option2', label: 'Опция 2' },
  { value: 'option3', label: 'Опция 3' }
]
</script>
```

#### With disabled options

```vue
<template>
  <RadioGroup v-model="selected" :options="options" />
</template>

<script setup lang="ts">
const selected = ref(null)

const options = [
  { value: 'option1', label: 'Опция 1' },
  { value: 'option2', label: 'Опция 2 (отключена)', disabled: true },
  { value: 'option3', label: 'Опция 3' }
]
</script>
```

#### Disabled group

```vue
<RadioGroup v-model="selected" :options="options" :disabled="true" />
```

#### Custom option render

```vue
<template>
  <RadioGroup v-model="selected" :options="options">
    <template #option="{ option, checked, index }">
      <div style="display: flex; flex-direction: column;">
        <span style="font-weight: 500;">{{ option.label }}</span>
        <span v-if="option.description" style="font-size: 0.875rem; color: #6b7280;">
          {{ option.description }}
        </span>
      </div>
    </template>
  </RadioGroup>
</template>

<script setup lang="ts">
const selected = ref(null)

const options = [
  { value: 'option1', label: 'Опция 1', description: 'Описание опции 1' },
  { value: 'option2', label: 'Опция 2', description: 'Описание опции 2' },
  { value: 'option3', label: 'Опция 3', description: 'Описание опции 3' }
]
</script>
```

#### In form

```vue
<template>
  <form @submit.prevent="handleSubmit">
    <div>
      <h3>Выберите тип:</h3>
      <RadioGroup
        v-model="form.type"
        :options="typeOptions"
        required
      />
    </div>
    <ButtonUi type="submit">Отправить</ButtonUi>
  </form>
</template>

<script setup lang="ts">
const form = ref({
  type: null
})

const typeOptions = [
  { value: 'type1', label: 'Тип 1' },
  { value: 'type2', label: 'Тип 2' },
  { value: 'type3', label: 'Тип 3' }
]

const handleSubmit = () => {
  console.log('Form submitted', form.value)
}
</script>
```

#### Usage examples

```vue
<template>
  <div>
    <!-- Способ оплаты -->
    <div>
      <h3>Способ оплаты:</h3>
      <RadioGroup v-model="paymentMethod" :options="paymentOptions" />
    </div>

    <!-- Тип доставки (горизонтально) -->
    <div>
      <h3>Тип доставки:</h3>
      <RadioGroup
        v-model="deliveryType"
        :options="deliveryOptions"
        direction="horizontal"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const paymentMethod = ref(null)
const deliveryType = ref(null)

const paymentOptions = [
  { value: 'card', label: 'Банковская карта' },
  { value: 'cash', label: 'Наличные' },
  { value: 'online', label: 'Онлайн-платеж' }
]

const deliveryOptions = [
  { value: 'standard', label: 'Стандартная доставка' },
  { value: 'express', label: 'Экспресс-доставка' },
  { value: 'pickup', label: 'Самовывоз' }
]
</script>
```

#### With spread props

```vue
<template>
  <RadioGroup v-bind="radioGroupConfig" @change="handleChange" />
</template>

<script setup lang="ts">
const selected = ref(null)

const radioGroupConfig = {
  modelValue: selected,
  options: [
    { value: 'option1', label: 'Опция 1' },
    { value: 'option2', label: 'Опция 2' },
    { value: 'option3', label: 'Опция 3' }
  ],
  size: 'm',
  direction: 'vertical',
  defaultSelected: true,
  required: false
}

const handleChange = (value: string | number | null) => {
  console.log('RadioGroup changed', value)
}
</script>
```

### Структура

RadioGroup состоит из нескольких компонентов Radio, каждый из которых имеет:
1. Radio-элемент (круглый контейнер с точкой внутри при выборе)
2. Уточняющий лейбл (пояснительный текст)

Radio всегда применяется вместе с лейблом, поясняющим его значение.

### Важные замечания

- **По умолчанию всегда выбран первый пункт** - рекомендуется всегда выбирать первый вариант в списке
- **Опционально можно оставлять переключатели в невыбранном состоянии** - когда все варианты очищены (через `defaultSelected: false`)
- **После выбора элемента в группе пользователь не может отменить выбор** - чтобы восстановить исходное состояние группы (без обновления страницы)
- **Размер компонента выбирается в зависимости от размера контролов на странице** - если на странице используются размеры L для инпутов, кнопок и других элементов, то рекомендуется использовать соответствующий размер
- **Может применяться в горизонтальном и вертикальном положении** - выбор зависит от компоновки страницы