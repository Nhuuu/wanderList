'use strict';
module.exports = (sequelize, DataTypes) => {
  const poiUser = sequelize.define('poiUser', {
    poiId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {});
  poiUser.associate = function(models) {
    // associations can be defined here
  };
  return poiUser;
};