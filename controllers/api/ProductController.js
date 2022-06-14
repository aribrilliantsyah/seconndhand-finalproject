const { Product, User, Category } = require("../../models");
const Validator = require("validatorjs");

class ProductController {
	//read all
	async getAll(req, res) {
		let qRes = await Product.findAll({
			include: [
				{
					model: Category,
					as: 'category'
				},
				{
					model: User,
					as: "user",
				},
			],
		});

		return res.status(200).json({
			status: true,
			data: qRes,
		});
	}

	//read single
	async findByID(req, res) {
		let qRes = await Product.findOne({
			include: [
				{
					model: Category,
					as: 'category'
				},
				{
					model: User,
					as: "user",
				},
			],
			where: {id: req.params.id},
		});

		return res.status(200).json({
			status: true,
			data: qRes,
		});
	}

	//create
	async create(req, res) {
		let rules = {
			product: "required",
			price: "required",
			category_id: "required",
			published: "required",
			description: "required",
			seller_id: "required",
		};

		let validation = new Validator(req.body, rules);
		if (validation.fails()) {
			return res.status(422).json({
				status: false,
				message: "The form is not complete",
				data: validation.errors.all(),
			});
		}

		let { product, price, category_id, published, description, seller_id } = req.body;

		let category = await Category.findOne({where: {id: category_id}});
		if (!category?.category) {
			return res.status(200).json({
				status: false,
				message: "Category not found",
			});
		}

		let user = await User.findOne({where: {id: seller_id}});
		if (!user?.email) {
			return res.status(200).json({
				status: false,
				message: "User not found",
			});
		}

		let qRes = await Product.create({
			product,
			price,
			category_id,
			published,
			description,
			seller_id,
		});

		if (qRes?.id) {
			return res.status(201).json({
				status: true,
				message: "Create Successfully",
				data: qRes,
			});
		}

		return res.status(200).json({
			status: false,
			message: "Create Failed",
		});
	}

	//update
	async update(req, res) {
		let rules = {
			product: "required",
			price: "required",
			category_id: "required",
			published: "required",
			description: "required",
			seller_id: "required",
		};

		let validation = new Validator(req.body, rules);
		if (validation.fails()) {
			return res.status(422).json({
				status: false,
				message: "The form is not complete",
				data: validation.errors.all(),
			});
		}

		let { product, price, category_id, published, description, seller_id } = req.body;

		let itemProduct = await Product.findOne({where: {id: req.params.id}});
		if (!itemProduct?.product) {
			return res.status(200).json({
				status: false,
				message: "Data not found",
			});
		}

		let category = await Category.findOne({where: {id: category_id}});
		if (!category?.category) {
			return res.status(200).json({
				status: false,
				message: "Category not found",
			});
		}

		let user = await User.findOne({where: {id: seller_id}});
		if (!user?.email) {
			return res.status(200).json({
				status: false,
				message: "User not found",
			});
		}

		let data = {
			product,
			price,
			category_id,
			published,
			description,
			seller_id,
		};

		let qRes = await Product.update(data, {
			where: {id: req.params.id},
		});

		if (qRes) {
			return res.status(200).json({
				status: true,
				message: "Update Successfully",
				data: data,
			});
		}

		return res.status(200).json({
			status: false,
			message: "Update Failed",
		});
	}

	//delete
	async delete(req, res) {
		let product = await Product.findOne({where: {id: req.params.id}});
		if (!product?.product) {
			return res.status(200).json({
				status: false,
				message: "Data not found",
			});
		}

		let qRes = await Product.destroy({
			where: {id: req.params.id},
		});

		if (qRes) {
			return res.status(200).json({
				status: true,
				message: "Delete Successfully",
			});
		}

		return res.status(200).json({
			status: false,
			message: "Delete Failed",
		});
	}
}

module.exports = ProductController;
