<template>
    <article class="create-post">
        <h2 class="create-post__title">Poster un message</h2>
        <form class="create-post__form post-form" @submit.prevent="postSubmit">

            <input class="post-form__item" type="text" v-model="title" placeholder="Titre" required>
            <textarea class="post-form__item" v-model="content" :rows="textareaRows" placeholder="Rédigez votre article ici !" required></textarea>

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
    .create-post {
        width: 90%;
        max-width: 900px;
        margin-top: 20px;
        padding: 10px;
        background-color: white;
        border-color: transparent;
        border-radius: 5px;
        box-shadow: 0 4px 12px  rgba(0, 0, 0, 0.25);
    }

    .post-form {
        display: flex;
        flex-direction: column;
        padding: 10px;

        &__item {
            padding: .5rem;
            margin: 10px 0;
            border: 1px solid transparent;
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
            &:focus-visible {
            outline: 1px solid #FD2D01;
            }
        }
    }
</style>