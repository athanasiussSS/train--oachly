<template>
  <div class="verify-page">
    <AuthWrapper>
      <div class="verify">
        <h1 class="verify__title">Подтверждение почты</h1>
        <div class="verify__content">
          <p class="verify__text">
            Мы отправили код подтверждения на {{ emailOrPhone }}
          </p>
          <TextInput 
            v-model="verificationCode" 
            label="Код подтверждения"
            placeholder="Введите код" 
            type="text"
            class="verify__input"
          />
          <ButtonUi 
            class="verify__btn" 
            @click="handleVerify" 
            width="max" 
            :disabled="isLoading || !verificationCode"
          >
            Подтвердить
          </ButtonUi>
          <div class="verify__resend">
            <span class="verify__resend-text">
              Не получили код?
            </span>
            <ButtonUi 
              variant="flat" 
              size="sm" 
              @click="handleResend"
              :disabled="!canResend"
            >
              {{ canResend ? 'Отправить повторно' : `Отправить повторно (${resendTimer}с)` }}
            </ButtonUi>
          </div>
        </div>
      </div>
    </AuthWrapper>
  </div>
</template>

<script setup lang="ts">
import AuthWrapper from '~/components/auth/AuthWrapper.vue'
import TextInput from '~/components/UI/TextInput/TextInput.vue'
import ButtonUi from '~/components/UI/ButtonUi/ButtonUi.vue'
import { useAuthStore } from '~/stores/auth'

definePageMeta({
  layout: 'authorization'
})

const emailOrPhone = ref('')
const verificationCode = ref('')
const isLoading = ref(false)
const canResend = ref(true)
const resendTimer = ref(60)
let resendInterval: ReturnType<typeof setInterval> | null = null

const { sendVerificationCode, register } = useAuth()
const authStore = useAuthStore()

const startTimer = () => {
  if (resendInterval) clearInterval(resendInterval)
  
  canResend.value = false
  resendTimer.value = 60
  
  resendInterval = setInterval(() => {
    resendTimer.value--
    if (resendTimer.value <= 0) {
      canResend.value = true
      if (resendInterval) {
        clearInterval(resendInterval)
        resendInterval = null
      }
    }
  }, 1000)
}

const handleResend = async () => {
  if (!canResend.value) return
  
  try {
    await sendVerificationCode(emailOrPhone.value)
    startTimer()
  } catch (error) {
    console.error('Ошибка отправки кода:', error)
  }
}

const handleVerify = async () => {
  if (isLoading.value || !verificationCode.value) return
  
  try {
    isLoading.value = true
    
    await register({
      emailOrPhone: emailOrPhone.value,
      password: sessionStorage.getItem('register_password') || '',
      name: sessionStorage.getItem('register_name') || '',
      verificationCode: verificationCode.value,
      agreeToTerms: true
    })
    
    sessionStorage.removeItem('register_password')
    sessionStorage.removeItem('register_name')
    
    await navigateTo('/dashboard')
  } catch (error) {
    console.error('Ошибка подтверждения:', error)
  } finally {
    isLoading.value = false
  }
}

onMounted(async () => {
  const storedEmailOrPhone = sessionStorage.getItem('register_emailOrPhone')
  
  if (!storedEmailOrPhone) {
    await navigateTo('/auth/register')
    return
  }
  
  emailOrPhone.value = storedEmailOrPhone
  
  try {
    await sendVerificationCode(emailOrPhone.value)
    startTimer()
  } catch (error) {
    console.error('Ошибка отправки кода:', error)
  }
})

onUnmounted(() => {
  if (resendInterval) clearInterval(resendInterval)
})

watch(() => authStore.isLoading, (value) => {
  isLoading.value = value
})
</script>

<style scoped lang="scss">
.verify-page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: rem(20);
}

.verify {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: rem(20);

  &__title {
    text-align: center;
    padding: rem(24) rem(30);
    border-bottom: rem(2) solid var(--color-border);
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

  &__text {
    color: var(--color-text-secondary, #666);
    font-size: rem(14);
    text-align: center;
  }

  &__input {
    margin-top: rem(10);
  }

  &__btn {
    margin-top: rem(20);
  }

  &__resend {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: rem(10);
    margin-top: rem(10);
  }

  &__resend-text {
    color: var(--color-text-secondary, #666);
    font-size: rem(14);
  }
}
</style>
