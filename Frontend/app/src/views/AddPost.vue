<template>
    <section>
        <h2>Ajouter un post</h2>
        <CreatePost />
    </section>
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
  }
}
</script>

<style lang="scss">

  .add-post {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    background-color: whitesmoke;
    margin: 20px 0;
  }
</style>
