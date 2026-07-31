const { Sequelize } = require('sequelize');
// const dbConfig = require('./config');
// const dbConfig = require('./config')
const dbConf = require('./config')

const sequelize = new Sequelize(dbConf.development.database, dbConf.development.username, dbConf.development.password, {
    host: dbConf.development.host,
    dialect: dbConf.development.dialect,
  }
);

// Проверка соединения с базой данных
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection to the database has been established successfully.');
    // Дополнительные действия после успешного подключения
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
    // Действия в случае ошибки подключения
  });


module.exports = sequelize;