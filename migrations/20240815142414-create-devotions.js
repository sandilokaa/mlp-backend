'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Devotions', {
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
      devotionName: {
        type: Sequelize.STRING
      },
      devotionRole: {
        type: Sequelize.STRING
      },
      devotionPeriod: {
        type: Sequelize.STRING
      },
      academicYear: {
        type: Sequelize.STRING
      },
      devotionDescription: {
        type: Sequelize.TEXT
      },
      devotionFile: {
        type: Sequelize.TEXT
      },
      devotionValue: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Devotions');
  }
};