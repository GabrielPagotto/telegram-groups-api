'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('categories', {
			id: {
				type: Sequelize.INTEGER,
				autoIncrement: true,
				unique: true,
				primaryKey: true,
				allowNull: false,
			},
			title: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			icon: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			created_at: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			updated_at: {
				type: Sequelize.DATE,
				allowNull: false,
			},
		});

    await queryInterface.createTable('groups', {
			id: {
				type: Sequelize.INTEGER,
				autoIncrement: true,
				unique: true,
				primaryKey: true,
				allowNull: false,
			},
			title: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			description: {
				type: Sequelize.TEXT,
				allowNull: false,
			},
			icon: {
				type: Sequelize.TEXT,
				allowNull: false,
			},
			url: {
				type: Sequelize.TEXT,
				allowNull: false,
			},
			accepted: {
				type: Sequelize.BOOLEAN,
				defaultValue: false,
				allowNull: false,
			},
			views: {
				type: Sequelize.INTEGER,
				defaultValue: 0,
				allowNull: false,
			},
			category_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: {
						tableName: 'categories',
					},
					key: 'id',
				},
			},
			created_at: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			updated_at: {
				type: Sequelize.DATE,
				allowNull: false,
			},
		});
  },
  down: async (queryInterface, Sequelize) => {
		 await queryInterface.dropTable('groups');
     await queryInterface.dropTable('categories');
  }
};
