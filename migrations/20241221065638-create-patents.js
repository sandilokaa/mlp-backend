'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Patents', {
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
      lecturerId: {
        type: Sequelize.INTEGER,
        reference: {
          model: 'Lecturers',
          key: 'id'
        }
      },
      patentTitle: {
        type: Sequelize.STRING
      },
      patentDate: {
        type: Sequelize.STRING
      },
      registrationNumber: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      patentFile: {
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
    await queryInterface.dropTable('Patents');
  }
};