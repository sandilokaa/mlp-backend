'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ResearchValues', {
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
      roadmapId: {
        type: Sequelize.INTEGER,
        reference: {
          model: 'Roadmaps',
          key: 'id'
        }
      },
      value: {
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
    await queryInterface.dropTable('ResearchValues');
  }
};