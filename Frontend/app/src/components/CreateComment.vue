<template>
    <article class="create-comment">
        <h3 class="create-comment__title">Poster un commentaire</h3>

        <Form
            class="create-comment__form comment-form"
            @submit="commentSubmit"
            :validation-schema="schema"
        >
            <Field
                name="content"
                label="commentaire"
                as="textarea"
                class="comment-form__item comment-form__textarea"
                placeholder="Rédigez votre commentaire ici !"
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
        ErrorMessage,
    },
    data() {
        const schema = {
            content: {
                required: true,
                regex: /^([\wÀ-ÿ\s\-,;:.'`!?]*)$/
            }
        };
        return {
            /* content: '', */
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
        postId: {
            type: Number
        }
    },
    methods: {
        commentSubmit(values, { resetForm }) {
            axios.post(`${process.env.VUE_APP_API}/comment/`, {
                postId: this.postId,
                content: values.content,
                authorId: Number(this.userId)
            }, {
                headers: {
                  'Authorization': `Bearer ${this.accessToken}`
                },
            })
            .then(() => {
                resetForm();
                this.$emit('submitComment')
            })
            .catch(error => console.error(error))
        }
    }
}
</script>

<style lang="scss">
@import "@/assets/scss/_variables.scss";
@import "@/assets/scss/_mixins.scss";


    .create-comment {
        padding: map-get($padding, medium) map-get($padding, none);
        margin-bottom: map-get($margin, large);
        background-color: $bg-color-primary;

        @include for-large-mobile {
            &--first {
                border-radius: map-get($border-radius, small);
                border-color: transparent;
                @include box-shadow;
            }
            &--timeline {
                border-top-left-radius: map-get($border-radius, small);
                border-top-right-radius: map-get($border-radius, small);
                border-bottom-left-radius: map-get($border-radius, none);
                border-bottom-right-radius: map-get($border-radius, none);
            }
        }
        &__title {
            font-family: $font-secondary;
        }

    }

    .comment-form {
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
                @include box-shadow;
                background-color: $color-primary;
                color: $color-tertiary;
            }
            &:focus-visible {
                outline: 1px solid $color-primary;
            }
        }
    }
</style>