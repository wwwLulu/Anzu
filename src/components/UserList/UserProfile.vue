<template>
    <div class="user">
        <div class="user__avatar-container">
            <!-- <img :src="userImgUrl" alt="avatar" class="user__avatar" /> -->
            <img class="user__avatar" src="https://placewaifu.com/image/200" />
        </div>
        <p class="user__name">{{ username }}</p>
    </div>
</template>

<script>
export default {
    props: {
        userImgUrl: String,
        username: String,
    },
    components: {},
}
</script>

<style lang="scss" scoped>
.user {
    width: 100%;
    height: 100%;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    @media (min-width: 1050px) {
        margin-top: 4rem;
    }
    @media (min-width: 700px) {
        html {
            font-size: 50%;
        }
    }
    &__avatar-container {
        width: 12.5rem;
        height: 12.5rem;
        border-radius: 50%;
    }
    &__avatar {
        border-radius: inherit;
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
    }
    &__name {
        margin: 1rem;
        color: var(--color-text-100);
        font-size: 1.8rem;
        font-weight: 300;
    }
}
</style>
