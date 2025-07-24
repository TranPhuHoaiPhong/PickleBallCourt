const express = require("express")
const router = express.Router()
const userController = require("../../controllers/UserController")
const { authMiddleWare, authUserMiddleWare, authUserLogoutMiddleWare } = require("../../middleware/authMiddleWare")

router.post('/sign-up', userController.createUser);
router.post('/sign-up/verify', userController.verifyUser);
router.post('/sign-up/verifyCode', userController.verifyCode);
router.post('/sign-in', userController.loginUser)
router.delete('/log-out', authUserLogoutMiddleWare, userController.logoutUser)
router.put('/update-user/:id',userController.updateUser)
router.delete('/delete-user/:id',authMiddleWare, userController.deleteUser)
router.get('/getAll', userController.getAllUser)
router.get('/getDetail', authUserLogoutMiddleWare, userController.getDetail)
router.post('/getRefreshToken', userController.getRefreshToken)


module.exports = router