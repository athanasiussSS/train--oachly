<template>
    <div class="form">
        <h1 class="form__title">
            {{ isLogin ? 'Вход' : 'Регистрация' }}
        </h1>
        <div class="form__content">
            <div v-if="!isLogin" class="form__field">
                <TextInput 
                    ref="nameInputRef"
                    v-model="name" 
                    label="Имя"
                    placeholder="Введите ваше имя" 
                    type="text"
                    :validate="true"
                    :validation-rules="nameValidationRules"
                    :validate-on-blur="true"
                />
            </div>
            <div class="form__field">
                <TextInput 
                    ref="emailInputRef"
                    v-model="email" 
                    label="Email"
                    placeholder="Введите email" 
                    type="email"
                    :validate="true"
                    :validation-rules="isLogin ? emailLoginRules : undefined"
                    :validate-on-blur="true"
                />
            </div>
            <div class="form__field">
                <TextInput 
                    ref="passwordInputRef"
                    v-model="password" 
                    label="Пароль"
                    tooltip="Минимум 6 символов: латиница, одна заглавная буква, одна цифра, один знак препинания"
                    placeholder="Введите пароль" 
                    type="password"
                    :validate="true"
                    :validation-rules="isLogin ? passwordLoginRules : undefined"
                    :validate-on-blur="true"
                />
            </div>
            <ButtonUi class="form__btn" @click="handleSubmit" width="max" :disabled="isLoading">
                {{ isLogin ? 'Войти' : 'Зарегистрироваться' }}
            </ButtonUi>
            <div class="form__footer">
                <span class="form__footer-text">
                    {{ isLogin ? 'Нет аккаунта?' : 'Уже есть аккаунт?' }}
                </span>
                <Link 
                    :to="isLogin ? '/auth/register' : '/auth/login'"
                    variant="primary"
                    size="sm"
                    :underline="false"
                >
                    {{ isLogin ? ' Зарегистрироваться' : ' Войти' }}
                </Link>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import TextInput from '~/components/UI/TextInput/TextInput.vue'
import ButtonUi from '~/components/UI/ButtonUi/ButtonUi.vue'
import Link from '~/components/UI/Link/Link.vue'
import { validationRules } from '~/composables/useFieldValidation'
import { useAuthStore } from '~/stores/auth'

const props = defineProps({
    initialMode: {
        type: String as PropType<'login' | 'register'>,
        default: 'login'
    }
})

const isLogin = ref(props.initialMode === 'login')
const email = ref('')
const password = ref('')
const name = ref('')
const isLoading = ref(false)

const nameInputRef = ref<InstanceType<typeof TextInput> | null>(null)
const emailInputRef = ref<InstanceType<typeof TextInput> | null>(null)
const passwordInputRef = ref<InstanceType<typeof TextInput> | null>(null)

const nameValidationRules = [validationRules.required('Обязательное поле')]

const emailLoginRules = [
  validationRules.required('Неправильный email или пароль'),
  validationRules.email('Неправильный email или пароль')
]

const passwordLoginRules = [
  validationRules.required('Неправильный email или пароль'),
  validationRules.minLength(6, 'Неправильный email или пароль')
]

const { login, registerStep1 } = useAuth()
const authStore = useAuthStore()

const validate = (): boolean => {
    const inputs = [
      !isLogin.value && nameInputRef.value,
      emailInputRef.value,
      passwordInputRef.value
    ].filter(Boolean) as InstanceType<typeof TextInput>[]
    
    return inputs.every(input => input.validate())
}

const handleSubmit = async () => {
    if (isLoading.value || !validate()) return
    
    try {
        isLoading.value = true
        
        if (isLogin.value) {
            await login({
                emailOrPhone: email.value,
                password: password.value
            })
            await navigateTo('/dashboard')
        } else {
            await registerStep1({
                emailOrPhone: email.value,
                password: password.value,
                name: name.value
            })
            await navigateTo('/auth/verify')
        }
    } catch (error) {
        console.error('Ошибка авторизации:', error)
    } finally {
        isLoading.value = false
    }
}

watch(() => authStore.isLoading, (value) => {
    isLoading.value = value
})

</script>

<style scoped lang="scss">
.form {
    width: 100%;
    display: flex;
    flex-direction: column;

    &__title {
        text-align: center;
        padding: rem(24) rem(30);
        border-bottom: rem(2) solid var(--color-bg-primary);
        font-size: rem(28);
        font-weight: 600;
        color: var(--color-text-primary, #333);
    }

    &__content {
        padding: rem(30);
        display: flex;
        flex-direction: column;
        gap: rem(20);
    }

    &__field {
        display: flex;
        flex-direction: column;
        gap: rem(4);
    }

    &__btn {
        margin-top: rem(20);
    }

    &__footer {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    &__footer-text {
        color: var(--color-text-secondary, #666);
        font-size: rem(14);
        margin-right: rem(2);
    }
}
</style>