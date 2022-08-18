const { getAllCelebrities, getCelebrity, voteCelebrity, getCelebrityVotes, likeOrUnlikeComment } = require("../utils/actions/celebrity_actions");
const { getAllProfiles, getProfile, createProfile } = require("../utils/actions/profile_actions");
const { createUser, getAllUsers } = require("../utils/actions/user_actions");

// User Handlers
exports.createUserHandler = async (req, res, next) => {
    const user = await createUser(req.body);
    console.log(req.body)
    return res.json({
        message: "User Created",
        data: user,
    });
}

exports.getAllUsersHandler = async (req, res, next) => {
    const users = await getAllUsers();
    return res.json({
        message: "Users Retrieved",
        data: users,
    });
}

// Profile Handlers
exports.getAllProfilesHandler = async (req, res, next) => {
    const profiles = await getAllProfiles()
    res.render('profile_list_template', {
      profiles: profiles,
    });
}

exports.getProfileHandler = async (req, res, next) => {
    const profile = await getProfile(req.params.id)
    res.render('profile_template', {
      profile: profile,
    });
}

exports.createProfileHandler = async function(req, res, next) {
    const profile = await createProfile(req.body);
    console.log(profile);
    res.redirect('/' + profile);
}

// Celebrity Handlers
exports.getAllCelebritiesHandler = async (req, res, next) => {
    const celebrities = await getAllCelebrities()
    res.json({
        message: "Celebrities retrieved",
        data: celebrities,
    });
}

exports.getCelebrityHandler = async (req, res, next) => {
    const celebrity = await getCelebrity(req.params.id)
    res.json({
        message: "Celebrity retrieved",
        data: celebrity,
    });
}

exports.voteCelebrityHandler = async (req, res, next) => {
    const celebrity = await voteCelebrity(req.params.id, req.body, req.params.user)
    res.json({
        message: "Comment Created",
        data: celebrity,
    });
}

exports.getCelebrityVotesHandler = async (req, res, next) => {
    const votes = await getCelebrityVotes(req.params.id, req.query)
    res.json({
        message: "Votes retrieved",
        data: votes,
    });
}

exports.likeOrUnlikeCommentHandler = async (req, res, next) => {
    const vote = await likeOrUnlikeComment(req.body)
    res.json({
        message: "Comment liked/Unliked",
    });
}