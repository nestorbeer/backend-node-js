const Contenedor = require('./Contenedor')
const contenedor = new Contenedor('./assets/productos.json')


const id = contenedor.save({title:'Remera basica', price:100, thumbnail:'http://lalala1'})
console.log('Se creo el producto', id)
console.log('Productos', contenedor.getAll())
const id2 = contenedor.save({title:'Pantalon', price:100, thumbnail:'http://lalala2'})
console.log('Se creo el producto', id2)
console.log('Productos', contenedor.getAll())
console.log('Datos del producto 1', contenedor.getById(1))
contenedor.deleteById(2)
console.log('Productos', contenedor.getAll())
