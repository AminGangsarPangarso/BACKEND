import Sequelize, { Model } from "sequelize";
import { User } from './User'
import { Product } from './Product'

class Cart extends Model {
    static order = 4;
    static init(sequelize) {
        super.init(
            {
                id: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    unique: true,
                    primaryKey: true,
                },
                user_id: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    references: {
                        model: User,
                        key: "id",
                    },
                },
                product_id: {
                    type: Sequelize.STRING,
                    allowNull: false,
                    references: {
                        model: Product,
                        key: "id",
                    },
                },
                quantity: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
                total: {
                    type: Sequelize.DECIMAL(10, 2),
                    allowNull: false,
                },
                harga: {
                    type: Sequelize.DECIMAL(10, 2),
                    allowNull: false,
                },
                status_pembayaran: {
                    type: Sequelize.ENUM("pending", "approved", "rejected", "canceled"),
                    allowNull: false,
                },
                metode_pembayaran: {
                    type: Sequelize.ENUM("bank transfer", "e-wallet", "cod"),
                    allowNull: false,
                },
                status_pengiriman: {
                    type: Sequelize.ENUM("pending", "processing", "shipped", "delivered", "canceled"),
                    allowNull: false,
                },
            },
            {
                sequelize,
                tableName: 'cart',
                freezeTableName: true,
            }
        );

        return this;
    }

    static associate(models) {
        this.belongsTo(models.User, {
            as: "user",
            foreignKey: "user_id",
        });

        this.belongsTo(models.Product, {
            as: "product",
            foreignKey: "product_id",
        });
    }
}

export default Cart;
