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
                    <router-link title="Ajouter un article" class="nav-item__link nav-link" :to="{ name: 'AddPost' }">
                        <IconAdd />
                    </router-link>
                </li>

                <li class="nav__item nav-item">
                    <router-link class="nav-item__link" :to="{ name: 'Profile'}">
                        <IconProfile />
                    </router-link>
                </li>
            </ul>
        </nav>
    </header>
</template>

<script>
import { mapState } from 'vuex'
import IconAdd from './icons/IconAdd.vue'
import IconProfile from './icons/IconProfile.vue'

export default {
    name: 'navMenu',
    components: {
        IconAdd,
        IconProfile
    },
    computed: {
        ...mapState([
          'accessToken',
          'userId',
          'userRole'
        ])
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

        @include for-tablet {
            flex-direction: row;
            justify-content: space-evenly;
        }

        &__title {
            margin: map-get($margin, none);
        }
        &__img {
            width: 250px;
            height: 100px;
            object-fit: cover;
            vertical-align: middle;
        }
        &__link {
            color: $color-tertiary;
            box-sizing: border-box;
            display: inline-block;
        }
    }

    .nav {
        &__list {
            margin: map-get($margin, none);
            padding-left: map-get($margin, none);
            list-style: none;
            display: flex;
            flex-direction: row;
        }
        &__item {
            padding: map-get($margin, medium);
        }
    }

    .nav-item {
        &__link {
            font-weight: bold;
            font-size: 1.5rem;
            font-family: $font-secondary;
            cursor: pointer;
            color: $color-tertiary;
            text-decoration: none;
            display: flex;
            align-items: center;

            &:hover {
                color: $color-secondary;
            }
        }
    }
</style>