const Users = require('./users')
const Galery = require("./galery");
const Product = require("./product");
const Pembelian =require('./pembelian')
const bcrypt = require("bcrypt");

require("dotenv").config();

const syncModels = async () => {
	try {
		await Users.sync();
		await Product.sync();
		await Galery.sync();
		await Pembelian.sync()


		const users = await Users.findOne({
			where: {
				user_name: process.env.DEFAULT_USER_NAME,
			},
		});

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = bcrypt.hashSync(
			process.env.DEFAULT_USER_PASSWORD,
			salt
		);

		if (!users) {
			await Users.create({
				user_name: process.env.DEFAULT_USER_NAME,
				password: hashedPassword,
				email: process.env.DEFAULT_EMAIL,
				number: process.env.DEFAULT_NUMBER,
			});
		}
	} catch (error) {
		console.log(error);
	}
};

module.exports = {
	syncModels,
	Users,
	Galery,
	Product,
	Pembelian
};

