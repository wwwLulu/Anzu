<template>
    <TheAlert
        v-if="addedToListEvent"
        :message="`The anime ${animeSelected} has been added to your list`"
    />
    <div
        v-if="
            !!$store.state.token &&
                $route.params.username == $store.getters.userName
        "
        class="search"
    >
        <input
            class="search__input"
            type="text"
            placeholder="Search anime to add"
            v-model="search"
        />
        <div
            v-if="search.length > 3"
            @click="search = ''"
            class="overlay"
        ></div>
        <div v-if="results.length != 0" class="search__results">
            <p>Click to add to list</p>
            <br />
            <div>
                <div
                    class="search__result"
                    @click="addEntry(result.actualTitle)"
                    v-for="result in results"
                    :key="result"
                >
                    <div class="search__thumbnail-container">
                        <img :src="result.thumbnail" alt="thumbnail" />
                    </div>
                    <p>{{ result.title }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import TheAlert from '@/components/UI/TheAlert'

export default {
    components: {
        TheAlert,
    },
    data() {
        return {
            addedToListEvent: false,
            animeSelected: '',
            search: '',
            results: [],
            list: [],
            title: '',
        }
    },
    async mounted() {
        await this.$store.dispatch('setDatabase')
        this.list = this.$store.getters.db
    },
    watch: {
        search() {
            if (this.search.length >= 4) {
                this.fetchAnime()
            } else {
                this.results = []
            }
        },
    },
    methods: {
        async fetchAnime() {
            let results = []
            for (const anime of this.list) {
                if (
                    anime.title
                        .toLowerCase()
                        .indexOf(this.search.toLowerCase()) > -1
                ) {
                    results.push({
                        actualTitle: anime.title,
                        title: anime.title,
                        thumbnail: anime.thumbnail,
                    })
                    break
                }
                for (const synonym of anime.synonyms) {
                    if (
                        synonym
                            .toLowerCase()
                            .indexOf(this.search.toLowerCase()) > -1
                    ) {
                        results.push({
                            actualTitle: anime.title,
                            title: synonym,
                            thumbnail: anime.thumbnail,
                        })
                        break
                    }
                }
            }
            this.results = results
        },
        addEntry(title) {
            this.search = ''
            this.$store.dispatch('addEntry', title)
            this.results = []
            this.addedToListEvent = true
            this.animeSelected = title
            setTimeout(() => {
                this.addedToListEvent = false
                this.animeSelected = ''
            }, 2000)
        },
    },
}
</script>

<style lang="scss" scoped>
.overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
}
.search {
    z-index: 500000;
    margin-right: 2rem;
    p {
        color: var(--color-text-100);
    }
    &__input {
        font-size: 1.4rem;
        border: none;
        border-radius: 0.5rem;
        padding: 0.5rem 1rem;
        max-width: 30rem;
        border: 1px solid var(--color-list-background);
    }
    &__results {
        position: absolute;
        top: 5rem;
        background: var(--color-list-background);
        padding: 0.5rem;
        max-height: 30rem;
        overflow: auto;
        border-radius: 0 0 0.5rem 0.5rem;
    }
    &__result {
        &:hover {
            background: var(--color-primary);
            color: white;
        }
        padding: 0.5rem;
        color: var(--color-text-100);
        cursor: pointer;
        font-size: 1.2rem;
        display: flex;
    }
    &__thumbnail-container {
        width: 3rem;
        height: 3rem;
        flex-shrink: 0;
        margin-right: 1rem;
        img {
            width: 100%;
            height: 100%;
            border-radius: 0.5rem;
            object-fit: cover;
            object-position: center;
        }
    }
}
</style>
