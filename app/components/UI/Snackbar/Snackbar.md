# Snackbar

Snackbar (Toast) — это небольшое уведомление, всплывающее на экране для сообщения важной информации или предупреждения. Может использоваться для информирования пользователя о каком-либо событии или действии — например, об отправке формы или процессе загрузки файла.

### Когда стоит применять

- При отправке формы или выполнении действия, когда необходимо отобразить пользователю информацию о процессе выполнения. Например, сообщение о том, что данные успешно отправлены или что произошла ошибка.
- Когда важно не прерывать работу пользователя и не блокировать экран полностью. Snackbar появляется в углу экрана и не занимает всю площадь, позволяя пользователю продолжать взаимодействие с интерфейсом.
- Когда необходима дополнительная информация о произошедшем действии. Snackbar может содержать ссылки на дополнительный контент или дополнительную информацию, которая поможет пользователю разобраться в произошедшем.

### Когда применять не стоит

- Когда требуется немедленная реакция пользователя.
- Когда действие, которое происходит на момент отображения snackbar, может вызвать проблемы или нежелательные последствия.
- Когда сообщение требует большого объема информации или более подробного объяснения.
- Когда информация уже отображается на экране в другом виде.

### Usage example

```vue
<Snackbar
  :show="isVisible"
  @update:show="isVisible = $event"
  type="success"
  title="Успешно!"
  description="Данные успешно сохранены"
  :duration="5000"
/>
```

### Usage with spread props

```vue
<template>
  <Snackbar v-bind="snackbarProps" @close="handleClose" />
</template>

<script setup lang="ts">
const snackbarProps = {
  show: true,
  type: 'success',
  title: 'Успешно!',
  description: 'Данные успешно сохранены',
  showIcon: true,
  duration: 5000
}

const handleClose = () => {
  console.log('Snackbar closed')
}
</script>
```

### Props

```typescript
show?: boolean
  // Видимость snackbar (v-model:show)
  // Default: false

modelValue?: boolean
  // Альтернативный способ управления видимостью (v-model)
  // Default: undefined

type?: 'default' | 'info' | 'success' | 'warning' | 'error'
  // Тип snackbar
  // 'default' - Применяется, когда сообщение не требует особого внимания
  // 'info' - Используется для передачи информации о процессе, событии или действии
  // 'success' - Применяется для обозначения успешного завершения операции
  // 'warning' - Используется, чтобы предупредить пользователя о возможной проблеме
  // 'error' - Используется, чтобы предупредить об ошибке и сообщить, что требуется вмешательство
  // Default: 'default'

title?: string
  // Заголовок snackbar
  // Сообщает пользователю о выполняемом действии
  // При наличии описания заголовок можно не использовать
  // Default: ''

description?: string
  // Описание snackbar
  // Дополняет заголовок уточняющим текстом
  // Может использоваться отдельно от заголовка
  // Default: ''

showIcon?: boolean
  // Показывать иконку типа
  // Иконка является дополнительным элементом
  // Default: true

duration?: number
  // Длительность отображения в миллисекундах
  // 0 - не скрывать автоматически (требуется кнопка закрытия)
  // > 0 - скрыть через указанное количество миллисекунд
  // Default: 5000

showCloseButton?: boolean
  // Показывать кнопку закрытия
  // Если не указано, вычисляется автоматически:
  // - true, если duration === 0 (обязательна если нет авто-скрытия)
  // - false, если duration > 0
  // Default: undefined (вычисляется автоматически)
```

### Events

```typescript
@update:show: (value: boolean) => void
  // Событие обновления видимости (v-model:show)

@update:modelValue: (value: boolean) => void
  // Событие обновления видимости (v-model)

@close: () => void
  // Событие закрытия snackbar
```

### Slots

```vue
#default
  // Кастомный контент snackbar
  // Содержимое snackbar может отличаться от стандартного
  // Внутри может находиться любой доступный компонент из библиотеки

#title
  // Кастомный заголовок

#description
  // Кастомное описание

#icon
  // Кастомная иконка типа

#actions
  // Кнопки действий
  // Snackbar может содержать одну или две кнопки
  // Рекомендуется использовать первую кнопку в качестве кнопки действия

#close-icon
  // Кастомная иконка закрытия
```

### Methods

```typescript
open(): void
  // Открыть snackbar программно

close(): void
  // Закрыть snackbar программно
```

### Examples

#### Basic usage

```vue
<template>
  <Snackbar
    v-model:show="isVisible"
    type="success"
    title="Успешно!"
    description="Данные успешно сохранены"
  />
</template>

<script setup lang="ts">
const isVisible = ref(false)
</script>
```

#### Types

```vue
<!-- Default -->
<Snackbar
  v-model:show="isVisible"
  type="default"
  title="Уведомление"
  description="Это уведомление по умолчанию"
/>

<!-- Info -->
<Snackbar
  v-model:show="isVisible"
  type="info"
  title="Информация"
  description="Данные успешно отправлены"
/>

<!-- Success -->
<Snackbar
  v-model:show="isVisible"
  type="success"
  title="Успешно!"
  description="Данные успешно сохранены"
/>

<!-- Warning -->
<Snackbar
  v-model:show="isVisible"
  type="warning"
  title="Предупреждение"
  description="Необходимо заполнить обязательное поле"
/>

<!-- Error -->
<Snackbar
  v-model:show="isVisible"
  type="error"
  title="Ошибка"
  description="Произошла ошибка при сохранении данных"
/>
```

#### Without icon

```vue
<Snackbar
  v-model:show="isVisible"
  type="success"
  title="Успешно!"
  description="Операция выполнена"
  :show-icon="false"
/>
```

#### Title only

```vue
<Snackbar
  v-model:show="isVisible"
  type="info"
  title="Информация"
/>
```

#### Description only

```vue
<Snackbar
  v-model:show="isVisible"
  type="info"
  description="Это уведомление содержит только описание"
/>
```

#### With one button

```vue
<Snackbar
  v-model:show="isVisible"
  type="info"
  title="Информация"
  description="Дополнительная информация доступна"
  :duration="0"
>
  <template #actions>
    <ButtonUi size="sm" variant="primary">Подробнее</ButtonUi>
  </template>
</Snackbar>
```

#### With two buttons

```vue
<Snackbar
  v-model:show="isVisible"
  type="error"
  title="Ошибка"
  description="Произошла ошибка при выполнении операции"
  :duration="0"
>
  <template #actions>
    <ButtonUi size="sm" variant="primary">Повторить</ButtonUi>
    <ButtonUi size="sm" variant="flat">Отмена</ButtonUi>
  </template>
</Snackbar>
```

#### Without auto close

```vue
<Snackbar
  v-model:show="isVisible"
  type="warning"
  title="Предупреждение"
  description="Это уведомление не скрывается автоматически"
  :duration="0"
/>
```

#### With custom content

```vue
<Snackbar v-model:show="isVisible" type="info">
  <div style="display: flex; flex-direction: column; gap: 0.5rem;">
    <div style="font-weight: 600;">Кастомный контент</div>
    <div style="font-size: 0.875rem; color: var(--color-text-secondary);">
      Это snackbar с произвольным контентом внутри
    </div>
  </div>
</Snackbar>
```

#### Usage examples

```vue
<template>
  <div>
    <ButtonUi @click="handleSave">Сохранить</ButtonUi>
    <ButtonUi @click="handleError" variant="danger">Ошибка</ButtonUi>

    <Snackbar
      v-model:show="showSuccess"
      type="success"
      title="Успешно!"
      description="Данные успешно сохранены"
    />

    <Snackbar
      v-model:show="showError"
      type="error"
      title="Ошибка"
      description="Произошла ошибка при сохранении"
      :duration="0"
    >
      <template #actions>
        <ButtonUi size="sm" variant="primary">Повторить</ButtonUi>
      </template>
    </Snackbar>
  </div>
</template>

<script setup lang="ts">
const showSuccess = ref(false)
const showError = ref(false)

const handleSave = () => {
  // Симуляция сохранения
  showSuccess.value = true
}

const handleError = () => {
  showError.value = true
}
</script>
```

#### With spread props

```vue
<template>
  <Snackbar v-bind="snackbarConfig" @close="handleClose" />
</template>

<script setup lang="ts">
const isVisible = ref(false)

const snackbarConfig = {
  show: isVisible,
  type: 'success' as const,
  title: 'Успешно!',
  description: 'Данные успешно сохранены',
  showIcon: true,
  duration: 5000
}

const handleClose = () => {
  console.log('Snackbar closed')
}
</script>
```

#### Using useSnackbar composable

```vue
<template>
  <div>
    <ButtonUi @click="showSuccess">Success</ButtonUi>
    <ButtonUi @click="showError">Error</ButtonUi>
    <ButtonUi @click="showInfo">Info</ButtonUi>
    <ButtonUi @click="showWarning">Warning</ButtonUi>
  </div>
</template>

<script setup lang="ts">
import { useSnackbar } from '@/components/UI/Snackbar/useSnackbar'

const snackbar = useSnackbar()

const showSuccess = () => {
  snackbar.success('Данные успешно сохранены', {
    title: 'Успешно!',
    duration: 5000
  })
}

const showError = () => {
  snackbar.error('Произошла ошибка при сохранении', {
    title: 'Ошибка',
    duration: 0 // Не скрывать автоматически
  })
}

const showInfo = () => {
  snackbar.info('Данные успешно отправлены')
}

const showWarning = () => {
  snackbar.warning('Необходимо заполнить обязательное поле', {
    title: 'Предупреждение'
  })
}
</script>
```

### Структура

В структуру snackbar входят 5 основных частей:

1. **Иконка типа тоста** — компонент может использоваться как с иконкой, так и без нее. Она является дополнительным элементом.
2. **Заголовок** — сообщает пользователю о выполняемом действии. При наличии описания заголовок можно не использовать.
3. **Описание** — дополняет заголовок уточняющим текстом; может использоваться отдельно от заголовка.
4. **Кнопки** — snackbar может содержать одну или две кнопки; рекомендуется использовать первую кнопку в качестве кнопки действия. Кнопки являются дополнительными элементами.
5. **Иконка закрытия** — дополнительный элемент. Когда для snackbar не установлен период скрытия, кнопка закрытия обязательна.

### Расположение на экране

Snackbar появляется из правого нижнего угла.

Имеет внешние отступы: снизу M (8px), справа XL (20px).

### Кастомизация

Содержимое snackbar может отличаться от стандартного, внутри может находиться любой доступный компонент из библиотеки, если это предусматривает сценарий использования.