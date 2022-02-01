var express = require('express');
var router = express.Router();

let products = [{
  "id":1,"title":"Campera","price":100,"thumbnail":"https://images.unsplash.com/photo-1618677603286-0ec56cb6e1b5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fHRzaGlydHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
},
{
  "id":2,"title":"Remera","price":150,"thumbnail":"https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dHNoaXJ0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
}
]

router.post('/', (request, response, next)=>{
  let product = request.body
  product.id = products.reduce((acc,item) => {return Math.max(acc,item.id)},0) + 1
  products.push(product)
  response.send({result:"ok"})
})

router.get('/', function(req, res, next) {
  res.render('productosList', { 
    title: 'Listado de productos',
    products:products
  });
});

module.exports = router;