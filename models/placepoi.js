'use strict';
module.exports = (sequelize, DataTypes) => {
  const placePoi = sequelize.define('placePoi', {
    placeId: DataTypes.INTEGER,
    poiId: DataTypes.INTEGER
  }, {});
  placePoi.associate = function(models) {
    // associations can be defined here
  };
  return placePoi;
};