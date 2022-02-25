const ProdCarrito = require('./ProdInCartDTO') 

module.exports = class CartDTO{
    id = 0 
    timestamp = Date
    productos = [];
    constructor(){
        this.id = 0
        this.timestamp = new Date()
        this.productos = []
    }
}