const express = require('express')
const router = express.Router()
const ProductController = require('../../controllers/api/ProductController')
const Middleware = require('../../middleware/Middleware')
const ctl = new ProductController()

router.get(`/product/`, Middleware.verifyJwt, ctl.getAll)
router.get(`/product/:id`, Middleware.verifyJwt, ctl.findByID)
router.post(`/product`, Middleware.verifyJwt, ctl.create)
router.put(`/product/:id`, Middleware.verifyJwt, ctl.update)
router.delete(`/product/:id`, Middleware.verifyJwt, ctl.delete)

module.exports = router
