'use strict';
module.exports = (sequelize, DataTypes) => {
  const place = sequelize.define('place', {
    description: DataTypes.STRING,
    lng: DataTypes.INTEGER,
    lat: DataTypes.INTEGER,
    image: DataTypes.TEXT
  }, {});
  place.associate = function(models) {
    models.place.belongsToMany(models.user, {through: 'placeUser'});
    models.place.hasMany(models.note);
    models.place.hasMany(models.poi);
  };
  return place;
};