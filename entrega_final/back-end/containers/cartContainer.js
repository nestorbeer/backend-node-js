const Carrito = require('../entities/cartDTO')
const { promises: fs } = require('fs')

module.exports = class CartContainer{
    carritos  = []
    ruta= ""
    constructor(ruta){
        this.ruta = ruta
    }

    async save(carrito){
        this.carritos = await this.getAllFromFile()
        if(this.carritos.length > 0){
            carrito.id = this.carritos[this.carritos.length-1].id + 1
        }
        else{
            carrito.id = 1
        }
        carrito.timestamp = Date.now()
        carrito.productos.forEach((element) => {
            element.timestamp = Date.now()
        });
        this.carritos.push(carrito)

        try {
            await fs.writeFile(this.ruta, JSON.stringify(this.carritos, null, 2))
        } catch (error) {
            throw new Error(`Error al borrar todo: ${error}`)
        }
        
        return {error: 'ok', id: carrito.id}   
    }

    async update(id_Carrito, carrito){
        this.carritos = await this.getAllFromFile()
        let founded = this.carritos.findIndex(element => element.id === id_Carrito)
        console.log(founded)
        if(founded === -1){    
            return {error: 'Carrito no encontrado'}
        } else {
            try{
                this.carritos[founded].productos = carrito.productos
                try {
                    await fs.writeFile(this.ruta, JSON.stringify(this.carritos, null, 2))
                } catch (error) {
                    throw new Error(`Error al borrar todo: ${error}`)
                }
                return {error: 'ok', carritos: this.carritos[founded]}
            }
            catch(er){
                return {error: er}
            }
        }
    }

    async getById(id_Carrito){
        this.carritos = await this.getAllFromFile()
        let founded = this.carritos.find(element => element.id === id_Carrito)

        if(typeof founded === 'undefined'){
            return {error: 'Carrito no encontrado', carritos: founded}
        } else {
            return {error: 'ok', carritos: founded}   
        }
    }

    async getProductoById(id_Carrito, id_Producto){
        this.carritos = await this.getAllFromFile()
        let founded = this.carritos.findIndex(element => element.id === id_Carrito) 
        if(!(typeof founded === 'undefined')){
            let Prodfounded = this.carritos[founded].productos.findIndex((pelement) => pelement.id === id_Producto) 
            if(!(typeof Prodfounded === 'undefined')){
                this.carritos[founded].productos.splice(Prodfounded, 1)
                return {error: 'ok', producto: Prodfounded}   
            } else {
                return {error: `No existe producto con id: ${id_Producto}`}
            }
        } else {
            return {error: `No existe carrito con id: ${id_Carrito}`}
        }
    }

    async saveProductoById(id_Carrito, prodcarrito){
        this.carritos = await this.getAllFromFile()
        let founded = this.carritos.findIndex(element => element.id === id_Carrito) 
        if(!(typeof founded === 'undefined')){
            if(this.carritos[founded].productos.length > 0){
                prodcarrito.id = this.carritos[founded].productos[this.carritos[founded].productos.length-1].id + 1
            }
            else{
                prodcarrito.id = 1
            }
            prodcarrito.timestamp = Date.now()
            this.carritos[founded].productos.push(prodcarrito)
            try {
                await fs.writeFile(this.ruta, JSON.stringify(this.carritos, null, 2))
            } catch (error) {
                throw new Error(`Error al borrar todo: ${error}`)
            }
            return {error: 'ok'}
        } else {
            return {error: `No existe carrito con id: ${id_Carrito}`}
        }
    }


    async getAll(){
        this.carritos = await this.getAllFromFile()
        console.log(this.carritos)
        if(this.carritos.length > 0){
            return {error: 'ok', carritos: this.carritos}   
        } else {
            return {error: 'No existen carritos', carritos: this.carritos}
        }
    }

    async deleteById(id_Carrito){
        this.carritos = await this.getAllFromFile()
        let founded = this.carritos.findIndex(element => element.id === id_Carrito) 
        if(!(typeof founded === 'undefined')){
            this.carritos.splice(founded, 1)
            try {
                await fs.writeFile(this.ruta, JSON.stringify(this.carritos, null, 2))
            } catch (error) {
                throw new Error(`Error al borrar todo: ${error}`)
            }
            return {error: 'Carrito Eliminado'}   
        } else {
            return {error: `No existe carrito con id: ${id_Carrito}`}
        }
    }

    async deleteProductoById(id_Carrito, id_Producto){
        this.carritos = await this.getAllFromFile()
        let founded = this.carritos.findIndex(element => element.id === id_Carrito) 
        if(!(typeof founded === 'undefined')){
            let Prodfounded = this.carritos[founded].productos.findIndex((pelement) => pelement.id === id_Producto) 
            if(!(typeof Prodfounded === 'undefined')){
                this.carritos[founded].productos.splice(Prodfounded, 1)
                try {
                    await fs.writeFile(this.ruta, JSON.stringify(this.carritos, null, 2))
                } catch (error) {
                    throw new Error(`Error al borrar todo: ${error}`)
                }
                return {error: 'Producto Eliminado'}   
            } else {
                return {error: `No existe producto con id: ${id_Producto}`}
            }
        } else {
            return {error: `No existe carrito con id: ${id_Carrito}`}
        }
    }

    async deleteAll(){
        try {
            await fs.writeFile(this.ruta, JSON.stringify([], null, 2))
        } catch (error) {
            throw new Error(`Error al borrar todo: ${error}`)
        }
    }

    async getAllFromFile(){
        try {
            const obj = await fs.readFile(this.ruta, 'utf-8')
            return JSON.parse(obj)
        } catch (error) {
            console.log(error)
            return []
        }
    }
}