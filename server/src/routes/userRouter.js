const express = require('express')
const router = new express()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')
const {body} = require('express-validator')

router.post('/registration',
    body('login').isLength({min: 5, max: 32}),
    body('password').isLength({min: 5, max: 32}),
 userController.registration)
router.post('/login', userController.login)
router.post('/logout', userController.logout)
router.get('/refresh', userController.refresh)
router.get('/data', authMiddleware, userController.userData)

module.exports = router