<template>
    <article class="create-post">
        <h2 class="create-post__title">Poster un message</h2>
        <form class="create-post__form post-form" @submit.prevent="postSubmit">

            <input class="post-form__item" type="text" v-model="title" placeholder="Titre" required>
            <textarea class="post-form__item post-form__textarea" v-model="content" :rows="textareaRows" placeholder="Rédigez votre article ici !" required></textarea>

            <button class="post-form__button" type="submit">Envoyer</button>
        </form>

    </article>
</template>

<script>
import { mapState } from 'vuex'
import axios from 'axios'

export default {
    data() {
        return {
            title: '',
            content: ''
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
        postSubmit() {
            axios.post(`${process.env.VUE_APP_API}/post/`, {
                title: this.title,
                content: this.content,
                authorId: Number(this.userId)
            }, {
                headers: {
                  'Authorization': `Bearer ${this.accessToken}`
                },
            })
            .then(() => {
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