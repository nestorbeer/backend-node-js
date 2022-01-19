

module.exports = class Contenedor {
    fs = require('fs')
    constructor(path){
        this.path =(path)?path:'./assets/productos.json',
        this.data=''
    }
    
    save(objeto){
        let newId = 1
        const data = this.fs.readFileSync(this.path)

        if(data.length>0){
            const jsonData = JSON.parse(data)  
            newId = jsonData.reduce((acc,item) => {return Math.max(acc,item.id)},0) + 1
            jsonData.push({id:newId,title:objeto.title,price:objeto.price,thumbnail:objeto.thumbnail})
            this.data = JSON.stringify(jsonData)
            try{
                this.fs.writeFileSync(this.path,JSON.stringify(jsonData), {encoding:'utf-8'})
            }
            catch(error){
                console.log('Error al escribir el archivo', error)    
            }
        }
        else{
            const products = []
            const product = {id:newId,title:objeto.title,price:objeto.price,thumbnail:objeto.thumbnail}
            products.push(product)
            try{
                this.fs.writeFileSync(this.path,JSON.stringify(products), {encoding:'utf-8'})
            }
            catch(error){
                console.log('Error al escribir el archivo', error)    
            }
            
        }

        return newId
    }

    getAll(){
        const data = this.fs.readFileSync(this.path)
        if(data.length>0){
            const jsonData = JSON.parse(data)
            return jsonData
        }
        else{
            return null
        }
    }

    getById(id){
        const data = this.fs.readFileSync(this.path)
        if(data.length>0){
            const jsonData = JSON.parse(data)
            const row = jsonData.find((product)=>product.id == id)
            return row
        }
        else{
            return null
        }
    }

    deleteById(id){
        const data = this.fs.readFileSync(this.path)
        if(data.length>0){
            const jsonData = JSON.parse(data)
            const newArray = [...jsonData].filter(product => product.id != id)
            try{
                this.fs.writeFileSync(this.path,JSON.stringify(newArray), {encoding:'utf-8'})
            }
            catch(error){
                console.log('Error al escribir el archivo', error)     
            }
        }
        else{
            console.log('Array de productos vacio no se puede borrar')
        }
    }

    deleteAll(){
        this.fs.writeFileSync(this.path, '')
    }
}


