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
@import "@/assets/scss/_variables.scss";
@import "@/assets/scss/_mixins.scss";

  body {
    margin: map-get($margin, none);
    background-color: $color-secondary;
  }

  main {
    display: grid;
    grid-template-columns: 1fr;
    justify-items: center;
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
    background-color: $color-tertiary;
    border-color: transparent;
    border-radius: map-get($border-radius, small);
    @include box-shadow;
    display: grid;
    grid-template-areas: 
    "tabLogin tabSignup"
    "authForm authForm";
    place-content: center;

    &__form {
      grid-area: authForm;
      width: 300px;

      @include for-large-mobile {
        width: 400px;
      }
    }
  }

  .tab-button {
    background-color: $bg-color-tertiary;
    color: $color-tertiary;
    border: none;
    font-weight: bold;
    padding: map-get($padding, medium);
    cursor: pointer;

    &__Login {
      grid-area: tabLogin;
      border-top-left-radius: map-get($border-radius, small);
    }
    &__Signup {
      grid-area: tabSignup;
      border-top-right-radius: map-get($border-radius, small);
    }
    &--active {
      color: $color-tertiary;
      background-color: $color-primary-darken;
    }
    &:focus-visible {
      outline: 1px solid $color-primary;
    }
  }

</style>
