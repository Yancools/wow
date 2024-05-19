require('dotenv').config()
const express = require('express')
const database = require('./database')
const models = require('./models/models')
const cookieParser = require('cookie-parser')
const http = require('http')
const cors = require('cors')
const router = require('./routes/index')
const fileupload = require('express-fileupload')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const path = require('path')

const PORT = process.env.PORT || 5000

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}))
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileupload({}))
app.use('/api', router)
app.use(errorHandler)

const server = http.createServer(app)

const start = async () => {
    try {
        await database.authenticate()
        await database.sync()
        server.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}


start()
