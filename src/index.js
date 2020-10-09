const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

require('dotenv').config()

const User = require('./models/User')
const Product = require('./models/Product')
const Cart = require('./models/Cart')

const PORT = process.env.PORT || 3333

const app = express()

app.use(express.json())
app.use(cors())

mongoose.connect(process.env.MONGO_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}, console.log('connected to db'))

app.post('/sessions', async (req, res) => {
    const { username } = req.body
    let newUser = ''

    try {
        newUser = await User.findOne({ username: username })
        if (!newUser) {
            newUser = await User.create({ username: username })
        }        
        return res.status(200).send(newUser)
    } catch(err) {
        console.log(err)
        return res.status(400).send(err)
        
    }
})

app.post('/products/:user_id', async (req, res) => {
    const { name, price, quantity, img, sku } = req.body
    const { user_id } = req.params 
    
    try {
        const newProduct = await Product.create({
            name,
            price,
            quantity,
            img,
            sku,
            username: user_id
        })
        return res.status(200).send(newProduct)
    } catch(err) {
        return res.status(400).send(err)
    }
})

app.get('/products', async (req, res) => {
    try {
        const allProducts = await Product.find()
        return res.status(200).send(allProducts)
    } catch(err) {
        return res.status(400).send(err)
    }
})

app.get('/products/:user_id', async (req, res) => {
    const { user_id } = req.params
    try {
        const allProductsOfAUser = await Product.find({ username: user_id })
        return res.status(200).send(allProductsOfAUser)
    } catch(err) {
        return res.status(400).send(err)
    }
})

app.post('/cart/:user_id', async (req, res) => {
    const { user_id } = req.params
    const { items, totalValue } = req.body  

    if (items.lenght === 0) return res.status(400).send({ message: 'Cart must not be empty' })
     
    try {   
        //const itensID = items.map(item => item.product_id)  
        //const chosenProducts = await Product.find().where('_id').in(itensID).exec()
       
        const newCart = await Cart.create({ 
            items: items, 
            totalValue,
            username: user_id 
        })
        await newCart.populate('items.product_id')
            .populate('username')
            .execPopulate()

        return res.status(200).send(newCart)
    } catch(err) {
        console.log(err)
        return res.status(400).send(err)
    }
})

app.get('/cart/:user_id', async (req, res) => {
    const { user_id } = req.params
    try {
        const cartsOfAUser = await Cart.find({ username: user_id })
        return res.status(200).send(cartsOfAUser)
    } catch(err) {
        return res.status(400).send(err)
    }
})

app.listen(PORT, () => console.log(`server running on port ${PORT}`))

