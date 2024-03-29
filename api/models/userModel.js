const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 6
    },
    profileImg: {
        type: String
    },
    isCelebrity: {
        type: Boolean,
        default: false
    },
    bio: {
        type: String
    },
    linkedIn: {
        type: String
    },
    facebook: {
        type: String
    },
    followers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    following: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    confirmationCode: {
        type: Number
    },
    isActive: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

module.exports = mongoose.model('User', userSchema)