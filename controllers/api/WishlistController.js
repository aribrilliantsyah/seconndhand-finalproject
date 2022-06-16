const { Wishlist, User, Product } = require("../../models");
const Validator = require("validatorjs");

class WishlistController {
	//read all
	async getAll(req, res) {
		let qRes = await Wishlist.findAll({
			include: [
				{
					model: User,
					as: "user",
				},
				{
					model: Product,
					as: 'product'
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
		let qRes = await Wishlist.findOne({
			include: [
				{
					model: User,
					as: "user",
				},
				{
					model: Product,
					as: 'product'
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
			product_id: "required",
			user_id: "required",
		};

		let validation = new Validator(req.body, rules);
		if (validation.fails()) {
			return res.status(422).json({
				status: false,
				message: "The form is not complete",
				data: validation.errors.all(),
			});
		}

		let { product_id, user_id } = req.body;

		let product = await Product.findOne({where: {id: product_id}});
		if (!product?.product) {
			return res.status(200).json({
				status: false,
				message: "Product not found",
			});
		}

		let user = await User.findOne({where: {id: user_id}});
		if (!user?.email) {
			return res.status(200).json({
				status: false,
				message: "User not found",
			});
		}

		let qRes = await Wishlist.create({
			product_id,
			user_id,
			createdBy: req.user.id
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

	//delete
	async delete(req, res) {
		let wishlist = await Wishlist.findOne({where: {id: req.params.id}});
		if (!wishlist?.id) {
			return res.status(200).json({
				status: false,
				message: "Data not found",
			});
		}

		let qRes = await Wishlist.destroy({
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

module.exports = WishlistController;
