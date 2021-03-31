<template>
    <nav class="nav">
        <router-link
            @click="location.reload()"
            :to="`/user/${$store.getters.userName}`"
            class="nav__logo"
        >
            Nippah
        </router-link>
        <SearchAnime />
        <!-- <router-link
            v-if="!!$store.state.token"
            class="nav__link"
            :to="`/user/${$store.getters.userName}`"
        >
            My List
        </router-link> -->
        <button v-if="!!$store.state.token" @click="logout" class="nav__logout">
            Logout
        </button>
        <button @click="$router.push('/auth')" v-else class="nav__logout">
            Log in
        </button>
    </nav>
</template>

<script>
import SearchAnime from '@/components/UI/SearchAnime'

export default {
    components: {
        SearchAnime,
    },
    methods: {
        logout() {
            this.$store.dispatch('logout')
            this.$router.push('/')
        },
    },
}
</script>
<style lang="scss" scoped>
.nav {
    z-index: 6000000;
    position: sticky;
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
    &__logo {
        cursor: pointer;
        font-family: 'Fredoka One', cursive;
        position: absolute;
        left: 2rem;
        color: white;
        font-size: 2.5rem;
        @media (max-width: 800px) {
            display: none;
        }
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
    &__search {
        font-size: 1.4rem;
        border: none;
        border-radius: 0.5rem;
        padding: 0.5rem 1rem;
        position: absolute;
        left: 2rem;
    }
}
</style>
