const jwt = require('jsonwebtoken')
const privateKey = process.env.JWT_PRIVATE_KEY

class Middleware {

  static verifyJwt(req, res, next){
    const authHeader = req?.headers['authorization']
    if(!authHeader){
      return res.status(401).json({
        status: false,
        message: 'Unauthorized'
      })
    }

    const token = authHeader && authHeader.split(' ')[1]
    if(authHeader.split(' ')[0] != 'Bearer') return res.status(422).json({
      status: false,
      message: 'Invalid Bearer Token'
    })

    if (token == null) return res.status(401).json({
      status: false,
      message: 'Unauthorized'
    })

    jwt.verify(token, privateKey, (err, user) => {
      if (err) return res.status(403).json({
        message: 'Forbidden'
      })

      req.user = user
      next()
    })
  }
  
}

module.exports = Middleware