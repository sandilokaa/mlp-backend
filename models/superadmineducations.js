'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SuperAdminEducations extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      SuperAdminEducations.hasOne(models.SuperAdminDetails);

      SuperAdminEducations.belongsTo(models.SuperAdmins, {
        foreignKey: 'superAdminId'
      });
    }
  }
  SuperAdminEducations.init({
    superAdminId: DataTypes.INTEGER,
    major: DataTypes.STRING,
    bachelor: DataTypes.JSON,
    magister: DataTypes.JSON,
    doctor: DataTypes.JSON,
  }, {
    sequelize,
    modelName: 'SuperAdminEducations',
  });
  return SuperAdminEducations;
};