<template>
    <UserProfile
        :username="'wwwLulu'"
        :userImgUrl="'https://avatarfiles.alphacoders.com/262/262565.jpg'"
    />
    <div class="container">
        <AnimeList
            :type="'Watching'"
            :animeList="
                animeList.filter(
                    (anime) =>
                        anime.episodes > anime.episodeOn && anime.episodeOn > 1
                )
            "
        />
        <AnimeList
            :type="'Completed'"
            :animeList="
                animeList.filter((anime) => anime.episodes <= anime.episodeOn)
            "
        />
        <AnimeList
            :type="'Plan To Watch'"
            :animeList="animeList.filter((anime) => anime.episodeOn <= 1)"
        />
    </div>
</template>

<script>
import AnimeList from '@/components/AnimeList'
import UserProfile from '@/components/UserProfile'

export default {
    components: {
        AnimeList,
        UserProfile,
    },
    data() {
        return {
            animeList: [
                {
                    title: 'Mushoku Tensei: Isekai Ittara Honki Dasu',
                    score: 8,
                    episodes: 24,
                    episodeOn: 12,
                    coverUrl:
                        'https://cdn.myanimelist.net/images/anime/1068/111129.jpg',
                    type: 'TV',
                },
                {
                    title: 'Made In Abyss',
                    score: 10,
                    episodes: 13,
                    episodeOn: 13,
                    coverUrl:
                        'https://cdn.myanimelist.net/images/anime/6/86733.webp',
                    type: 'TV',
                },
                {
                    title: 'Ore no Imouto ga Konnani Kawaii Wake ga Nai',
                    score: 8,
                    episodes: 12,
                    episodeOn: 12,
                    coverUrl:
                        'https://cdn.myanimelist.net/images/anime/8/24875.jpg',
                    type: 'TV',
                },
                {
                    title: 'Anohana.',
                    score: 9,
                    episodes: 11,
                    episodeOn: 11,
                    coverUrl:
                        'https://cdn.myanimelist.net/images/anime/5/79697.jpg',
                    type: 'TV',
                },
                {
                    title: 'Barakamon',
                    score: 8.5,
                    episodes: 11,
                    episodeOn: 11,
                    coverUrl:
                        'https://cdn.myanimelist.net/images/anime/12/65427.jpg',
                    type: 'TV',
                },
                {
                    title: 'Katanagatari',
                    episodes: 11,
                    episodeOn: 1,
                    coverUrl:
                        'https://cdn.myanimelist.net/images/anime/2/50023.jpg',
                    type: 'TV',
                },
            ],
        }
    },
    mounted() {
        // this.sortByTitleAZ()
        this.sortByScoreAsc()
    },
    methods: {
        sortByTitleAZ() {
            this.animeList = this.animeList.sort((a, b) => a.title > b.title)
        },
        sortByTitleZA() {
            this.animeList = this.animeList.sort((a, b) => a.title < b.title)
        },
        sortByScoreDesc() {
            this.animeList = this.animeList.sort((a, b) => a.score - b.score)
        },
        sortByScoreAsc() {
            this.animeList = this.animeList.sort((a, b) => b.score - a.score)
        },
    },
}
</script>

<style lang="scss" scoped>
.container {
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-bottom: 10rem;
}
.background {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    background-image: url('https://i.redd.it/mtti5nldvlr51.png');
    background-size: cover;
    background-position: center;
    background-repeat: none;
    filter: blur(8px);
    &::after {
        content: '';
        position: fixed;
        top: -20px;
        left: -20px;
        right: -20px;
        bottom: -20px;
        background: rgba(0, 0, 0, 0.5);
    }
}
</style>
