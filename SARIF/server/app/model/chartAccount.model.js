module.exports = (sequelize, Sequelize) => {
    const ChartAccount = sequelize.define('ChartOfAccounts', {
        caId: {
            type: Sequelize.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        accountType: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        code: {
            type: Sequelize.STRING,
            allowNull: false
        },
        accountName: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });

    return ChartAccount;
}