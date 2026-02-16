# Checkbox

### Usage example

```vue
<Checkbox
  v-model="checked"
  label="Подписаться на рассылку"
  size="m"
  :indeterminate="false"
  :disabled="false"
  :required="false"
  @change="handleChange"
/>
```

### Usage with spread props

```vue
<template>
  <Checkbox v-bind="checkboxProps" @change="handleChange" />
</template>

<script setup lang="ts">
const checkboxProps = {
  modelValue: false,
  size: 'm',
  label: 'Принять условия',
  indeterminate: false,
  disabled: false,
  required: true,
  // Можно также передавать HTML атрибуты
  name: 'agree',
  value: 'yes',
  'data-testid': 'agree-checkbox',
  'aria-label': 'Согласие с условиями'
}

const handleChange = (value: boolean, event: Event) => {
  console.log('Checkbox changed', value, event)
}
</script>
```

### Props

```typescript
modelValue?: boolean
  // Состояние чекбокса (v-model)
  // true - выбран
  // false - не выбран
  // Default: false

size?: 'm' | 'l'
  // Размер чекбокса
  // 'm' - Medium (контейнер 14x14px, шрифт лейбла 13px)
  // 'l' - Large (контейнер 17x17px, шрифт лейбла 15px). Используется для выделения или улучшения доступности
  // Default: 'm'

indeterminate?: boolean
  // Промежуточное состояние (частичный выбор)
  // Отображается как горизонтальная линия или тире вместо галочки
  // Используется для заголовков групп чекбоксов
  // При клике на indeterminate чекбокс обычно переходит в состояние checked
  // Default: false

disabled?: boolean
  // Отключенное состояние. Взаимодействие недоступно
  // Default: false

label?: string
  // Текст лейбла (опциональный)
  // Если не указан, чекбокс отображается без лейбла (для таблиц, компактных интерфейсов)
  // Default: undefined

name?: string
  // Имя поля (для форм)
  // Default: undefined

value?: string | number
  // Значение (для форм)
  // Default: undefined

required?: boolean
  // Обязательное поле
  // Default: false

inputId?: string
  // ID для input элемента
  // Default: undefined (генерируется автоматически)
```

### Events

```typescript
@update:modelValue: (value: boolean) => void
  // Событие обновления значения (v-model)

@change: (value: boolean, event: Event) => void
  // Событие изменения состояния
  // value - новое значение (true/false)
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

#icon
  // Кастомная галочка/иконка
  // Для indeterminate состояния можно использовать кастомный индикатор
```

### Examples

#### Basic usage

```vue
<Checkbox v-model="checked" label="Подписаться на рассылку" />
```

#### Different sizes

```vue
<Checkbox v-model="checked" size="m" label="Размер M (14x14px)" />
<Checkbox v-model="checked" size="l" label="Размер L (17x17px)" />
```

#### Checked state

```vue
<Checkbox v-model="checked" label="Выбранный чекбокс" />
<!-- checked = true -->
```

#### Disabled states

```vue
<Checkbox v-model="checked" label="Отключенный чекбокс" :disabled="true" />
<Checkbox v-model="checked" label="Отключенный выбранный" :disabled="true" />
<!-- checked = true -->
```

#### Indeterminate state

```vue
<Checkbox
  v-model="checked"
  :indeterminate="isIndeterminate"
  label="Выбрать все"
  @change="handleChange"
/>
```

#### Without label

```vue
<Checkbox v-model="checked" />
```

#### With custom label

```vue
<Checkbox v-model="checked">
  <template #label>
    <span style="font-weight: 600; color: var(--color-primary);">
      Кастомный лейбл
    </span>
  </template>
</Checkbox>
```

#### With custom icon

```vue
<Checkbox v-model="checked" label="С кастомной иконкой">
  <template #icon>
    <span style="color: white; font-size: 0.75rem;">✓</span>
  </template>
</Checkbox>
```

#### In form

```vue
<form @submit.prevent="handleSubmit">
  <Checkbox
    v-model="form.agree"
    label="Я согласен с условиями использования"
    required
    name="agree"
  />
  <ButtonUi type="submit" :disabled="!form.agree">Отправить</ButtonUi>
</form>
```

#### Checkbox group

```vue
<template>
  <div>
    <Checkbox
      v-model="selectAll"
      :indeterminate="isIndeterminate"
      label="Выбрать все"
      @change="toggleSelectAll"
    />
    <div style="margin-left: 1.5rem; display: flex; flex-direction: column; gap: 0.5rem;">
      <Checkbox
        v-for="option in options"
        :key="option.id"
        v-model="option.checked"
        :label="option.label"
        @change="updateSelectAll"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const options = ref([
  { id: '1', label: 'Опция 1', checked: false },
  { id: '2', label: 'Опция 2', checked: false },
  { id: '3', label: 'Опция 3', checked: false }
])

const selectAll = ref(false)
const isIndeterminate = ref(false)

const toggleSelectAll = () => {
  const newValue = !selectAll.value
  options.value.forEach(opt => {
    opt.checked = newValue
  })
  selectAll.value = newValue
  isIndeterminate.value = false
}

const updateSelectAll = () => {
  const checkedCount = options.value.filter(opt => opt.checked).length
  selectAll.value = checkedCount === options.value.length
  isIndeterminate.value = checkedCount > 0 && checkedCount < options.value.length
}
</script>
```

#### In table

```vue
<template>
  <table>
    <thead>
      <tr>
        <th>
          <Checkbox
            v-model="selectAll"
            :indeterminate="isIndeterminate"
            @change="toggleSelectAll"
          />
        </th>
        <th>Название</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in items" :key="item.id">
        <td>
          <Checkbox
            v-model="item.selected"
            @change="updateSelectAll"
          />
        </td>
        <td>{{ item.name }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
const items = ref([
  { id: 1, name: 'Элемент 1', selected: false },
  { id: 2, name: 'Элемент 2', selected: false },
  { id: 3, name: 'Элемент 3', selected: false }
])

const selectAll = ref(false)
const isIndeterminate = ref(false)

const toggleSelectAll = () => {
  const newValue = !selectAll.value
  items.value.forEach(item => {
    item.selected = newValue
  })
  selectAll.value = newValue
  isIndeterminate.value = false
}

const updateSelectAll = () => {
  const selectedCount = items.value.filter(i => i.selected).length
  selectAll.value = selectedCount === items.value.length
  isIndeterminate.value = selectedCount > 0 && selectedCount < items.value.length
}
</script>
```

#### With HTML attributes

```vue
<Checkbox
  v-model="checked"
  label="Принять условия"
  name="terms"
  value="accepted"
  required
  data-testid="terms-checkbox"
  aria-label="Согласие с условиями"
  @change="handleChange"
/>
```

#### With spread props

```vue
<template>
  <Checkbox v-bind="checkboxConfig" @change="handleChange" />
</template>

<script setup lang="ts">
const checkboxConfig = {
  modelValue: false,
  size: 'm',
  label: 'Подписаться на рассылку',
  indeterminate: false,
  disabled: false,
  required: false
}

const handleChange = (value: boolean, event: Event) => {
  console.log('Checkbox changed', value, event)
}
</script>
```

#### Usage examples

```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 1.5rem;">
    <div>
      <h3>Настройки уведомлений</h3>
      <div style="display: flex; flex-direction: column; gap: 0.75rem;">
        <Checkbox v-model="newsletter" label="Подписаться на рассылку" />
        <Checkbox v-model="terms" label="Принять условия использования" required />
        <Checkbox v-model="notifications" label="Получать уведомления" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const newsletter = ref(false)
const terms = ref(false)
const notifications = ref(true)
</script>
```