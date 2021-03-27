<template>
    <nav class="nav">
        <router-link class="nav__link" to="/">
            Home
        </router-link>
        <router-link class="nav__link" :to="`/user/${$store.getters.userName}`">
            My List
        </router-link>
        <button @click="logout" class="nav__logout">
            Logout
        </button>
    </nav>
</template>

<script>
export default {
    methods: {
        logout() {
            // this.$store.dispatch('logout')
        },
    },
}
</script>
<style lang="scss" scoped>
.nav {
    width: 100%;
    height: 5rem;
    background: var(--color-primary);
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 0 1rem;
    * {
        margin-right: 2rem;
    }
    &__link,
    &__link:visited {
        font-size: 1.6rem;
        color: white;
        text-decoration: none;
    }
    &__logout {
        cursor: pointer;
        border: none;
        background: transparent;
        color: white;
        border: 1px solid white;
        border-radius: 0.5rem;
        font-size: 1.6rem;
        padding: 0.5rem 1rem;
        &:hover {
            color: var(--color-primary);
            background: white;
        }
    }
}
</style>
