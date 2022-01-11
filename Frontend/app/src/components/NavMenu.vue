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
@import "@/assets/scss/_variables.scss";
@import "@/assets/scss/_mixins.scss";

    .header {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        background-color: $color-primary;
        @include box-shadow;

        &__title {
            margin: map-get($margin, none);
        }
        &__img {
            width: 250px;
            height: 100px;
            object-fit: cover;
        }
        &__link {
            color: $color-tertiary;
        }
    }

    .nav {
        &__list {
            list-style: none;
            display: flex;
            margin: map-get($margin, none);
            padding-left: map-get($margin, none);
        }
        &__item {
            padding: map-get($margin, medium);
        }
    }

    .nav-item {
        &__link {
            font-weight: bold;
            cursor: pointer;
            color: $color-tertiary;

            &:hover {
                color: $color-secondary;
            }
        }
    }
</style>