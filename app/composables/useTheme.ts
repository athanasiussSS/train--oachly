// Composable для управления темой (светлая/темная)

export type Theme = 'light' | 'dark' | 'system'

export const useTheme = () => {
  // Загружаем тему из localStorage или используем 'system'
  const theme = useState<Theme>('theme', () => {
    if (process.client) {
      const saved = localStorage.getItem('theme') as Theme
      return saved || 'system'
    }
    return 'system'
  })

  // Определяем текущую тему (light/dark)
  const getSystemTheme = () => 
    window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'

  const computedTheme = computed(() => 
    theme.value === 'system' ? getSystemTheme() : theme.value
  )

  // Применение темы к <html>
  const applyTheme = (t: 'light' | 'dark') => {
    if (!process.client) return
    document.documentElement.classList.remove('light', 'dark')
    document.documentElement.classList.add(t)
  }

  // Установка темы
  const setTheme = (t: Theme) => {
    theme.value = t
    if (process.client) {
      localStorage.setItem('theme', t)
      applyTheme(t === 'system' ? getSystemTheme() : t)
    }
  }

  // Переключение темы
  const toggleTheme = () => 
    setTheme(computedTheme.value === 'light' ? 'dark' : 'light')

  // Инициализация
  onMounted(() => {
    applyTheme(computedTheme.value)
    
    // Слушаем изменения системной темы
    if (theme.value === 'system') {
      const mq = window.matchMedia('(prefers-color-scheme: dark)')
      const handler = (e: MediaQueryListEvent) => applyTheme(e.matches ? 'dark' : 'light')
      mq.addEventListener('change', handler)
      onUnmounted(() => mq.removeEventListener('change', handler))
    }
  })

  return {
    theme: readonly(theme),
    computedTheme: readonly(computedTheme),
    setTheme,
    toggleTheme
  }
}
