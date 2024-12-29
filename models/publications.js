'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Publications extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      Publications.belongsTo(models.Lecturers, {
        foreignKey: 'lecturerId'
      });
      
      Publications.belongsTo(models.SuperAdmins, {
        foreignKey: 'superAdminId'
      });

      Publications.belongsTo(models.LecturerDetails,{
        foreignKey: 'lecturerId'
      });

    }
  }
  Publications.init({
    superAdminId: DataTypes.INTEGER,
    lecturerId: DataTypes.INTEGER,
    publicationTitle: DataTypes.STRING,
    publicationType: DataTypes.STRING,
    journalName: DataTypes.STRING,
    urlPublication: DataTypes.TEXT,
    publicationFile: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Publications',
  });
  return Publications;
};