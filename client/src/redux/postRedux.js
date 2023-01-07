import { createSlice } from '@reduxjs/toolkit'

const postSlice = createSlice({
    name: 'post',
    initialState: {
        isFetching: false,
        isLoading: false,
        loadingLike: false,
        loadingComment: false,
        posts: [],
        post: {},
        error: false
    },
    reducers: {
        getPostsStart: (state) => {
            state.isFetching = true
            state.posts = []
            state.error = false
        },
        getPostsSuccess: (state, action) => {
            state.isFetching = false
            state.posts = action.payload
        },
        getPostsFailure: (state, action) => {
            state.isFetching = false
            state.error = action.payload
        },
        getPostStart: (state) => {
            state.isLoading = true
            state.post = {}
            state.error = false
        },
        getPostSuccess: (state, action) => {
            state.isLoading = false
            state.post = action.payload
        },
        getPostFailure: (state, action) => {
            state.isLoading = false
            state.error = action.payload
        },
        likeStart: (state) => {
            state.loadingLike = true
            state.error = false
        },
        likeSuccess: (state, action) => {
            state.loadingLike = false
            state.post.likes = action.payload.likes
        },
        likeFailure: (state, action) => {
            state.loadingLike = false
            state.error = action.payload
        },
        addCommentStart: (state) => {
            state.loadingComment = true
            state.error = false
        },
        addCommentSuccess: (state, action) => {
            state.loadingComment = false
            state.post.comments = action.payload.comments
        },
        addCommentFailure: (state, action) => {
            state.loadingComment = false
            state.error = action.payload
        },
        deleteCommentStart: (state) => {
            state.loadingComment = true
            state.error = false
        },
        deleteCommentSuccess: (state, action) => {
            state.loadingComment = false
            state.post.comments = action.payload
        },
        deleteCommentFailure: (state, action) => {
            state.loadingComment = false
            state.error = action.payload
        },
        resetPosts: (state) => {
            state.posts = []
            state.post = {}
        },
        getFeedStart: (state) => {
            state.isFetching = true
            state.error = false
        },
        getFeedSuccess: (state, action) => {
            state.isFetching = false
            state.posts = action.payload
        },
        getFeedFailure: (state, action) => {
            state.isFetching = false
            state.error = action.payload
        },
        likePostsStart: (state) => {
            state.loadingLike = true
            state.error = false
        },
        likePostsSuccess: (state, action) => {
            state.loadingLike = false
            state.posts.find(post => post._id === action.payload._id).likes = action.payload.likes
        },
        likePostsFailure: (state, action) => {
            state.loadingLike = false
            state.error = action.payload
        },
        addCommentsStart: (state) => {
            state.loadingComment = true
            state.error = false
        },
        addCommentsSuccess: (state, action) => {
            state.loadingComment = false
            state.posts.find(post => post._id === post._id).comments = action.payload.comments
        },
        addCommentsFailure: (state, action) => {
            state.loadingComment = false
            state.error = action.payload
        }
    }
})

export const {
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
    resetPosts,
    likePostsStart,
    likePostsSuccess,
    likePostsFailure,
    addCommentsStart,
    addCommentsSuccess,
    addCommentsFailure
} = postSlice.actions
export default postSlice.reducer