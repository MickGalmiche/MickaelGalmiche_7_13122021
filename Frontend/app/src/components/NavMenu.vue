<template>
    <header class="header">
        <h1 class="header__title">
            <router-link class="header__link" :to="{ name: 'Home' }">
                <img class="header__img" src="@/assets/logo/icon-left-font-monochrome-white.png" alt="Groupomania Logo">
            </router-link>
        </h1>
        <nav class="header__nav nav" v-if="accessToken">
            <ul class="nav__list" >
                <li class="nav__item nav-item">
                    <router-link class="nav-item__link" :to="{ name: 'AddPost' }">Ajouter un article</router-link>
                </li>
                <li class="nav__item nav-item">
                    <a class="nav-item__link" @click.prevent="logout">Se déconnecter</a>
                </li>
            </ul>
        </nav>
    </header>
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
    .header {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        background-color: #FD2D01;
        box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;

        &__title {
            margin: 0;
        }
        &__img {
            width: 250px;
            height: 100px;
            object-fit: cover;
        }
        &__link {
            color: white;
        }
    }

    .nav {
        &__list {
            list-style: none;
            display: flex;
            margin: 0;
            padding-left: 0;
        }
        &__item {
            padding: 10px;
        }
    }

    .nav-item {
        &__link {
            font-weight: bold;
            cursor: pointer;
            color: white;

            &:hover {
                /* color: #FD2D01; */
                color: #FFD7D7;
            }
        }
    }
</style>