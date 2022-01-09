<template>
    <article class="create-comment">
        <h3 class="create-comment__title">Poster un commentaire</h3>
        <form class="create-comment__form comment-form" @submit.prevent="commentSubmit">

            <textarea class="comment-form__item" v-model="content" cols="100" rows="10" placeholder="Rédigez votre commentaire ici !" required></textarea>

            <button class="comment-form__button" type="submit">Envoyer</button>
        </form>

    </article>
</template>

<script>
import { mapState } from 'vuex'
import axios from 'axios'

export default {
    data() {
        return {
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
        postId: {
            type: Number
        }
    },
    methods: {
        commentSubmit() {
            axios.post(`${process.env.VUE_APP_API}/comment/`, {
                postId: this.postId,
                content: this.content,
                authorId: Number(this.userId)
            }, {
                headers: {
                  'Authorization': `Bearer ${this.accessToken}`
                },
            })
            .then(() => {
                this.$emit('submitComment')
            })
            .catch(error => console.error(error))
        }
    }
}
</script>

<style lang="scss">

    .create-comment {
        padding: 10px 0;
        margin-bottom: 40px;
        background-color: white;

        &--first {
            border-color: transparent;
            border-radius: 5px;
            box-shadow: 0 4px 12px  rgba(0, 0, 0, 0.25);
        }
        &--timeline {
            border-radius: 5px 5px 0 0;
        }

    }

    .comment-form {
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