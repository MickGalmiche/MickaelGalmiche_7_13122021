<template>

    <router-link class="post-link" v-if="getLink" :to="{ name: 'Post', params: {id: postId} }">
        <article class="post-card post-card--clickable">
            <h3 class="post-card__title">{{ title }}</h3>
            <div class="post-card__caption">
                <IconAuthor />
                <span>{{ firstname }} {{ lastname }}</span>
                <IconDate /> 
                <span>{{ calendarDate }}</span>   
            </div>
            <p class="post-card__content">{{ content }}</p>
            <div class="post-card__commentcount">
                <span>{{ commentcount }}</span>
                <IconComment />
            </div>
            <div class="post-card__buttons" v-if="isAdmin || isAuthor">
              <button class="button-delete" @click.prevent="deletePost">
                  <IconTrash />
              </button>
            </div>
        </article>
    </router-link>


    <article v-else class="post-card">
        <h2 class="post-card__title">{{ title }}</h2>
        <div class="post-card__caption">
            <IconAuthor />
            <span>{{ firstname }} {{ lastname }}</span>
            <IconDate /> 
            <span>{{ calendarDate }}</span>   
        </div>
        <p class="post-card__content">{{ content }}</p>
        <div class="post-card__buttons" v-if="isAdmin || isAuthor">
          <button class="button-delete" @click.prevent="deletePost">
              <IconTrash />
          </button>
        </div>
    <div v-else>...</div>
    </article>
</template>

<script>
import { mapState } from 'vuex'
import axios from 'axios'
import moment from 'moment'
import IconTrash from './icons/IconTrash.vue'
import IconComment from './icons/IconComment.vue'
import IconAuthor from './icons/IconAuthor.vue'
import IconDate from './icons/IconDate.vue'

export default {
  name: 'PostItem',
  components: {
      IconTrash,
      IconComment,
      IconAuthor,
      IconDate
  },
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
      },
      commentcount: {
          type: Number
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

    .post-card {
        margin: 20px 0;
        color: black;
        border: 1px solid transparent;
        border-radius: 5px;
        box-shadow: 0 4px 12px  rgba(0, 0, 0, 0.25);
        background-color: white;
        width: 700px;
        overflow: hidden;

        display: grid;
        grid-template-areas:
            "postCaption postButtons"
            "postTitle postTitle"
            "postContent postContent"
            ". postComCount";
        grid-template-columns: 4fr 1fr;

        &__title {
            grid-area: postTitle;
            color: black;
            padding: 20px;
            margin: 0;
        }
        &__content {
            grid-area: postContent;
            padding: 20px;
            margin: 0;
            text-align: justify;
        }
        &__caption {
            grid-area: postCaption;
            font-size: .8rem;
            color: dimgray;
            justify-self: start;
            margin: 5px 10px;

            display: flex;
            justify-content: center;
            align-items: center;

            span {
                padding: 5px;
            }

            svg {
                width: 1.8em;
                height: 1.8em;
            }
        }
        &__commentcount {
            grid-area: postComCount;
            color: dimgray;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            margin: 5px;

            p {
                margin: auto 0;
            }
            svg {
                width: 1.8em;
                height: 1.8em;
            }
        }
        &__buttons {
            grid-area: postButtons;
            justify-self: end;
        }

        &--clickable {
            
            &:hover {
                box-shadow: 10px 25px 50px -12px rgba(0,0,0,0.25);
            }
            &:active {
                box-shadow: 0 1px 2px 0 rgba(60,64,67,0.3), 0 1px 3px 5px rgba(60,64,67,0.15);

            }
        }
    }

    .post-link {
        text-decoration: none;
    }

    .button-delete {
        background-color: transparent;
        border: none;
        cursor: pointer;
        color: dimgray;

        svg {
            width: 1.8em;
            height: 1.8em;
        }
        &:hover {
            color: #FD2D01;
        }
        &:focus-visible {
            outline: none;
        }
    }
</style>