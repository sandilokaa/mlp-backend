'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('SuperAdminEducations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      superAdminId: {
        type: Sequelize.INTEGER,
        reference: {
          model: 'SuperAdmins',
          key: 'id'
        }
      },
      expertise: {
        type: Sequelize.STRING
      },
      major: {
        type: Sequelize.STRING
      },
      bachelor: {
        type: Sequelize.JSON
      },
      magister: {
        type: Sequelize.JSON
      },
      doctor: {
        type: Sequelize.JSON
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('SuperAdminEducations');
  }
};