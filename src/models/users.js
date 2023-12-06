const db = require('../database');

const Users = db.define('users', {
  user_id: {
    type: db.Sequelize.INTEGER ,
    allowNull: false,
    primaryKey: true,
    autoIncrement:true,
  },

  user_name: {
  type: db.Sequelize.STRING,
  allowNull: false,
 
},
  password: {
  type: db.Sequelize.STRING,
  allowNull: false
},
  email: {
  type: db.Sequelize.STRING,
  allowNull: true
}, 
number: {
  type: db.Sequelize.STRING, 
  allowNull: true, 
},


}, {
  freezeTableName: true,
})


module.exports = Users;