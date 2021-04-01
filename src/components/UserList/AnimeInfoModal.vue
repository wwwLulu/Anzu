<template>
    <div class="modal">
        <div @click="$emit('closeModal')" class="modal__backdrop"></div>
        <base-spinner v-if="!finishedLoading"></base-spinner>
        <div v-else class="modal__info">
            <div class="modal__cover-container">
                <img :src="coverUrl" alt="" class="modal__cover" />
            </div>
            <div class="modal__stats">
                <p class="modal__title">{{ title }}</p>
                <p class="modal__type">{{ type }}</p>
                <p class="modal__averageScore">
                    Average Score:
                    <span class="modal__score">{{ averageScore / 10 }}</span>
                </p>
                <div class="modal__genres">
                    <span
                        v-for="genre in genres"
                        :key="genre"
                        class="modal__genre"
                    >
                        {{ genre }}
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        coverUrl: String,
        title: String,
        averageScore: Number,
        type: String,
        genres: Array,
    },
    emits: ['closeModal'],
    data() {
        return {
            finishedLoading: this.averageScore == null ? false : true,
        }
    },
    watch: {
        averageScore() {
            this.finishedLoading = true
        },
    },
}
</script>

<style lang="scss" scoped>
.modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--color-text-100);
    font-weight: 300;
    &__backdrop {
        z-index: 10000;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.6);
    }
    &__info {
        z-index: 20000;
        padding: 1rem;
        background: var(--color-list-background);
        border-radius: 0.5rem;
        max-width: 35rem;

        display: flex;
    }
    &__cover-container {
        flex-shrink: 0;
        width: 10rem;
        height: 14rem;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    &__cover {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
        border-radius: 0.5rem;
    }
    &__score,
    &__title {
        font-weight: 400;
    }
    &__score {
        margin-left: 0.5rem;
    }
    &__stats {
        margin-left: 1rem;
        font-size: 1.4rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    &__genre {
        display: inline-block;
        font-size: 1.2rem;
        border-radius: 0.5rem;
        margin-right: 0.5rem;
        margin-bottom: 0.5rem;
        padding: 0.5rem;
        background: var(--color-primary);
        color: white;
    }
}
</style>
