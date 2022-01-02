<template>
    <div v-if="getLink" class="post-item">
        <router-link :to="{ name: 'Post', params: {id: postId} }">
            <article class="post-card">
                <h2 class="post-card__title">{{ title }}</h2>
                <p class="post-card__caption">Publié par {{ firstname }} {{ lastname }},il y a {{ relativeDate }}</p>
                <p class="post-card__content">{{ content }}</p>
            </article>
        </router-link>
    </div>

    <article v-else class="post-card">
        <h2 class="post-card__title">{{ title }}</h2>
        <p class="post-card__caption">Publié par {{ firstname }} {{ lastname }},il y a {{ relativeDate }}</p>
        <p class="post-card__content">{{ content }}</p>
    </article>
</template>

<script>
import moment from 'moment'

export default {
  name: 'PostItem',
  data: () => ({
      relativeDate: "",
      calendarDate: "",  
      formattedDate: ""
  }),
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
      lastname: {
          type: String
      },
      getLink : {
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

        a {
            text-decoration: none;
            color: gray;
        }
    }

    .post-card {
        border: 1px solid gainsboro;
        border-radius: 10px;
        background-color: white;
        padding: 20px;
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

        &:hover {
            box-shadow: 0 1px 2px 0 rgba(60,64,67,0.3), 0 1px 3px 5px rgba(60,64,67,0.15);
        }
    }
</style>