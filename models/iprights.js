'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class IPRights extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      IPRights.belongsTo(models.Lecturers, {
        foreignKey: 'lecturerId'
      });
      
      IPRights.belongsTo(models.SuperAdmins, {
        foreignKey: 'superAdminId'
      });

      IPRights.belongsTo(models.LecturerDetails,{
        foreignKey: 'lecturerId'
      });
    }
  }
  IPRights.init({
    superAdminId: DataTypes.INTEGER,
    lecturerId: DataTypes.INTEGER,
    iPRightTitle: DataTypes.STRING,
    registrationNumber: DataTypes.STRING,
    iPRightDate: DataTypes.STRING,
    description: DataTypes.TEXT,
    ipRightFile: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'IPRights',
  });
  return IPRights;
};