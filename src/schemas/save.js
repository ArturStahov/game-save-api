const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
    title: {
        type: String,
        required: [true, 'title is required']
    },
    description: {
        type: String,
        required: [true, 'description is required']
    },

    image: {
        type: String,
        default: ''
    },

    rating: {
        type: String,
        default: '0'
    },

    ratingCounter:{
        type: String,
        default: '0'
    },

    owner: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user'
    }

},
    {
        timestamps: true
    }
);

const saveDataSchema = mongoose.model('save', schema)

module.exports = saveDataSchema