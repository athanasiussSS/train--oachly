<template>
    <div class="form">
        <h1 
            v-if="!!title"
            class="form__title"
        >{{ title }}</h1>
        <div class="form__content">
            <TextInput 
                v-model="email" 
                placeholder="Email" 
                type="email"
            />
            <TextInput 
                v-model="password" 
                placeholder="Password" 
                type="password" 
            />
            <ButtonUi @click="login" width="max">Войти</ButtonUi>
        </div>
    </div>
</template>

<script setup lang="ts">
import TextInput from '~/components/UI/TextInput/TextInput.vue';
import ButtonUi from '~/components/UI/ButtonUi/ButtonUi.vue';

const email = ref('');
const password = ref('');

const login = () => {
    console.log(email.value, password.value);
}

defineProps({   
    title: {
        type: String,
        required: false
    }
})
</script>

<style scoped lang="scss">
.form {
    width: 100%;
    max-width: rem(500);
    display: flex;
    flex-direction: column;
    gap: rem(20);

    &__title {
        text-align: center;
        padding: rem(20) rem(30);
        border-bottom: rem(3) solid var(--color-border);
    }

    &__content {
        padding: rem(20) rem(30);
        display: flex;
        flex-direction: column;
        gap: rem(16);
    }
}
</style>