const jwt = require('jsonwebtoken')
const { Token } = require('../models/models')
class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(
            payload, 
            process.env.JWT_ACCESS_KEY,
            {expiresIn: '30m'}
        )
        const refreshToken = jwt.sign(
            payload, 
            process.env.JWT_REFRESH_KEY,
            {expiresIn: '30d'}
        )
        return {
            accessToken,
            refreshToken
        }
    }
    validateAccessToken(token) {
        try {
            const verifyToken = jwt.verify(token, process.env.JWT_ACCESS_KEY)
            return verifyToken
        } catch (error) {
            return null
        }
    }
    validateRefreshToken(token) {
        try {
            const verifyToken = jwt.verify(token, process.env.JWT_REFRESH_KEY)
            return verifyToken
        } catch (error) {
            return null
        }
    }
    async saveToken(id, refreshToken){
        const tokenData = await Token.findOne({where: {userId: id}})
        if (tokenData) {
            tokenData.token = refreshToken
            return tokenData.save();
        }
        const token = await Token.create({userId: id, token: refreshToken})
        return token;
    }
    async removeToken(refreshToken) {
        const tokenData = await Token.destroy({where: {token: refreshToken}})
        return tokenData
    }
    async findToken(refreshToken) {
        const tokenData = await Token.findOne({refreshToken})
        return tokenData
    }
}

module.exports = new TokenService();