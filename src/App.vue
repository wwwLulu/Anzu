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

    // --color-primary: #5349c0;
    // --color-background: #474747;
    // --color-list-background: rgb(34, 34, 34);
    // --color-text-100: rgba(255, 255, 255, 0.8);
}
html {
    scroll-behavior: smooth;
    font-size: 62.5%;
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
</style>
