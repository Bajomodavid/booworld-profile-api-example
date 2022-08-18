const { v4: uuidv4 } = require('uuid');
const profile_image = "https://soulverse.boo.world/images/1.png";
const Profile = require('../database/models/profile.model');

exports.createProfile = async (data) => {
    // Create profile and return profile ID
    const profile = new Profile({
        id: uuidv4(),
        name: data.name,
        description: data.description,
        mbti: data.mbti,
        enneagram: data.enneagram,
        variant: data.variant,
        tritype: data.tritype,
        socionics: data.socionics,
        sloan: data.sloan,
        psyche: data.psyche,
        image: profile_image,
    });
    profile.save()
    return profile.id;
}

exports.getProfile = async (id) => {
   const profile = await  Profile.findOne({id: id});
    return profile;
}

exports.getAllProfiles = async () => {
    const profiles = await  Profile.find({});
    return profiles;
}