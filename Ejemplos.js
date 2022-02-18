const products = [
    {
        id:'1',
        name:'producto 1',
        components:[
            {
                id:1001,
                color:1,
                talle:2,
                name:'componente 1',
                cantid:0
            },
            {
                id:1002,
                color:1,
                talle:1,
                name:'componente 1',
                cantid:0
            },
            {
                id:1003,
                color:2,
                talle:2,
                name:'componente 1',
                cantid:0
            },
            {
                id:1004,
                color:3,
                talle:2,
                name:'componente 1',
                cantid:0
            },
        ]
    }
]

const addToCart = (product, details)=>{
    //Clonamos el array original del carrito
    const newCart = [...products]

    //Si el producto no existe en el array lo agregamos
    if(newCart.filter((element)=>element.id == product.id).length === 0){
        product.components = [...details]
        newCart.push(product)
    }
    else{
        const indexRow = newCart.findIndex((element) => element.id == product.id)
        details.forEach(productToAdd => {
            if(newCart[indexRow].components.filter(element=>element.id == productToAdd.id).length === 0){
                newCart[indexRow].components.push(productToAdd)
            }
            else{
                newCart[indexRow].components.filter(element=>element.id == productToAdd.id)[0].cantid = productToAdd.cantid
            }
        })
    }
}


const componentes = [{id:1001,color:1,talle:2,name:'componente 1',cantid:1},{id:1002,color:1,talle:2,name:'componente 2',cantid:2},{id:1005,color:1,talle:2,name:'componente 5',cantid:5}]
const productToTest = {id:'1',name:'producto 1'}

addToCart(productToTest, componentes)


/*const getColors = (product)=>{
    const colors = []
    product.components.forEach(item => {if(!colors.find(element => element === item.color))colors.push(item.color)})
}*/

/*const getColors = (product)=>{
    return product.components.reduce((acc,item)=>{return (!acc.find(element => element == item.color))?acc.concat(item.color):acc},[])
}

const getSizes = (product)=>{
    const sizes = []
    product.components.forEach(item => {if(!sizes.find(element => element == item.talle))sizes.push(item.talle)})
}

const getCantidadesPorTallePorColor = (product, color)=>{
    return product.components.reduce((acc,item)=>{return (!acc.find(element => element == item.color))?acc.concat(item.color):acc},[])
}
*/
//console.log(getColors(products[0]))
//getSizes(products[0])

/*const notaDeDev = {
    id:1,
    observaciones:'ljnbjl',
    items:[{id:1, producto:'remera', price:100},{id:2, producto:'pantalon', price:150}]
}*/

/*console.log('Mi primer programa en JS')
console.log('Voy a ver mi ND', notaDeDev)
console.log('Voy a ver las observaciones', notaDeDev.observaciones)
console.log('Voy a ver los items', notaDeDev.items)
notaDeDev.items.push({id:3, producto:'buzo', price:50})
console.log('Voy a ver los items', notaDeDev.items)
*/

