'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('skills', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nama: {
        type: Sequelize.STRING(100), allowNull: false
      },
      kategori: {
        type: Sequelize.STRING(100)
      },
      level: {
        type: Sequelize.ENUM('Pemula', 'Menengah', 'Mahir'), defaultValue: 'Pemula'
      },
      icon: {
        type: Sequelize.STRING(50)
      },
      deskripsi: {
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
  async down(queryInterface) {
    await queryInterface.dropTable('skills');
  }
};