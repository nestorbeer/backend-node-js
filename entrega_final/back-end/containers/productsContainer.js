const Product = require('../entities/ProductDTO') 
const { promises: fs } = require('fs')

module.exports = class ProductsContainer{
    
    ruta = ""
    products = []
    constructor(ruta){
        this.ruta = ruta
    }

    async save(product){
        this.products = await this.getAllFromFile()
        if(this.products.length > 0){
            product.id = this.products[this.products.length-1].id + 1
        }
        else{
            product.id = 1
        }
        product.timestamp = Date.now()
        this.products.push(product)
        
        try {
            await fs.writeFile(this.ruta, JSON.stringify(this.products, null, 2))
        } catch (error) {
            throw new Error(`Error al borrar todo: ${error}`)
        }
        
        return {error: 'ok', id: product.id}   
    }

    async update(id_Product, product){
        this.products = await this.getAllFromFile()
        let founded = this.products.findIndex(element => element.id === id_Product)  
        console.log(founded)
        if(founded === -1){    
            return {error: 'Producto no encontrado'}
        } else {
            try{
                this.products[founded].title = product.title
                this.products[founded].price = product.price
                this.products[founded].thumbnail = product.thumbnail
                try {
                    await fs.writeFile(this.ruta, JSON.stringify(this.products, null, 2))
                } catch (error) {
                    throw new Error(`Error al borrar todo: ${error}`)
                }
                return {error: 'ok', productos: this.products[founded]}
            }
            catch(er){
                return {error: er}
            }
        }
    }

    async getById(id_Product){
        try{
            this.products = await this.getAllFromFile()
            let founded = this.products.findIndex(element => element.id === id_Product) 
            if(founded === -1){
                return {error: 'Producto no encontrado', productos: {}}
            } else {
                console.log(this.products[founded])
                return {error: 'ok', productos: this.products[founded]}   
            }
        }catch (er) {
            return {error: er}
        }
    }

    async getAll(){
        try {
            this.products = await this.getAllFromFile()
            console.log(this.products)
            if(this.products.length > 0){
                return {error: 'ok', productos: this.products}   
            } else {
                return {error: 'No existen productos', productos: this.products}
            }
        } catch (er) {
            return {error: er}
        }
    }

    async deleteById(id_Product){
        this.products = await this.getAllFromFile()
        let founded = this.products.find(element => element.id === id_Product) 
        if(!(typeof founded === 'undefined')){
            this.products.splice(founded, 1)
            try {
                await fs.writeFile(this.ruta, JSON.stringify(this.products, null, 2))
            } catch (error) {
                throw new Error(`Error al borrar por id: ${error}`)
            }
            return {error: 'Producto Eliminado'}   
        } else {
            return {error: `No existe producto con id: ${id_Product}`}
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