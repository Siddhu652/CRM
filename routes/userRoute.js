var express = require("express")
const {authenticate} = require("../middleware/authMiddleware.js")
const { signup , getusers, updateuser,updatesinglevalue, deleteUser, loginUser} = require("../controllers/userController")
var router = express.Router()

router.post("/add", authenticate, signup)
router.get("/getusers", authenticate, getusers)
router.put('/update_user/:id', authenticate,updateuser)
router.patch('/singlevalue/:id', authenticate,updatesinglevalue)
router.delete('/delete_user/:id', authenticate,deleteUser)
router.post('/login',loginUser)


module.exports = router