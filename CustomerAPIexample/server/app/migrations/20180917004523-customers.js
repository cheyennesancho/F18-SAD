'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('customers', {
          id: {
              type: Sequelize.INTEGER(11),
              allowNull: false,
              primaryKey: true,
              autoIncrement: true
          },
          firstname: {
              type: Sequelize.STRING,
              allowNull: true
          },
          lastname: {
              type: Sequelize.STRING,
              allowNull: true
          },
          age: {
              type: Sequelize.INTEGER,
              allowNull: true
          },
          createdAt: {
              allowNull: true,
              type: Sequelize.DATE
          },
          updatedAt: {
              allowNull: false,
              type: Sequelize.DATE
          }
          /*
            Add altering commands here.
            Return a promise to correctly handle asynchronicity.

            Example:
            return queryInterface.createTable('users', { id: Sequelize.INTEGER });
          */
      });
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('customers');
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
