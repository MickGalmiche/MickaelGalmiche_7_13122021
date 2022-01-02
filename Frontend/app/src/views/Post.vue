<template>
  <section class="post">
      <PostItem
        :key="post.id_post"
        :title="post.title"
        :date="post.date"
        :content="post.content"
        :postId="post.id_post"
        :firstname="user.firstname"
        :lastname="user.lastname"
        :comment="comments"
        :getLink="false"
      />
  </section>
</template>

<script>
import { mapState } from 'vuex'
import axios from 'axios'
import PostItem from '@/components/PostItem.vue'

export default {
  name: 'Post',
  components: {
    PostItem
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
      'accessToken'
    ]),
    routeId() {
      return this.$route.params.id
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