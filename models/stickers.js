'use strict';
module.exports = function(sequelize, DataTypes) {
  var Sticker = sequelize.define('Sticker', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING
    },
    key: DataTypes.STRING,
    auth: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Sticker;
};
