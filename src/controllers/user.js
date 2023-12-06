const { Users } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const UserController = {
	login: async (req, res) => {
		const { user_name, password } = req.body;

		try {
			const user = await Users.findOne({
				where: {
					user_name: user_name,
				},
			});

			if (!user)
				return res
					.status(404)
					.json({ status: "failed", message: "User not found" });

			const validPassword = await bcrypt.compare(password, user.password);

			if (!validPassword)
				return res
					.status(401)
					.json({ status: "failed", message: "Invalid password" });

			const token = jwt.sign(
				{ user_name: user.user_name },
				process.env.JWT_SECRET,
				{ expiresIn: process.env.JWT_EXPIRES_IN }
			);

			res.status(200).json({
				status: "success",
				message: "Login successful",
				data: {
					user_name: user.user_name,
					number: user.number,
					token: token,
				},
			});
		} catch (error) {
			console.log(error);
			res.status(500).json({ message: "Error login" });
		}
	},
	register: async (req, res) => {
		const { user_name, password, number,email } = req.body;

		try {
			const validateUserName = await Users.findOne({
				where: {
					user_name,
				},
			});

			if (validateUserName)
				return res
					.status(409)
					.json({ status: "failed", message: "User already exists" });

			const user = await Users.create({
				user_name,
				password: bcrypt.hashSync(password, 10),
				number,
				email,
			});

			if (!user)
				return res
					.status(500)
					.json({ status: "failed", message: "Error creating user" });

			const token = jwt.sign(
				{ user_name: user.user_name },
				process.env.JWT_SECRET,
				{ expiresIn: process.env.JWT_EXPIRES_IN }
			);

			res.status(201).json({
				status: "success",
				message: "User created successfully",
				data: {
					user_name: user.user_name,
					number: user.number,
					token,
				},
			});
		} catch (err) {
			console.log(err);
			res.status(500).json({ message: "Error creating user" });
		}
	},
	detail: async (req, res) => {
		const { user_name } = req.user;
		try {
			const user = await Users.findOne({
				where: {
					user_name,
				},
				attributes: {
					exclude: ["password"],
				},
			});
			if (!user)
				return res
					.status(500)
					.json({ status: "failed", message: "Error getting user" });

			res.status(200).json({
				status: "success",
				message: "User retrieved successfully",
				data: {
					user_name: user.user_name,
					number: user.number,
				},
			});
		} catch (err) {
			console.log(err);
			res.status(500).json({ message: "Error getting user" });
		}
	},
	update: async (req, res) => {
		const { password, number } = req.body;
		const { user_name } = req.user;
		try {
			const phoneNumberRegex = /^(62\d{8,13})$/;

			if (number && !phoneNumberRegex.test(number)) {
				return res
					.status(400)
					.json({ status: "failed", message: "Invalid phone number" });
			}

			const user = await Users.update(
				{
					...(password && { password: bcrypt.hashSync(password, 10) }),
					...(number && { number }),
				},
				{
					where: {
						user_name,
					},
				}
			).then(() => Users.findOne({ where: { user_name } }));

			if (!user)
				return res
					.status(500)
					.json({ status: "failed", message: "Error updating user" });

			res.status(200).json({
				status: "success",
				message: "User updated successfully",
				data: {
					user_name: user.user_name,
					number: user.number,
				},
			});
		} catch (err) {
			console.log(err);
			res.status(500).json({ message: "Error updating user" });
		}
	},
	delete: async (req, res) => {
		const { user_name } = req.user;
		try {
			const user = await Users.destroy({
				where: {
					user_name,
				},
			});
			if (!user)
				return res
					.status(500)
					.json({ status: "failed", message: "Error deleting user" });

			res.status(200).json({
				status: "success",
				message: "User deleted successfully",
			});
		} catch (err) {
			console.log(err);
			res.status(500).json({ message: "Error deleting user" });
		}
	},
};

module.exports = UserController;
