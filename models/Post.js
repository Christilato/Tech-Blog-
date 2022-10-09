const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {}

// define the table columns and configuration, similar to the setup for the User model

module.exports = Post;
