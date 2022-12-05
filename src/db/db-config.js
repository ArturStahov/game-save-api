const mongoose = require('mongoose');
require('dotenv').config();

const createUrl = () => {
    const user = process.env.User;
    const pass = process.env.Pass;
    const urlEnd = process.env.UrlEnd
    return `mongodb+srv://${user}:${pass}${urlEnd}`;
}

const uri = createUrl()

const db = mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});

mongoose.connection.on('error', (e) => {
    console.log('Mongoose connection error!')
})

mongoose.connection.on('connected', (e) => {
    console.log('Mongoose connection success!')
})

mongoose.connection.on('disconnected', (e) => {
    console.log('Mongoose disconnected success!')
})

process.on('SIGINT', () => {
    mongoose.connection.close(() => {
        console.log('Connection for DB disconnected and app terminated')
        process.exit(1)
    })
})


module.exports = db