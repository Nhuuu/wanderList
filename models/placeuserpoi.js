'use strict';
module.exports = (sequelize, DataTypes) => {
  const placeUserPoi = sequelize.define('placeUserPoi', {
    placeUserPlaceId: DataTypes.INTEGER,
    poiId: DataTypes.INTEGER
  }, {});
  placeUserPoi.associate = function(models) {
    // associations can be defined here
  };
  return placeUserPoi;
};