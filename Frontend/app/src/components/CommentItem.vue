<template>
    <article class="comment-card">
        <p class="comment-card__caption">Publié par {{ firstname }} {{ lastname }}, {{ relativeDate }}</p>
        <p class="comment-card__content">{{ content }}</p>
        <div class="comment-card__buttons" v-if="isAdmin || isAuthor">
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
        background-color: white;
        margin: 10px 0;
        overflow: hidden;

        display: grid;
        grid-template-areas:
            "commentCaption commentButtons"
            "commentContent commentContent";
        grid-template-columns: 4fr 1fr;

        &__content {
            grid-area: commentContent;
            padding: 20px;
            margin: 0;
            text-align: left;
        }
        &__caption {
            grid-area: commentCaption;
            font-size: .8rem;
            color: lightgray;
            justify-self: start;
            margin-left: 10px;
        }
        &__buttons {
            grid-area: commentButtons;
            justify-self: end;
        }
    }

    .comment-card button {
        background-color: transparent;
        border: none;
        cursor: pointer;
        padding: 10px;
        color: gray;
        &:hover {
            color: red;
            font-weight: bold;
        }
        &:focus-visible {
            outline: 1px solid #FD2D01;
        }
    }
</style>