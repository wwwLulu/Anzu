export default {
    // namespaced: true,
    state() {
        return {
            userListAvatar: null,
            userListName: null,
            animeList: [],
        }
    },
    getters: {
        userListAvatar(state) {
            return state.userListAvatar
        },
        userListName(state) {
            return state.userListName
        },
        watchingList(state) {
            return state.animeList.filter(
                (anime) =>
                    anime.episodes > anime.episodeOn && anime.episodeOn >= 1
            )
        },
        completedList(state) {
            return state.animeList.filter(
                (anime) => anime.episodes <= anime.episodeOn
            )
        },
        planToWatchList(state) {
            return state.animeList.filter((anime) => anime.episodeOn <= 0)
        },
        animeList(state) {
            return state.animeList
        },
    },
    mutations: {
        removeDuplicates(state) {
            state.animeList = state.animeList.filter(
                (v, i, a) => a.findIndex((t) => t.title === v.title) === i
            )
        },
        fetchUserList(state, userList) {
            state.animeList = userList
        },
        UpdateUserListName(state, username) {
            state.userListName = username
        },
        UpdateUserListAvatar(state, avatar) {
            state.userListAvatar = avatar
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
        async getUserList(context, userName = context.rootGetters.userName) {
            const res = await fetch(
                `https://anime-list-e4360-default-rtdb.firebaseio.com/userlist/${userName}.json`
            )
            const userListObj = await res.json()
            // if (!!userListObj == false) {
            //     await context.dispatch('updateUserList')
            // }
            let userList = []

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
            // if (userList.length == 0) {
            //     userList = []
            //     await context.dispatch('updateUserList')
            // }
            context.commit('fetchUserList', userList)
        },
        removeEntry(context, title) {
            context.state.animeList = context.state.animeList.filter(
                (anime) => anime.title != title
            )
            context.dispatch('updateUserList')
        },
        addEntry(context, title) {
            const animeList = context.getters.animeList
            const db = context.getters.db
            let anime = db.find((anime) => anime.title == title)
            animeList.push({
                title: anime.title,
                score: 0,
                episodes: anime.episodes,
                episodeOn: 0,
                coverUrl: anime.picture || anime.thumbnail,
                type: anime.type,
            })
            context.state.animeList = animeList
            context.dispatch('updateUserList')
        },
        async updateUserList(context) {
            const userName = context.getters.userName
            context.commit('removeDuplicates')
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
