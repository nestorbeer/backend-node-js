import './App.css';
import React, { useEffect, useState} from 'react'

function App() {
  const [products, setProducts] = useState([])

  useEffect(()=>{
    fetch('https://192.168.011:8080/api/productos')
    .then(response => response.json())
    .then(data => setProducts({ data }));
  },[])
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Listado de productos
          {
            products?.map(({id,timestamp, descripcion,precio,stock,foto})=>
              <div>
                Producto: {id} descripcion: {descripcion}
              </div>
            )
          }
        </p>
      </header>
    </div>
  );
}

export default App;
