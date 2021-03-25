const { Model, DataTypes } = require('sequelize');

class Category extends Model {
	static init(sequelize) {
		super.init({
			title: DataTypes.STRING,
			icon: DataTypes.STRING,
			stringId: DataTypes.STRING,
		}, { sequelize })
	}
}

module.exports = Category;
