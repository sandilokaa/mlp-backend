'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LecturerPersonals extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      LecturerPersonals.hasOne(models.LecturerDetails);

      LecturerPersonals.belongsTo(models.Lecturers, {
        foreignKey: 'lecturerId'
      });
    }
  }
  LecturerPersonals.init({
    lecturerId: DataTypes.INTEGER,
    nip: DataTypes.STRING,
    address: DataTypes.TEXT,
    gender: DataTypes.STRING,
    placeOfBirth: DataTypes.STRING,
    dateOfBirth: DataTypes.STRING,
    phoneNumber: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'LecturerPersonals',
  });
  return LecturerPersonals;
};