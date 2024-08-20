'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Lecturers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Lecturers.init({
    superAdminId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    groupName: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Lecturers',
  });
  return Lecturers;
};