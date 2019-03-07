'use strict';
module.exports = (sequelize, DataTypes) => {
  const place = sequelize.define('place', {
    description: DataTypes.STRING,
    lng: DataTypes.DECIMAL,
    lat: DataTypes.DECIMAL,
    image: DataTypes.TEXT
  }, {});
  place.associate = function(models) {
    models.place.belongsToMany(models.poi, {through: 'placeUserPoi'});
    models.place.belongsToMany(models.user, {through: 'placeUserPoi'});
  };
  return place;
};