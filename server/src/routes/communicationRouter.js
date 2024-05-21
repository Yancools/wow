const express = require('express')
const communicationController = require('../controllers/communicationController')
const authMiddleware = require('../middleware/authMiddleware')
const router = new express()
const {body} = require('express-validator')

router.post('/createChat',
    authMiddleware, 
    body('companionNickname').isLength({min: 5, max: 16}),
    communicationController.createChat
)

router.post('/createConversation',
    authMiddleware, 
    body('companionsNicknames').isLength({min: 5, max: 16}),
    body('title').isLength({min: 1, max: 16}),
    communicationController.createConversation
)
router.post('/addUserConversation',
    authMiddleware, 
    body('chatId').notEmpty(),
    body('userNickname').isLength({min: 5, max: 16}),
    communicationController.addUserConversation
)

router.post('/deleteUserConversation',
    authMiddleware, 
    body('chatId').notEmpty(),
    body('userNickname').isLength({min: 5, max: 16}),
    communicationController.deleteUserConversation
)
router.post('/editConversationTitle',
    authMiddleware, 
    body('chatId').notEmpty(),
    body('title').isLength({min: 1, max: 16}),
    communicationController.editConversationTitle
)
router.post('/editConversationPhoto',
    authMiddleware, 
    body('chatId').notEmpty(),
    communicationController.editConversationPhoto
)
router.post('/leaveConversation',
    authMiddleware, 
    body('chatId').notEmpty(),
    communicationController.leaveConversation
)
router.get('/chatList',
    authMiddleware,
    communicationController.chatList
)
router.get('/chat/:id',
    authMiddleware,
    communicationController.chat
)

router.post('/deleteChat',
    authMiddleware,
    body('chatId').notEmpty(),
    communicationController.deleteChat
)
router.post('/createMessage',
    authMiddleware, 
    body('chatId').notEmpty(),
    communicationController.createMessage
)
router.post('/deleteMessage',
    authMiddleware,
    body('messageId').notEmpty(),
    communicationController.deleteMessage
)
router.post('/editMessage',
    authMiddleware,
    body('messageId').notEmpty(),
    communicationController.editMessage
)


module.exports = router