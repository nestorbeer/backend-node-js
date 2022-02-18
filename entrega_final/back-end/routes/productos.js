const express = require('express');
const productos = express.Router()

let products = [{
    "id":1, "timestamp": "", "descripcion":"Campera","precio":100,"stock":10,"foto":"http://lalala1"
},
{
    "id":2, "timestamp": "", "descripcion":"Remera","precio":150,"stock":20,"foto":"http://lalala1"
}
]

/*Productos*/
productos.get('/api/productos', (request, response)=>{
    if(request.administrador){
        response.json(products)
    }
    else{
        response.send({error: -1, descripcion: `Ruta ${request.baseUrl} método ${request.method} no autorizada`})
    }
    
})

productos.get('/api/productos/:id', (request, response)=>{
    const id = request.params.id
    let product = [...products].filter(element => element.id == id)
    if(product.length > 0){
        response.json(product)
    }
    else{
        response.send({error:'Producto no encontrado'})
    }
})

productos.post('/api/productos', (request, response, next)=>{
    let product = request.body
    product.id = products.reduce((acc,item) => {return Math.max(acc,item.id)},0) + 1
    products.push(product)
    response.json(products)
})

productos.put('/api/productos/:id', (request, response)=>{
    const id = parseInt(req.params.id)
    let newProduct = request.body
    newProduct.id = id
    products.filter(element => element.id === id) = newProduct
    response.send({result:'ok'})
})

productos.delete('/api/productos', (request, response)=>{
    products = []
    response.send({result:'ok'})
})

productos.delete('/api/productos/:id', (request, response)=>{
    const id = parseInt(req.params.id)
    products = [...products].filter(product => product.id != id)
    response.send({result:'ok'})
})

module.exports = productos