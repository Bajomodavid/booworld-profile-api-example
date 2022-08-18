const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    name: {
        type: String,
    }
});

module.exports = model('User', UserSchema);