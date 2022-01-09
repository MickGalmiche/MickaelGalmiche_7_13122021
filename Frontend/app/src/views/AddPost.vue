<template>
  <CreatePost
    :textareaRows="20"
    @submitPost="redirectAtHome()"
  />
</template>

<script>
import { mapState } from 'vuex'
import CreatePost from '@/components/CreatePost.vue'

export default {
  name: 'AddPost',
  components: {
    CreatePost
  },
  computed: {
    ...mapState([
      'accessToken',
      'userId'
    ])
  },
  methods: {
    redirectAtHome() {
      this.$router.push({ name: 'Home' })
    }
  }
}
</script>
