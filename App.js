const Contenedor = require('./Contenedor')
const contenedor = new Contenedor('./assets/productos.json')

const express = require('express')
const app = express()
const PORT = 8080

app.all('/', function(request, response){
    response.send("<H1>Bienvenido al TP</H1><H2><a href='./productos'>Productos</H2><H2><a href='./productoRandom'>Producto random</H2>");
})

app.get('/productos',function(request, response){
    response.send(contenedor.getAll());
})

app.get('/productoRandom',function(request, response){
    response.send(contenedor.getById(randomInt(1,3)));
})

function randomInt(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

const server = app.listen(PORT,function(){
    
})

