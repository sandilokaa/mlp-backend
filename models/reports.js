'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reports extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      Reports.belongsTo(models.SuperAdmins,{
        foreignKey: 'superAdminId'
      });

    }
  }
  Reports.init({
    superAdminId: DataTypes.INTEGER,
    reportTitle: DataTypes.STRING,
    period: DataTypes.STRING,
    ta: DataTypes.STRING,
    reportStatus: {
      type: DataTypes.ENUM,
      values: ['Selesai', 'New Comment', 'Dalam Review'],
      defaultValue: 'Dalam Review'
    },
    reportFile: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Reports',
  });
  return Reports;
};