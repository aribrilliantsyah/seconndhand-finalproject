const express = require('express')
const router = express.Router()
const BiodataController = require('../../controllers/api/BiodataController')
const Middleware = require('../../middleware/Middleware')
const ctl = new BiodataController()

router.get(`/biodata/:user_id`, Middleware.verifyJwt, ctl.findByUserID)
router.put(`/biodata/:user_id`, Middleware.verifyJwt, ctl.update)

module.exports = router
