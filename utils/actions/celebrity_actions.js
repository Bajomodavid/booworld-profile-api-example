const profile_image = "https://soulverse.boo.world/images/1.png";
const User = require('../database/models/user.model');
const Celebrity = require('../database/models/celebrity.model');
const Comment = require('../database/models/comment.model');
const { query } = require('express');


exports.getCelebrity = async (id) => {
    const celebrity = await  Celebrity.findById(id).populate('comments');
    return celebrity;
 }

 exports.getCelebrityVotes = async (id, params) => {
    var query = {celebrity: id};
    var sort = {
        createdAt: -1
    };
    var personality = {
        mbti: '',
        enneagram: '',
        zodiac: '',
    }
    if (params.mbti) {
        query.personality = personality;
        query.personality.mbti = params.mbti;
    }
    if (params.enneagram) {
        if (query.personality === undefined) {
            query.personality = personality;
        }
        query.personality.enneagram = params.enneagram;
    }
    if (params.zodiac) {
        if (query.personality === undefined) {
            query.personality = personality;
        }
        query.personality.zodiac = params.zodiac;
    }
    if (params.sort === 'best') {
        sort.createdAt = null;
        sort.likes = {}
        sort = {'likes.count':  -1};
    }
    const comments = await Comment.find(query).sort(sort).populate('celebrity user');
    return comments;
 }
 
 exports.getAllCelebrities = async () => {
     const celebrities = await  Celebrity.find({}).populate('comments');
     return celebrities;
 }

 exports.voteCelebrity = async (id, data, userId) => {
    const vote = new Comment({
        title: data.title,
        description: data.description,
        user: userId,
        personality: {
            mbti: data.mbti,
            enneagram: data.enneagram,
            zodiac: data.zodiac,
        },
        likes: {
            count: Math.floor(Math.random() * 10),
            users: [],
        },
        celebrity: id,
    });
    
    vote.save();
    Celebrity.updateOne(
        {_id: id},
        { "$addToSet": { "comments": [vote._id] } },
        function(err, result) {
            if (err) {
            // console.log(err)
            } else {
                // console.log(result);
            }
        }
    );
    return vote;
 }

 exports.likeOrUnlikeComment = async (data) => {
    const comment = await Comment.findById(data.id);
    if (comment == null) {
        return {};
    }
    var query = {};
    if (checkIfLiked(data.user, comment.likes.users)) {
        query = {
            $inc: { "likes.count": -1},
            "$pull": { "likes.users": [data.user] },
        }
    } else {
        query = {
            $inc: { "likes.count": 1},
            "$addToSet": { "likes.users": [data.user] },
        }
    }
    Comment.updateOne(
        {_id: data.id},
        query,
        function(err, result) {
            if (err) {
                console.log(err)
            } else {
                console.log(result);
            }
        }
    );
 }

 function checkIfLiked(id, array) {
    return array.includes(id);
 }