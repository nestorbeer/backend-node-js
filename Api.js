const express = require('express')
const { use } = require('express/lib/application')
const { Router } = express
const app = express()
const router = Router()
const PORT = 8080


let products = [{
        "id":1,"title":"Campera","price":100,"thumbnail":"http://lalala1"
    },
    {
        "id":2,"title":"Remera","price":150,"thumbnail":"http://lalala2"
    }
]

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

router.get('/productos', (request, response)=>{
    response.json(products)
})

router.get('/productos/:id', (request, response)=>{
    const id = request.params.id
    let product = [...products].filter(element => element.id == id)
    if(product.length > 0){
        response.send(product)
    }
    else{
        response.send({error:'Producto no encontrado'})
    }
})

router.post('/productos', (request, response, next)=>{
    let product = request.body
    product.id = products.reduce((acc,item) => {return Math.max(acc,item.id)},0) + 1
    products.push(product)
    response.send(products)
})

router.put('/productos/:id', (request, response)=>{
    const id = parseInt(req.params.id)
    let newProduct = request.body
    newProduct.id = id
    products.filter(element => element.id === id) = newProduct
    response.send({result:'ok'})
})

router.delete('/productos', (request, response)=>{
    products = []
    response.send({result:'ok'})
})

router.delete('/productos/:id', (request, response)=>{
    const id = parseInt(req.params.id)
    products = [...products].filter(product => product.id != id)
    response.send({result:'ok'})
})

 
app.use('/api',router)
app.listen(PORT)