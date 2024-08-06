'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('LecturerEducations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      lecturerId: {
        type: Sequelize.INTEGER,
        reference: {
          model: 'Lecturers',
          key: 'id'
        }
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
    await queryInterface.dropTable('LecturerEducations');
  }
};