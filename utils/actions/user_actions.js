const profile_image = "https://soulverse.boo.world/images/1.png";
const User = require('../database/models/user.model');

exports.createUser = async (data) => {
    // Create profile and return profile ID
    const user = new User({
        name: data.name,
    });
    user.save()
    return user;
}

exports.getAllUsers = async () => {
    const users = await User.find({});
    return users;
}