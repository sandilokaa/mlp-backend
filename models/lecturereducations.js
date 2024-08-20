'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LecturerEducations extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      LecturerEducations.hasOne(models.LecturerDetails);

      LecturerEducations.belongsTo(models.Lecturers, {
        foreignKey: 'lecturerId'
      });

    }
  }
  LecturerEducations.init({
    lecturerId: DataTypes.INTEGER,
    bachelor: DataTypes.JSON,
    magister: DataTypes.JSON,
    doctor: DataTypes.JSON,
  }, {
    sequelize,
    modelName: 'LecturerEducations',
  });
  return LecturerEducations;
};