import { createStore } from 'vuex'

import userList from '@/store/userList'

const store = createStore({
    modules: {
        userList,
    },
    state() {
        return {
            userId: localStorage.getItem('userId') || null,
            userAvatar: localStorage.getItem('userAvatar') || null,
            userName: localStorage.getItem('userName') || null,
            validSignup: true,
            token: localStorage.getItem('token') || null,
            tokenExpiration: localStorage.getItem('tokenExpiration') || null,
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
        token(state) {
            return state.token
        },
        isAuthenticated(state) {
            return !!state.token
        },
    },
    actions: {
        async login(context, payload) {
            const res = await fetch(
                'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDdzxxUEoKDQ_YuHQkKUgViBdVqxYarZIM',
                {
                    method: 'POST',
                    body: JSON.stringify({
                        email: payload.email,
                        password: payload.password,
                        returnSecureToken: true,
                    }),
                }
            )
            const data = await res.json()
            const userId = data.localId
            if (!res.ok) {
                const error = new Error(
                    data.message || 'Failed to authenticate.'
                )
                throw error
            }
            const res2 = await fetch(
                `https://anime-list-e4360-default-rtdb.firebaseio.com/userInfo/${userId}.json`
            )
            if (!res2.ok) {
                const error = new Error(
                    data.message || 'Failed to fetch user info'
                )
                throw error
            }
            const userInfoObj = await res2.json()
            context.commit('setUser', {
                token: data.idToken,
                userId: data.localId,
                tokenExpiration: data.expiresIn,
                username: userInfoObj.userName,
            })
        },
        async signUp(context, payload) {
            await context.dispatch('checkUserValid', payload.username)
            if (!context.state.validSignup) {
                alert('username taken')
                return
            }
            const res = await fetch(
                'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDdzxxUEoKDQ_YuHQkKUgViBdVqxYarZIM',
                {
                    method: 'POST',
                    body: JSON.stringify({
                        email: payload.email,
                        password: payload.password,
                        returnSecureToken: true,
                    }),
                }
            )
            const data = await res.json()
            if (!res.ok) {
                const error = new Error(
                    data.message || 'Failed to authenticate'
                )
                throw error
            }
            context.commit('setUser', {
                token: data.idToken,
                userId: data.localId,
                tokenExpiration: data.expiresIn,
                username: payload.username.toLowerCase(),
            })
            await context.dispatch('updateUserInfo')
        },
        async checkUserValid(context, username) {
            context.state.validSignup = true
            const res = await fetch(
                `https://anime-list-e4360-default-rtdb.firebaseio.com/userInfo/.json`
            )
            if (!res.ok) {
                console.log('Could not fetch data from db')
            }
            const data = await res.json()
            console.log(data)
            for (const key in data) {
                if (!!data[key].userName == false) {
                    continue
                }
                if (
                    data[key].userName.toLowerCase() == username.toLowerCase()
                ) {
                    console.log(data[key].userName)
                    context.state.validSignup = false
                }
            }
        },
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
        async getUserInfo(context, userName = context.getters.userName) {
            const res = await fetch(
                `https://anime-list-e4360-default-rtdb.firebaseio.com/userInfo.json`
            )
            const userInfoObj = await res.json()
            if (!res.ok) {
                console.log('Error getting data from DB')
            }
            for (const key in userInfoObj) {
                if (userInfoObj[key].userName == userName) {
                    context.state.userListName = userName
                    context.state.userListAvatar = userInfoObj[key].userAvatar
                }
            }
        },
    },
    mutations: {
        setUser(state, payload) {
            state.token = payload.token
            state.userId = payload.userId
            state.tokenExpiration = payload.tokenExpiration
            state.userName = payload.username
            state.userAvatar =
                'https://64.media.tumblr.com/c21f4646a575e54c0ae0fa0f5053c023/tumblr_oeff7f2Pcd1ubcx5fo4_250.png'
            localStorage.setItem('token', payload.token)
            localStorage.setItem('userId', payload.userId)
            localStorage.setItem('tokenExpiration', payload.tokenExpiration)
            localStorage.setItem('userName', payload.username)
            localStorage.setItem(
                'userAvatar',
                'https://64.media.tumblr.com/c21f4646a575e54c0ae0fa0f5053c023/tumblr_oeff7f2Pcd1ubcx5fo4_250.png'
            )
        },
    },
})

export default store
