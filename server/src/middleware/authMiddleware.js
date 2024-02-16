const jwt = require('jsonwebtoken')
const ApiError = require('../error/ApiError');
const tokenService = require('../service/tokenService');

module.exports = function (req, res, next) {
    if (req.method === "OPTIONS") {
        next()
    }
    try {
        const authorizationHeader = req.headers.authorization;
        if(!authorizationHeader) {
            return next(ApiError.UnauthorizedError());
        }
        const accessToken = req.headers.authorization.split(' ')[1]
        if(!accessToken) {
            return next(ApiError.UnauthorizedError());
        }
        const validateAccessToken = tokenService.validateAccessToken(accessToken)
        if(!validateAccessToken) {
            return next(ApiError.UnauthorizedError());
        }
        req.user = validateAccessToken;
        next();
    } catch (e) {
       return next(ApiError.UnauthorizedError())
    }
}