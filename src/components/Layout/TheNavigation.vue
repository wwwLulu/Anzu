<template>
    <nav class="nav">
        <router-link
            @click="$store.getters.userName && location.reload()"
            :to="
                $store.getters.userName
                    ? `/user/${$store.getters.userName}`
                    : `/auth`
            "
            class="nav__logo"
        >
            Nippah
        </router-link>
        <SearchAnime />
        <div class="nav__dark-mode">
            <i
                @click="setDarkMode"
                v-if="!$store.state.darkMode"
                class="fas fa-moon nav__dark-mode--moon"
            ></i>
            <i
                @click="setLightMode"
                v-else
                class="fas fa-sun nav__dark-mode--sun"
            ></i>
        </div>
        <button v-if="!!$store.state.token" @click="logout" class="nav__logout">
            Logout
        </button>
        <button @click="$router.push('/auth')" v-else class="nav__logout">
            Log in
        </button>
    </nav>
</template>

<script>
import SearchAnime from '@/components/UserList/SearchAnime'

export default {
    components: {
        SearchAnime,
    },
    mounted() {
        if (localStorage.getItem('darkMode') == 'true') {
            this.setDarkMode()
        } else {
            this.setLightMode()
        }
    },
    methods: {
        logout() {
            this.$store.dispatch('logout')
            this.$router.push('/')
        },
        setDarkMode() {
            let root = document.documentElement
            root.style.setProperty('--color-primary', ' #5349c0')
            root.style.setProperty('--color-background', '#08001A')
            root.style.setProperty('--color-list-background', 'rgb(34, 34, 34)')
            root.style.setProperty(
                '--color-text-100',
                'rgba(255, 255, 255, 0.8)'
            )
            this.$store.commit('setTheme', { darkMode: true })
        },
        setLightMode() {
            let root = document.documentElement
            root.style.setProperty('--color-primary', ' #6a62c2')
            root.style.setProperty('--color-background', '#eaeaea')
            root.style.setProperty('--color-list-background', 'white')
            root.style.setProperty('--color-text-100', 'rgba(0, 0, 0, 0.6)')
            this.$store.commit('setTheme', { darkMode: false })
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
        animation: fadeIn linear 0.5s forwards,
            slide-in-from-left ease-in-out 0.5s forwards;
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
        animation: fadeIn linear 0.5s forwards;
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
        animation: fadeIn linear 0.5s forwards;
        font-size: 1.4rem;
        border: none;
        border-radius: 0.5rem;
        padding: 0.5rem 1rem;
        position: absolute;
        left: 2rem;
    }
    &__dark-mode {
        animation: fadeIn linear 0.5s forwards;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 2rem;
        i {
            margin: 0 auto;
        }
        &--moon {
            color: white;
        }
        &--sun {
            color: white;
        }
    }
}
</style>
