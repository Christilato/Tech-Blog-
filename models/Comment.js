const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

// define the table columns and configuration, similar to the setup for the other models

module.exports = Comment;
