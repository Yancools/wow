const communicationService = require("../service/communicationService")
const {validationResult} = require('express-validator')
const ApiError = require('../error/ApiError')
const uuid = require('uuid')
const path = require('path')
class communicationController {
    async createChat(req, res, next) {
        try {
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return next(ApiError.badRequest(`Ошибка`, errors.array()))
            }
            const {companionNickname, message} = req.body
            const authorId = req.user.id
            await communicationService.createChat(companionNickname, authorId, message)
            return res.status(200).send()
        } catch (error) {
            next(error)
        }
    }

    async createConversation(req, res, next) {
        try {
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return next(ApiError.badRequest(`Ошибка`, errors.array()))
            }
            const {companionsNicknames, title} = req.body
            const authorId = req.user.id
            await communicationService.createConversation(companionsNicknames, authorId, title)
            return res.status(200).send()
        } catch (error) {
            next(error)
        }
    }



    async addUserConversation(req, res, next) {
        try {
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return next(ApiError.badRequest(`Ошибка`, errors.array()))
            }
            const userId = req.user.id
            const {userNickname, chatId} = req.body
            await communicationService.addUserConversation(userNickname, chatId, userId)
            return res.status(200).send()
        } catch (error) {
            next(error)
        }
    }

    
    async deleteUserConversation(req, res, next){
        try {
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return next(ApiError.badRequest(`Ошибка`, errors.array()))
            }
            const userId = req.user.id
            const {userNickname, chatId} = req.body
            await communicationService.deleteUserConversation(userNickname, chatId, userId)
            return res.status(200).send()
        } catch (error) {
            next(error)
        }
    }
    async editConversationTitle(req, res, next){
        try {
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return next(ApiError.badRequest(`Ошибка`, errors.array()))
            }
            const userId = req.user.id
            const {title, chatId} = req.body
            await communicationService.editConversationTitle(title, chatId, userId)
            return res.status(200).send()
        } catch (error) {
            next(error)
        }
    }
    async editConversationPhoto(req, res, next){
        try {
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return next(ApiError.badRequest(`Ошибка`, errors.array()))
            }
            const userId = req.user.id
            const {chatId} = req.body
            const {photo} = req.files
            let fileName = uuid.v4() + ".jpg"
            photo.mv(path.resolve(__dirname, '..', 'static', fileName))
            await communicationService.editConversationPhoto(fileName, chatId, userId)
            return res.status(200).send()
        } catch (error) {
            next(error)
        }
    }

    async leaveConversation(req, res, next){
        try {
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return next(ApiError.badRequest(`Ошибка`, errors.array()))
            }
            const userId = req.user.id
            const {chatId} = req.body
            await communicationService.leaveConversation(chatId, userId)
            return res.status(200).send()
        } catch (error) {
            next(error)
        }
    }
    async chatList(req, res, next) {
        try {
            const userId = req.user.id
            const chats = await communicationService.chatList(userId)
            return res.json(chats)
            
        } catch (error) {
            next(error)
        }
    }
    async chat(req, res, next) {
        try {
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return next(ApiError.badRequest(`Ошибка`, errors.array()))
            }
            const userId = req.user.id
            const {chatId} = req.body
            const chats = await communicationService.chat(chatId, userId)
            return res.json(chats)
        } catch (error) {
            next(error)
        }
    }


    async deleteChat(req, res, next) {
        try {
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return next(ApiError.badRequest(`Ошибка`, errors.array()))
            }
            const {chatId} = req.body
            await communicationService.deleteChat(chatId)
            return res.status(200).send()
        } catch (error) {
            next(error)
        }
    }
    async deleteMessage(req, res, next) {
        try {
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return next(ApiError.badRequest(`Ошибка`, errors.array()))
            }
            const userId = req.user.id
            const {messageId} = req.body
            await communicationService.deleteMessage(messageId, userId)
            return res.status(200).send()
        } catch (error) {
            next(error)
        }
    }
    async editMessage(req, res, next) {
        try {
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return next(ApiError.badRequest(`Ошибка`, errors.array()))
            }
            const userId = req.user.id
            const {content, messageId} = req.body
            await communicationService.editMessage(content, messageId, userId)
            return res.status(200).send()
        } catch (error) {
            next(error)
        }
    }
    async createMessage(req, res, next) {
        try {
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return next(ApiError.badRequest(`Ошибка`, errors.array()))
            }
            const userId = req.user.id
            const {content, chatId} = req.body
            await communicationService.createMessage(content, userId, chatId)
            return res.status(200).send()
        } catch (error) {
            next(error)
        }
    }
}
module.exports = new communicationController()