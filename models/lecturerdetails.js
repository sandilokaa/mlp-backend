'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LecturerDetails extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      LecturerDetails.belongsTo(models.SuperAdmins, {
        foreignKey: 'superAdminId'
      });

      LecturerDetails.belongsTo(models.Lecturers, {
        foreignKey: 'lecturerId'
      });
      
      LecturerDetails.belongsTo(models.LecturerPersonals, {
        foreignKey: 'lecturerPersonalId'
      });
      
      LecturerDetails.belongsTo(models.LecturerEducations, {
        foreignKey: 'lecturerEducationId'
      });

    }
  }
  LecturerDetails.init({
    superAdminId: DataTypes.INTEGER,
    lecturerId: DataTypes.INTEGER,
    lecturerPersonalId: DataTypes.INTEGER,
    lecturerEducationId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'LecturerDetails',
  });
  return LecturerDetails;
};