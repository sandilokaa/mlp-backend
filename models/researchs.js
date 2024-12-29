'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Researchs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      Researchs.belongsTo(models.Lecturers, {
        foreignKey: 'lecturerId'
      });
      
      Researchs.belongsTo(models.SuperAdmins, {
        foreignKey: 'superAdminId'
      });

      Researchs.belongsTo(models.LecturerDetails,{
        foreignKey: 'lecturerId'
      });

    }
  }
  Researchs.init({
    superAdminId: DataTypes.INTEGER,
    lecturerId: DataTypes.INTEGER,
    researchName: DataTypes.STRING,
    researchCategory: DataTypes.STRING,
    researchPeriod: DataTypes.STRING,
    academicYear: DataTypes.STRING,
    researchFile: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Researchs',
  });
  return Researchs;
};