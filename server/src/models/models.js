const database = require('../database')
const {DataTypes} = require('sequelize')

const Token = database.define('tokens',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    token: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

const User = database.define('users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
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
    status: {
        type: DataTypes.STRING, 
        defaultValue: '...'
    },
    firstname: {
        type: DataTypes.STRING,
        allowNull:false
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull:false
    },
    photo: {
        type: DataTypes.STRING,
        defaultValue: 'default.svg'
    },
    gender: {
        type: DataTypes.STRING,
        allowNull:false
    },
    nickname: {
        type: DataTypes.STRING,
        allowNull:false
    }
})

const Message = database.define('messages', { 
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    content: {
        type: DataTypes.STRING
    },
    time: {
        type: DataTypes.TIME,
        allowNull:false
    },
    isRead: {
        type: DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue:false
    },
    date:{
        type: DataTypes.DATE,
        allowNull:false,
    },
    file: {
        type: DataTypes.STRING
    }
});
const Chat = database.define('chats', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
    },
    photo: {
        type: DataTypes.STRING,
        defaultValue: 'default.svg'
    },
    authorId:{
        type: DataTypes.STRING,
        allowNull: false
    },
    private:{
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
});
const ChatList = database.define('chatsLists', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    }
});

Chat.belongsToMany(User, { through: ChatList });
User.belongsToMany(Chat, { through: ChatList });
ChatList.belongsTo(User);
ChatList.belongsTo(Chat);
User.hasMany(ChatList);
Chat.hasMany(ChatList);
Message.belongsTo(Chat);
Message.belongsTo(User);
User.hasOne(Token)
Token.belongsTo(User)
Message.hasOne(Chat, {as: 'lastMessage'})
Chat.belongsTo(Message, {as: 'lastMessage'})
module.exports = {
    User,
    Token,
    Chat,
    ChatList,
    Message
}