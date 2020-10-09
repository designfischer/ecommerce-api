const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
    type: String,
    value: Number,
    discount: Number
})

module.exports = mongoose.model('DiscountPolicy', Schema)