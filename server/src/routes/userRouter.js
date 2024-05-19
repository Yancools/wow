const express = require('express')
const router = new express()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')
const {body} = require('express-validator')

router.post('/registration',
    body('login').isLength({min: 5, max: 16}),
    body('password').isLength({min: 5, max: 32}),
    body('firstname').isLength({min: 3, max: 16}), 
    body('lastname').isLength({min: 3, max: 16}), 
    userController.registration
)
router.post('/login',
    body('login').isLength({min: 5, max: 16}),
    body('password').isLength({min: 5, max: 32}),
    userController.login
)
router.post('/logout', 
    authMiddleware, 
    userController.logout
)
router.post('/searchUser',
    body('searchUser').isLength({min: 3}),
    authMiddleware, 
    userController.searchUser
)
router.post('/changePassword', 
    body('password').isLength({min: 5, max: 32}),
    body('newPassword').isLength({min: 5, max: 32}),
    body('confirmNewPassword').isLength({min: 5, max: 32}), 
    authMiddleware, 
    userController.changePassword
)
router.post('/changeLogin', 
    body('login').isLength({min: 5, max: 16}),
    body('newLogin').isLength({min: 5, max: 16}),
    body('password').isLength({min: 5, max: 32}),
    authMiddleware, 
    userController.changeLogin
)
router.post('/changeNickname', 
    body('newNickname').isLength({min: 5, max: 16}),
    authMiddleware, 
    userController.changeNickname
)
router.post('/changeGender', 
    body('newGender').notEmpty(),
    authMiddleware, 
    userController.changeGender
)
router.post('/changeFirstname', 
    body('newFirstname').isLength({min: 3, max: 16}), 
    authMiddleware, 
    userController.changeFirstname
)
router.post('/changeLastname', 
    body('newLastname').isLength({min: 3, max: 16}), 
    authMiddleware, 
    userController.changeLastname
)
router.post('/changePhoto', 
    authMiddleware, 
    userController.changePhoto
)


router.get('/refresh', userController.refresh)
router.get('/data/:nickname', userController.userData)

module.exports = router