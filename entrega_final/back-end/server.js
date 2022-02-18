const express = require('express');
const cors = require('cors')
const PORT = 8080
const app = express()
const route_productos = require('./routes/productos')
const route_carritos = require('./routes/carritos')

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/productos', route_productos)
app.use('/api/carrito', route_carritos)

/*Not Found Page */
app.use('*', (req, res) => {
    const pathError = {
        error: -2,
        descripcion: `Error 404. Ruta ${req.url} método ${req.method} no implementado`
    }
    res.send(pathError)
});

app.listen(PORT,()=>{
    console.log('server on')
})