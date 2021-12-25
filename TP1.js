class Usuario{
    constructor(nombre, apellido, libros, mascotas){
        this.nombre = (nombre)?nombre:''
        this.apellido = (apellido)?apellido:''
        this.libros = (libros)?libros:[]
        this.mascotas = (mascotas)?mascotas:[]
    }

    getFullName(){
        return `${this.nombre} ${this.apellido}`
    }

    addMascota(mascota){
        this.mascotas = [...this.mascotas,mascota]
    }

    addBook(newNombre, newAutor){
        this.libros = [...this.libros,{nombre:newNombre,autor:newAutor}]
    }

    getBookNames(){
        return this.libros.map(l=>l.nombre)
    }

    countMascotas() {return this.mascotas.length}
}

const usuario = new Usuario('Nestor','Beer',[{nombre:'El señor de los anillos', autor:'Tolkien'}],['Juanita'])
console.log(usuario.getFullName())
usuario.addMascota('Jorgito')
console.log(usuario.countMascotas())
usuario.addBook('Harry potter','Rowlin')
console.log(usuario.getBookNames())