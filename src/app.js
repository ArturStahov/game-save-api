const express = require('express')
const cors = require('cors')
const fs = require("fs")
const path = require('path')
const logger = require('morgan');
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
require('dotenv').config()
const { HttpCode } = require('./helpers/constants.js')
const routerSave = require('./api/save')
const routerUsers = require('./api/users')
const { ErrorHandler } = require('./helpers/errorHandler')
const app = express()
const expressWs = require('express-ws')(app);  

const accessLogStream = fs.createWriteStream(path.join(__dirname, "access.log"), { flags: "a" })
const AVATARS_DIR = process.env.AVATARS_DIR

const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    handler: (req, res, next) => {
        next(new ErrorHandler(HttpCode.BAD_REQUEST, 'Error limit query!', 'limit query!'))
    }
});
 
app.use(express.static(path.join(process.cwd(), AVATARS_DIR)))
app.use(logger('dev'))
app.use(logger("common", {
    format: "[:date[clf]] :method :url :status :response-time ms",
    stream: accessLogStream,
    skip: (req, res) => res.statusCode < 400
}))

app.use(helmet());
app.use(cors())
app.use(express.json({ limit: 10000 }))
app.use('/api/', limiter)
app.use('/api/save', routerSave)
app.use('/api/users', routerUsers)

//socket functional
app.ws('/game', function(ws, req) {
    ws.on('message', function(msg) {
      broadcast(msg)
    });
  });

function broadcast(data){
    expressWs.getWss().clients.forEach((client)=>{
        if(client.readyState == 1){
            client.send(data)
        }
    })
}

//error 404
app.use((req, res, next) => {
    res.status(HttpCode.NOT_FOUND).json({
        status: 'error',
        code: HttpCode.NOT_FOUND,
        message: `Use api on routes ${req.baseUrl}/api/save`,
        data: 'Not Found'
    })
})

//error handler
app.use((err, req, res, next) => {
    err.status = err.status ? err.status : HttpCode.INTERNAL_SERVER_ERROR
    res.status(err.status).json({
        status: err.status === 500 ? 'fair' : 'error',
        code: err.status,
        message: err.message,
        data: err.status === 500 ? 'Internal Server Error' : err.data,
    })
})

module.exports = app

