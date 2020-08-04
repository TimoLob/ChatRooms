'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Messages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      from: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "users",
            column: "id"
          },
          allowNull: false
        }
      },
      text: {
        type: Sequelize.STRING
      },
      roomId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "rooms",
            column: "id"
          }
        },
        allowNull: false
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Messages');
  }
};