<template>
    <article class="signup">

        <Form
            class="signup__form signup-form"
            @submit="registerSubmit"
            :validation-schema="schema"
        >

            <Field 
                name="lastname"
                label="Nom"
                type="text"
                class="signup-form__item"
                placeholder="Nom"
            />
            <ErrorMessage name="lastname" class="form-error" />

            <Field 
                name="firstname"
                label="Prénom"
                type="text"
                class="signup-form__item"
                placeholder="Prénom"
            />
            <ErrorMessage name="firstname" class="form-error" />

            <Field 
                name="email"
                label="Email"
                type="email"
                class="signup-form__item"
                placeholder="Email"
            />
            <ErrorMessage name="email" class="form-error" />

            <Field 
                name="password"
                label="Mot de Passe"
                type="password"
                class="signup-form__item"
                placeholder="Mot de passe"
            />
            <ErrorMessage name="password" class="form-error" />

            <Field
                name="confirmation"
                label="Confirmation de mot de passe"
                type="password"
                class="signup-form__item"
                placeholder="Confirmer le mot de passe"
            />
            <ErrorMessage name="confirmation" class="form-error" />

            <button class="signup-form__button" type="submit">S'inscrire</button>

        </Form>

    </article>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import axios from 'axios'
import { Field, Form, ErrorMessage } from 'vee-validate'

export default {
    components: {
        Field,
        Form,
        ErrorMessage,
    },
    data() {
        const schema = {
            lastname: 'required|alpha|max:100',
            firstname: 'required|alpha|max:100',
            email: 'required|email|max:100',
            password: 'required|min:6',
            confirmation: 'required|confirmed:@password'
        }
        return {
            /* firstname: '',
            lastname: '',
            email: '',
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
        registerSubmit(values) {
            axios.post(`${process.env.VUE_APP_API}/api/auth/signup`, {
                email: values.email,
                password: values.password,
                firstname: values.firstname,
                lastname: values.lastname
            })
            .then(() => {
                this.doLogin({
                    email: values.email,
                    password: values.password
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