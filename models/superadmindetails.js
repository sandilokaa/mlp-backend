'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SuperAdminDetails extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      
      SuperAdminDetails.belongsTo(models.SuperAdmins, {
        foreignKey: 'superAdminId'
      });

      SuperAdminDetails.belongsTo(models.SuperAdminPersonals, {
        foreignKey: 'superAdminPersonalId'
      });

      SuperAdminDetails.belongsTo(models.SuperAdminEducations, {
        foreignKey: 'superAdminEducationId'
      });
    }
  }
  SuperAdminDetails.init({
    superAdminId: DataTypes.INTEGER,
    superAdminPersonalId: DataTypes.INTEGER,
    superAdminEducationId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'SuperAdminDetails',
  });
  return SuperAdminDetails;
};