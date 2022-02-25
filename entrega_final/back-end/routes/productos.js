const express = require('express');
const productos = express.Router()

const Products = require('../containers/ProductsContainer')
const Prods = new Products('./public/productos.json')

productos.get('/', async (request, response) => {
    if(!request.administrador){
        response.status(404);
        response.json({error: -1, descripcion: `Ruta ${request.baseUrl} método ${request.method} no autorizada`});
    } else {
        response.json(await Prods.getAll())
    }
})
productos.get('/:id', async (request, response) => {
    const id = parseInt(request.params.id)
    response.json(await Prods.getById(id))
})

productos.post('/', async (request, response) => {
    if(!request.administrador){
        response.status(404);
        response.json({error: -1, descripcion: `Ruta ${request.baseUrl} método ${request.method} no autorizada`});
    } else {
        const prod = request.body
        response.json(await Prods.save(prod))
    }
})

productos.put('/:id', async (request, response) => {
    if(!request.administrador){
        response.status(404);
        response.json({error: -1, descripcion: `Ruta ${request.baseUrl} método ${request.method} no autorizada`});
    } else {
        const id = parseInt(request.params.id)
        const prod = request.body
        response.json(await Prods.update(id, prod))
    }
})

productos.delete('/:id', async (request, response) => {
    if(!request.administrador){
        response.status(404);
        response.json({error: -1, descripcion: `Ruta ${request.baseUrl} método ${request.method} no autorizada`});
    } else {
        const id = parseInt(request.params.id)
        response.json(await Prods.deleteById(id))
    }
})

module.exports = productos