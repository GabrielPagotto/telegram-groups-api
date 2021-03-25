'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
		await queryInterface.addColumn('categories', 'string_id', { type: Sequelize.STRING });
    await queryInterface.addColumn('groups', 'string_id', { type: Sequelize.STRING });
  },

  down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('groups');
		await queryInterface.dropTable('categories');
  }
};
