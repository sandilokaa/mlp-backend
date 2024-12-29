'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Patents extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      Patents.belongsTo(models.Lecturers, {
        foreignKey: 'lecturerId'
      });
      
      Patents.belongsTo(models.SuperAdmins, {
        foreignKey: 'superAdminId'
      });

      Patents.belongsTo(models.LecturerDetails,{
        foreignKey: 'lecturerId'
      });
    }
  }
  Patents.init({
    superAdminId: DataTypes.INTEGER,
    lecturerId: DataTypes.INTEGER,
    patentTitle: DataTypes.STRING,
    patentDate: DataTypes.STRING,
    registrationNumber: DataTypes.STRING,
    description: DataTypes.TEXT,
    patentFile: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Patents',
  });
  return Patents;
};