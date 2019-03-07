'use strict';
module.exports = (sequelize, DataTypes) => {
  const poi = sequelize.define('poi', {
    name: DataTypes.STRING,
    categories: DataTypes.STRING,
    image: DataTypes.TEXT,
    rating: DataTypes.DECIMAL,
    url: DataTypes.TEXT,
    numReviews: DataTypes.INTEGER,
    placeId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {});
  poi.associate = function(models) {
    // associations can be defined here
    models.poi.belongsToMany(models.place, {through: 'placeUserPoi'})
    models.poi.belongsToMany(models.user, {through: 'placeUserPoi'})
  };
  return poi;
};