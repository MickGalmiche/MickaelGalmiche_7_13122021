<template>
    <nav id="navMenu">
        <router-link :to="{ name: 'Home' }"><img src="@/assets/logo/icon-left-font.svg" alt="Groupomania Logo"></router-link>
        <ul>
            <li><router-link :to="{ name: 'About' }">About</router-link></li>
        </ul>
    </nav>
</template>

<script>
export default {
    name: 'navMenu'
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

            &.router-link-exact-active {
              color: #42b983;
            }
        }

        ul {
            list-style: none;
        }
    }
</style>