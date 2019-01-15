'use strict';
module.exports = (sequelize, DataTypes) => {
  const poi = sequelize.define('poi', {
    name: DataTypes.STRING,
    categories: DataTypes.STRING,
    photos: DataTypes.STRING,
    rating: DataTypes.FLOAT,
    url: DataTypes.STRING
  }, {});
  poi.associate = function(models) {
    models.poi.belongsTo(models.place);
  };
  return poi;
};