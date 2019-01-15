'use strict';
module.exports = (sequelize, DataTypes) => {
  const placeUser = sequelize.define('placeUser', {
    placeId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {});
  placeUser.associate = function(models) {
    // associations can be defined here
  };
  return placeUser;
};