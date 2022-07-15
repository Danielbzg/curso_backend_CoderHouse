// import Contenedor from "./Desafio2.js"; // no se debería importar de esta forma en back
const express = require('express')
const app = express();
const contenedor = require('./Desafio2')
const data = new contenedor('./productos/productos.txt') //instanciamos nuestra clase contenedor

//Creación de la ruta principal
app.get("/", (req, res) => {
    res.send('<h1 style="color: blue">Bienvenidos al desafío 3</h1><br><div><button><a href="http://localhost:8080/productos" target="_blank">Todos los Productos</a> </button><button><a href="http://localhost:8080/productoRandom" target="_blank">Producto Random</a></button></div>');
});

//Ruta que trae todos los productos
app.get('/productos',(req, res) => {
    try {
      data.getAll().then((prod) => res.send(prod))
    } catch (e) {
      console.error(e);
    }
});

//Ruta para que traerá un producto aleatorio
app.get('/productoRandom', (req, res) => { 
  
  try {
    console.log('Probando si entra');
    data.getRandom().then((random) => res.send(random));
  } catch (e) {
      console.error(e);
  }
})

//Definición del puerto al que le damos acceso al server
const PORT = 8080;

const server = app.listen(PORT, () => {
    console.log(`Se escucha el contenido del puerto ${PORT}`);
});

server.on('error', error => console.log(`Error: ${error}`));

