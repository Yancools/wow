const ApiError = require('../error/ApiError')
const {validationResult} = require('express-validator')
const userService = require('./../service/userService')
const uuid = require('uuid')
const path = require('path')
class UserController {
 
    async registration(req, res, next) {
        try {
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return next(ApiError.badRequest(`Недопустимая длина`, errors.array()))
            }
            const {login, password, firstname, lastname, gender} = req.body
            const token = await userService.registration(login.toLowerCase(), password, firstname, lastname, gender)
            res.cookie('refreshToken', token.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(token.accessToken)
        } catch (error) {
           next(error)
        }
        
    }
    async login(req, res, next) {
       try {
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return next(ApiError.badRequest(`Недопустимая длина`, errors.array()))
            }
            const {login, password} = req.body
            const token = await userService.login(login.toLowerCase(), password)
            res.cookie('refreshToken', token.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(token.accessToken)
       } catch (error) {
            next(error)
       }
    }

    async logout(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            await userService.logout(refreshToken)
            res.clearCookie('refreshToken');
            return res.status(200).send()
        } catch (error) {
            next(error)
        }
    }
    async refresh(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const token = await userService.refresh(refreshToken)
            res.cookie('refreshToken', token.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(token.accessToken)
        } catch (error) {
            next(error)
        }
    }
    async userData(req, res, next) {
        try {
            const nick = req.params
            const userData = await userService.userData(nick)
            const {firstname, lastname, nickname, gender, photo, status} = userData
            return res.json({firstname, lastname, nickname, gender, photo , status})
        } catch (error) {
            next(error)
        }
    }
    async changeLogin(req, res, next) {
        try {
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return next(ApiError.badRequest(`Недопустимая длина логина`, errors.array()))
            }
            const {login, newLogin, password} = req.body
            await userService.changeLogin(login.toLowerCase(), newLogin.toLowerCase(), password)
            return res.status(200).send()
        } catch (error) {
            next(error)
        }
    }
    async changePassword(req, res, next) {
        try {
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return next(ApiError.badRequest(`Недопустимая длина пароля`, errors.array()))
            }
            const userId = req.user.id
            const {password, newPassword, confirmNewPassword} = req.body
            await userService.changePassword(userId, password, newPassword, confirmNewPassword)
            return res.status(200).send()
        } catch (error) {
            next(error)
        }
    }
    async changeNickname(req, res, next) {
        try {
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return next(ApiError.badRequest(`Недопустимая длина никнейма`, errors.array()))
            }
            const userId = req.user.id
            const {newNickname} = req.body
            await userService.changeNickname(userId, newNickname.toLowerCase())
            return res.status(200).send()
        } catch (error) {
            next(error)
        }
    }
    async changeGender(req, res, next) {
        try {
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return next(ApiError.badRequest(`Поле "пол" не может быть пустым`, errors.array()))
            }
            const userId = req.user.id
            const {newGender} = req.body
            await userService.changeGender(userId, newGender)
            return res.status(200).send()
        } catch (error) {
            next(error)
        }
    }
    async changeFirstname(req, res, next) {
        try {
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return next(ApiError.badRequest(`Недопустимое имя`, errors.array()))
            }
            const userId = req.user.id
            const {newFirstname} = req.body
            await userService.changeFirstname(userId, newFirstname)
            return res.status(200).send()
        } catch (error) {
            next(error)
        }
    }
    async changeLastname(req, res, next) {
        try {
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return next(ApiError.badRequest(`Недопустимая фамилия`, errors.array()))
            }
            const userId = req.user.id
            const {newLastname} = req.body
            await userService.changeLastname(userId, newLastname)
            return res.status(200).send()
        } catch (error) {
            next(error)
        }
    }
    async changePhoto(req, res, next) {
        try {
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return next(ApiError.badRequest(`Поле "фото" не может быть пустым`, errors.array()))
            }
            const userId = req.user.id
            const {photo} = req.files
            let fileName = uuid.v4() + ".jpg"
            photo.mv(path.resolve(__dirname, '..', 'static', fileName))
            await userService.changePhoto(userId, fileName)
            return res.status(200).send()
        } catch (error) {
            next(error)
        }
    }
    async searchUser(req, res, next) {
        try {
            const {searchUser} = req.body
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return next(ApiError.badRequest(`Минимальная длина поиска 3 символа`, errors.array()))
            }
            const userData = await userService.searchUser(searchUser)
            return res.json(userData)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new UserController()