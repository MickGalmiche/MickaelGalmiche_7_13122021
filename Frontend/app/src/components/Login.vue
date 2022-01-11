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
@import "@/assets/scss/_variables.scss";
@import "@/assets/scss/_mixins.scss";

    .login {
        display: flex;
        flex-direction: column;
        justify-content: center;

        &__error {
            color: $color-primary-darken;
        }
    }

    .login-form {
        display: flex;
        flex-direction: column;
        padding: map-get($padding, medium);

        &__item {
            padding: .5rem;
            margin: map-get($margin, medium) map-get($margin, none);
            border: 1px solid transparent;
            border-radius: map-get($border-radius, small);
            background-color: $bg-color-secondary;
            outline: none;

            &:focus {
                background-color: $color-secondary;
                border: 1px solid $color-primary;
            }
        }
        &__button {
            align-self: center;
            max-width: 100px;
            padding: .5rem;
            margin: map-get($margin, medium) map-get($margin, none);
            cursor: pointer;
            border: 1px solid transparent;
            border-radius: map-get($border-radius, small);
            background-color: $bg-color-tertiary;
            color: $color-tertiary;
            font-weight: bold;

            &:hover {
                @include hover-box-shadow;
                background-color: $color-primary;
                color: $color-tertiary;
            }

            &:focus-visible {
                outline: 1px solid $color-primary;
            }
        }
    }
</style>