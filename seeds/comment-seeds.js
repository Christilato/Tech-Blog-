const { Comment } = require('../models');

const commentData = [
    // {
    //     user_id:
    //     post_id:
    //     comment_text:
    // }
]

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;