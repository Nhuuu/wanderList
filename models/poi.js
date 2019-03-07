'use strict';
module.exports = (sequelize, DataTypes) => {
  const poi = sequelize.define('poi', {
    name: DataTypes.STRING,
    categories: DataTypes.STRING,
    image: DataTypes.TEXT,
    rating: DataTypes.DECIMAL,
    url: DataTypes.TEXT,
    numReviews: DataTypes.INTEGER,
    placeId: DataTypes.INTEGER
  }, {});
  poi.associate = function(models) {
    models.poi.belongsTo(models.place)
    models.poi.belongsToMany(models.user, {through: 'placeUserPoi'})
  };
  return poi;
};