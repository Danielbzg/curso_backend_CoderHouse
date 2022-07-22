const express = require("express");
const { Router } = express;
const app = express();
const productos = [];

//Utilizar JSON en las request (Cuerpo)
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//


const routerProductos = Router();

//Ruta de todos los productos
//GET
routerProductos.get("/productos", (req, res) =>{
    res.json(productos);
});
//POST
routerProductos.post("/crearproductos", (req, res) => {
    const requestproductos = [];
    requestproductos.push = req.body;
    console.log(req.body);
    productos.push = requestproductos;
    res.json(requestproductos);
});

app.use("/desafio", routerProductos);

const PORT = 3000;
const server = app.listen(PORT, ()=>{
    console.log(`Servidor escuchando en puerto ${PORT}`);
})

server.on("error", error => console.log(`Error: ${error}`));