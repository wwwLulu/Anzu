<template>
    <div class="list-container">
        <p class="list__heading">{{ type }}</p>
        <section class="list">
            <div class="list__headers">
                <div class="list__headers--left">
                    <p class="list__title">Title</p>
                </div>
                <div class="list__headers--right">
                    <p class="list__score">Score</p>
                    <p class="list__progress">Progress</p>
                    <p class="list__type">Type</p>
                </div>
            </div>

            <AnimeListEntry
                v-for="anime in animeList"
                :key="anime"
                :coverUrl="anime.coverUrl"
                :title="anime.title"
                :score="anime.score"
                :progress="`${anime.episodeOn}/${anime.episodes}`"
                :type="anime.type"
            />
        </section>
    </div>
</template>

<script>
import AnimeListEntry from '@/components/AnimeListEntry'

export default {
    props: {
        type: String,
        animeList: Array,
    },
    components: {
        AnimeListEntry,
    },

    methods: {
        sortByTitleAZ() {},
        sortByTitleZA() {},
        sortByScoreDesc() {},
        sortByScoreAsc() {},
    },
}
</script>

<style lang="scss" scoped>
.list {
    flex-direction: column;
    font-size: 1.4rem;
    border-radius: 0.5rem;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    width: 90vw;
    max-width: 95rem;
    min-height: 1rem;
    background: white;

    * {
        color: var(--color-text-100);
    }

    &__heading {
        font-size: 2.2rem;
        font-weight: 100;
        color: var(--color-text-100);
        margin-bottom: 1rem;
    }
    &__headers {
        cursor: pointer;
        padding: 1rem 3rem 2rem 3rem;
        width: 100%;
        display: flex;
        justify-content: space-between;
        p {
            width: 8rem;
            text-align: center;
        }
        &--left {
            margin-left: 3.2rem;
        } 
        &--right {
            display: flex;
        }
    }

    @media (max-width: 700px) {
        * {
            font-size: 1rem;
        }
        p {
            width: 5rem;
        }
    }
}

.list-container {
    margin: 3rem 0;
}
</style>
