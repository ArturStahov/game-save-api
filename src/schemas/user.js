const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar')

const SALT_FACTOR = 6

const userSchema = new Schema({
    name: {
        type: String,
        minlength: 3,
        maxlength: 25,
        default: 'Guest'
    },

    email: {
        type: String,
        minlength: 3,
        required: [true, 'Email is required'],
        unique: true,
    },

    password: {
        type: String,
        required: [true, 'Password is required'],
    },

    avatar: {
        type: String,
        default: function () {
            return gravatar.url(this.email, { s: '250' }, true)
        }
    },

    token: {
        type: String,
        default: null,
    }
},
    {
        timestamps: true
    }
);

//static validate method
userSchema.path('email').validate(function (value) {
    const regexp = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/
    return regexp.test(String(value).toLowerCase())
})

//hook salt password begin save in db
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next()
    }
    this.password = await bcrypt.hash(this.password, bcrypt.genSaltSync(SALT_FACTOR))
    next()
})

userSchema.methods.validPassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

const User = mongoose.model('user', userSchema)

module.exports = User