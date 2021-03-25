const { Model, DataTypes } = require('sequelize');

class Group extends Model {
	static init(sequelize) {
		super.init({
			title: DataTypes.STRING,
			description: DataTypes.STRING,
			icon: DataTypes.STRING,
			url: DataTypes.STRING,
			accepted: DataTypes.BOOLEAN,
			views: DataTypes.INTEGER,
			isChannel: DataTypes.BOOLEAN,
			members: DataTypes.INTEGER,
			stringId: DataTypes.STRING,
			disabled: DataTypes.BOOLEAN,
		}, { sequelize });
	}

	static associate(models) {
		this.belongsTo(models.Category, { foreignKey: 'categoryId', as: 'category' });
	}
}

module.exports = Group;
