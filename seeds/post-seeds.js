const { Post } = require('../models');

const postData = [ 
    // {
    //     title:
    //     post_content:
    //     user_id:
    // }
    // do this 6 times

]




const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;