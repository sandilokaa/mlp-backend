'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Roadmaps extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      Roadmaps.hasOne(models.ResearchValues);

      Roadmaps.belongsTo(models.SuperAdmins, {
        foreignKey: 'superAdminId'
      });
      
      Roadmaps.belongsTo(models.Lecturers, {
        foreignKey: 'lecturerId'
      });
      
    }
  }
  Roadmaps.init({
    superAdminId: DataTypes.INTEGER,
    lecturerId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    period: DataTypes.STRING,
    ta: DataTypes.STRING,
    category: DataTypes.STRING,
    researchFile: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Roadmaps',
  });
  return Roadmaps;
};