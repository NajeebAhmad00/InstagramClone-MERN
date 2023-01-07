import {
    loginStart,
    loginSuccess,
    loginFailure,
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
} from './userRedux'
import {
    getPostsStart,
    getPostsSuccess,
    getPostsFailure,
    getPostStart,
    getPostSuccess,
    getPostFailure,
    likeStart,
    likeSuccess,
    likeFailure,
    addCommentStart,
    addCommentSuccess,
    addCommentFailure,
    deleteCommentStart,
    deleteCommentSuccess,
    deleteCommentFailure,
    getFeedStart,
    getFeedSuccess,
    getFeedFailure,
    likePostsStart,
    likePostsSuccess,
    likePostsFailure,
    addCommentsStart,
    addCommentsSuccess,
    addCommentsFailure
} from './postRedux'
import { publicRequest, userRequest } from '../requestMethods'

export const login = async (dispatch, user) => {
    dispatch(loginStart())

    try {
        const { data } = await publicRequest.post('/users/login', user)
        dispatch(loginSuccess(data))
    } catch (err) {
        dispatch(loginFailure(err))
    }
}

export const registerUser = async (dispatch, user) => {
    dispatch(registerStart())

    try {
        const { data } = await publicRequest.post('/users/register', user)
        dispatch(registerSuccess(data))
    } catch (err) {
        dispatch(registerFailure(err))
    }
}

export const updateUser = async (dispatch, id, user) => {
    dispatch(updateUserStart())

    try {
        const { data } = await userRequest.put(`/users/${id}`, user)
        dispatch(updateUserSuccess(data))
    } catch (err) {
        dispatch(updateUserFailure(err))
    }
}

export const getUsers = async (dispatch) => {
    dispatch(getUsersStart())

    try {
        const { data } = await userRequest.get('/users/find')
        dispatch(getUsersSuccess(data))
    } catch (err) {
        dispatch(getUsersFailure(err))
    }
}

export const getUser = async (dispatch, id) => {
    dispatch(getUserStart())

    try {
        const { data } = await publicRequest.get(`/users/find/${id}`)
        dispatch(getUserSuccess(data))
    } catch (err) {
        dispatch(getUserFailue())
    }
}

export const followUser = async (dispatch, id, userId) => {
    dispatch(followUserStart())

    try {
        const { data } = await userRequest.put(`/users/${id}/follow`, userId)
        dispatch(followUserSuccess(data))
    } catch (er) {
        dispatch(followUserFailure(err))
    }
}

export const getPosts = async (dispatch, userId) => {
    dispatch(getPostsStart())

    try {
        const { data } = await publicRequest.get(`/posts/profile/${userId}`)
        dispatch(getPostsSuccess(data))
    } catch (err) {
        dispatch(getPostsFailure(err))
    }
}

export const getPost = async (dispatch, postId) => {
    dispatch(getPostStart())

    try {
        const { data } = await publicRequest.get(`/posts/${postId}`)
        dispatch(getPostSuccess(data))
    } catch (err) {
        dispatch(getPostFailure(err))
    }
}

export const likePost = async (dispatch, postId, user) => {
    dispatch(likeStart())

    try {
        const { data } = await userRequest.put(`/posts/${postId}/like`, user)
        dispatch(likeSuccess(data))
    } catch (err) {
        dispatch(likeFailure(err))
    }
}

export const addComment = async (dispatch, postId, comment) => {
    dispatch(addCommentStart())

    try {
        const { data } = await userRequest.post(`/posts/${postId}/comments`, comment)
        dispatch(addCommentSuccess(data))
    } catch (err) {
        dispatch(addCommentFailure(err))
    }
}

export const deleteComment = async (dispatch, postId, commentId, user) => {
    dispatch(deleteCommentStart())

    try {
        const { data } = await userRequest.delete(`/posts/${postId}/comments/${commentId}`, user)
        dispatch(deleteCommentSuccess(data))
    } catch (err) {
        deleteCommentFailure(err)
    }
}

export const getFeed = async (dispatch, id) => {
    dispatch(getFeedStart())

    try {
        const { data } = await publicRequest.get(`/posts/feed/${id}`)
        dispatch(getFeedSuccess(data))
    } catch (err) {
        dispatch(getFeedFailure(err))
    }
}

export const likePosts = async (dispatch, id, user) => {
    dispatch(likePostsStart())

    try {
        const { data } = await userRequest.put(`/posts/${id}/like`, user)
        dispatch(likePostsSuccess(data))
    } catch (err) {
        dispatch(likePostsFailure(err))
    }
}

export const addComments = async (dispatch, postId, comment) => {
    dispatch(addCommentsStart())

    try {
        const { data } = await userRequest.post(`/posts/${postId}/comments`, comment)
        dispatch(addCommentsSuccess(data))
    } catch (err) {
        dispatch(addCommentsFailure(err))
    }
}