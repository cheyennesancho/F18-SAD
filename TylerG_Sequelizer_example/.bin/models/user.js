'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
      key: {
        type: DataTypes.INTEGER,
          allowNull: false,
          unique: true
      }
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      role: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
          User.hasMany(models.UserRole);
      }
    }
  });
  return User;
};