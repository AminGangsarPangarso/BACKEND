import Sequelize, { Model } from "sequelize";
import Product from "./Product";

class Gallery extends Model {
    static order = 3;
    static init(sequelize) {
        super.init(
            {
                id: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    primaryKey: true,
                    autoIncrement: true,
                },
                img_url: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
            },
            {
                sequelize,
                tableName: 'gallery',
                timestamps: true,
                freezeTableName: true,
            }
        );

        return this;
    }

    static associate(models) {
        this.belongsTo(models.Product, {
            as: 'product',
            foreignKey: 'product_id',
        });
    }
}

export default Gallery;
