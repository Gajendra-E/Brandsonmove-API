'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Contents', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      heading1: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      heading2: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      heading3: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      paragraph_content: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      document_link: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      attachment_file:{
        type: Sequelize.STRING,
        allowNull: true,
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
    await queryInterface.dropTable('Contents');
  }
};