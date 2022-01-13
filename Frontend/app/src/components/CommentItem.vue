<template>
    <article class="comment-card">
        <div class="comment-card__caption">
            <IconCommentAuthor />
            <span>{{ firstname }} {{ lastname }}</span>
            <IconDate /> 
            <span v-bind:title="calendarDate">{{ relativeDate }}</span>   
        </div>
        <p class="comment-card__content">{{ content }}</p>
        <div class="comment-card__buttons" v-if="isAdmin || isAuthor">
            <button class="button-delete" @click.prevent="deleteComment">
                <IconTrash />
            </button>
        </div>
    </article>
</template>

<script>
import { mapState } from 'vuex'
import axios from 'axios'
import moment from 'moment'
import IconTrash from './icons/IconTrash.vue'
import IconCommentAuthor from './icons/IconCommentAuthor.vue'
import IconDate from './icons/IconDate.vue'

export default {
  name: 'CommentItem',
  components: {
      IconTrash,
      IconCommentAuthor,
      IconDate
  },
  data() {
      return {
          relativeDate: '',
          calendarDate: ''
      }
  },
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
      getDate() {
          moment.locale("fr");
          this.relativeDate = moment(this.date).fromNow()
          this.calendarDate = moment(this.date).format('LLLL')
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
      this.getDate()
  }
}
</script>

<style lang="scss">
@import "@/assets/scss/_variables.scss";
@import "@/assets/scss/_mixins.scss";

    .comment-card {
        color: $bg-color-tertiary;
        background-color: $bg-color-primary;
        margin: map-get($margin, medium) map-get($margin, none);
        overflow: hidden;

        display: grid;
        grid-template-areas:
            "commentCaption commentButtons"
            "commentContent commentContent";
        grid-template-columns: 4fr 1fr;

        &__content {
            grid-area: commentContent;
            padding: map-get($padding, large);
            margin: map-get($margin, none);
            text-align: left;
        }
        &__caption {
            grid-area: commentCaption;
            font-size: .8rem;
            color: $bg-color-tertiary;
            justify-self: start;
            margin: map-get($margin, small) map-get($margin, medium);

            display: flex;
            justify-content: center;
            align-items: center;

            span {
                padding: map-get($padding, small);
            }

            svg {
                width: 1.8em;
                height: 1.8em;
            }
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
        padding: map-get($padding, medium);
        color: $bg-color-tertiary;
        &:hover {
            color: $color-primary-darken;
            font-weight: bold;
        }
        &:focus-visible {
            outline: 1px solid $color-primary;
        }
    }

    .button-delete {
        background-color: transparent;
        border: none;
        cursor: pointer;
        color: $bg-color-tertiary;

        svg {
            width: 1.8em;
            height: 1.8em;
        }
        &:hover {
            color: $color-primary;
        }
        &:focus-visible {
            outline: none;
        }
    }
</style>