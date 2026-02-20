// Composable для валидации полей формы
import { ref, computed, watch, onMounted, type Ref, type ComputedRef } from 'vue'

export type ValidationRule = (value: string | number) => string | true

// Встроенные правила валидации
export const validationRules = {
  required: (message = 'Обязательное поле'): ValidationRule => {
    return (value: string | number) => {
      const strValue = String(value).trim()
      return strValue.length > 0 || message
    }
  },

  email: (message = 'Некорректный email'): ValidationRule => {
    return (value: string | number) => {
      const strValue = String(value).trim()
      if (strValue.length === 0) return true // required проверяется отдельно
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return emailRegex.test(strValue) || message
    }
  },

  minLength: (min: number, message?: string): ValidationRule => {
    return (value: string | number) => {
      const strValue = String(value).trim()
      if (strValue.length === 0) return true
      const msg = message || `Минимум ${min} символов`
      return strValue.length >= min || msg
    }
  },

  maxLength: (max: number, message?: string): ValidationRule => {
    return (value: string | number) => {
      const strValue = String(value).trim()
      const msg = message || `Максимум ${max} символов`
      return strValue.length <= max || msg
    }
  },

  pattern: (regex: RegExp, message: string): ValidationRule => {
    return (value: string | number) => {
      const strValue = String(value).trim()
      if (strValue.length === 0) return true
      return regex.test(strValue) || message
    }
  },

  custom: (validator: (value: string | number) => string | true): ValidationRule => {
    return validator
  }
}

// Встроенные наборы правил для типов полей
export const fieldTypeRules: Record<string, ValidationRule[]> = {
  email: [
    validationRules.required(),
    validationRules.email()
  ],
  password: [
    validationRules.required(),
    validationRules.minLength(6, 'Пароль должен содержать минимум 6 символов')
  ]
}

export const useFieldValidation = (
  value: Ref<string | number>,
  rules: ValidationRule[] | Ref<ValidationRule[]> | ComputedRef<ValidationRule[]> = [],
  options: {
    validateOnBlur?: boolean
    validateOnInput?: boolean
    validateOnMount?: boolean
  } = {}
) => {
  const {
    validateOnBlur = true,
    validateOnInput = false,
    validateOnMount = false
  } = options

  const error = ref<string>('')
  const touched = ref(false)
  const isValid = computed(() => !error.value)

  const rulesRef = computed(() => 
    Array.isArray(rules) ? rules : rules.value
  )

  const validate = (): boolean => {
    for (const rule of rulesRef.value) {
      const result = rule(value.value)
      if (result !== true) {
        error.value = result
        return false
      }
    }
    error.value = ''
    return true
  }

  const reset = () => {
    error.value = ''
    touched.value = false
  }

  // Валидация при изменении значения (если включена)
  if (validateOnInput) {
    watch(value, () => {
      if (touched.value) {
        validate()
      }
    })
  }

  // Валидация при потере фокуса
  const handleBlur = () => {
    touched.value = true
    if (validateOnBlur) {
      validate()
    }
  }

  // Валидация при монтировании
  if (validateOnMount) {
    onMounted(() => {
      validate()
    })
  }

  return {
    error,
    touched,
    isValid,
    validate,
    reset,
    handleBlur
  }
}
