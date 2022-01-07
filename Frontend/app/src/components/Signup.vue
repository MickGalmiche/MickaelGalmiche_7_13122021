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

    .signup-form {
        display: flex;
        flex-direction: column;
        padding: 10px;

        &__item {
            padding: .5rem;
            margin: 10px 0;
            border:1px solid transparent;
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