const express = require('express')
const router = express.Router()
const path = require('path')
const BiodataController = require('../../controllers/api/BiodataController')
const Middleware = require('../../middleware/Middleware')
const ctl = new BiodataController()
const multer = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `./uploads/profile/`)
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

router.get(`/biodata/:user_id`, Middleware.verifyJwt, ctl.findByUserID)
router.put(`/biodata/:user_id`, Middleware.verifyJwt, ctl.update)
router.post(`/biodata/upload-profile-pic/`, upload.single('profile_picture'), Middleware.verifyJwt, ctl.uploadProfilePicture)

module.exports = router