const Products = require("../models/product");
const Galery = require("../models/galery");
// constUsersn = require("../models/admin");
const Users =require('../models/users')

const isEmpty = (data) => {
	for (const key in data) {
		if (data[key]) {
			return false;
		}
	}
	return true;
};

const landing = async (req, res) => {
	try {
		const product = await Products.findAll({
			attributes: [
				"product_id",
				"product_name",
				"product_price",
				"product_description",
			],
			include: [
				{
					model: Galery,
					as: "galery",
					attributes: ["img_url"],
				},
			],
		});

		// truncate the "Spesifikasi Description"
		const pattern = "Spesifikasi";
		let truncate_description = "";
		product.map((prd) => {
			if (prd.product_description.indexOf(pattern) >= 0) {
				// if you want to truncate everything after the pattern & pattern itself
				truncate_description = prd.product_description.substr(
					0,
					prd.product_description.indexOf(pattern)
				);
				prd.product_description = truncate_description;
			}
		});

		const wa_number = await Users.findAll({
			attributes: ["number"],
		});

		if (isEmpty(product))
			return res
				.status(404)
				.json({ status: "Failed", message: "There is no any product" });

		res.status(200).json({
			status: "Success",
			message: "Request Success",
			data: product,
			number: wa_number[0].number,
		});
	} catch (err) {
		res.status(500).json({
			status: "Error from the server",
			message: err.message,
		});
	}
};

const getSpesificProduct = async (req, res) => {
	try {
		const { id } = req.params;

		const product = await Products.findOne({
			where: {
				product_id: id,
			},
			attributes: {
				exclude: ["createdAt", "updatedAt"],
			},
			include: [
				{
					model: Galery,
					as: "galery",
					attributes: ["img_url"],
				},
			],
		});

		if (isEmpty(product))
			return res
				.status(404)
				.json({ status: "Failed", message: "Product not found" });

		const wa_number = await Users.findAll({
			attributes: ["number"],
		});

		res.status(200).json({
			status: "Success",
			message: "Request Success",
			data: product,
			number: wa_number[0].number,
		});
	} catch (err) {
		res.status(500).json({
			status: "Error from the server",
			message: err.message,
		});
	}
};

module.exports = { landing, getSpesificProduct };
