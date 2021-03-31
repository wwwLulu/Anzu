<template>
    <div class="modal">
        <div @click="saveAndClose" class="modal__backdrop"></div>
        <div class="modal__info">
            <div class="modal__cover-container">
                <img :src="coverUrl" alt="" class="modal__cover" />
            </div>
            <div class="modal__edit">
                <div class="modal__input">
                    <label for="score">Score: </label>
                    <input
                        type="number"
                        max="10"
                        step="0.5"
                        min="0"
                        :value="score"
                        ref="score"
                    />
                </div>
                <div class="modal__input">
                    <label for="progress">Progress: </label>
                    <input
                        type="number"
                        :max="episodes"
                        min="0"
                        step="1"
                        :value="currentEpisode"
                        ref="progress"
                    />
                    <span> / {{ episodes }}</span>
                </div>
                <div class="modal__input">
                    <label for="checkbox">Completed: </label>
                    <input
                        v-if="currentEpisode != episodes"
                        @click="toggleCompleted"
                        :value="completed"
                        type="checkbox"
                        name="checkbox"
                        ref="checkbox"
                    />
                    <input
                        v-else
                        @click="toggleCompleted"
                        :value="completed"
                        type="checkbox"
                        name="checkbox"
                        ref="checkbox"
                        checked
                        disabled
                    />
                </div>
                <button @click="saveAndClose" class="modal__save">Save</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        coverUrl: String,
        title: String,
        score: Number,
        progress: String,
        type: String,
    },
    emits: ['closeModal'],
    data() {
        return {
            completed: false,
        }
    },
    watch: {
        currentEpisode() {
            if (this.currentEpisode < this.episodes) {
                this.completed = false
            }
        },
    },
    computed: {
        currentEpisode() {
            return this.completed
                ? this.episodes
                : this.progress.slice(0, this.progress.split('').indexOf('/'))
        },
        episodes() {
            return this.progress.slice(
                this.progress.split('').indexOf('/') + 1,
                this.progress.length
            )
        },
    },
    methods: {
        toggleCompleted() {
            this.completed = !this.completed
        },
        saveAndClose() {
            if (this.$route.params.username != this.$store.getters.userName) {
                this.$emit('closeModal')
                return
            }
            this.$store.commit('updateProgress', {
                title: this.title,
                episode: this.completed
                    ? this.episodes
                    : this.$refs.progress.value,
            })
            this.$store.commit('updateScore', {
                title: this.title,
                newScore: this.$refs.score.value,
            })
            this.$store.dispatch('updateUserList')
            this.$emit('closeModal')
        },
    },
}
</script>

<style lang="scss" scoped>
.modal {
    z-index: 20000;
    position: fixed;
    background: rgba(0, 0, 0, 0.6);
    color: var(--color-text-100);
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'Lato', sans-serif;
    &__save {
        cursor: pointer;
        background: var(--color-primary);
        color: white;
        border: none;
        border-radius: 0.5rem;
        padding: 0.8rem 1.2rem;
        width: 100%;
        position: absolute;
        bottom: 0;
        left: 0;
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
    &__backdrop {
        z-index: 20500;
        position: fixed;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
    }
    &__edit {
        position: relative;
        font-weight: 300;
        margin-left: 1rem;
    }
    &__info {
        animation: fadeIn 0.4s ease-out forwards;
        padding: 1rem;
        z-index: 30000;
        display: flex;
        justify-content: center;
        background: var(--color-list-background);
        border-radius: 1rem;
        font-size: 1.4rem;
        max-width: 50rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
            0 4px 6px -2px rgba(0, 0, 0, 0.05);

        input {
            width: 6rem;
            border: none;
            text-align: center;
            font-size: 1.4rem;
            font-weight: 300;
            font-family: 'Lato', sans-serif;
        }
    }
    &__input {
        min-height: 3rem;
        border: none;
        text-align: left;
        font-size: 1.4rem;
        font-weight: 300;
        font-family: 'Lato', sans-serif;
    }
}
</style>
