const formidable = require("formidable");
const { nanoid } = require("nanoid");
const fs = require("fs");
const mime = require("mime");
const path = require("path");

const Products = require("../models/product");
const Galery = require("../models/galery");

const isEmpty = (data) => {
	for (const key in data) {
		if (data[key]) {
			return false;
		}
	}
	return true;
};

const create = async (req, res) => {
	try {
		const product_id = nanoid();

		const uploadFolder = `${__dirname}/../public/images`;

		// validation if folder did not exist
		if (!fs.existsSync(uploadFolder)) fs.mkdirSync(uploadFolder);

		const form = new formidable.IncomingForm();

		form.multiples = true;
		form.uploadDir = uploadFolder;
		form.maxFileSize = 3 * 1024 * 1024;

		form.parse(req, async (err, fields, files) => {
			if (err) {
				console.log("error parsing the file");
				return res.status(400).json({
					status: "Failed",
					message: "There was an error parsing the file",
					error: err,
				});
			}
			const { product_name, product_price, product_description } = fields;

			if (!files.images)
				// if there is no file
				return res.status(400).json({
					status: "Failed",
					message: "an image must be included when making products",
				});

			if (!product_name || !product_price || !product_description) {
				// validation when the field is not fully filled
				return res.status(400).json({
					status: "Failed",
					message: "There is an empty field",
				});
			}

			// if there is a image
			const file = files.images;

			// validation extension
			const getExtension = mime.getExtension(file.mimetype);
			if (
				getExtension !== "png" &&
				getExtension !== "jpg" &&
				getExtension !== "jpeg"
			) {
				return res.status(400).json({
					status: "Failed",
					message: "The file type must be png, jpeg, or jpg",
				});
			}

			if (files.images.size >= 3 * 1024 * 1024) {
				// validation max file size
				return res.status(400).json({
					status: "Failed",
					message: "file size should be smaller than 3MB",
				});
			}

			// get new filename
			const originalFilename = file.newFilename;
			const finalFilename = `${originalFilename}.${getExtension}`;

			try {
				// renames the file in the directory
				fs.renameSync(file.filepath, path.join(uploadFolder, finalFilename));
			} catch (error) {
				console.log(error);
			}

			try {
				// stores the data
				const product = await Products.create(
					{
						product_id,
						product_name,
						product_price,
						product_description,
						galery: {
							img_url: `/images/${finalFilename}`,
						},
					},
					{
						include: {
							association: Products.Galery,
						},
					}
				);

				res.status(201).json({
					status: "Success",
					message: "the product created successfully",
					data: product,
				});
			} catch (err) {
				res.status(500).json({
					status: "Error from the server",
					message: err.message,
				});
			}
		});
	} catch (err) {
		res.status(500).json({
			status: "Error from the server",
			message: err.message,
		});
	}
};

const getAll = async (req, res) => {
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

		if (isEmpty(product))
			return res
				.status(404)
				.json({ status: "Failed", message: "There is no any product" });

		res.status(200).json({
			status: "Success",
			message: "success to get all the products",
			data: product,
		});
	} catch (err) {
		res.status(500).json({
			status: "Error from the server",
			message: err.message,
		});
	}
};

const getSpesific = async (req, res) => {
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

		res.status(200).json({
			status: "Success",
			message: "Product found",
			data: product,
		});
	} catch (err) {
		res.status(500).json({
			status: "Error from the server",
			message: err.message,
		});
	}
};

const update = async (req, res) => {
	try {
		const { id } = req.params;
		const oldProduct = await Products.findByPk(id);

		if (!oldProduct)
			// when the product not found
			return res.status(404).json({
				status: "Failed",
				message: "The product not found",
			});

		const uploadFolder = `${__dirname}/../public/images`;

		// validation if folder did not exist
		if (!fs.existsSync(uploadFolder)) fs.mkdirSync(uploadFolder);

		const form = new formidable.IncomingForm();

		form.multiples = true;
		form.uploadDir = uploadFolder;
		form.maxFileSize = 3 * 1024 * 1024;

		form.parse(req, async (err, fields, files) => {
			if (err) {
				console.log("error parsing the file");
				return res.status(400).json({
					status: "Failed",
					message: "There was an error parsing the file",
					error: err,
				});
			}

			for (let key in fields) {
				if (!fields[key]) {
					// when one of the fields is empty
					fields[key] = oldProduct[key];
				}
			}

			if (!files.images) {
				// when there is no file image
				await Products.update(
					{
						product_name: fields.product_name,
						product_price: fields.product_price,
						product_description: fields.product_description,
					},
					{
						where: {
							product_id: id,
						},
					}
				);

				return res.status(200).json({
					status: "Success",
					message: "Success to update the product",
				});
			}

			// if there is a image
			const file = files.images;

			// validation extension
			const getExtension = mime.getExtension(file.mimetype);
			if (
				getExtension !== "png" &&
				getExtension !== "jpg" &&
				getExtension !== "jpeg"
			) {
				return res.status(400).json({
					status: "Failed",
					message: "The file type must be png, jpeg, or jpg",
				});
			}

			if (files.images.size >= 3 * 1024 * 1024) {
				// validation max file size 3MB
				return res.status(400).json({
					status: "Failed",
					message: "file size should be smaller than 3MB",
				});
			}

			// get old image
			const oldImage = await Galery.findAll({
				where: {
					product_id: id,
				},
				attributes: ["img_url"],
			});

			// get new filename
			const originalFilename = file.newFilename;
			const finalFilename = `${originalFilename}.${getExtension}`;
			try {
				// renames the file in the directory
				fs.renameSync(file.filepath, path.join(uploadFolder, finalFilename));

				// remove the previous image
				fs.unlinkSync(
					`${__dirname}/../public${oldImage[0].dataValues.img_url}`
				);
			} catch (err) {
				res.status(500).json({
					status: "Error from the server",
					message: err.message,
				});
			}

			try {
				// update product
				await Products.update(
					{
						product_name: fields.product_name,
						product_price: fields.product_price,
						product_description: fields.product_description,
					},
					{
						where: {
							product_id: id,
						},
					}
				);

				// update galery also
				await Galery.update(
					{
						img_url: `/images/${finalFilename}`,
					},
					{
						where: {
							product_id: id,
						},
					}
				);

				res.status(200).json({
					status: "Success",
					message: "The product updated successfully",
				});
			} catch (err) {
				res.status(500).json({
					status: "Error from the server",
					message: err.message,
				});
			}
		});
	} catch (err) {
		res.status(500).json({
			status: "Error from the server",
			message: err.message,
		});
	}
};

const deleteProduct = async (req, res) => {
	try {
		const { id } = req.params;

		const product = await Products.findByPk(id);
		if (!product)
			// validation
			return res.status(404).json({
				status: "Failed",
				message: "The product not found",
			});

		// get old image
		const oldImage = await Galery.findAll({
			where: {
				product_id: id,
			},
			attributes: ["img_url"],
		});

		// delete gallery
		await Galery.destroy({
			where: {
				product_id: id,
			},
		});

		// delete product
		await Products.destroy({
			where: {
				product_id: id,
			},
		});

		try {
			// remove the previous image
			fs.unlinkSync(`${__dirname}/../public${oldImage[0].dataValues.img_url}`);
		} catch (err) {
			return res.status(500).json({
				status: "Error from the server",
				message: err.message,
			});
		}

		res.status(200).json({
			status: "Success",
			message: "Product deleted Successfully",
		});
	} catch (err) {
		res.status(500).json({
			status: "Error from the server",
			message: err.message,
		});
	}
};

module.exports = { create, getAll, getSpesific, update, deleteProduct };
