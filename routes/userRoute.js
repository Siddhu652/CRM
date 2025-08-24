var express = require("express")
const {authenticate, authorizeRole} = require("../middleware/authMiddleware.js")
const { signup , getusers, updateuser,updatesinglevalue, deleteUser, loginUser} = require("../controllers/userController")
var router = express.Router()

router.post("/add", signup)
router.get("/getusers", authenticate,authorizeRole('admin'), getusers)
router.put('/update_user/:id', authenticate, authorizeRole('admin'),updateuser)
router.patch('/singlevalue/:id', authenticate, authorizeRole('admin'),updatesinglevalue)
router.delete('/delete_user/:id', authenticate, authorizeRole('admin'),deleteUser)
router.post('/login',loginUser)


module.exports = router