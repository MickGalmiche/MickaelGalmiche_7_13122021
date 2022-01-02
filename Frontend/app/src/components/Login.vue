<template>
    <section class="login">
        <form @submit.prevent="loginSubmit">
            <input type="email" v-model="email" placeholder="Email">
            <input type="password" v-model="password" placeholder="Mot de passe">
            <button type="submit">Se connecter</button>
        </form>
        <p v-if="loginError">{{ loginError }}</p>
        <p v-if="accessToken">Login Successful</p>
    </section>
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

<style lang="scss" scoped>
    .login {
        width: 250px;

        form {
            display: flex;
            flex-direction: column;

            input {
                padding: .5rem
            }

            button {
                padding: .5rem;

                cursor: pointer;
            }
        }
    }
</style>