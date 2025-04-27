const express = require("express")
const router = express.Router()
const userController = require("../controllers/userController")

router.get("/", userController.getUser)
router.get("/:nom", userController.getOneUser)
router.put("/:nom", userController.modifyCarteUser)

module.exports = router
