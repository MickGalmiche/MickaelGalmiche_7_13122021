<template>
    <article class="create-post">
        <h2 class="create-post__title">Poster un message</h2>

        <Form
            class="create-post__form post-form"
            @submit="postSubmit"
            :validation-schema="schema"
        >

            <Field 
                name="title"
                label="titre" 
                class="post-form__item" 
                type="text" 
                placeholder="Titre" 
            />
            <ErrorMessage name="title" class="form-error" />

            <Field
                name="content"
                label="article"
                as="textarea"
                class="post-form__item post-form__textarea"
                placeholder="Rédigez votre article ici !"
            />
            <ErrorMessage name="content" class="form-error" />

            <button class="post-form__button" type="submit">Envoyer</button>
        </Form>

    </article>
</template>

<script>
import { mapState } from 'vuex'
import axios from 'axios'
import { Field, Form, ErrorMessage } from 'vee-validate'

export default {
    components: {
        Field,
        Form,
        ErrorMessage
    },
    data() {
        const schema = {
            title: {
                required: true,
                regex: /^([\wÀ-ÿ\s\-,;:.'`!?]*)$/
            },
            content: {
                required: true,
                regex: /^([\wÀ-ÿ\s\-,;:.'`!?]*)$/
            }
        };
        return {
            /* title: '',
            content: '', */
            schema,
        }
    },
    computed: {
        ...mapState([
            'accessToken',
            'userId',
            'userRole'
        ])
    },
    props: {
        textareaCols: {
            type: Number
        },
        textareaRows: {
            type: Number
        }
    },
    methods: {
        postSubmit(values, { resetForm }) {
            axios.post(`${process.env.VUE_APP_API}/post/`, {
                title: values.title,
                content: values.content,
                authorId: Number(this.userId)
            }, {
                headers: {
                  'Authorization': `Bearer ${this.accessToken}`
                },
            })
            .then(() => {
                resetForm();
                this.$emit('submitPost')
            })
            .catch(error => console.error(error))
        }
    }
}
</script>

<style lang="scss">
@import "@/assets/scss/_variables.scss";
@import "@/assets/scss/_mixins.scss";

    .create-post {
        background-color: $bg-color-primary;
        border-color: transparent;
        width: 100%;

        @include for-large-mobile {
            width: 500px;
            margin-top: map-get($margin, large);
            padding: map-get($padding, medium);
            border-radius: map-get($border-radius, small);
            @include box-shadow;
        }

        @include for-tablet {
            width: 700px;
        }

        &__title {
            font-family: $font-secondary;
        }
    }

    .post-form {
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
                border-color: $color-primary;
            }
        }
        &__textarea {
            resize: vertical;
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