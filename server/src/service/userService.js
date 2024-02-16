const UserDto = require('../dtos/userDto')
const ApiError = require('../error/ApiError')
const {User} = require('../models/models')
const tokenService = require('./tokenService')
const bcrypt = require('bcrypt')



class UserService {
    async registration(login, password, firstname, lastname) {
        const candidate = await User.findOne({where: {login}})
        if(candidate) {
            throw ApiError.badRequest(`Пользователь с таким логином "${login}" уже существует.`)
        }
        const hashPassword = await bcrypt.hash(password, 5)

        const user = await User.create({
            login,
            password: hashPassword,
            firstname, 
            lastname
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
        console.log(verifyToken)
        console.log(tokenFromDb)
        if (!tokenFromDb || !verifyToken ) {
            throw ApiError.UnauthorizedError()
        }
        const user = await User.findOne({where:  {id : verifyToken.id}})
        const userDto = new UserDto(user)
        console.log(userDto)
        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)
        return tokens
    }
}

module.exports = new UserService();