<template>
  <section id="home">
    <PostItem
      v-for="post in posts"
      :key="post.id_post"
      :title="post.title"
      :date="post.date"
      :content="post.content"
      :postId="post.id_post"
      :firstname="post.user.firstname"
      :lastname="post.user.lastname"
      :getLink="true"
    />
  </section>
</template>

<script>
import { mapState } from 'vuex'
import axios from 'axios'
import PostItem from '@/components/PostItem.vue'

export default {
  name: 'Home',
  components: {
    PostItem
  },
  data() {
    return {
      posts: []
    }
  },
  computed: {
    ...mapState([
      'accessToken'
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
    background-color: whitesmoke;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
  }
</style>
