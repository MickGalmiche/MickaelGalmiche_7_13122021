<template>
  <NavMenu/>
  <main>
    <router-view v-if="accessToken"/>
    <section v-else class="auth">

      <button 
        v-for="tab in tabs"
        :key="tab"
        :class="['tab-button',`tab-button__${tab}`, { 'tab-button--active': currentTab === tab }]"
        @click='currentTab = tab'
      >
        {{ tab }}
      </button>

      <component :is="currentTabComponent" class="auth__form"></component>
    </section>
  </main>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import NavMenu from '@/components/NavMenu.vue'
import Login from '@/components/Login.vue'
import Signup from '@/components/Signup.vue'

export default {
  name: 'app',
  data() {
    return {
      tabs: ['Login', 'Signup'],
      currentTab: 'Login'
    }
  },
  components: {
    NavMenu,
    Login,
    Signup
  },
  computed: {
    ...mapState([
      'accessToken',
      'userId'
    ]),
    currentTabComponent() {
      return this.currentTab
    }
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

  body {
    margin: 0;
    background-color: #FFD7D7;
  }

  main {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
  }

  .auth {
    width: max-content;
    margin-top: 100px;
    background-color: white;
    border-color: transparent;
    border-radius: 5px;
    box-shadow: 0 4px 12px  rgba(0, 0, 0, 0.25);
    display: grid;
    grid-template-areas: 
    "tabLogin tabSignup"
    "authForm authForm";
    place-content: center;

    &__form {
      grid-area: authForm;
      width: 300px;
    }
  }

  .tab-button {
    background-color: #666;
    color: white;
    border: none;
    font-weight: bold;
    padding: 8px;
    cursor: pointer;

    &__Login {
      grid-area: tabLogin;
      border-top-left-radius: 5px;
    }
    &__Signup {
      grid-area: tabSignup;
      border-top-right-radius: 5px;
    }
    &--active {
      color: white;
      background-color: rgb(235, 0, 0);;
    }
  }

</style>
