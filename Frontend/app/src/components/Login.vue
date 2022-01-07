<template>
    <article class="login">
        <form class="login__form login-form" @submit.prevent="loginSubmit">
            <input class="login-form__item" type="email" v-model="email" placeholder="Email" required>
            <input class="login-form__item" type="password" v-model="password" placeholder="Mot de passe" required>
            <button class="login-form__button" type="submit">Se connecter</button>
            <p class="login__error" v-if="loginError">{{ loginError }}</p>
        </form>
    </article>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
    data() {
        return {
            email: '',
            password: ''
        }
    },
    computed: {
        ...mapState([
            'logging',
            'loginError',
            'accessToken'
        ])
    },
    methods: {
        ...mapActions([
            'doLogin'
        ]),
        loginSubmit() {
            this.doLogin({
                email: this.email,
                password: this.password
            })
        }
    }
}
</script>

<style lang="scss">
    .login {
        display: flex;
        flex-direction: column;
        justify-content: center;

        &__error {
            color: rgb(235, 0, 0);
        }
    }

    .login-form {
        display: flex;
        flex-direction: column;
        padding: 10px;

        &__item {
            padding: .5rem;
            margin: 10px 0;
            border: 1px solid transparent;
            border-radius: 5px;
            background-color: whitesmoke;
            outline: none;

            &:focus {
                background-color: #FFD7D7;
                border: 1px solid #FD2D01;
            }
        }
        &__button {
            align-self: center;
            max-width: 100px;
            padding: .5rem;
            margin: 10px 0;
            cursor: pointer;
            border: 1px solid transparent;
            border-radius: 5px;
            background-color: #666;
            color: white;
            font-weight: bold;

            &:hover {
                box-shadow: 0 4px 12px  rgba(0, 0, 0, 0.25);
                background-color: #FD2D01;
                color: white;
            }
        }
    }
</style>