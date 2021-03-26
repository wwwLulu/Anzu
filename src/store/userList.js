export default {
    // namespaced: true,
    state() {
        return {
            animeList: [],
        }
    },
    getters: {
        watchingList(state) {
            return state.animeList.filter(
                (anime) =>
                    anime.episodes > anime.episodeOn && anime.episodeOn > 1
            )
        },
        completedList(state) {
            return state.animeList.filter(
                (anime) => anime.episodes <= anime.episodeOn
            )
        },
        planToWatchList(state) {
            return state.animeList.filter((anime) => anime.episodeOn <= 1)
        },
        animeList(state) {
            return state.animeList
        },
    },
    mutations: {
        fetchUserList(state, userList) {
            state.animeList = userList
        },
        updateScore(state, { title, newScore }) {
            state.animeList.forEach((anime) => {
                if (anime.title == title) {
                    anime.score = +newScore
                }
            })
        },
        updateProgress(state, { title, episode }) {
            state.animeList.forEach((anime) => {
                if (anime.title == title) {
                    anime.episodeOn = +episode
                }
            })
        },
        incrementEpisode(state, title) {
            state.animeList.forEach((anime) => {
                if (anime.title == title && anime.episodeOn != anime.episodes) {
                    anime.episodeOn++
                }
            })
        },
        sortUserList(state, method) {
            if (method == 'score') {
                state.animeList.sort((a, b) => b.score - a.score)
            } else {
                state.animeList.sort((a, b) => a.title > b.title)
            }
        },
        sortByTitleAZ(state) {
            state.animeList.sort((a, b) => a.title > b.title)
        },
        sortByTitleZA(state) {
            state.animeList.sort((a, b) => a.title < b.title)
        },
        sortByScoreAsc(state) {
            state.animeList.sort((a, b) => a.score - b.score)
        },
        sortByScoreDesc(state) {
            state.animeList.sort((a, b) => b.score - a.score)
        },
    },
    actions: {
        async getUserList(context) {
            const userName = context.rootGetters.userName
            const res = await fetch(
                `https://anime-list-e4360-default-rtdb.firebaseio.com/userlist/${userName}.json`
            )
            const userListObj = await res.json()
            const userList = []

            for (const key in userListObj) {
                const animeEntry = {
                    title: userListObj[key].title,
                    score: userListObj[key].score,
                    episodes: userListObj[key].episodes,
                    episodeOn: userListObj[key].episodeOn,
                    coverUrl: userListObj[key].coverUrl,
                    type: userListObj[key].type,
                }
                userList.push(animeEntry)
            }
            context.commit('fetchUserList', userList)
        },
        async updateUserList(context) {
            const userName = context.rootGetters.userName
            const response = await fetch(
                `https://anime-list-e4360-default-rtdb.firebaseio.com/userlist/${userName}.json`,
                {
                    method: 'PUT',
                    body: JSON.stringify(context.getters.animeList),
                }
            )
            if (!response.ok) {
                console.log('Error inserting data into DB')
            }
        },
    },
}
