
const jwt = require('jsonwebtoken')
const moment = require('moment')
const privateKey = process.env.JWT_PRIVATE_KEY
const { v4: uuidv4 } = require('uuid')
const Mailer = require("../../utils/mailer")
const { genOTP } = require("../../utils/otp")
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

class AuthController {
  
  async login(req, res) {
    
  }

  async register(req, res) {
    
  }
  
  async forgot_password(req, res) {
    
  }

  async verify_otp(req, res){
    
  }

  async change_password(req, res){
    
  }
}

module.exports = AuthController