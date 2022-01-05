<template>
    <article class="comment-card">
        <p class="comment-card__caption">Publié par {{ firstname }} {{ lastname }}, {{ relativeDate }}</p>
        <p class="comment-card__content">{{ content }}</p>
        <div v-if="isAdmin || isAuthor">
            <button @click.prevent="deleteComment">Supprimer</button>
        </div>
    </article>
</template>

<script>
import { mapState } from 'vuex'
import axios from 'axios'
import moment from 'moment'

export default {
  name: 'CommentItem',
  data: () => ({
      relativeDate: "",
      calendarDate: "",  
      formatedDate: ""
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
      commentId: {
          type: Number
      },
      date: {},
      content: {
          type: String
      },
      authorId: {
          type: Number
      },
      firstname: {
          type: String
      },
      lastname: {
          type: String
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
      deleteComment() {
        axios
          .delete(`${process.env.VUE_APP_API}/comment/${this.commentId}`, {
            headers: {
              'Authorization': `Bearer ${this.accessToken}`
              }
            })
          .then(() => {
            this.$emit('deleteComment')
          })
          .catch(error => console.error(error))
      }
  },
  mounted() {
      this.relativeDate = this.getRelativeDate()
      this.calendarDate = this.getCalendarDate()
      this.formatedDate = this.getFormattedDate()
  }
}
</script>

<style lang="scss">
    .comment-card {
        color: gray;
        border: 1px solid gainsboro;
        border-radius: 10px;
        background-color: white;
        padding: 20px;
        margin: 20px 0;
        width: 500px;
        overflow: hidden;
        box-shadow: 10px 25px 50px -12px rgba(0,0,0,0.25);

        &__title {
            color: black;
        }
        &__caption {
            font-size: .8rem;
            color: lightgray;
        }
    }
</style>