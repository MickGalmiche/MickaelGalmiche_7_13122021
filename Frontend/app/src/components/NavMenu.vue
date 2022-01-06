<template>
    <nav id="navMenu">
        <router-link :to="{ name: 'Home' }"><img src="@/assets/logo/icon-left-font.svg" alt="Groupomania Logo"></router-link>
        <ul v-if="accessToken">
            <li><router-link :to="{ name: 'AddPost' }">Ajouter un article</router-link></li>
            <li><a @click.prevent="logout">Se déconnecter</a></li>
        </ul>

        <ul v-else>
            <li><router-link :to="{ name: 'About' }">About</router-link></li>
        </ul>
    </nav>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
    name: 'navMenu',
    computed: {
        ...mapState([
          'accessToken',
          'userId',
          'userRole'
        ])
    },
    methods: {
        ...mapActions([
            'doLogout'
        ]),
        logout() {
            this.doLogout()
        }
    }
}
</script>

<style lang="scss">
    #navMenu {
        padding: 0 30px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        img {
            width: 250px;
            height: 100px;
            object-fit: cover;
        }

        a {
            font-weight: bold;
            color: #2c3e50;
            cursor: pointer;

            &.router-link-exact-active {
              color: #42b983;
            }
        }

        ul {
            list-style: none;
            display: flex;
            margin: 0;

            li {
                margin: 0 10px;
            }
        }
    }
</style>