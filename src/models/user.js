const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String
    },
    avatar: {
        type: String
    },
    bio: {
        type: String
    },
    phone: {
        type: String
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isPublic: {
        type: Boolean,
        default: true
    },
    googleId: {
        type: String
    },
    googleToken: {
        type: String
    },
    facebookId: {
        type: String
    },
    facebookToken: {
        type: String
    },
    twitterId: {
        type: String
    },
    twitterToken: {
        type: String
    },
    githubId: {
        type: String
    },
    githubToken: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = User = mongoose.model('users', UserSchema);
