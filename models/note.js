'use strict';
module.exports = (sequelize, DataTypes) => {
  const note = sequelize.define('note', {
    content: DataTypes.TEXT,
    placeId: DataTypes.INTEGER
  }, {});
  note.associate = function(models) {
    // associations can be defined here
  };
  return note;
};