const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    sku: {
        type: String,
        required: true
    },
    username: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
})

module.exports = mongoose.model('Product', Schema)