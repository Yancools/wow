const database = require('../database')
const {DataTypes} = require('sequelize')


const User = database.define('users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    login: {
        type: DataTypes.STRING,
        unique: true,
        allowNull:false
    },
    password: {
        type: DataTypes.STRING,
        allowNull:false
    },
    status:{
        type: DataTypes.STRING,
        defaultValue: 'Ваш статус.'
    },
    firstname: {
        type: DataTypes.STRING,
        allowNull:false
    },
    lastname:{
        type: DataTypes.STRING,
        allowNull:false
    },
    photo:{
        type: DataTypes.STRING
    }
})
const Token = database.define('tokens',{
    token: {
        type: DataTypes.STRING,
        required: true
    }
})
User.hasOne(Token)
Token.belongsTo(User)
module.exports = {
    User,
    Token
}