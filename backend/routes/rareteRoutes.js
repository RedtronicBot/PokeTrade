const express = require("express")
const router = express.Router()
const rareteController = require("../controllers/rareteController")

const multerRarete = require("../middleware/multer_rarete")
router.get("/", rareteController.getAllRarete)
router.post("/", multerRarete, rareteController.postRarete)
router.put("/:id", multerRarete, rareteController.modifyRarete)
router.delete("/", rareteController.deleteRarete)

module.exports = router
