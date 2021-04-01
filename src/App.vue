<template>
    <TheNavigation />
    <RouterView />
</template>

<script>
import TheNavigation from '@/components/Layout/TheNavigation'

export default {
    components: {
        TheNavigation,
    },
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Lato:wght@100;300;400;700;900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Fredoka+One&display=swap');

:root {
    --color-primary: #6a62c2;
    --color-background: #eaeaea;
    --color-list-background: white;
    --color-text-100: rgba(0, 0, 0, 0.6);
    // Dark Mode
    // --color-primary: #5349c0;
    // --color-background: #474747;
    // --color-list-background: rgb(34, 34, 34);
    // --color-text-100: rgba(255, 255, 255, 0.8);
}
html {
    scroll-behavior: smooth;
    font-size: 62.5%;
    @media (min-width: 1200px) {
        font-size: 70%;
    }
    @media (min-width: 1500px) {
        font-size: 85%;
    }
    @media (max-width: 600px) {
        font-size: 55%;
    }
    @media (min-width: 2000px) {
        font-size: 100%;
    }
}
* {
    box-sizing: border-box;
    margin: 0;
}
body {
    background: var(--color-background);
    max-width: 1925px;
    margin: 0 auto;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
        0 4px 6px -2px rgba(0, 0, 0, 0.05);
    min-height: 100vh;
    font-family: 'Lato', sans-serif;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: scale(0.97);
    }
    to {
        opacity: 1;
        transform: scale(1);
    }
}

@keyframes fall-bound {
    0% {
        transform: translateY(-200%) scaleX(1) scaleY(1);
        opacity: 0;
    }
    40% {
        transform: translateY(0%) scaleX(1.6) scaleY(0.8);
        opacity: 1;
    }
    50% {
        transform: translateY(-6%) scaleX(1) scaleY(1);
        opacity: 1;
    }
    60% {
        transform: translateY(0%) scaleX(1.3) scaleY(0.9);
        opacity: 1;
    }
    70% {
        transform: translateY(-3%) scaleX(1) scaleY(1);
        opacity: 1;
    }
    80% {
        transform: translateY(0%) scaleX(1.15) scaleY(0.95);
        opacity: 1;
    }
    90% {
        transform: translateY(-1.5%) scaleX(1) scaleY(1);
        opacity: 1;
    }
    100% {
        transform: translateY(0%) scaleX(1) scaleY(1);
        opacity: 1;
    }
}

@keyframes slide-in-from-left {
    0% {
        transform: translateX(-100%);
    }
    80% {
        transform: translateX(30%);
    }
    100% {
        transform: translateX(0);
    }
}
</style>
