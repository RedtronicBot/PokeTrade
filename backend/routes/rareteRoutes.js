const express = require("express")
const router = express.Router()
const rareteController = require("../controllers/rareteController")

const multerRarete = require("../middleware/multer_rarete")
router.get("/", rareteController.getAllRarete)
router.post("/", multerRarete, rareteController.postRarete)

module.exports = router
