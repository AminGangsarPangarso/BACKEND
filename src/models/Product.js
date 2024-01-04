import Sequelize, { Model } from "sequelize";

class Product extends Model {
    static order = 2;
    static init(sequelize) {
        super.init(
            {
                id: {
                    type: Sequelize.STRING,
                    allowNull: false,
                    unique: true,
                    primaryKey: true,
                },
                product_name: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                product_price: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
                product_description: {
                    type: Sequelize.TEXT,
                    allowNull: false,
                },
            },
            {
                sequelize,
                tableName: 'product',
                freezeTableName: true,
            }
        );

        return this;
    }
}

export default Product;
