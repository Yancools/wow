const UserDto = require('../dtos/userDto')
const ApiError = require('../error/ApiError')
const {User} = require('../models/models')
const tokenService = require('./tokenService')
const bcrypt = require('bcrypt')
const uuid = require('uuid')
const path = require('path')
const sequelize = require('sequelize')
const Op = sequelize.Op;



class UserService {
    async registration(login, password, firstname, lastname, gender) {
        const candidate = await User.findOne({where: {login}})
        if(candidate) {
            throw ApiError.badRequest(`Пользователь с таким логином ${login} уже существует.`)
        }
        if(gender !=="man" && gender !=="woman") {
            throw ApiError.badRequest('Некорректный пол')
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const nickname = login
        const user = await User.create({
            login,
            password: hashPassword,
            firstname, 
            lastname,
            nickname: nickname,
            gender
        })
        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)
        return tokens
    }

    async login(login, password) {
        const user = await User.findOne({where: {login}})
        if(!user) {
            throw ApiError.badRequest(`Пользователь с таким логином "${login}" не существует.`)
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if(!comparePassword) {
            throw ApiError.badRequest('Неверный пароль')
        }
        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)
        return tokens
    }

    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken)
        return token
    }

    async refresh(refreshToken){
        if(!refreshToken) {
            throw ApiError.UnauthorizedError();
        }
        const verifyToken = tokenService.validateRefreshToken(refreshToken)
        const tokenFromDb = await tokenService.findToken(refreshToken)
        if (!tokenFromDb || !verifyToken ) {
            throw ApiError.UnauthorizedError()
        }
        const user = await User.findOne({where:  {id : verifyToken.id}})
        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)
        return tokens
    }
    async changeLogin(login, newLogin, password) {
        console.log(login, newLogin, password)
        if(login === newLogin ){
            throw ApiError.badRequest('Новый логин совпадает с предыдущим.')
        }
        const user = await User.findOne({
            where: {
                login
            }
        })
        if(!user) {
            throw ApiError.badRequest(`Неверный текущий логин!`)
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if(!comparePassword) {
            throw ApiError.badRequest('Неверный текущий пароль')
        }
        user.login = newLogin
        return user.save();
    }
    async changePassword(userId, password, newPassword, confirmNewPassword) {
        if(newPassword !== confirmNewPassword){
            throw ApiError.badRequest('Новые пароли не совпадают.')
        }
        if(password === newPassword){
            throw ApiError.badRequest('Новый пароль совпадает с предыдущим.')
        }
      
        const user = await User.findOne({
            where: {
                id: userId
            }
        })
        let comparePassword = bcrypt.compareSync(password, user.password)
        if(!comparePassword) {
            throw ApiError.badRequest('Неверный текущий пароль')
        }
        const hashPassword = await bcrypt.hash(newPassword, 5)
        user.password = hashPassword
        return user.save();
    }
    async changeNickname(userId, newNickname) {
        const user = await User.findOne({
            where: {
                id: userId
            }
        })
        const nickname = await User.findOne({
            where: {
                nickname: newNickname
            }
        })
        if(nickname){
            throw ApiError.badRequest('Пользователь с таким никнеймом уже существует')
        }
        const userNickname = user.dataValues.nickname
        if(userNickname === newNickname){
            throw ApiError.badRequest('Новый никнейм должен отличаться от предыдущего')
        }
        user.nickname = newNickname
        return user.save();
    }

    async changeGender(userId, newGender) {
        if(newGender !== 'man' && newGender !== 'woman'){
            throw ApiError.badRequest('Некорректный пол')
        }
        const user = await User.findOne({
            where: {
                id: userId
            }
        })
        const userGender = user.dataValues.gender
        if(userGender === newGender){
            throw ApiError.badRequest('Новый пол должен отличаться от нынешнего')
        }
        user.gender = newGender
        return user.save();
    }
    async changeFirstname(userId, newFirstname) {
        const user = await User.findOne({
            where: {
                id: userId
            }
        })
        const userFirstname = user.dataValues.firstname
        if(userFirstname === newFirstname){
            throw ApiError.badRequest('Новое имя должно отличаться от нынешнего')
        }
        user.firstname = newFirstname
        return user.save();
    }

    async changeLastname(userId, newLastname) {
        const user = await User.findOne({
            where: {
                id: userId
            }
        })
        const userLastname = user.dataValues.lastname
        if(userLastname === newLastname){
            throw ApiError.badRequest('Новая фамилия должна отличаться от нынешней')
        }
        user.lastname = newLastname
        return user.save();
    }
    async changePhoto(userId, fileName) {
        console.log(fileName)
        const user = await User.findOne({
            where: {
                id: userId
            }
        })
        user.photo = fileName
        return user.save();
    }













    async userData(nickname) {
        const userData = await User.findOne({
            where: nickname
        })
        if(!userData) {
            throw ApiError.badRequest('Такого пользователя не существует')
        }
        return userData;
    }
    async searchUser(searchUser) {
        const userData = await User.findAll({
            where: {
                [Op.or]: [
                    {
                        nickname: { [Op.iLike]: `${'%' +searchUser + '%'}` }
                    },
                    {
                        firstname: { [Op.iLike]: `${'%' +searchUser + '%'}` }
                    },
                    {
                        lastname: { [Op.iLike]: `${'%' +searchUser + '%'}` }
                    }
                  ]
                
            },
            attributes:['nickname', 'firstname', 'lastname', 'status', 'photo']
        })
        if(userData.length === 0) {
            throw ApiError.badRequest('Таких пользователей не существует')
        }
        return userData;
    }
}

module.exports = new UserService();