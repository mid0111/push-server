'use strict';
module.exports = function(sequelize, DataTypes) {
  var Sticker = sequelize.define('Stickers', {
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

  Sticker.updateDate = function(id) {
    var query = {
      where: {
        id: id
      }
    };
    return Sticker.update({}, query);
  };

  return Sticker;
};
