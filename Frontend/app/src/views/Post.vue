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
    :getLink="false"
    @deletePost="redirectAtHome()"
  />

  <section v-if="hasComment" class="comments">

    <AddComment
      class="create-comment--timeline"
      :postId="post.id_post"
      @submitComment="fetchPost()"
    />

    <CommentItem
      v-for="comment in comments"
      :key="comment.id_comment"
      :date="comment.date"
      :content="comment.content"
      :commentId="comment.id_comment"
      :authorId="comment.user.id_user"
      :firstname="comment.user.firstname"
      :lastname="comment.user.lastname"
      @deleteComment="fetchPost()"
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
import { mapState } from 'vuex'
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
      comments: []
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
        return this.comments.length == 0 ? false : true;
    }
  },
  methods: {
    fetchPost() {
      axios
        .get(`${process.env.VUE_APP_API}/post/${this.routeId}`, {
          headers: {
            'Authorization': `Bearer ${this.accessToken}`
            }
          })
        .then(response => (
          this.post = response.data,
          this.user = response.data.user,
          this.comments = response.data.comment
          ))
        .catch(error => console.error(error))
    },
    redirectAtHome() {
      this.$router.push({ name: 'Home' })
    }
  },
  mounted() {
      this.fetchPost()
  }
}
</script>

<style lang="scss">
  
  .comments {
    background-color: whitesmoke;
    border-radius: 5px;
    box-shadow: 0 4px 12px  rgba(0, 0, 0, 0.25);
    max-width: 700px;
    margin: 20px 0;
  }

</style>