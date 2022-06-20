const { Transaction, User, Product, ProductPicture } = require("../../models")
const Validator = require('validatorjs')
const Sequelize = require('sequelize');
const Op = Sequelize.Op

class TransactionController {
  //read all
  async getAll(req, res){
    let qRes = [];
    let page = req.query.page
    let limit = req.query.limit || 10
    let offset = (page - 1) * limit
    
    let qWhere = {}
    if(req.query.seller_id != undefined) qWhere.seller_id = req.query.seller_id
    if(req.query.buyer_id != undefined) qWhere.buyer_id = req.query.buyer_id
    if(req.query.bid_status != undefined) qWhere.bid_status = req.query.bid_status
    if(req.query.transaction_status != undefined) qWhere.transaction_status = req.query.transaction_status

    let qWhereProduct;
    if(req.query.product) qWhereProduct.product = { [Op.like]: `%${req.query.product}%`}  
    
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
      qRes = await Transaction.findAll({
        include: [
          {
            model: User,
            as: 'buyer',   
            attributes: ['id', 'uuid', 'email']
          },
          {
            model: User,
            as: 'seller',   
            attributes: ['id', 'uuid', 'email']
          },
          {
            model: Product,
            as: 'product',   
            attributes: ['id', 'product', 'price', 'category_id', 'status'],
            where: qWhereProduct,
            include: [
              {
                product: ProductPicture,
                as: 'product',
                attributes: ['id', 'pictures'],
              }
            ]
          },
        ],
        order: qOrder,
        where: qWhere
      })
    }else{
      qRes = await Transaction.findAll({
        offset: offset,
        limit: limit,
        include: [
          {
            model: User,
            as: 'buyer',   
            attributes: ['id', 'uuid', 'email']
          },
          {
            model: User,
            as: 'seller',   
            attributes: ['id', 'uuid', 'email']
          },
          {
            model: Product,
            as: 'product',   
            attributes: ['id', 'product', 'price', 'category_id', 'status'],
            where: qWhereProduct,
            include: [
              {
                product: ProductPicture,
                as: 'product',
                attributes: ['id', 'pictures'],
              }
            ]
          },
        ],
        order: qOrder,
        where: qWhere
      })
    }

    return res.status(200).json({
      status: true,
      data: qRes
    })
  }

  //read single
  async findByID(req, res){
    let qRes = await Transaction.findOne({
      include: [
        {
          model: User,
          as: 'buyer',   
          attributes: ['id', 'uuid', 'email']
        },
        {
          model: User,
          as: 'seller',   
          attributes: ['id', 'uuid', 'email']
        },
        {
          model: Product,
          as: 'product',   
          attributes: ['id', 'product', 'price', 'category_id', 'status'],
          include: [
            {
              product: ProductPicture,
              as: 'product',
              attributes: ['id', 'pictures'],
            }
          ]
        },
      ],
      where: {id: req.params.id}
    })

    return res.status(200).json({
      status: true,
      data: qRes
    })
  }

  //
  async buyerBid(req, res){
    let rules = {
      buyer_id: 'required',
      product_id: 'required',
      bid_price: 'required'
    }

    let validation = new Validator(req.body, rules)
    if(validation.fails()){
      return res.status(422).json({
        status: false,
        message: 'The form is not complete',
        data: validation.errors.all()
      })
    }

    
    let { buyer_id, product_id, bid_price } = req.body
    
    let buyer = await User.findOne({where: {id: buyer_id}})
    if(!buyer?.email){
      return res.status(200).json({
        status: false,
        message: 'User not found',
      })
    }

    let product = await Product.findOne({where: {id: product_id}})
    if(!product?.seller_id){
      return res.status(200).json({
        status: false,
        message: 'Product not found',
      })
    }
    
    if(product?.seller_id == buyer_id){
      return res.status(200).json({
        status: false,
        message: `Can't bid on your own product`,
      })
    }

    
    let qRes = await Transaction.create({
      product_id: product_id,
      bid_price: bid_price,
      bid_status: 0,
      transaction_status: 0,
      seller_id: product?.seller_id,
      buyer_id: buyer_id,
      createdBy: req.user.id,
      updatedBy: req.user.id
    })
    
    let product_picture = await PictureProduct.findOne({where: {product_id: product_id}})
    await Notification.create({
      'user_id': product.seller_id,
      'title': 'Penawaran Produk',
      'message': `${product?.product}\n Rp${product?.price}\n Ditawar Rp${bid_price}`,
      'path': `transaction/${qRes.id}`,
      'picture': `${product_picture?.picture}`
    })

    if(qRes?.id) {
      return res.status(201).json({
        status: true,
        message: 'Create Successfully',
        data: qRes
      })
    }

    return res.status(200).json({
      status: false,
      message: 'Create Failed',
    })
  }

  async sellerChangeStatusBid(req, res){

  }

  async sellerChangeStatusTransaction(req, res){

  }

  async delete(req, res){

  }
}


module.exports = TransactionController