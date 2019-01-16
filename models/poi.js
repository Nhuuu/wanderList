'use strict';
module.exports = (sequelize, DataTypes) => {
  const poi = sequelize.define('poi', {
    name: DataTypes.STRING,
    categories: DataTypes.STRING,
    image: DataTypes.TEXT,
    rating: DataTypes.DECIMAL,
    url: DataTypes.TEXT,
    placeId: DataTypes.INTEGER
  }, {});
  poi.associate = function(models) {
    // associations can be defined here
  };
  return poi;
};