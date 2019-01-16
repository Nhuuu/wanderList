'use strict';
module.exports = (sequelize, DataTypes) => {
  const place = sequelize.define('place', {
    description: DataTypes.STRING,
    lng: DataTypes.DECIMAL,
    lat: DataTypes.DECIMAL,
    image: DataTypes.TEXT
  }, {});
  place.associate = function(models) {
    models.place.belongsToMany(models.user, {through: 'placeUser'});
    models.place.hasMany(models.poi);
    models.place.hasMany(models.note);
  };
  return place;
};