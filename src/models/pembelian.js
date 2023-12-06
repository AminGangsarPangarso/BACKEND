// const db = require("../database");
// const Costumers = require("./costumers");

// const Pembelian = db.define('pembelian', {
//     pembelian_id: {
//         type: db.Sequelize.INTEGER,
//         allowNull: false,
//         primaryKey: true,
//         autoIncrement: true
//     },
//     user_id: {
//         type: db.Sequelize.STRING,
//         allowNull: false,
//         references: {
//             model: Costumers,
//             key: 'user_name'
//         }
//     },
//     waktu_pembelian: {
//         type: db.Sequelize.DATE,
//         allowNull: false,
//         defaultValue: db.Sequelize.NOW
//     },
//     total_amount: {
//         type: db.Sequelize.DECIMAL(10, 2),
//         allowNull: false,
//     },
//     status_pembayaran: {
//         type: db.Sequelize.STRING,
//         allowNull: false,
//         defaultValue: 'Belum Dibayar'
//     },
//     metode_pembayaran: {
//         type: db.Sequelize.STRING,
//         allowNull: false,
//     },
//     external_transaction_id: {
//         type: db.Sequelize.STRING,
//         allowNull: true,
//     },
//     informasi_produk: {
//         type: db.Sequelize.JSON,
//         allowNull: false,
//     },
//     alamat_pengiriman: {
//         type: db.Sequelize.STRING,
//         allowNull: false,
//     },
//     informasi_pengiriman: {
//         type: db.Sequelize.STRING,
//         allowNull: false,
//     },
//     status_pengiriman: {
//         type: db.Sequelize.STRING,
//         allowNull: false,
//         defaultValue: 'Dalam Proses'
//     }
// }, {
//     freezeTableName: true,
// });

// Pembelian.Costumers = Pembelian.belongsTo(Costumers, {
//     foreignKey: "user_id",
//     as: "costumers",
// });
// Costumers.Pembelian = Costumers.hasMany(Pembelian, {
//     foreignKey: "user_id",
//     as: "pembelian",
// });

// module.exports = Pembelian;

const db = require("../database");
const Users =require('./users')
const Product = require("./product");

const Pembelian = db.define(
  "pembelian",
  {
    id_pembelian: {
      type: db.Sequelize.INTEGER,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    user_id: {
      type: db.Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: Users,
        key: "user_id",
      },
    },
    product_id: {
      type: db.Sequelize.STRING,
      allowNull: false,
      references: {
        model: Product,
        key: "product_id",
      },
    },
    quantity: {
      type: db.Sequelize.INTEGER,
      allowNull: false,
    },
    total: {
      type: db.Sequelize.DECIMAL(10, 2),
      allowNull: false,
    },
    harga: {
      type: db.Sequelize.DECIMAL(10, 2),
      allowNull: false,
    },
    status_pembayaran: {
      type: db.Sequelize.ENUM("pending", "approved", "rejected", "canceled"),
      allowNull: false,
    },
    metode_pembayaran: {
      type: db.Sequelize.ENUM("bank transfer", "e-wallet", "cod"),
      allowNull: false,
    },
    status_pengiriman: {
      type: db.Sequelize.ENUM("pending", "processing", "shipped", "delivered", "canceled"),
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

Pembelian.belongsTo(Users, {
  foreignKey: "user_id",
  as: "users",
}); // Changed the alias to 'costumers'

Pembelian.belongsTo(Product, {
  foreignKey: "product_id",
  as: "product",
});

module.exports = Pembelian;