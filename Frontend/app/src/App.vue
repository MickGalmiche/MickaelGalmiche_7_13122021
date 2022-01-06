<template>
  <header>
    <NavMenu/>
  </header>
  <main>
    <router-view v-if="accessToken"/>
    <div v-else class="authForms">
      <Login />
      <Signup />
    </div>
  </main>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import NavMenu from '@/components/NavMenu.vue'
import Login from '@/components/Login.vue'
import Signup from '@/components/Signup.vue'

export default {
  name: 'app',
  components: {
    NavMenu,
    Login,
    Signup
  },
  computed: {
    ...mapState([
      'accessToken',
      'userId'
    ])
  },
  methods: {
    ...mapActions([
      'fetchAccessToken'
    ]),
  },
  created() {
    this.fetchAccessToken();
  }
}
</script>

<style lang="scss">
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  .authForms {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-around;
  }
</style>
