const router = require('express').Router()
const Post = require('../models/postModel')
const User = require('../models/userModel')
const { verifyToken, verifyTokenAndAuthorization } = require('./verifyToken')

// Create a post
router.post('/', verifyToken, async (req, res) => {
    const newPost = new Post(req.body)

    try {
        const savedPost = await newPost.save()
        res.status(201).json(savedPost)
    } catch (err) {
        res.json(err)
    }
})

// Update post
router.put('/:id', verifyTokenAndAuthorization, async (req, res) => {
    try {
        const updatedPost = await Post.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true })
        res.status(200).json(updatedPost)
    } catch (err) {
        res.json(err)
    }
})

// Get user's posts
router.get('/profile/:userId', async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.userId })
        const posts = await Post.find({ author: user._id })
        res.status(200).json(posts)
    } catch (err) {
        res.json(err)
    }
})

// Get a post
router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate({
            path: 'author',
            select: '_id username profileImg isCelebrity'
        }).populate({
            path: 'likes',
            select: '_id username fullName profileImg isCelebrity'
        }).populate({
            path: 'comments',
            populate: {
                path: 'author',
                select: '_id username profileImg isCelebrity'
            }
        })
        res.status(200).json(post)
    } catch (err) {
        res.json(err)
    }
})

// Delete a post
router.delete('/:id', verifyTokenAndAuthorization, async (req, res) => {
    try {
        await Post.findByIdAndDelete(req.params.id)
        res.status(200).json('Post has been deleted successfully')
    } catch (err) {
        res.json(err)
    }
})

// Like/dislike a post
router.put('/:id/like', verifyTokenAndAuthorization, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)

        if (!post.likes.includes(req.body.userId)) {
            await post.updateOne({ $push: { likes: req.body.userId } })
            const updatedPost = await Post.findById(req.params.id).populate({
                path: 'likes',
                select: '_id username profileImg isCelebrity'
            })
            res.status(201).json(updatedPost.likes)
        } else {
            await post.updateOne({ $pull: { likes: req.body.userId } })
            const updatedPost = await Post.findById(req.params.id).populate({
                path: 'likes',
                select: '_id username profileImg isCelebrity'
            })
            res.status(200).json(updatedPost.likes)
        }
    } catch (err) {
        res.json(err)
    }
})

// Create comment
router.post('/:id/comments', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        const comment = req.body
        await post.comments.push(comment)
        await post.save()
        const postComments = await Post.findById(req.params.id).populate({
            path: 'comments',
            populate: {
                path: 'author',
                select: '_id username profileImg isCelebrity'
            }
        })
        const { comments } = postComments
        res.status(201).json(comments)
    } catch (err) {
        res.json(err)
    }
})

// Delete comment
router.delete('/:postId/comments/:commentId', verifyTokenAndAuthorization, async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId)
        const commentIndex = post.comments.findIndex(comment => comment._id == req.params.commentId)

        if (commentIndex === -1) {
            return res.status(404).json({ message: 'Comment not found' })
        }

        await post.comments.splice(commentIndex, 1)
        await post.save()

        const postComments = await Post.findById(req.params.postId).populate({
            path: 'comments',
            populate: {
                path: 'author',
                select: '_id username isCelebrity profileImg'
            }
        })

        res.status(200).json(postComments.comments)
    } catch (err) {
        res.json(err)
    }
})

module.exports = router