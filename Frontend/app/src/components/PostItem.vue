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
@import "@/assets/scss/_variables.scss";
@import "@/assets/scss/_mixins.scss";

    .post-card {
        margin: map-get($margin, medium) map-get($margin, none);
        background-color: $bg-color-primary;
        overflow: hidden;
        width: 100%;

        @include for-large-mobile {
            border: 1px solid transparent;
            border-radius: map-get($border-radius, small);
            @include box-shadow;
            width: 500px;

            &--clickable:hover {
                @include hover-box-shadow;
            }
        }

        @include for-tablet {
            width: 700px;
        }

        display: grid;
        grid-template-areas:
            "postCaption postButtons"
            "postTitle postTitle"
            "postContent postContent"
            ". postComCount";
        grid-template-columns: 4fr 1fr;

        &__title {
            grid-area: postTitle;
            padding: map-get($padding, large);
            margin: map-get($margin, none);
        }
        &__content {
            grid-area: postContent;
            padding: map-get($padding, large);
            margin: map-get($margin, none);
            text-align: justify;
        }
        &__caption {
            grid-area: postCaption;
            font-size: .8rem;
            color: $bg-color-tertiary;
            justify-self: start;
            margin: map-get($margin, small) map-get($margin, medium);

            display: flex;
            justify-content: center;
            align-items: center;

            span {
                padding: map-get($padding , small);
            }

            svg {
                width: 1.8em;
                height: 1.8em;
            }
        }
        &__commentcount {
            grid-area: postComCount;
            color: $bg-color-tertiary;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            margin: map-get($margin , small);

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
    }

    .post-link {
        text-decoration: none;
        color: black;
    }

    .button-delete {
        background-color: transparent;
        border: none;
        cursor: pointer;
        color: $bg-color-tertiary;
        margin: map-get($margin , small);

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