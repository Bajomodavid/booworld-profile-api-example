const { Schema, model, default: mongoose } = require('mongoose');

const CelebritySchema = new Schema({
    name: {
        type: String,
        trim: true,
        unique: true,
    },
    image: {
        type: String,
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }]
});

module.exports = model('Celebrity', CelebritySchema);