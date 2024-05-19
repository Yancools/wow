const express = require('express')
const router = new express()
const userRouter = require('./userRouter')
const communicationRouter = require('./communicationRouter')

router.use('/user', userRouter)
router.use('/communication', communicationRouter)

module.exports = router