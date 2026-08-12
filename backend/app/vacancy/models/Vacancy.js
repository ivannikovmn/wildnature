const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/db') //Импортируйте настройки подключения к базе данных
const City = require('../../region/City')
const User = require('../../auth/User')
const Specialization = require('../../specializations/models/Specialization');
const Company = require('../../auth/Company');
const Experience = require('./Experience');
const EmploymentType = require('../../employment-type/EmploymentType')

const Vacancy = sequelize.define('Vacancy', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  }, 
  about_company: {
    type: DataTypes.STRING,
    allowNull: false,
  }, 
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },  
  event_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },  
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  branding_photo: {
    type: DataTypes.STRING,
    allowNull: true,
  },    
});

Vacancy.belongsTo(User, { foreignKey: 'userId' }); // Определяем внешний ключ 'roleId'
Vacancy.belongsTo(Company, { foreignKey: 'companyId', as: 'company'  }); // Определяем внешний ключ 'roleId'

module.exports = Vacancy;