const db = require("../database");

const Product = db.define(
	"product",
	{
		product_id: {
			type: db.Sequelize.STRING,
			allowNull: false,
			unique: true,
			primaryKey: true,
		},
		product_name: {
			type: db.Sequelize.STRING,
			allowNull: false,
		},
		product_price: {
			type: db.Sequelize.INTEGER,
			allowNull: false,
		},
		product_description: {
			type: db.Sequelize.TEXT,
			allowNull: false,
		},
	},
	{
		freezeTableName: true,
	}
);

module.exports = Product;
