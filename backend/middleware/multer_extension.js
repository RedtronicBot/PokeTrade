const multer = require("multer")

/*Configuration de multer*/
const storage = multer.diskStorage({
	destination: (req, file, callback) => {
		callback(null, "extensions")
	},
	filename: (req, file, callback) => {
		callback(null, file.originalname)
	},
})

module.exports = multer({ storage: storage }).single("image")
