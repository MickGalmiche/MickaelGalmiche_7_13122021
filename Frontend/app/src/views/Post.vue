<template>
  
  <PostItem
    class="single-post"
    :key="post.id_post"
    :title="post.title"
    :date="post.date"
    :content="post.content"
    :postId="post.id_post"
    :authorId="user.id_user"
    :firstname="user.firstname"
    :lastname="user.lastname"
    :commentcount="comment.count"
    :likeCount="rating.likeCount"
    :dislikeCount="rating.dislikeCount"
    :userRating="rating.userRating"
    :getLink="false"
    @deletePost="redirectAtHome()"
    @updatePost="fetchPost()"
  />

  <section v-if="hasComment" class="comments">

    <AddComment
      class="create-comment--timeline"
      :postId="post.id_post"
      @submitComment="fetchPost()"
    />

    <CommentItem
      v-for="element in comment.comments"
      :key="element.id_comment"
      :date="element.date"
      :content="element.content"
      :commentId="element.id_comment"
      :authorId="element.user.id_user"
      :firstname="element.user.firstname"
      :lastname="element.user.lastname"
      @deleteComment="fetchPost()"
      @updateComment="fetchPost()"
    /> 

  </section>

  <section v-else class="no-comments">
    <h3>Aucun commentaire... Soyez le premier à commenter !</h3>
    <AddComment
      class="create-comment--first"
      :postId="post.id_post"
      @submitComment="fetchPost()"
    />
  </section>

</template>

<script>
import { mapState, mapActions } from 'vuex'
import axios from 'axios'
import PostItem from '@/components/PostItem.vue'
import CommentItem from '@/components/CommentItem.vue'
import AddComment from '@/components/CreateComment.vue'

export default {
  name: 'Post',
  components: {
    PostItem,
    CommentItem,
    AddComment
  },
  data() {
    return {
      post: {},
      user: {},
      comment: {},
      rating: {},
    }
  },
  computed: {
    ...mapState([
      'accessToken',
      'userId',
      'userRole'
    ]),
    routeId() {
      return this.$route.params.id
    },
    hasComment() {
        return this.comment.count == 0 ? false : true;
    }
  },
  methods: {
    ...mapActions([
      'fetchAccessToken',
      'doLogout'
    ]),
    fetchPost() {
      axios
        .get(`${process.env.VUE_APP_API}/api/post/${this.routeId}`, {
          headers: {
            'Authorization': `Bearer ${this.accessToken}`
            }
          })
        .then(response => (
          this.post = response.data.post,
          this.user = response.data.author,
          this.comment = response.data.comment,
          this.rating = response.data.rating
          ))
        .catch(error => {
          switch(error.response.status) {
            case 401:
              this.doLogout();
              break;

            case 404:
              this.$router.push({ name: 'Home' });
              break;
          }
          console.log(error)
        })
    },
    redirectAtHome() {
      this.$router.push({ name: 'Home' })
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.fetchPost()
    })
  }
}
</script>

<style lang="scss">
@import "@/assets/scss/_variables.scss";
@import "@/assets/scss/_mixins.scss";
  
  .comments {
    background-color: $bg-color-secondary;
    margin: map-get($margin, large) map-get($margin, none);
    display: grid;
    grid-template-columns: 1fr;
    align-items: center;
    width: 100%;

    @include for-large-mobile {
      border-radius: map-get($border-radius, small);
      width: 500px;
      @include box-shadow;
    }

    @include for-tablet {
      width: 700px;
    }
  }

  .no-comments {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    align-items: center;

    @include for-large-mobile {
      border-radius: map-get($border-radius, small);
      width: 500px;
    }
    @include for-tablet {
      width: 700px;
    }
  }
</style>