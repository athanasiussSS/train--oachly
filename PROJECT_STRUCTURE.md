# Структура проекта Vue/Nuxt 4

```
vue-project/
│
├── 📁 app/                          # Основная папка приложения
│   ├── 📄 app.vue                   # Главный компонент приложения (root component)
│   │
│   ├── 📁 assets/                   # Статические ресурсы (CSS, изображения)
│   │   └── 📁 css/
│   │
│   ├── 📁 components/               # Vue компоненты
│   │   └── 📄 AppHeader.vue         # Компонент заголовка
│   │
│   ├── 📁 composables/              # Composable функции (переиспользуемая логика)
│   │   └── 📄 useAuth.ts            # Composable для работы с авторизацией
│   │
│   ├── 📁 layouts/                  # Шаблоны страниц
│   │   └── 📄 default.vue           # Дефолтный layout
│   │
│   ├── 📁 middleware/                # Middleware для валидации страниц
│   │   ├── 📄 auth.ts               # Middleware для проверки авторизации
│   │   ├── 📄 guest.ts              # Middleware для гостевых страниц
│   │   └── 📄 validate.ts           # Middleware для валидации параметров
│   │
│   └── 📁 pages/                     # Страницы приложения (автоматический роутинг)
│       ├── 📄 index.vue             # Главная страница (/)
│       ├── 📄 login.vue             # Страница входа (/login)
│       └── 📄 dashboard.vue         # Панель управления (/dashboard)
│
├── 📁 public/                        # Публичные статические файлы
│   ├── 📄 favicon.ico               # Иконка сайта
│   └── 📄 robots.txt                # Файл для поисковых роботов
│
├── 📁 server/                        # Серверная логика (API endpoints)
│   └── 📁 api/                      # API маршруты
│
├── 📁 node_modules/                  # Зависимости проекта (автоматически)
│
├── 📄 .gitignore                     # Файлы, игнорируемые Git
├── 📄 nuxt.config.ts                 # Конфигурация Nuxt
├── 📄 package.json                   # Зависимости и скрипты проекта
├── 📄 package-lock.json              # Зафиксированные версии зависимостей
├── 📄 tsconfig.json                  # Конфигурация TypeScript
└── 📄 README.md                      # Документация проекта
```

## Описание основных папок:

### 📁 `app/` - Основная папка приложения
- **`app.vue`** - Корневой компонент, обертка для всех страниц
- **`pages/`** - Файлы здесь автоматически становятся маршрутами
  - `index.vue` → `/`
  - `login.vue` → `/login`
  - `dashboard.vue` → `/dashboard`
- **`components/`** - Переиспользуемые Vue компоненты
- **`layouts/`** - Шаблоны для страниц (обертка с общими элементами)
- **`middleware/`** - Логика валидации и проверок перед загрузкой страниц
- **`composables/`** - Переиспользуемые функции (как хуки в React)

### 📁 `public/` - Статические файлы
Файлы здесь доступны напрямую по URL (например, `/favicon.ico`)

### 📁 `server/` - Серверная логика
API endpoints, которые работают на сервере

### 📄 Конфигурационные файлы:
- **`nuxt.config.ts`** - Настройки Nuxt (плагины, модули, и т.д.)
- **`package.json`** - Зависимости проекта и npm скрипты
- **`tsconfig.json`** - Настройки TypeScript

## Как работает роутинг:

Nuxt автоматически создает маршруты на основе файлов в `app/pages/`:

```
app/pages/
├── index.vue          → http://localhost:3000/
├── login.vue          → http://localhost:3000/login
├── dashboard.vue       → http://localhost:3000/dashboard
└── users/
    └── [id].vue       → http://localhost:3000/users/:id
```

## Middleware (валидация страниц):

Middleware применяется перед загрузкой страницы:

- **`auth.ts`** - Проверяет авторизацию, перенаправляет на `/login` если не авторизован
- **`guest.ts`** - Для страниц только для неавторизованных (например, login)
- **`validate.ts`** - Валидация параметров маршрута

Использование на странице:
```vue
<script setup>
definePageMeta({
  middleware: 'auth'  // или 'guest', или массив ['auth', 'validate']
})
</script>
```


