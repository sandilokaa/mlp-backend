'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SuperAdminPersonals extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      
      SuperAdminPersonals.hasOne(models.SuperAdminDetails);

      SuperAdminPersonals.belongsTo(models.SuperAdmins, {
        foreignKey: 'superAdminId'
      });
    }
  }
  SuperAdminPersonals.init({
    superAdminId: DataTypes.INTEGER,
    nip: DataTypes.STRING,
    major: DataTypes.STRING,
    address: DataTypes.TEXT,
    gender: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    birth: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'SuperAdminPersonals',
  });
  return SuperAdminPersonals;
};