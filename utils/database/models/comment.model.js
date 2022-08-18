const { Schema, model, default: mongoose } = require('mongoose');
const Celebrity = require('./celebrity.model');
const User = require('./user.model');

const CommentSchema = new Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    personality: {
        mbti: {
            type: String,
            trim: true,
        },
        enneagram: {
            type: String,
            trim: true,
        },
        zodiac: {
            type: String,
            trim: true,
        },
    },
    likes: {
        count: {
            type: Number,
        },
        users: {
            type: Array,
        }
    },
    celebrity: {type: mongoose.Schema.Types.ObjectId, ref: "Celebrity"},
}, {
    timestamps: true,
});

module.exports = model('Comment', CommentSchema);