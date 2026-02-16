// Типы для авторизации и регистрации

// ========== АВТОРИЗАЦИЯ ==========
export interface LoginCredentials {
  emailOrPhone: string
  password: string
}

export interface LoginResponse {
  token: string // access token
  user: {
    id: string
    name: string
    hasTeacherProfile: boolean // есть ли профиль преподавателя
    email?: string
    phone?: string
  }
}

// ========== РЕГИСТРАЦИЯ ==========
// Шаг 1: Данные
export interface RegisterStep1Data {
  emailOrPhone: string
  password: string
  name: string
}

// Шаг 2: Подтверждение
export interface RegisterStep2Data {
  emailOrPhone: string // для идентификации на шаге 2
  verificationCode: string // код из email/SMS
  agreeToTerms: boolean // согласие с условиями и политикой
}

// Полные данные регистрации
export interface RegisterData extends RegisterStep1Data, RegisterStep2Data {}

export interface RegisterResponse {
  token: string // access token
  user: {
    id: string
    name: string
    email?: string
    phone?: string
    role: UserRole
    emailVerified: boolean // email подтверждён
  }
}

// ========== ПОЛЬЗОВАТЕЛЬ ==========
export type UserRole = 'student' | 'teacher' // по умолчанию 'student'

export interface User {
  id: string
  name: string
  email?: string
  phone?: string
  role: UserRole
  hasTeacherProfile: boolean // есть ли профиль преподавателя (для онбординга в ЛК)
  emailVerified: boolean
}

// ========== ВАЛИДАЦИЯ ==========
export interface PasswordRequirements {
  minLength: number // минимум символов
  hasUppercase: boolean // есть ли заглавные буквы
  hasLowercase: boolean // есть ли строчные буквы
  hasNumbers: boolean // есть ли цифры
  hasSpecialChars: boolean // есть ли спецсимволы
}
