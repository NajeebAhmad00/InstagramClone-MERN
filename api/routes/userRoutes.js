const router = require('express').Router()
const jwt = require('jsonwebtoken')
const CryptoJS = require('crypto-js')

const User = require('../models/userModel')
const { verifyToken, verifyTokenAndAuthorization } = require('./verifyToken')

// REGISTER
router.post('/register', async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        fullName: req.body.fullName,
        confirmationCode: req.body.code,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString()
    })

    try {
        const savedUser = await newUser.save()
        const accessToken = jwt.sign({
            id: savedUser._id
        }, process.env.JWT_SEC, { expiresIn: '3d' })

        const { password, confirmationCode, ...others } = savedUser._doc
        res.status(201).json({ ...others, accessToken })
    } catch (err) {
        res.status(403).json(err)
    }
})

// LOGIN
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })

        if (!user) {
            return res.status(401).json('Username or password is incorrect')
        }

        const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC)
        const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8)

        if (OriginalPassword !== req.body.password) {
            return res.status(401).json('Username or password is incorrect')
        }

        const accessToken = jwt.sign({
            id: user._id
        }, process.env.JWT_SEC, { expiresIn: '3d' })
        const { password, ...others } = user._doc

        res.status(200).json({ ...others, accessToken })
    } catch (err) {
        res.status(403).json(err)
    }
})

// UPDATE USER
router.put('/:id', verifyTokenAndAuthorization, async (req, res) => {
    if (req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString()
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true })
        res.status(200).json(updatedUser)
    } catch (err) {
        res.status(500).json(err)
    }
})

// DELETE USER
router.delete('/:id', verifyTokenAndAuthorization, async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json('User has been deleted successfully')
    } catch (err) {
        res.status(500).json(err)
    }
})

// GET ALL USERS
router.get('/find', verifyToken, async (req, res) => {
    try {
        const users = await User.find()
        let usersList = []

        users.map(u => {
            const { password, ...others } = u._doc
            usersList.push(others)
        })
        const activeUsers = usersList.filter(user => user.isActive)

        if (!res.headersSent) {
            res.status(200).json(activeUsers)
        }
    } catch (err) {
        if (!res.headersSent) {
            res.status(500).json(err)
        }
    }
})

// GET A USER
router.get('/find/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate({
            path: 'followers',
            select: '_id fullName isCelebrity username profileImg'
        }).populate({
            path: 'following',
            select: '_id fullName isCelebrity username profileImg'
        })
        const { password, isActive, ...others } = user._doc

        res.status(200).json(others)
    } catch (err) {
        res.status(500).json(err)
    }
})

// FOLLOW A USER
router.put('/:id/follow', verifyToken, async (req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id)
            const currentUser = await User.findById(req.body.userId)

            if (!user.followers.includes(req.body.userId)) {
                const followedUser = await user.updateOne({ $push: { followers: req.body.userId } })
                await currentUser.updateOne({ $push: { following: req.params.id } })
                res.status(200).json(followedUser)
            } else {
                res.json('You already follow this user')
            }
        } catch (err) {
            res.json(err)
        }
    } else {
        res.status(403).json("You can't follow yourself")
    }
})

// UNFOLLOW A USER
router.put('/:id/unfollow', verifyToken, async (req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if (user.followers.includes(req.body.userId)) {
                const unfollowedUser = await user.updateOne({ $pull: { followers: req.body.userId } });
                await currentUser.updateOne({ $pull: { following: req.params.id } })
                res.status(200).json(unfollowedUser)
            } else {
                res.json('You dont follow this user')
            }
        } catch (err) {
            res.json(err)
        }
    } else {
        res.status(403).json('You cant unfollow yourself')
    }
})

module.exports = router