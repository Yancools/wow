const ApiError = require("../error/ApiError");
const { Chat, User, ChatList, Message } = require("../models/models");
const sequelize = require('sequelize')
const Op = sequelize.Op;


class CommunicationService {
    async favorites(userId) {
        const title = 'Избранное'
        const photo = 'favorites.jpg'
        const candidate = await Chat.findOne({
            where: {
                title: title
            }, 
            include: {
                model: ChatList,
                where:{
                    userId: userId,
                }
            }
        })
        if(candidate){
            throw ApiError.badRequest('Такой чат уже создан.')
        }
        const authorData = await User.findOne({
            where: {
                id: userId
            }
        })
        if(!authorData){
            throw ApiError.badRequest('Ошибка в получении данных.')
        }
        const chat = await Chat.create({
            authorId: authorData.id
        })
        if(!chat){
            throw ApiError.badRequest('Не удалось создать чат.')
        }
        const result = await ChatList.create({
            chatId: chat.id,
            userId: userId,
        })
        chat.title = title
        chat.photo = photo
        chat.save()
        if(!result) {
            throw ApiError.badRequest('Не удалось добавить чат в список чатов.')
        }
        return true
    }

    async createChat(companionNickname, authorId) {
        if(Array.isArray(companionNickname)){
            throw ApiError.badRequest('В может быть только 2 пользователя.')
        }
        const companionData = await User.findOne({where: {nickname: companionNickname}})
        if(!companionData){
            throw ApiError.badRequest('Такого пользователя не существует.')
        }
        if(companionData.id === authorId){
            const result = this.favorites(authorId)
            return result
        }
        const authorChats = await ChatList.findAll({
            where: {
                userId: authorId
            }
        })
        const arr = []
        authorChats.forEach(result => {
            arr.push(result.dataValues.chatId)
        })
        const candidate = await ChatList.findAll({
            where: {
                chatId: {[Op.in] : arr},
                userId: companionData.id
            }
        })
        if(candidate.length !== 0){
            throw ApiError.badRequest('Такой чат уже создан.')
        }
        const authorData = await User.findOne({
            where: {
                id: authorId
            }
        })
        if(!authorData){
            throw ApiError.badRequest('Ошибка в получении данных.')
        }
        const chat = await Chat.create({
            authorId: authorData.id
        })
        const authorChatList = await ChatList.create({
            chatId: chat.id,
            userId: authorId
        })
        const companionChatList = await ChatList.create({
            chatId: chat.id,
            userId: companionData.id,
        })
        if(!authorChatList || !companionChatList || !chat) {
            throw ApiError.badRequest('Не удалось создать чат.')
        }
        return true
    }


    async createConversation(companionsNicknames, authorId, title) {
        console.log(title)
        if(!Array.isArray(companionsNicknames)){
            throw ApiError.badRequest('В беседе должно быть как минимум 2 участника помимо создателя.')
        }
        const authorData = await User.findOne({
            where: {
                id: authorId
            }
        })
        if(!authorData){
            throw ApiError.badRequest('Ошибка в получении данных пользователя.')
        }
        companionsNicknames.forEach(result => {
            if(result === authorData.nickname){
                throw ApiError.badRequest('Автор чата уже является участником чата, удалите его из списка приглашенных пользователей чата.')
            }
        })
        const conversation = await Chat.create({
            authorId: authorData.id,
            title: title,
            private: false
        })
        await ChatList.create({
            chatId: conversation.id,
            userId: authorData.id
        })
        for(let i = 0; i < companionsNicknames.length; i++){
            const companionData = await User.findOne({
                where: {
                    nickname: companionsNicknames[i]
                }
            })
            if(!companionData){
                this.deleteChat(conversation.id)
                throw ApiError.badRequest('Такого пользователя не существует.')
            }
            await ChatList.create({
                chatId: conversation.id,
                userId: companionData.id,
            })
        }
        return true
    }


    async addUserConversation(userNickname, chatId, userId){
        const userInConversation = await ChatList.findOne({
            where:{
                chatId: chatId,
                userId: userId
            }
        })
        if(!userInConversation){
            throw ApiError.badRequest('Добавлять пользователей в беседу могут только ее участники.')
        }
        const userData = await User.findOne({
            where: {
                nickname: userNickname
            }
        })
        const conversationUser = await ChatList.findOne({
            where: {
                chatId: chatId,
                userId: userData.id
            }
        })
        if(conversationUser){
            throw ApiError.badRequest('Пользователь в этой беседе уже есть.')
        }
        const conversationData = await ChatList.findOne({
            where: {
                chatId: chatId
            },
            include:{
                model: Chat,
                where:{
                    private: false
                }
            }
        })
        if(!conversationData){
            throw ApiError.badRequest('Такой беседы не существует.')
        }
        const addUser = await ChatList.create({
            chatId: chatId,
            userId: userData.id
        })
        if(!addUser){
            throw ApiError.badRequest('Не удалось добавить пользователя в беседу.')
        }
    }

    async deleteUserConversation(userNickname, chatId, userId){
        const authorId = await Chat.findOne({
            where:{
                id: chatId
            },
            attributes:['authorId']
        })
        if(!(userId == authorId.dataValues.authorId)){
            throw ApiError.badRequest('Удалять других пользователей из беседы может только ее создатель.')
        }

        const userData = await User.findOne({
            where: {
                nickname: userNickname
            }
        })
        const deleteUser = await ChatList.destroy({
           where:{
                chatId: chatId,
                userId: userData.dataValues.id
           }
        })
        if(!deleteUser){
            throw ApiError.badRequest('Не удалось удалить пользователя из беседы.')
        }
        return true
    }
    async leaveConversation(chatId, userId){
        const author = await Chat.findOne({
            where:{
                id: chatId
            }
        })
        const leave = await ChatList.destroy({
            where:{
                chatId: chatId,
                userId: userId
            }
        })
        if(!leave){
            throw ApiError.badRequest('Не удалось выйти из беседы.')
        }
        if(author.dataValues.authorId == userId){
            let newAuthorId = 0
            const authorId = await ChatList.findOne({
                order: [['createdAt', 'ASC']],
                where:{
                    chatId: chatId
                }
            })
            newAuthorId = authorId.dataValues.userId
            author.authorId = newAuthorId
            author.save()
        }
        return true
    }
    
    async editConversationTitle(title, chatId, userId){
        const authorId = await Chat.findOne({
            where:{
                id: chatId
            },
            attributes:['authorId']
        })
        if(!(userId == authorId.dataValues.authorId)){
            throw ApiError.badRequest('Менять данные беседы может только ее создатель.')
        }
        const conversation = await Chat.findOne({
            where:{
                id: chatId
            }
        })
        conversation.title = title
        conversation.save()
    }
    async editConversationPhoto(photo, chatId, userId){
        const authorId = await Chat.findOne({
            where:{
                id: chatId
            },
            attributes:['authorId']
        })
        if(!(userId == authorId.dataValues.authorId)){
            throw ApiError.badRequest('Менять данные беседы может только ее создатель.')
        }
        const conversation = await Chat.findOne({
            where:{
                id: chatId
            }
        })
        conversation.photo = photo
        conversation.save()
    }
    async chatList(id) {
        const chatsData = await ChatList.findAll({
            order: [['updatedAt', 'DESC']],
            where: {
                userId : id
            }
        })
       
        const chatId = []
        const result = []
        chatsData.forEach(element => {
            chatId.push(element.dataValues.chatId)
        });
        for(let i = 0; i < chatsData.length; i++){
            const lastMessageId = await Chat.findOne({
                where: {
                    id: chatId[i]
                }
            })
            const chat = await Chat.findOne({
                where: {
                    id: chatId[i]
                },
                attributes:['title', 'photo', 'private']
            })
            if((!chat.dataValues.title || !chat.dataValues.photo) && chat.dataValues.private === true){
                const userId = await ChatList.findOne({
                    where: {
                        chatId: chatId[i],
                        userId: {[Op.not]: id}
                    },
                    include:{
                        model: Chat,
                        where:{
                            id: chatId[i],
                            private: true
                        }
                    }
                })
                const userData = await User.findOne({
                    where:{
                        id: userId.dataValues.userId
                    }
                })
                if(!chat.dataValues.title){
                    chat.dataValues.title = userData.dataValues.firstname + ' ' + userData.dataValues.lastname
                }
                if(!chat.dataValues.photo){
                    chat.dataValues.photo = userData.dataValues.photo
                }
            }
            const message = await Message.findOne({
                where:{
                    id: lastMessageId.dataValues.lastMessageId
                },
                attributes:['content', 'time', 'date', 'isRead']
            })
            result.push({chat, message})
        }
        return result
    }
    async chat(chatId, userId) {
        const userInChat = await ChatList.findOne({
            where:{
                chatId: chatId,
                userId: userId
            }
        })
        if(!userInChat){
            throw ApiError.badRequest('У вас нет доступа к этому чату.')
        }
        const messageData = await Message.findAll({
            order: [['createdAt', 'ASC']],
            where: {
                chatId : chatId
            },
            attributes: ['content', 'userId', 'isRead', 'time', 'date']
        })
        const arr = []
        messageData.forEach(result => {
            arr.push(result.dataValues.userId)
        })
        const messages = await Message.findAll({
            order: [['createdAt', 'ASC']],
            where: {
                chatId : chatId
            },
            include:{
                model: User,
                where: {
                    id: {[Op.in]: arr}
                },
                attributes: ['firstname', 'lastname', 'photo', 'nickname']
            },
            attributes: ['content', 'isRead', 'time', 'date', 'file']
        })
        return messages
    }
    async deleteChat(chatId){
        const messages = await Message.findAll({
            where:{
                chatId: chatId
            }
        })
        if(!messages) {
            throw ApiError.badRequest('Не удалось удалить сообщения.')
        }
        const messagesId = []
        messages.forEach(result =>{
            messagesId.push(result.dataValues.id)
        })
        for(let i = 0; i < messagesId.length; i++){
            await this.deleteMessage(messagesId[i])
        }
        const chat = await Chat.destroy({
            where: {
                id: chatId
            }
        })
        if(!chat) {
            throw ApiError.badRequest('Не удалось удалить чат.')
        }
        return true
    }
    async createMessage(content, userId, chatId, file){
        const chat = await Chat.findOne({
            where: {
                id: chatId
            }
        })
        if(!chat){
            throw ApiError.badRequest('Не удалось найти чат.')
        }
        const Data = new Date();
        const Year = Data.getFullYear();
        const Month = Data.getMonth() + 1;
        const Day = Data.getDate();
        const Hour = Data.getHours();
        const Minutes = Data.getMinutes();
        const Seconds = Data.getSeconds();
        const newMessage = await Message.create({
            userId: userId,
            chatId: chatId,
            content: content,
            date: Year + '-' + Month + '-' + Day,
            time: Hour + ':' + Minutes + ':' + Seconds,
            file: file
        })
        try {
            await Chat.findAll({
                where: {
                    id: chatId,
                }
            }).then(function(t) {
                t.forEach(result => {
                    result.lastMessageId = newMessage.id
                    result.save()
                })
            })
        } finally {
            return newMessage
        }
    }
    async deleteMessage(messageId, userId){
        const chatId = await Message.findOne({
            where: {
                id: messageId
            },
            attributes: ['chatId']
        })
        if(!chatId){
            throw ApiError.badRequest('Не удалось найти чат id.')
        }
        const chat = await Chat.findOne({
            where: {
                id: chatId.dataValues.chatId
            }
        })
        if(!chat){
            throw ApiError.badRequest('Не удалось найти чат.')
        }
        const message = await Message.destroy({
            where: {
                id: messageId,
                userId: userId
            }
        })
        if(!message) {
            throw ApiError.badRequest('Не удалось удалить сообщение.')
        }
        try {
            const lastMessage = await Message.findOne({
                order: [['createdAt', 'DESC']],
                where:{
                    chatId: chat.dataValues.id
                }
            })
            chat.lastMessageId = lastMessage.dataValues.id
            chat.save()
        } finally {
            return true
        }
    }

    async editMessage(content, messageId, userId){
        const message = await Message.findOne({
            where: {
                id: messageId,
                userId: userId
            }
        })
        if(!message) {
            throw ApiError.badRequest('Не удалось изменить сообщение.')
        }
        message.content = content
        message.save()
        return true
    }
    
}
module.exports = new CommunicationService();