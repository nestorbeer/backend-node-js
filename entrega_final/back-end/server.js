import "dotenv/config"
import express from "express"
import cors from "cors"
const PORT = 8080
const app = express()
import {route_productos} from "./routes/productos.js"
import {route_carritos} from "./routes/carritos.js"

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(function(req, res, next) {
    req.administrador = true
    next()
});

app.use('/api/productos', route_productos)
app.use('/api/carrito', route_carritos)

/*Not Found Page */
app.use((req, res) => {
    const pathError = {
        error: -2,
        descripcion: `Error 404. Ruta ${req.url} método ${req.method} no implementado`
    }
    res.send(pathError)
});
app.use(express.static("public"));
app.listen(PORT,()=>{
    console.log('server on')
})