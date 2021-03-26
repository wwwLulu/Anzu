<template>
    <div class="container">
        <button
            class="mode"
            :class="{ mode__active: loginMode }"
            @click="loginMode = true"
        >
            Login
        </button>
        <button
            class="mode"
            :class="{ mode__active: !loginMode }"
            @click="loginMode = false"
        >
            Signup
        </button>

        <div class="login" v-if="loginMode">
            <form @submit.prevent="login" class="form">
                <input
                    class="form__input"
                    type="text"
                    v-model="username"
                    placeholder="Username"
                />
                <input
                    class="form__input"
                    type="password"
                    name="password"
                    v-model="password"
                    placeholder="Password"
                />
                <button class="form__submit">Login</button>
            </form>
        </div>
        <div class="signup" v-if="!loginMode">
            <form class="form" @submit.prevent="signup">
                <input
                    class="form__input"
                    type="email"
                    name="email"
                    v-model="email"
                    placeholder="Email"
                />
                <input
                    class="form__input"
                    type="password"
                    name="password"
                    v-model="password"
                    placeholder="Password"
                />
                <input
                    class="form__input"
                    type="password"
                    name="confirmPassword"
                    v-model="confirmPassword"
                    placeholder="Confirm Password"
                />
                <button class="form__submit">Submit</button>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isValid: true,
            loginMode: false,
            email: '',
            password: '',
            userName: '',
            confirmPassword: '',
        }
    },
    methods: {
        signup() {
            if (
                this.email === '' ||
                !this.email.includes('@') ||
                this.password.length < 6
            ) {
                this.isValid = false
                return
            }
        },
    },
}
</script>

<style lang="scss" scoped>
.mode {
    cursor: pointer;
    margin-left: 1rem;
    background: none;
    border: none;
    font-size: 2rem;
    &__active {
        color: var(--color-primary);
    }
}

.form {
    max-width: 30rem;
    padding: 1.5rem;
    // background: white;
    border-radius: 0.5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    &__input {
        color: var(--color-text-100);
        background: darken(#fff, 0);
        &:not(:last-child) {
            margin-bottom: 1.5rem;
        }
    }
    &__submit {
        background: var(--color-primary);
        color: white;
    }
    &__input,
    &__submit {
        border-radius: 0.5rem;
        padding: 0.5rem 0.5rem;
        height: 3rem;
        border: none;
        width: 100%;
        font-size: 1.5rem;
    }
}
</style>
