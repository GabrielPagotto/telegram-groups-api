const Sequelize = require('sequelize');
const dbConfig = require('../configs/database');

const Group = require('../models/Group');
const Category = require('../models/Category');

const connection = new Sequelize(dbConfig);

Category.init(connection);
Group.init(connection);

Group.associate(connection.models);

module.exports = connection;
