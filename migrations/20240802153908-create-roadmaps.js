'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Roadmaps', {
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
      title: {
        type: Sequelize.STRING
      },
      period: {
        type: Sequelize.STRING
      },
      ta: {
        type: Sequelize.STRING
      },
      category: {
        type: Sequelize.STRING
      },
      researchFile: {
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
    await queryInterface.dropTable('Roadmaps');
  }
};