const express = require("express")
const router = express.Router()
const extensionController = require("../controllers/extensionController")

const multerExtension = require("../middleware/multer_extension")
const multerCarte = require("../middleware/multer_carte")

router.get("/", extensionController.getAllExtension)
router.post("/", extensionController.postExtension)
router.post("/image", multerExtension, extensionController.postImageExtension)
router.post("/carte", multerCarte, extensionController.postImageCarte)
router.delete("/", extensionController.deleteExtension)
router.put("/", extensionController.postCarte)
router.put("/:id", extensionController.modifyOneExtension)
module.exports = router
