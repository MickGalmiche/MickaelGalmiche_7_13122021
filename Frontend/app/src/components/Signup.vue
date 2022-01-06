<template>
    <section class="register">
        <form @submit.prevent="registerSubmit">
            <input type="text" v-model="firstname" placeholder="firstname">
            <input type="text" v-model="lastname" placeholder="lastname">
            <input type="email" v-model="email" placeholder="Email">
            <input type="password" v-model="password" placeholder="Mot de passe">
            <button type="submit">S'enregistrer</button>
        </form>

    </section>
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

<style lang="scss" scoped>
    .register {
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