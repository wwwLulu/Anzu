<template>
    <div class="row">
        <UserProfile
            class="col-4"
            :username="'wwwLulu'"
            :userImgUrl="'https://avatarfiles.alphacoders.com/262/262565.jpg'"
        />
        <section class="lists col-8">
            <AnimeList
                v-if="watchingList.length != 0"
                :type="'Watching'"
                :animeList="watchingList"
                @sortUserList="sortUserList"
            />
            <AnimeList
                v-if="completedList.length != 0"
                :type="'Completed'"
                :animeList="completedList"
                @sortUserList="sortUserList"
            />
            <AnimeList
                v-if="planToWatchList.length != 0"
                :type="'Planning'"
                :animeList="planToWatchList"
                @sortUserList="sortUserList"
            />
        </section>
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
            sortMethod: 'score',
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
                    score: 0,
                    episodes: 11,
                    episodeOn: 1,
                    coverUrl:
                        'https://cdn.myanimelist.net/images/anime/2/50023.jpg',
                    type: 'TV',
                },
                {
                    title: 'Little Witch Academia',
                    score: 7.5,
                    episodes: 24,
                    episodeOn: 11,
                    coverUrl:
                        'https://cdn.myanimelist.net/images/anime/13/83934.jpg',
                    type: 'TV',
                },
            ],
        }
    },
    mounted() {
        this.sortUserList(this.sortMethod)
    },
    computed: {
        watchingList() {
            return this.animeList.filter(
                (anime) =>
                    anime.episodes > anime.episodeOn && anime.episodeOn > 1
            )
        },
        completedList() {
            return this.animeList.filter(
                (anime) => anime.episodes <= anime.episodeOn
            )
        },
        planToWatchList() {
            return this.animeList.filter((anime) => anime.episodeOn <= 1)
        },
    },
    methods: {
        sortUserList(method) {
            if (method == 'score') {
                this.sortByScoreDesc()
            } else {
                this.sortByTitleAZ()
            }
        },
        sortByTitleAZ() {
            this.animeList.sort((a, b) => a.title > b.title)
        },
        sortByTitleZA() {
            this.animeList.sort((a, b) => a.title < b.title)
        },
        sortByScoreAsc() {
            this.animeList.sort((a, b) => a.score - b.score)
        },
        sortByScoreDesc() {
            this.animeList.sort((a, b) => b.score - a.score)
        },
    },
}
</script>

<style lang="scss" scoped>
.row {
    display: flex;
    flex-wrap: wrap;

    $columns: 12;

    [class^='col-'] {
        flex-basis: 100%;
    }

    @media (min-width: 1050px) {
        @for $i from 1 through $columns {
            .col-#{$i} {
                flex: 0 0 (100% / ($columns / $i));
            }
            .col-offset-#{$i} {
                margin-left: 100% / (($columns / $i));
            }
        }
    }
}

.lists {
    width: 100%;
    align-items: center;
    padding-bottom: 10rem;
    @media (max-width: 1050px) {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
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
        background: rgba(255, 255, 255, 0.5);
    }
}
</style>
