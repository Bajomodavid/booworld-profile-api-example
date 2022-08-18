const { Schema, model } = require('mongoose');

const ProfileSchema = new Schema({

    id: {
        type: String,
        unique: true,
    },
    name: {
        type: String,
        trim: true,
    },
        description: {
        type: String,
        trim: true,
    },
    mbti: {
        type: String,
        trim: true,
    },
    enneagram: {
        type: String,
        lowercase: true,
        trim: true,
    },
    variant: {
        type: String,
        lowercase: true,
        trim: true,
    },
    tritype: {
        type: String,
        lowercase: true,
        trim: true,
    },
    socionics: {
        type: String,
        lowercase: true,
        trim: true,
    },
    sloan: {
        type: String,
        lowercase: true,
        trim: true,
    },
    psyche: {
        type: String,
        lowercase: true,
        trim: true,
    },
    image: {
        type: String,
    }
});

module.exports = model('Profile', ProfileSchema);