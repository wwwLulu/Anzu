import { createStore } from 'vuex'

import userList from '@/store/userList'

const store = createStore({
    modules: {
        userList,
    },
    state() {
        return {
            userId: 'c3',
            userAvatar:
                'https://avatars.githubusercontent.com/u/77130682?s=460&u=091475bd4b0999c440f2f381f38dc307b79a021a&v=4',
            userName: 'wwwLulu',
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
    },
})

export default store
