const { getAllProfiles } = require("../../actions/profile_actions");
const { profileList } = require("./profile_seeder");
const Profile = require('../models/profile.model');
const User = require('../models/user.model');
const Comment = require('../models/comment.model');
const Celebrity = require('../models/celebrity.model');
const { getAllCelebrities } = require("../../actions/celebrity_actions");
const { celebrityList } = require("./celebrity_seeder");
const { getAllUsers } = require("../../actions/user_actions");
const { userList } = require("./user_seeder");
const { commentList } = require("./comment_seeder");

exports.dbSeeder = async () => {
    const profiles = await getAllProfiles();
    if (profiles.length < 1) {
      for (let index = 0; index < profileList.length; index++) {
        const element = profileList[index];
        const profile = new Profile(element);
        profile.save(); 
      }
    }

    const celebrities = await getAllCelebrities();
    if (celebrities.length < 1) {
      for (let index = 0; index < celebrityList.length; index++) {
        const element = celebrityList[index];
        const celebrity = new Celebrity(element);
        celebrity.save(); 
      }
    }

    const users = await getAllUsers();
    if (users.length < 1) {
      for (let index = 0; index < userList.length; index++) {
        const element = userList[index];
        const user = new User(element);
        user.save(); 
      }
    }
    
    const testComment = new Comment(commentList[0]);
    testComment.save();
}