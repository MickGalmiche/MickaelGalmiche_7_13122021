<template>
    <article class="comment-card">
        <p class="comment-card__caption">Publié par {{ firstname }} {{ lastname }}, {{ relativeDate }}</p>
        <p class="comment-card__content">{{ content }}</p>
    </article>
</template>

<script>
import moment from 'moment'

export default {
  name: 'CommentItem',
  data: () => ({
      relativeDate: "",
      calendarDate: "",  
      formatedDate: ""
  }),
  props: {
      commentId: {
          type: Number
      },
      date: {},
      content: {
          type: String
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