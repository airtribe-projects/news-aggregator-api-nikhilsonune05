const { Sequelize, DataTypes } = require('sequelize');

const dbConfig = require('../../config');

const sequelize = new Sequelize(`postgres://${dbConfig.development.username}:${dbConfig.development.password}@${dbConfig.development.host}:${process.env.DB_PORT}/${dbConfig.development.database}`, { dialect: dbConfig.development.dialect });

//checking if connection is done
sequelize.authenticate().then(() => {
    console.log(`Database connected`)
}).catch((err) => {
    console.log(err)
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require('./userModel')(sequelize, DataTypes);

db.sequelize.sync(); // WARNING: deletes all data

module.exports = db;
