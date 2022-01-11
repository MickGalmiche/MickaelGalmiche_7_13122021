<template>
    <article class="signup">
        <form class="signup__form signup-form" @submit.prevent="registerSubmit">
            <input class="signup-form__item" type="text" v-model="lastname" placeholder="Nom" required>
            <input class="signup-form__item" type="text" v-model="firstname" placeholder="Prénom" required>
            <input class="signup-form__item" type="email" v-model="email" placeholder="Email" required>
            <input class="signup-form__item" type="password" v-model="password" placeholder="Mot de passe" required>
            <button class="signup-form__button" type="submit">S'inscrire</button>
        </form>

    </article>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import axios from 'axios'

export default {
    data() {
        return {
            firstname: '',
            lastname: '',
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
        registerSubmit() {
            axios.post(`${process.env.VUE_APP_API}/auth/signup`, {
                email: this.email,
                password: this.password,
                firstname: this.firstname,
                lastname: this.lastname
            })
            .then(() => {
                this.doLogin({
                    email: this.email,
                    password: this.password
                })
            })
        }
    }    
}
</script>

<style lang="scss">
@import "@/assets/scss/_variables.scss";
@import "@/assets/scss/_mixins.scss";

    .signup-form {
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