<template>
    <article class="add-post">
        <form @submit.prevent="postSubmit">

            <input type="text" v-model="title" placeholder="Titre" required>
            <textarea v-model="content" cols="100" rows="10" placeholder="Rédigez votre article ici !" required></textarea>

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
    .add-post {
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