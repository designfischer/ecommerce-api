const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
    items: [{
        quantity: Number,
        product_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }         
    }],
    totalValue: Number,
    username: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = mongoose.model('Cart', Schema)