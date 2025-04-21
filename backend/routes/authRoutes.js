const express = require("express")
const router = express.Router()
const authController = require("../controllers/authController")

router.get("/", authController.login)
router.get("/redirect", authController.redirect)

module.exports = router
