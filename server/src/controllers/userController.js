const ApiError = require('../error/ApiError')
const uuid = require('uuid')
const path = require('path')
const jwt = require('jsonwebtoken') 
const {validationResult} = require('express-validator')
const userService = require('./../service/userService')
const { User } = require('../models/models')

class UserController {
 
    async registration(req, res, next) {
        try {
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return next(ApiError.badRequest('Недопустимый логин или пароль', errors.array()))
            }
            const {login, password, firstname, lastname} = req.body
            const token = await userService.registration(login, password, firstname, lastname)
            res.cookie('refreshToken', token.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(token.accessToken)
        } catch (error) {
           next(error)
        }
        
    }
    async login(req, res, next) {
       try {
            const {login, password} = req.body
            const token = await userService.login(login, password)
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
            const userId = req.user.id
            const userData = await User.findOne({where: {id: userId}})
            return res.json(userData)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new UserController()