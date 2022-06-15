const { Notification, User } = require("../../models")
const Validator = require('validatorjs')

class NotificationController {
  //read all
  async getAll(req, res){
    let qRes = await Notification.findAll({
      include: [
        {
          model: User,
          as: 'user'
        }
      ]
    })

    return res.status(200).json({
      status: true,
      data: qRes
    })
  }

  //read single
  async findByID(req, res){
    let qRes = await Notification.findOne({
      include: [
        {
          model: User,
          as: 'user'
        }
      ],
      where: {id: req.params.id}
    })

    return res.status(200).json({
      status: true,
      data: qRes
    })
  }

  //create
  async create(req, res){
    let rules = {
      user_id: 'required',
      title: 'required', 
      message: 'required',
      path: 'required',
      image: 'required',
    }

    let validation = new Validator(req.body, rules)
    if(validation.fails()){
      return res.status(422).json({
        status: false,
        message: 'The form is not complete',
        data: validation.errors.all()
      })
    }

    
    let { user_id, title, message, path, image } = req.body
    
    let user = await User.findOne({where: {id: user_id}})
    if(!user?.email){
      return res.status(200).json({
        status: false,
        message: 'User not found',
      })
    }

    let qRes = await Notification.create({
      user_id: user_id,
      title: title,
      message: message,
      path: path,
      image: image
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

  //update
  async update(req, res){
    let rules = {
      user_id: 'required',
      title: 'required', 
      message: 'required',
      path: 'required',
      image: 'required',
    }

    let validation = new Validator(req.body, rules)
    if(validation.fails()){
      return res.status(422).json({
        status: false,
        message: 'The form is not complete',
        data: validation.errors.all()
      })
    }
    
    let { user_id, title, message, path, image } = req.body

    let notification = await Notification.findOne({where: {id: req.params.id}})
    if(!notification?.title){
      return res.status(200).json({
        status: false,
        message: 'Data not found',
      })
    }

    let user = await User.findOne({where: {id: user_id}})
    if(!user?.email){
      return res.status(200).json({
        status: false,
        message: 'User not found',
      })
    }

    let data = {
      user_id: user_id,
      title: title,
      message: message,
      path: path,
      image: image
    }

    let qRes = await Notification.update(data, {
      where: {id: req.params.id}
    })

    if(qRes) {
      return res.status(200).json({
        status: true,
        message: 'Update Successfully',
        data: data
      })
    }

    return res.status(200).json({
      status: false,
      message: 'Update Failed',
    })
  }

  //delete
  async delete(req, res){
    let notification = await Notification.findOne({where: {id: req.params.id}})
    if(!notification?.title){
      return res.status(200).json({
        status: false,
        message: 'Data not found',
      })
    }

    let qRes = await Notification.destroy({
      where: {id: req.params.id}
    })

    if(qRes){
      return res.status(200).json({
        status: true,
        message: 'Delete Successfully',
      })
    }

    return res.status(200).json({
      status: false,
      message: 'Delete Failed',
    })
  }
}


module.exports = NotificationController