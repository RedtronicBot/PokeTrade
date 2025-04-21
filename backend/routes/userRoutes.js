const express = require("express")
const router = express.Router()
const userController = require("../controllers/userController")

router.get("/:nom", userController.getUser)
router.put("/:nom", userController.modifyCarteUser)

module.exports = router
