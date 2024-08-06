'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('LecturerDetails', {
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
      lecturerPersonalId: {
        type: Sequelize.INTEGER,
        reference: {
          model: 'LecturerPersonals',
          key: 'id'
        }
      },
      lecturerEducationId: {
        type: Sequelize.INTEGER,
        reference: {
          model: 'LecturerEducations',
          key: 'id'
        }
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
    await queryInterface.dropTable('LecturerDetails');
  }
};