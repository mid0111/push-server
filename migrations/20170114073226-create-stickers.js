'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Sticker', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      key: {
        type: Sequelize.STRING
      },
      auth: {
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
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Sticker');
  }
};
