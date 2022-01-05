<template>
  <section class="add-post">
    <h2>Ajouter un post</h2>
    <CreatePost 
      @submitPost="fetchPosts()"
    />
  </section>

  <section id="home">
    <h2>Timeline</h2>
    <PostItem
      v-for="post in posts"
      :key="post.id_post"
      :title="post.title"
      :date="post.date"
      :content="post.content"
      :postId="post.id_post"
      :authorId="post.user.id_user"
      :firstname="post.user.firstname"
      :lastname="post.user.lastname"
      :getLink="true"
      @deletePost="fetchPosts()"
    />
  </section>
</template>

<script>
import { mapState } from 'vuex'
import axios from 'axios'
import PostItem from '@/components/PostItem.vue'
import CreatePost from '@/components/CreatePost.vue'

export default {
  name: 'Home',
  components: {
    PostItem,
    CreatePost
  },
  data() {
    return {
      posts: []
    }
  },
  computed: {
    ...mapState([
      'accessToken',
      'userId',
      'userRole'
    ])
  },
  methods: {
    fetchPosts() {
      axios
        .get(`${process.env.VUE_APP_API}/post`, {
          headers: {
            'Authorization': `Bearer ${this.accessToken}`
          }
        })
        .then(response => (this.posts = response.data))
        .catch(error => console.error(error))
    }
  },
  mounted() {
    this.fetchPosts()
  }
}
</script>

<style lang="scss" scoped>
  section {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
  }

  .add-post {
    background-color: whitesmoke;
    margin: 20px 0;
  }
</style>
