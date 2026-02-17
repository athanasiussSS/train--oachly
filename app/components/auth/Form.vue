<template>
    <div class="form">
        <h1 class="form__title">
            {{ isLogin ? 'Вход' : 'Регистрация' }}
        </h1>
        <div class="form__content">
            <TextInput 
                v-if="!isLogin"
                v-model="name" 
                placeholder="Имя" 
                type="text"
            />
            <TextInput 
                v-model="email" 
                placeholder="Email" 
                type="email"
            />
            <TextInput 
                v-model="password" 
                placeholder="Пароль" 
                type="password" 
            />
            <ButtonUi class="form__btn" @click="handleSubmit" width="max">
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
import type { PropType } from 'vue';
import TextInput from '~/components/UI/TextInput/TextInput.vue';
import ButtonUi from '~/components/UI/ButtonUi/ButtonUi.vue';
import Link from '~/components/UI/Link/Link.vue';

const props = defineProps({   
    title: {
        type: String,
        required: false
    },
    initialMode: {
        type: String as PropType<'login' | 'register'>,
        default: 'login'
    }
});

const isLogin = ref(props.initialMode === 'login');
const email = ref('');
const password = ref('');
const name = ref('');

const handleSubmit = () => {
    if (isLogin.value) {
        // Авторизация
        console.log('Авторизация:', {
            email: email.value,
            password: password.value
        });
    } else {
        // Регистрация
        console.log('Регистрация:', {
            name: name.value,
            email: email.value,
            password: password.value
        });
    }
};

</script>

<style scoped lang="scss">
.form {
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