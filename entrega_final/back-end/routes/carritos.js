const express = require('express');
const carritos = express.Router()

const Carritos = require('../containers/CartContainer')
const Carts = new Carritos('./public/carritos.json')

carritos.post('/', async (req, res) => {
    const cart = req.body
    res.json(await Carts.save(cart))
})

carritos.delete('/:id', async (req, res) => {
    const id = parseInt(req.params.id)
    res.json(await Carts.deleteById(id))
})

carritos.get('/:id/productos', async (req, res) => {
    const id = parseInt(req.params.id)
    res.json(await Carts.getById(id).productos)
})

carritos.post('/:id/productos', async (req, res) => {
    const id = parseInt(req.params.id)
    const prodcart = req.body
    res.json(await Carts.saveProductoById(id, prodcart))
})

carritos.put('/:id', async (req, res) => {
    const id = parseInt(req.params.id)
    const cart = req.body
    res.json(await Carts.update(id, cart))
})

carritos.get('/:id/productos/:id_prod', async (req, res) => {
    const id = parseInt(req.params.id)
    const id_prod = parseInt(req.params.id_prod)

    res.json(await Carts.getProductoById(id, id_prod))
})

carritos.delete('/:id/productos/:id_prod', async (req, res) => {
    const id = parseInt(req.params.id)
    const id_prod = parseInt(req.params.id_prod)

    res.json(await Carts.deleteProductoById(id, id_prod))
})

carritos.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id)
    res.json(await Carts.getById(id))
})

module.exports = carritos