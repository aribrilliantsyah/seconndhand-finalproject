const { Product, User, Category, ProductPicture } = require("../../models");
const Validator = require("validatorjs");
const Sequelize = require('sequelize');
const Op = Sequelize.Op

class ProductController {
	//read all
	async getAll(req, res) {
		let qRes = [];
		let page = req.query.page
		let limit = req.query.limit || 10
		let offset = (page - 1) * limit

		let qWhere = {}
		if(req.query.product) qWhere.product = { [Op.like]: `%${req.query.product}%`}

		let qOrder = []
		if(req.query.order != undefined){
			let order = req.query.order
			order = order.split(',')
			if(order.length > 0){
				order.forEach((element, i) => {
					let column = element.split(':')
					if(column.length > 0){
						if(column[1] == 'ASC' || column[1] == 'DESC'){
							qOrder[i] = [
								column[0], column[1]
							]
						}
					}
				})
			}
		}

		if(!page){
			qRes = await Product.findAll({
				include: [
					{
						model: Category,
						as: 'category'
					},
					{
						model: User,
						as: "user",
						attributes: ['id', 'uuid', 'email']
					},
				],
				order: qOrder,
				where: qWhere
			});
		}else{
			qRes = await Product.findAll({
				offset: offset,
				limit: limit,
				include: [
					{
						model: Category,
						as: 'category'
					},
					{
						model: User,
						as: "user",
						attributes: ['id', 'uuid', 'email']
					},
				],
				order: qOrder,
				where: qWhere
			});
		}

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

		if(seller_id){
			let user = await User.findOne({where: {id: seller_id}});
			if (!user?.email) {
				return res.status(200).json({
					status: false,
					message: "User not found",
				});
			}
		}

		let qRes = await Product.create({
			product,
			price,
			category_id,
			published,
			description,
			seller_id: seller_id?seller_id:req.user.id,
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

	//update
	async update(req, res) {
		let rules = {
			product: "required",
			price: "required",
			category_id: "required",
			published: "required",
			description: "required",
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

		if(seller_id){
			let user = await User.findOne({where: {id: seller_id}});
			if (!user?.email) {
				return res.status(200).json({
					status: false,
					message: "User not found",
				});
			}
		}

		let data = {
			product,
			price,
			category_id,
			published,
			description,
			seller_id: seller_id?seller_id:req.user.id,
			updatedBy: req.user.id
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

	//upload gambar
	async uploadPics(req, res) {
		if(req?.files == undefined){
			return res.status(200).json({
				'message': 'Picture(s) Required'
			})
		}
		let id = req.params.id

		const checkBefore = (id, success) => {
			Product.findOne({where: {id: id }}).then((product) => {
				if(!product){
					return res.status(200).json({
						'message': 'Product not found',
					})
				}
				return success(product)
			})
		} 
		
		checkBefore(id, async (data) => {
			let qRes = []
			for(let i = 0; i < req.files.length; i++){
				qRes[i] = await ProductPicture.create({
					product_id: id,
					picture: req.files[i].filename,
					createdBy: data.seller_id
				})
			}

			if (qRes) {
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
		})
	}

	//delete gambar
	async deletePics(req, res) {
		let productPics = await ProductPicture.findAll({where: {product_id: req.params.product_id}});
		if (productPics.length == 0) {
			return res.status(200).json({
				status: false,
				message: "Data not found",
			});
		}

		let qRes = await ProductPicture.destroy({
			where: {product_id: req.params.product_id},
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
