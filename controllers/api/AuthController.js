const { User, Biodata } = require("../../models")
const jwt = require('jsonwebtoken')
const moment = require('moment')
const privateKey = process.env.JWT_PRIVATE_KEY
const { v4: uuidv4 } = require('uuid')
const Mailer = require("../../utils/mailer")
const { genOTP } = require("../../utils/otp")
const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync(10)
const Validator = require('validatorjs')

class AuthController {
  
  async login(req, res) {
    
  }

  async register(req, res) {
    let rules = {
      name: 'required',
      email: 'required|email',
      password: 'required',
    }

    let validation = new Validator(req.body, rules);
    if(validation.fails()){
      return res.status(422).json({
        status: false,
        message: 'The form is not complete',
        data: validation.errors.all()
      })
    }

    let {email, name, password} = req.body

    let user = await User.findOne({where: {email: email}})
    if(user?.email){
      return res.status(200).json({
        status: false,
        message: 'Email already used'
      })
    }

    let nUser = await User.create({
      uuid: uuidv4(),
      email: email,
      password: bcrypt.hashSync(password, salt)
    })

    let nBiodata = await Biodata.create({
      fullname: name,
      user_id: nUser.id
    })

    return res.status(201).json({
      status: true,
      message: 'Register success, please sign in',
      data: {
        name: nBiodata.fullname,
        email: nUser.email
      }
    })
  }
  
  async forgot_password(req, res) {
    
  }

  async verify_otp(req, res){
    
  }

  async change_password(req, res){
    
  }
}

module.exports = AuthController