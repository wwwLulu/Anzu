<template>
    <div class="user">
        <div class="user__avatar-container">
            <img :src="userImgUrl" alt="avatar" class="user__avatar" />
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
}
</script>

<style lang="scss" scoped>
.user {
    margin-top: 3rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
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
