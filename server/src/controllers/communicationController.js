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
                return next(ApiError.badRequest(`Недопустимый никнейм собеседника (от 5 до 16 символов).`, errors.array()))
            }
            const {companionNickname, message} = req.body
            const authorId = req.user.id
            const result = await communicationService.createChat(companionNickname, authorId, message)
            return res.json(result)
        } catch (error) {
            next(error)
        }
    }

    async createConversation(req, res, next) {
        try {
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return next(ApiError.badRequest(`Недопустимый никнейм собеседников (от 5 до 16 символов) или недопустимое название беседы (от 1 до 16 символов).`, errors.array()))
            }
            const {companionsNicknames, title} = req.body
            const authorId = req.user.id
            const result = await communicationService.createConversation(companionsNicknames, authorId, title)
            return res.json(result)
        } catch (error) {
            next(error)
        }
    }



    async addUserConversation(req, res, next) {
        try {
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return next(ApiError.badRequest(`Пустой идентификатор чата или недопустимый никнейм (от 5 до 16 символов).`, errors.array()))
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
                return next(ApiError.badRequest(`Пустой идентификатор чата или недопустимый никнейм (от 5 до 16 символов).`, errors.array()))
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
                return next(ApiError.badRequest(`Пустой идентификатор чата или недопустимое название беседы (от 1 до 16 символов).`, errors.array()))
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
                return next(ApiError.badRequest(`Пустой идентификатор чата.`, errors.array()))
            }
            const userId = req.user.id
            const {chatId} = req.body
            const {photo} = req.files
            const title = photo.name.lastIndexOf('.');
            const fileType = photo.name.substring(title + 1);
            const types = ['svg', 'jpg', 'png']
            if (!types.includes(fileType)){
                return next(ApiError.badRequest('Допустимые форматы изображений .svg, .png, .jpg'))
            }
            let fileName = uuid.v4() + `.${fileType}`
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
                return next(ApiError.badRequest(`Пустой идентификатор чата.`, errors.array()))
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
            const userId = req.user.id
            const chatId = req.params
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
                return next(ApiError.badRequest(`Пустой идентификатор чата.`, errors.array()))
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
                return next(ApiError.badRequest(`Пустой идентификатор сообщения.`, errors.array()))
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
                return next(ApiError.badRequest(`Пустой идентификатор сообщения.`, errors.array()))
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
                return next(ApiError.badRequest(`Пустой идентификатор сообщения.`, errors.array()))
            }
            const userId = req.user.id
            const {content, chatId} = req.body
            try {
                const {file} = req.files
                if(!file && !content){
                    return next(ApiError.badRequest('Сообщение не может быть пустым.'))
                }
                const title = file.name.lastIndexOf('.');
                const fileType = file.name.substring(title + 1);
                let fileName = uuid.v4() + `.${fileType}`
                file.mv(path.resolve(__dirname, '..', 'static', fileName))
                await communicationService.createMessage(content, userId, chatId, fileName)
                return res.status(200).send()
            } catch (error) {
                await communicationService.createMessage(content, userId, chatId)
                return res.status(200).send()
            }
        } catch (error) {
            next(error)
        }
    }

}
module.exports = new communicationController()