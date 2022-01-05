<template>
  <section class="post">
    <PostItem
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
  </section>

  <section class="comments">
    <h3>Commentaires</h3>
    <div v-if="hasComment">
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
    </div>
    <p v-else>Aucun commentaire</p>
  </section>

</template>

<script>
import { mapState } from 'vuex'
import axios from 'axios'
import PostItem from '@/components/PostItem.vue'
import CommentItem from '@/components/CommentItem.vue'

export default {
  name: 'Post',
  components: {
    PostItem,
    CommentItem
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

<style lang="scss" scoped>
  section {
    background-color: whitesmoke;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    padding: 20px;
  }
</style>