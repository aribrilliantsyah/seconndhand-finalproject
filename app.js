require('dotenv').config()

const express = require("express")
const moment = require("moment")
const morgan = require("morgan")

const swaggerUi = require('swagger-ui-express')
const path = require('path')
const YAML = require('yamljs')
const fs = require('fs')

const AuthRouterApi = require("./routes/api/AuthRouter")
const NotificationRouter = require("./routes/api/NotificationRouter")
const ProductRouter = require("./routes/api/ProductRouter")

const app = express()
const apiVersion = '/api/v1'
const swaggerDocument = YAML.load('collection.yaml')

//Setup Log
const originalSend = app.response.send
app.response.send = function sendOverWrite(body) {
    originalSend.call(this, body)
    this.resBody = body
}

morgan.token('res-body', (req, res) => {
    if(res.getHeader('Content-Type') == 'application/json; charset=utf-8'){
        if(typeof res.resBody == 'string'){
            return res.resBody        
        }else{
            return JSON.stringify(res.resBody)      
        }
    }
    return JSON.stringify({
        'message': 'Accessing View'
    })
})

morgan.token('req-body', (req, res) => {
    if(res.getHeader('Content-Type') == 'application/json; charset=utf-8'){
        return JSON.stringify(req.body)        
    }
    return null
})

let log_name = '/logs/access_log_'+moment().format('YYYY_MM_DD')+'.log';
// Only for local env
// let accessLogStream = fs.createWriteStream(path.join(__dirname, log_name), { flags: 'a' })
// app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] | @req :req-body => @res :res-body', {
//     stream: accessLogStream
// }))

app.use(express.json())
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.use(apiVersion, AuthRouterApi)
app.use(apiVersion, NotificationRouter)
app.use(apiVersion, ProductRouter)

module.exports = app