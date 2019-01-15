'use strict';
module.exports = (sequelize, DataTypes) => {
  const place = sequelize.define('place', {
    city: DataTypes.STRING,
    country: DataTypes.STRING,
    lng: DataTypes.INTEGER,
    lat: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    image: DataTypes.TEXT
  }, {});
  place.associate = function(models) {
    models.place.belongsToMany(models.user, {through: 'placeUser'});
    models.place.hasMany(models.poi);
  };
  return place;
};