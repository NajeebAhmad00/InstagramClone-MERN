import { createSlice } from '@reduxjs/toolkit'
import { resetPosts } from './postRedux'

const userSlice = createSlice({
    name: 'user',
    initialState: {
        currentUser: null,
        isFetching: false,
        isLoading: false,
        error: false,
        users: [],
        oneUser: {}
    },
    reducers: {
        loginStart: (state) => {
            state.isFetching = true
            state.error = false
            state.currentUser = null
        },
        loginSuccess: (state, action) => {
            state.isFetching = false
            state.currentUser = action.payload
        },
        loginFailure: (state, action) => {
            state.isFetching = false
            state.error = action.payload
        },
        logout: (state, action) => {
            state.currentUser = null
            state.isFetching = false
            state.error = false
            state.isLoading = false
            state.users = []
            state.oneUser = {}
            resetPosts()
        },
        registerStart: (state) => {
            state.isFetching = true
            state.currentUser = null
            state.error = false
        },
        registerSuccess: (state, action) => {
            state.isFetching = false
            state.currentUser = action.payload
        },
        registerFailure: (state, action) => {
            state.isFetching = false
            state.error = action.payload
        },
        updateUserStart: (state) => {
            state.isFetching = true
            state.error = false
        },
        updateUserSuccess: (state, action) => {
            state.isFetching = false
            state.currentUser = action.payload
        },
        updateUserFailure: (state, action) => {
            state.isFetching = false
            state.error = action.payload
        },
        getUsersStart: (state) => {
            state.isFetching = true
            state.users = []
            state.error = false
        },
        getUsersSuccess: (state, action) => {
            state.isFetching = false
            state.users = action.payload
        },
        getUsersFailure: (state, action) => {
            state.isFetching = true
            state.error = action.payload
        },
        getUserStart: (state) => {
            state.isFetching = true
            state.error = false
            state.oneUser = {}
        },
        getUserSuccess: (state, action) => {
            state.isFetching = false
            state.oneUser = action.payload
        },
        getUserFailue: (state, action) => {
            state.isFetching = false
            state.error = action.payload
        },
        followUserStart: (state) => {
            state.isLoading = true
            state.error = false
        },
        followUserSuccess: (state, action) => {
            state.isLoading = false
            state.currentUser.following = action.payload.following
            state.oneUser.followers = action.payload.followers
        },
        followUserFailure: (state, action) => {
            state.isLoading = false
            state.error = action.payload
        }
    }
})

export const {
    loginStart,
    loginSuccess,
    loginFailure,
    logout,
    registerStart,
    registerSuccess,
    registerFailure,
    updateUserStart,
    updateUserSuccess,
    updateUserFailure,
    getUsersStart,
    getUsersSuccess,
    getUsersFailure,
    getUserStart,
    getUserSuccess,
    getUserFailue,
    followUserStart,
    followUserSuccess,
    followUserFailure
} = userSlice.actions
export default userSlice.reducer