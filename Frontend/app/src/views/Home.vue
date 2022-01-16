<template>
  <CreatePost
    :textareaRows="2"
    @submitPost="fetchPosts()"
  />

  <section class="timeline">
    <h2 class="timeline__title">Timeline</h2>
    <div v-if="!hasPost">Aucun article</div>
    <PostItem
      class="timeline__item"
      v-for="post in posts"
      :key="post.id_post"
      :title="post.title"
      :date="post.date"
      :content="post.content"
      :postId="post.id_post"
      :authorId="post.user.id_user"
      :firstname="post.user.firstname"
      :lastname="post.user.lastname"
      :commentcount="post._count.comment"
      :getLink="true"
      @deletePost="fetchPosts()"
    />
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex'
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
    ]),
    hasPost() {
      return this.posts.lenght == 0 ? false : true;
    } 
  },
  methods: {
    ...mapActions([
      'fetchAccessToken',
      'doLogout'
    ]),
    fetchPosts() {
      axios
        .get(`${process.env.VUE_APP_API}/post`, {
          headers: {
            'Authorization': `Bearer ${this.accessToken}`
          }
        })
        .then(response => (this.posts = response.data))
        .catch(error => {
          console.log(error)
          switch(error.response.status) {
            case 401:
              this.doLogout();
              break;

            case 404:
              this.$router.push({ name: 'Home' });
              break;
          }
        })
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.fetchPosts()
    })
  }
}
</script>

<style lang="scss">
@import "@/assets/scss/_variables.scss";

  .timeline {
    display: grid;
    grid-template-columns: 1fr;
    align-items: center;
    row-gap: 10px;

    &__title {
      color:  $color-primary-darken;
      font-family: $font-secondary;
    }
  }

</style>
