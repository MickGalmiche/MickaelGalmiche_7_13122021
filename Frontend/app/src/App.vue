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

import { defineRule, configure } from 'vee-validate'
import { localize, setLocale } from '@vee-validate/i18n'
import fr from '@vee-validate/i18n/dist/locale/fr.json'

/* Global Validators with VeeValidate Rules */
import AllRules from '@vee-validate/rules';
Object.keys(AllRules).forEach(rule => {
  defineRule(rule, AllRules[rule]);
});

configure({
  generateMessage: localize({
    fr,
  }),
});

setLocale('fr');

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
    ])
  },
  created() {
    this.fetchAccessToken();
  }
}
</script>

<style lang="scss">
@import "@/assets/scss/_typography.scss";
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
    font-family: $font-primary;
    font-weight: map-get($font-weight, light);
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

  .form-error {
    font-weight: bold;
    color: $color-primary-darken;
  }

</style>
