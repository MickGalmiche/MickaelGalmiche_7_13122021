<template>
    <article class="add-comment">
        <form @submit.prevent="commentSubmit">

            <textarea v-model="content" cols="100" rows="10" placeholder="Rédigez votre commentaire ici !" required></textarea>

            <button type="submit">Envoyer</button>
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
    .add-comment {
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