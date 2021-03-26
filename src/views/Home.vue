<template>
    <div class="home">
        <!-- <div class="home__background"></div> -->
        <LoginSignup />
    </div>
</template>

<script>
import LoginSignup from '@/components/Auth/LoginSignup'

export default {
    components: {
        LoginSignup,
    },
}
</script>

<style lang="scss" scoped>
.home {
    &__background {
        position: fixed;
        z-index: -1;
        top: -20px;
        left: -20px;
        bottom: -20px;
        right: -20px;
        background-image: url('https://images.pexels.com/photos/6249543/pexels-photo-6249543.jpeg?cs=srgb&dl=pexels-ryutaro-tsukata-6249543.jpg&fm=jpg');
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
        filter: blur(8px);
    }
}
</style>
