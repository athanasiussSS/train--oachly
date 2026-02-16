# Radio

Radio используется, когда нужно выбрать один из нескольких взаимоисключающих вариантов.

### Когда стоит применять

Как правило, Radio, как и чекбокс, не запускает действие мгновенно. Запуск действия происходит по нажатии кнопки подтверждения («Сохранить» / «Применить» / «Отправить»).

Пояснительный текст лейбла должен отвечать на вопрос «Как?» или «Какой?».

### Когда не использовать

Radio не может применяться как элемент переключения содержимого страницы или меню. Таким функционалом обладают компоненты SegmentedRadioGroup и Tabs.

### Usage example

```vue
<Radio
  v-model="selected"
  value="option1"
  label="Опция 1"
  name="group1"
  size="m"
  :disabled="false"
  :required="false"
  @change="handleChange"
/>
```

### Usage with spread props

```vue
<template>
  <div>
    <Radio v-bind="radioProps1" @change="handleChange" />
    <Radio v-bind="radioProps2" @change="handleChange" />
    <Radio v-bind="radioProps3" @change="handleChange" />
  </div>
</template>

<script setup lang="ts">
const radioProps1 = {
  modelValue: 'option1',
  value: 'option1',
  label: 'Опция 1',
  name: 'group',
  size: 'm',
  required: true
}

const radioProps2 = {
  modelValue: 'option1',
  value: 'option2',
  label: 'Опция 2',
  name: 'group',
  size: 'm',
  required: true
}

const radioProps3 = {
  modelValue: 'option1',
  value: 'option3',
  label: 'Опция 3',
  name: 'group',
  size: 'm',
  required: true
}

const handleChange = (value: string | number, event: Event) => {
  console.log('Radio changed', value, event)
}
</script>
```

### Props

```typescript
modelValue?: string | number | null
  // Выбранное значение (v-model)
  // Должно быть одинаковым для всех radio в группе
  // Default: null

value: string | number
  // Значение radio (обязательно)
  // Используется для идентификации выбранного элемента в группе
  // Должно быть уникальным в пределах группы

size?: 'm' | 'l'
  // Размер radio
  // 'm' - Medium (контейнер 16x16px, шрифт лейбла base)
  // 'l' - Large (контейнер 20x20px, шрифт лейбла lg)
  // Размер компонента выбирается в зависимости от размера контролов на странице
  // Default: 'm'

disabled?: boolean
  // Отключенное состояние, когда вариант не доступен для взаимодействия
  // Default: false

label?: string
  // Текст лейбла (обязательно)
  // Radio всегда применяется вместе с лейблом, поясняющим его значение
  // Пояснительный текст должен отвечать на вопрос «Как?» или «Какой?»

name?: string
  // Имя группы (обязательно для группировки)
  // Все radio с одинаковым name образуют группу
  // В группе может быть выбран только один элемент

required?: boolean
  // Обязательное поле
  // Default: false

inputId?: string
  // ID для input элемента
  // Default: undefined (генерируется автоматически)
```

### Events

```typescript
@update:modelValue: (value: string | number) => void
  // Событие обновления значения (v-model)

@change: (value: string | number, event: Event) => void
  // Событие изменения выбранного значения
  // value - новое значение
  // event - нативное событие

@focus: (event: FocusEvent) => void
  // Событие получения фокуса

@blur: (event: FocusEvent) => void
  // Событие потери фокуса
```

### Slots

```vue
#label
  // Кастомный текст лейбла
```

### Methods

```typescript
focus(): void
  // Установить фокус на radio программно

blur(): void
  // Убрать фокус с radio программно
```

### Examples

#### Basic usage (группа)

```vue
<template>
  <div>
    <Radio v-model="selected" value="option1" label="Опция 1" name="group" />
    <Radio v-model="selected" value="option2" label="Опция 2" name="group" />
    <Radio v-model="selected" value="option3" label="Опция 3" name="group" />
  </div>
</template>

<script setup lang="ts">
const selected = ref('option1')
</script>
```

#### Different sizes

```vue
<!-- Размер M -->
<div>
  <Radio v-model="selected" value="option1" label="Опция 1" name="group-m" size="m" />
  <Radio v-model="selected" value="option2" label="Опция 2" name="group-m" size="m" />
</div>

<!-- Размер L -->
<div>
  <Radio v-model="selected" value="option1" label="Опция 1" name="group-l" size="l" />
  <Radio v-model="selected" value="option2" label="Опция 2" name="group-l" size="l" />
</div>
```

#### With first selected (рекомендуется)

```vue
<template>
  <div>
    <!-- Рекомендуется всегда выбирать первый вариант -->
    <Radio v-model="selected" value="option1" label="Опция 1" name="group" />
    <Radio v-model="selected" value="option2" label="Опция 2" name="group" />
    <Radio v-model="selected" value="option3" label="Опция 3" name="group" />
  </div>
</template>

<script setup lang="ts">
// По умолчанию всегда выбран первый пункт
const selected = ref('option1')
</script>
```

#### Without selected (опционально)

```vue
<template>
  <div>
    <!-- Опционально можно оставлять переключатели в невыбранном состоянии -->
    <Radio v-model="selected" value="option1" label="Опция 1" name="group" />
    <Radio v-model="selected" value="option2" label="Опция 2" name="group" />
    <Radio v-model="selected" value="option3" label="Опция 3" name="group" />
  </div>
</template>

<script setup lang="ts">
const selected = ref(null)
</script>
```

#### Disabled states

```vue
<template>
  <div>
    <Radio v-model="selected" value="option1" label="Опция 1" name="group" />
    <Radio v-model="selected" value="option2" label="Опция 2 (отключена)" name="group" :disabled="true" />
    <Radio v-model="selected" value="option3" label="Опция 3" name="group" />
  </div>
</template>
```

#### With custom label

```vue
<Radio v-model="selected" value="option1" name="group">
  <template #label>
    <span style="font-weight: 600; color: var(--color-primary);">
      Кастомный лейбл
    </span>
  </template>
</Radio>
```

#### In form

```vue
<template>
  <form @submit.prevent="handleSubmit">
    <div>
      <h3>Выберите тип:</h3>
      <Radio v-model="form.type" value="type1" label="Тип 1" name="type" required />
      <Radio v-model="form.type" value="type2" label="Тип 2" name="type" required />
      <Radio v-model="form.type" value="type3" label="Тип 3" name="type" required />
    </div>
    <ButtonUi type="submit">Отправить</ButtonUi>
  </form>
</template>

<script setup lang="ts">
const form = ref({
  type: 'type1' // Рекомендуется выбирать первый вариант
})

const handleSubmit = () => {
  console.log('Form submitted', form.value)
}
</script>
```

#### Horizontal group

```vue
<template>
  <div style="display: flex; gap: 1.5rem;">
    <Radio v-model="selected" value="option1" label="Опция 1" name="group" />
    <Radio v-model="selected" value="option2" label="Опция 2" name="group" />
    <Radio v-model="selected" value="option3" label="Опция 3" name="group" />
  </div>
</template>
```

#### Usage examples

```vue
<template>
  <div>
    <!-- Способ оплаты -->
    <div>
      <h3>Способ оплаты:</h3>
      <Radio v-model="paymentMethod" value="card" label="Банковская карта" name="payment" />
      <Radio v-model="paymentMethod" value="cash" label="Наличные" name="payment" />
      <Radio v-model="paymentMethod" value="online" label="Онлайн-платеж" name="payment" />
    </div>

    <!-- Тип доставки -->
    <div>
      <h3>Тип доставки:</h3>
      <Radio v-model="deliveryType" value="standard" label="Стандартная доставка" name="delivery" />
      <Radio v-model="deliveryType" value="express" label="Экспресс-доставка" name="delivery" />
      <Radio v-model="deliveryType" value="pickup" label="Самовывоз" name="delivery" />
    </div>
  </div>
</template>

<script setup lang="ts">
const paymentMethod = ref('card')
const deliveryType = ref('standard')
</script>
```

#### With HTML attributes

```vue
<Radio
  v-model="selected"
  value="option1"
  label="Опция 1"
  name="group"
  required
  data-testid="radio-option1"
  aria-label="Выбор опции 1"
  @change="handleChange"
/>
```

#### With spread props

```vue
<template>
  <div>
    <Radio v-bind="radioConfig1" @change="handleChange" />
    <Radio v-bind="radioConfig2" @change="handleChange" />
    <Radio v-bind="radioConfig3" @change="handleChange" />
  </div>
</template>

<script setup lang="ts">
const selected = ref('option1')

const radioConfig1 = {
  modelValue: selected,
  value: 'option1',
  label: 'Опция 1',
  name: 'group',
  size: 'm',
  required: true
}

const radioConfig2 = {
  modelValue: selected,
  value: 'option2',
  label: 'Опция 2',
  name: 'group',
  size: 'm',
  required: true
}

const radioConfig3 = {
  modelValue: selected,
  value: 'option3',
  label: 'Опция 3',
  name: 'group',
  size: 'm',
  required: true
}

const handleChange = (value: string | number, event: Event) => {
  console.log('Radio changed', value, event)
}
</script>
```

### Структура

Radio состоит из:
1. Radio-элемент (круглый контейнер с точкой внутри при выборе)
2. Уточняющий лейбл (пояснительный текст)

Radio всегда применяется вместе с лейблом, поясняющим его значение.

### Важные замечания

- **По умолчанию всегда выбран первый пункт** - рекомендуется всегда выбирать первый вариант в списке
- **Опционально можно оставлять переключатели в невыбранном состоянии** - когда все варианты очищены
- **После выбора элемента в группе пользователь не может отменить выбор** - чтобы восстановить исходное состояние группы (без обновления страницы)
- **Размер компонента выбирается в зависимости от размера контролов на странице** - если на странице используются размер L для инпутов, кнопок и других элементов, то и размер Radio рекомендуется использовать соответствующий

### Состояния

- **Default** — когда пользователь не взаимодействует с элементом
- **Hover** — по наведению на элемент, включая текстовый лейбл
- **Checked** — выбранное состояние
- **Disabled** — отключенное состояние, когда вариант не доступен для взаимодействия