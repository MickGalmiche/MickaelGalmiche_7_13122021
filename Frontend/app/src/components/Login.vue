<template>
    <article class="login">

        <Form
            class="login__form login-form"
            @submit="loginSubmit"
            :validation-schema="schema"
        >
            <Field 
                name="email"
                label="Email"
                type="email"
                class="login-form__item"
                placeholder="Email"
            />
            <ErrorMessage name ="email" class="form-error" />

            <Field 
                name="password"
                label="Mot de passe"
                type="password"
                class="login-form__item"
                placeholder="Mot de passe"
            />
            <ErrorMessage name="password" class="form-error" />

            <button class="login-form__button" type="submit">Se connecter</button>
            <p class="login__error" v-if="loginError">{{ loginError }}</p>
        </Form>
    </article>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { Field, Form, ErrorMessage } from 'vee-validate'

export default {
    components: {
        Field,
        Form,
        ErrorMessage,
    },
    data() {
        const schema = {
            email: 'required|email',
            password: 'required|min:6'
        }
        return {
            /* email: '',
            password: '', */
            schema,
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
        loginSubmit(values) {
            this.doLogin({
                email: values.email,
                password: values.password
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