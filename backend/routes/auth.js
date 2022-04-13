const express = require('express')
const router = express.Router()
const controllerUser = require('../controllers/users')
const auth = require('../middleware/auth')

router.post('/signup', controllerUser.signup)
router.post('/login',controllerUser.login)
router.get('/me',auth, controllerUser.me)
router.get("/:id", auth, controllerUser.getUser)
router.delete("/:id", auth, controllerUser.deleteUser)
module.exports = router