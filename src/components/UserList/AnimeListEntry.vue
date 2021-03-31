<template>
    <teleport to="#app">
        <AnimeEditModal
            v-if="editMode"
            @closeModal="editMode = false"
            :coverUrl="coverUrl"
            :title="title"
            :score="score"
            :progress="progress"
            :type="type"
        />
    </teleport>
    <div class="anime">
        <div class="anime__left">
            <div class="anime__cover-container">
                <img :src="coverUrl" alt="cover" class="anime__cover" />
                <i
                    @click="editMode = true"
                    class="fas fa-ellipsis-h anime__edit"
                ></i>
            </div>
            <div class="anime__cover-container--hovering">
                <img :src="coverUrl" alt="cover" class="anime__cover--big" />
            </div>
            <p class="anime__title">{{ title }}</p>
        </div>
        <div class="anime__right">
            <p v-if="score > 0" class="anime__score">{{ score }}</p>
            <p class="anime__progress">
                {{ progress }}
                <span
                    @click="incrementEpisode"
                    v-if="currentEpisode != episodes"
                    class="anime__progress--add"
                >
                    &#43;</span
                >
            </p>
            <p class="anime__type">{{ type }}</p>
        </div>
        <div @click="deleteEntry" class="anime__trash">
            <i class="fa fa-trash" aria-hidden="true"></i>
        </div>
    </div>
</template>

<script>
import AnimeEditModal from '@/components/UserList/AnimeEditModal'

export default {
    props: {
        coverUrl: String,
        title: String,
        score: Number,
        progress: String,
        type: String,
    },
    components: {
        AnimeEditModal,
    },
    data() {
        return {
            editMode: false,
        }
    },
    computed: {
        currentEpisode() {
            return this.progress.slice(0, this.progress.split('').indexOf('/'))
        },
        episodes() {
            return this.progress.slice(
                this.progress.split('').indexOf('/') + 1,
                this.progress.length
            )
        },
    },
    methods: {
        deleteEntry() {
            this.$store.dispatch('removeEntry', this.title)
        },
        incrementEpisode() {
            if (this.$route.params.username != this.$store.getters.userName) {
                return
            }
            this.$store.commit('incrementEpisode', this.title)
            this.$store.dispatch('updateUserList')
        },
    },
}
</script>

<style lang="scss" scoped>
.anime {
    position: relative;
    padding: 0.5rem 3rem;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: var(--color-text-100);

    &:hover {
        background: var(--color-primary);
        color: white;
    }

    p:not(&__title) {
        width: 8rem;
        text-align: center;
    }
    &:hover &__trash {
        display: inline;
        cursor: pointer;
    }
    &__trash {
        position: absolute;
        right: 2rem;
        color: white;
        display: none;
    }
    &__left,
    &__right {
        display: flex;
        align-items: center;
    }
    &__left:not(:first-child),
    &__right:not(:first-child) {
        margin-left: 2rem;
    }
    &__edit {
        cursor: pointer;
        display: none;
    }
    &__cover-container {
        flex-shrink: 0;
        width: 4rem;
        height: 4rem;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    &__cover-container--hovering {
        display: none;
    }
    &__cover,
    &__cover--big {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
        border-radius: 0.5rem;
    }
    &:hover &__cover {
        display: none;
    }
    &:hover &__edit {
        display: block;
    }
    &:hover &__cover-container--hovering {
        display: block;
        position: absolute;
        left: -12rem;
        top: 0;
        width: 11rem;
        height: 15rem;
    }
    &:hover &__progress--add {
        display: inline;
        cursor: pointer;
    }
    &__title {
        font-weight: 300;
        margin-left: 2rem;
        width: 100%;
        cursor: pointer;
    }
    &__score,
    &__progress,
    &__type {
        font-weight: 300;
    }
    &__progress {
        &--add {
            display: none;
        }
    }
    @media (max-width: 1200px) {
        &:hover &__cover-container--hovering {
            display: none;
        }
    }
    @media (max-width: 700px) {
        * {
            font-size: 1.2rem;
        }
        p:not(&__title) {
            width: 5rem;
        }
    }
}
</style>
