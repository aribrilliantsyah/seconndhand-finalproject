const express = require('express')
const router = express.Router()
const path = require('path')
const ProductController = require('../../controllers/api/ProductController')
const Middleware = require('../../middleware/Middleware')
const ctl = new ProductController()
const multer = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `./uploads/product/`)
  },
  filename: function (req, file, cb) {
    let ext = path.extname(file.originalname)
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + ext)
  }
})

const upload = multer({
	storage: storage,
	fileFilter: (req, file, cb) => {
		if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/jpg' || file.mimetype == 'image/png') {
			cb(null, true);
		} else {
			cb(null, false);
			return cb(new Error('Only .png, .jpg and .jpeg format allowed'));
		}
	}
})

router.get(`/product/`, Middleware.verifyJwt, ctl.getAll)
router.get(`/product/:id`, Middleware.verifyJwt, ctl.findByID)
router.post(`/product`, Middleware.verifyJwt, ctl.create)
router.put(`/product/:id`, Middleware.verifyJwt, ctl.update)
router.delete(`/product/:id`, Middleware.verifyJwt, ctl.delete)
router.post(`/product/upload-pics/`, upload.array('pictures', 4), Middleware.verifyJwt, ctl.uploadPics)
router.delete(`/product/delete-pics/:id`, Middleware.verifyJwt, ctl.deletePics)

module.exports = router
