'use strict';
module.exports = (sequelize, DataTypes) => {
  const placeUserPoi = sequelize.define('placeUserPoi', {
    placeId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    poiId: DataTypes.INTEGER
  }, {});
  placeUserPoi.associate = function(models) {
    // associations can be defined here
  };
  return placeUserPoi;
};