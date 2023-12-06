const db = require("../database");
const Product = require("./product");

const Galery = db.define(
	"galery",
	{
		galery_id: {
			type: db.Sequelize.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		img_url: {
			type: db.Sequelize.STRING,
			allowNull: false,
		},
	},
  {
    freezeTableName: true,
  }
);

Galery.Product = Galery.belongsTo(Product, {
  foreignKey: "product_id",
  as: "product",
});
Product.Galery = Product.hasMany(Galery, {
  foreignKey: "product_id",
  as: "galery",
});

module.exports = Galery;
