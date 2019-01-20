'use strict';
var bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: 'Hey, give me a valid email address!',
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [8, 16],
          msg: 'Your new password should be between 8 and 16 characters in length.'
        }
      }
    }, 
  }, {
      hooks: {
      beforeCreate: ((pendingUser) => {
        if(pendingUser && pendingUser.password) {
          var hash = bcrypt.hashSync(pendingUser.password, 12);
          pendingUser.password = hash;
        }
      })
    }
  });
  user.associate = function(models) {
    models.user.belongsToMany(models.place, {through: 'placeUser'});
  };
  user.prototype.validPassword = function(typedPassword){
    return bcrypt.compareSync(typedPassword, this.password);
  };
  return user;
};
