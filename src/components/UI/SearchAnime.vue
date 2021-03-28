<template>
    <div v-if="!!$store.state.token" class="search">
        <input
            class="search__input"
            type="text"
            placeholder="Search anime to add"
            v-model="search"
        />
        <div v-if="results.length != 0" class="search__results">
            <p>Click to add</p>
            <br />
            <ul>
                <li
                    @click="addEntry(result.title)"
                    v-for="result in results"
                    :key="result"
                >
                    <div class="search__thumbnail-container">
                        <img :src="result.thumbnail" alt="thumbnail" />
                    </div>
                    <p>{{ result.title }}</p>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            search: '',
            results: [],
            list: [],
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
            this.list.forEach((anime) => {
                if (
                    anime.title
                        .toLowerCase()
                        .indexOf(this.search.toLowerCase()) > -1
                ) {
                    results.push({
                        title: anime.title,
                        thumbnail: anime.thumbnail,
                    })
                }
            })
            this.results = results
        },
        addEntry(title) {
            this.$store.dispatch('addEntry', title)
        },
    },
}
</script>

<style lang="scss" scoped>
.search {
    z-index: 500000;
    position: relative;
    padding: 1rem;
    &__input {
        font-size: 1.4rem;
        border: none;
        border-radius: 0.5rem;
        padding: 0.5rem 1rem;
    }
    &__results {
        position: absolute;
        top: 5rem;
        background: white;
        padding: 0.5rem;
        max-height: 30rem;
        overflow: auto;
        border-radius: 0 0 0.5rem 0.5rem;
    }
    li {
        &:hover {
            background: darken(white, 10);
        }
        padding: 0.5rem;
        color: blue;
        cursor: pointer;
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
