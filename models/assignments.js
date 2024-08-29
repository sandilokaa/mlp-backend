'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Assignments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      Assignments.belongsTo(models.Lecturers, {
        foreignKey: 'lecturerId'
      });
      
      Assignments.belongsTo(models.SuperAdmins, {
        foreignKey: 'superAdminId'
      });

      Assignments.belongsTo(models.LecturerDetails,{
        foreignKey: 'lecturerId'
      });

    }
  }
  Assignments.init({
    superAdminId: DataTypes.INTEGER,
    lecturerId: DataTypes.INTEGER,
    assignmentName: DataTypes.STRING,
    assignmentType: DataTypes.STRING,
    assignmentDescription: DataTypes.TEXT,
    assignmentFile: DataTypes.TEXT,
    assignmentValue: DataTypes.STRING,
    assignmentPeriod: DataTypes.STRING,
    academicYear: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Assignments',
  });
  return Assignments;
};