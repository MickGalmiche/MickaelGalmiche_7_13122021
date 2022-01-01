<template>
  <header>
    <NavMenu/>
  </header>
  <main>
    <router-view/>
  </main>
</template>

<script>
import NavMenu from '@/components/NavMenu.vue'

export default {
  name: 'app',
  components: {
    NavMenu
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
</style>
