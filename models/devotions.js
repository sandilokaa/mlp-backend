'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Devotions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      Devotions.belongsTo(models.Lecturers, {
        foreignKey: 'lecturerId'
      });
      
      Devotions.belongsTo(models.SuperAdmins, {
        foreignKey: 'superAdminId'
      });

      Devotions.belongsTo(models.LecturerDetails,{
        foreignKey: 'lecturerId'
      });

    }
  }
  Devotions.init({
    superAdminId: DataTypes.INTEGER,
    lecturerId: DataTypes.INTEGER,
    devotionName: DataTypes.STRING,
    devotionRole: DataTypes.STRING,
    devotionPeriod: DataTypes.STRING,
    academicYear: DataTypes.STRING,
    devotionDescription: DataTypes.TEXT,
    devotionFile: DataTypes.TEXT,
    devotionValue: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Devotions',
  });
  return Devotions;
};