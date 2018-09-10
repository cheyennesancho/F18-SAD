'use strict';
module.exports = function(sequelize, DataTypes) {
    var UserRole = sequelize.define('UserRole', {
        userType: DataTypes.STRING,
        createNewAccount: DataTypes.STRING,
        deleteAccount: DataTypes.STRING,
        resetUserAccount: DataTypes.STRING,
        CreateTransaction: DataTypes.STRING,
        ApproveTransaction: DataTypes.STRING,

    }, {
        classMethods: {
            associate: function(models) {
                // associations can be defined here
                UserRole.belongsTo(models.User);
            }
        }
    });
    return Todo;
};