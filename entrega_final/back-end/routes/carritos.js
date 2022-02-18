const express = require('express');
const carritos = express.Router()

let products = [{
    "id":1, "timestamp": "", "descripcion":"Campera","precio":100,"stock":10,"foto":"http://lalala1"
},
{
    "id":2, "timestamp": "", "descripcion":"Remera","precio":150,"stock":20,"foto":"http://lalala1"
}
]

/*Carrito*/
carritos.get('/api/carrito/:id', (request, response)=>{
    const id = request.params.id
    const cart = [...carritos].filter(element => element.id == id)
    if(product.length > 0){
        response.json(carrito.productos)
    }
    else{
        response.send({error:'Producto no encontrado'})
    }
})

carritos.post('/api/carrito', (request, response, next)=>{
    const cartIndex = carritos.length

    carritos.push({id:cartIndex, productos:[]})
    response.send({id:cartIndex})
})

carritos.post('/api/carrito:id_prod', (request, response, next)=>{
    const cartIndex = carritos.length
    const id_prod = parseInt(req.params.id_prod)
    const productToAdd = [...products.filter(element => element.id == id_prod)][0]
    carritos.filter(product => product.id != id)[0].productos.push(productToAdd)
    response.send({id:cartIndex})
})

carritos.delete('/api/carrito/:id_cart', (request, response)=>{
    const id = parseInt(req.params.id)
    carritos.filter(product => product.id != id)[0].productos = []
    response.send({result:'ok'})
})

carritos.delete('/api/carrito/:id_prod', (request, response)=>{
    const id_prod = parseInt(req.params.id_prod)
    carritos.productos = carritos.productos.filter(product => product.id != id)
    response.send({result:'ok'})
})
module.exports = carritos