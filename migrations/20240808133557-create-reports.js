'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Reports', {
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
      reportTitle: {
        type: Sequelize.STRING
      },
      period: {
        type: Sequelize.STRING
      },
      ta: {
        type: Sequelize.STRING
      },
      reportStatus: {
        type: Sequelize.ENUM,
        values: ['Selesai', 'New Comment', 'Dalam Review'],
        defaultValue: 'Dalam Review'
      },
      reportFile: {
        type: Sequelize.TEXT
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
    await queryInterface.dropTable('Reports');
  }
};