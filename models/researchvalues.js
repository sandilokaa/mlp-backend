'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ResearchValues extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      ResearchValues.belongsTo(models.SuperAdmins, {
        foreignKey: 'superAdminId'
      });

      ResearchValues.belongsTo(models.Roadmaps, {
        foreignKey: 'roadmapId'
      });
    }
  }
  ResearchValues.init({
    superAdminId: DataTypes.INTEGER,
    roadmapId: DataTypes.INTEGER,
    value: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ResearchValues',
  });
  return ResearchValues;
};