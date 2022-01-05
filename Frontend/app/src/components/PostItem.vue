<template>
    <div v-if="getLink" class="post-item">
        <router-link :to="{ name: 'Post', params: {id: postId} }">
            <article class="post-card">
                <h2 class="post-card__title">{{ title }}</h2>
                <p class="post-card__caption">Publié par {{ firstname }} {{ lastname }},il y a {{ relativeDate }}</p>
                <p class="post-card__content">{{ content }}</p>
                <div v-if="isAdmin || isAuthor">
                  <button @click.prevent="deletePost">Supprimer</button>
                </div>
            </article>
        </router-link>
    </div>

    <article v-else class="post-card">
        <h2 class="post-card__title">{{ title }}</h2>
        <p class="post-card__caption">Publié par {{ firstname }} {{ lastname }},il y a {{ relativeDate }}</p>
        <p class="post-card__content">{{ content }}</p>
        <div v-if="isAdmin || isAuthor">
          <button @click.prevent="deletePost">Supprimer</button>
        </div>
    <div v-else>...</div>
    </article>
</template>

<script>
import { mapState } from 'vuex'
import axios from 'axios'
import moment from 'moment'

export default {
  name: 'PostItem',
  data: () => ({
      relativeDate: "",
      calendarDate: "",  
      formattedDate: ""
  }),
  computed: {
    ...mapState([
      'accessToken',
      'userId',
      'userRole'
    ]),
    isAuthor() {
      return this.userId == this.authorId ? true : false;
    },
    isAdmin() {
      return this.userRole == 'ADMIN' ? true : false;
    }
  },
  props: {
      postId: {
          type: Number
      },
      title: {
          type: String
      },
      date: {},
      content: {
          type: String
      },
      firstname: {
          type: String
      },
      authorId: {
          type: Number
      },
      lastname: {
          type: String
      },
      getLink: {
          type: Boolean
      }
  },
  methods: {
      getRelativeDate() {
          return moment(this.date).startOf('hour').fromNow()
      },
      getCalendarDate() {
          return moment(this.date).calendar()
      },
      getFormattedDate() {
          return moment(this.date).format('LLLL')
      },
      deletePost() {
        axios
          .delete(`${process.env.VUE_APP_API}/post/${this.postId}`, {
            headers: {
              'Authorization': `Bearer ${this.accessToken}`
              }
            })
          .then(() => {
            this.$emit('deletePost')
          })
          .catch(error => console.error(error))
      }
  },
  mounted() {
      this.relativeDate = this.getRelativeDate()
      this.calendarDate = this.getCalendarDate()
      this.formattedDate = this.getFormattedDate()
  }
}
</script>

<style lang="scss">
    .post-item {
        margin: 20px 0;
        .post-card {
            box-shadow: 10px 25px 50px -12px rgba(0,0,0,0.25);
            &:hover {
            box-shadow: 0 1px 2px 0 rgba(60,64,67,0.3), 0 1px 3px 5px rgba(60,64,67,0.15);
            }
        }
    }

    .post-card {
        color: gray;
        border: 1px solid gainsboro;
        border-radius: 10px;
        background-color: white;
        padding: 20px;
        width: 500px;
        overflow: hidden;

        &__title {
            color: black;
        }
        &__caption {
            font-size: .8rem;
            color: lightgray;
        }
    }

    a {
        text-decoration: none;
    }
</style>