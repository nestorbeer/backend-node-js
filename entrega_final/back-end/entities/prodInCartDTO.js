module.exports = class ProdInCartDTO{
    id
    timestamp = Date
    nombre
    descripcion
    codigo
    foto
    precio
    stock
    constructor(){
        this.id = 0
        this.timestamp = new Date();
        this.nombre = '';
        this.descripcion = ''; 
        this.codigo = 0 ; 
        this.foto = '';
        this.precio = 0.00;
        this.stock = 0;
    }
}