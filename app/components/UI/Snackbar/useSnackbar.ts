/**
 * Композабл для управления несколькими Snackbar уведомлениями
 * 
 * Пример использования:
 * 
 * const snackbar = useSnackbar()
 * 
 * snackbar.show({
 *   type: 'success',
 *   title: 'Успешно!',
 *   description: 'Данные сохранены'
 * })
 * 
 * snackbar.error('Произошла ошибка')
 * snackbar.success('Операция выполнена')
 * snackbar.info('Информация')
 * snackbar.warning('Предупреждение')
 */

import { ref } from 'vue'
import { createApp, type App } from 'vue'
import Snackbar from './Snackbar.vue'

export interface SnackbarOptions {
  type?: 'default' | 'info' | 'success' | 'warning' | 'error'
  title?: string
  description?: string
  showIcon?: boolean
  duration?: number
  showCloseButton?: boolean
  onClose?: () => void
}

interface SnackbarInstance {
  id: string
  app: App
  container: HTMLElement
  close: () => void
}

let snackbarInstances: SnackbarInstance[] = []
let idCounter = 0

export function useSnackbar() {
  const show = (options: SnackbarOptions | string) => {
    // Если передан только текст, используем как description
    const opts: SnackbarOptions =
      typeof options === 'string'
        ? { description: options }
        : options

    const id = `snackbar-${++idCounter}`
    const container = document.createElement('div')
    document.body.appendChild(container)

    const isVisible = ref(true)
    let appInstance: App | null = null

    const close = () => {
      isVisible.value = false
      setTimeout(() => {
        if (appInstance) {
          appInstance.unmount()
          appInstance = null
        }
        if (container.parentNode) {
          container.parentNode.removeChild(container)
        }
        snackbarInstances = snackbarInstances.filter(inst => inst.id !== id)
        if (opts.onClose) {
          opts.onClose()
        }
      }, 300) // Время анимации
    }

    const app = createApp(Snackbar, {
      show: isVisible.value,
      type: opts.type || 'default',
      title: opts.title,
      description: opts.description,
      showIcon: opts.showIcon !== false,
      duration: opts.duration !== undefined ? opts.duration : 5000,
      showCloseButton: opts.showCloseButton,
      onUpdateShow: (value: boolean) => {
        isVisible.value = value
        if (!value) {
          close()
        }
      },
      onClose: close
    })

    app.mount(container)
    appInstance = app

    const instance: SnackbarInstance = {
      id,
      app,
      container,
      close
    }

    snackbarInstances.push(instance)

    // Авто-закрытие
    if (opts.duration !== undefined && opts.duration > 0) {
      setTimeout(() => {
        close()
      }, opts.duration)
    }

    return instance
  }

  const success = (message: string, options?: Omit<SnackbarOptions, 'type' | 'description'>) => {
    return show({
      ...options,
      type: 'success',
      description: message
    })
  }

  const error = (message: string, options?: Omit<SnackbarOptions, 'type' | 'description'>) => {
    return show({
      ...options,
      type: 'error',
      description: message,
      duration: options?.duration !== undefined ? options.duration : 0 // По умолчанию не скрывать ошибки
    })
  }

  const info = (message: string, options?: Omit<SnackbarOptions, 'type' | 'description'>) => {
    return show({
      ...options,
      type: 'info',
      description: message
    })
  }

  const warning = (message: string, options?: Omit<SnackbarOptions, 'type' | 'description'>) => {
    return show({
      ...options,
      type: 'warning',
      description: message
    })
  }

  const closeAll = () => {
    snackbarInstances.forEach(instance => {
      instance.close()
    })
    snackbarInstances = []
  }

  return {
    show,
    success,
    error,
    info,
    warning,
    closeAll
  }
}