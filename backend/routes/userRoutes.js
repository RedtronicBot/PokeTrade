const express = require("express")
const router = express.Router()
const userController = require("../controllers/userController")

router.get("/", userController.getUser)
router.get("/:name", userController.getOneUser)
router.put("/:name", userController.modifyCarteUser)

module.exports = router
