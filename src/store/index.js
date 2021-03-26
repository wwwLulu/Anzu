import { createStore } from 'vuex'

import userList from '@/store/userList'

const store = createStore({
    modules: {
        userList,
    },
    state() {
        return {
            userId: 'c3',
            userAvatar: '',
            userName: '',
        }
    },
    getters: {
        userId(state) {
            return state.userId
        },
        userAvatar(state) {
            return state.userAvatar
        },
        userName(state) {
            return state.userName
        },
    },
    actions: {
        async updateUserInfo(context) {
            const userName = context.getters.userName
            const userAvatar = context.getters.userAvatar
            const userId = context.getters.userId
            const res = await fetch(
                `https://anime-list-e4360-default-rtdb.firebaseio.com/userInfo/${userId}.json`,
                {
                    method: 'PUT',
                    body: JSON.stringify({
                        userName,
                        userAvatar,
                        userId,
                    }),
                }
            )
            if (!res.ok) {
                console.log('Error inserting data into DB')
            }
        },
        async getUserInfo(context) {
            const res = await fetch(
                `https://anime-list-e4360-default-rtdb.firebaseio.com/userInfo/${context.state.userId}.json`
            )
            const userInfoObj = await res.json()
            if (!res.ok) {
                console.log('Error getting data from DB')
            }
            context.state.userName = userInfoObj['userName']
            context.state.userAvatar = userInfoObj['userAvatar']
        },
    },
})

export default store
