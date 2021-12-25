//var fs = require('fs')
//let contenido = fs.readFileSync('./assets/TP2.txt', 'utf-8')
//console.log(contenido)
//fs.writeFileSync('./assets/TP2.txt',contenido + 'Registro 2')

class fileService {
    fs = require('fs')
    constructor(path){
        this.path =(path)?path:'./assets/TP2.txt',
        this.data=''
    }
    
    readFile(path) {
        this.fs.readFile((path)?path:this.path, 'utf-8',(error, datos) => {
            if(error){
                console.log(error)    
            }
            else{
                this.data = datos
                console.log(JSON.parse(JSON.stringify(datos)))   
            }
            
        })
    }

    appendFile(data, path) {
        this.fs.appendFile((path)?path:this.path,data,(error)=> {
            if(error){
                console.log('Error al escribir el archivo', error)    
                return
            }
            else{
                console.log('El archivo se escribio con exito')    
            }
        })
    }

    writeFile(data, path) {
        this.fs.writeFile((path)?path:this.path,data,(error)=> {
            if(error){
                console.log('Error al escribir el archivo', error)    
                return
            }
            else{
                console.log('El archivo se escribio con exito')    
            }
        })
    }
}

let customFileService = new fileService()

//customFileService.readFile('notExistsFile.txt')
/*console.log('data',customFileService.data,'data')
customFileService.appendFile('\n')
customFileService.appendFile('\n mi dato ')
customFileService.appendFile('\n')*/

customFileService.appendFile(JSON.stringify({nombre:'Nestor', apellido:'Beer'}))
customFileService.readFile()

/*customFileService.readFile()
console.log(customFileService.data)*/
