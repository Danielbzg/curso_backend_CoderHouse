const fs = require("fs");
const { parse } = require("querystring");

class Contenedor {

  constructor(folder, file) {
    this.folder = folder;
    this.file = file;
    this.idInicial;
  }

  //Método para crear la carpeta
  crearCarpeta(rutaDondeCrear, nombreCarpeta) {
    //Crear carpeta con .mkdir("ruta", "NombreCarpeta"), que necesita una ruta y un nombre para la carpeta
    //Enlace explicativo https://www.geeksforgeeks.org/node-js-fs-mkdir-method/
    fs.mkdir((rutaDondeCrear, nombreCarpeta), (err) => {
      if (err) {
        return console.error(err);
      }
      console.log("Directorio creado correctamente");
    });
  }

    //Método para crear un archivo y su contenido
    crearArchivo(nombreCarpeta, nombreArchivoConExtension, contenidoArchivo) {
      //Agregar datos a un archivo, si no existe lo crea.
      fs.appendFileSync(`./${nombreCarpeta}/${nombreArchivoConExtension}`, `${contenidoArchivo}`, (err) => {
          if (err) {
            console.log(err);
          } else {
            // Leer el contenido del archivo tras el append
            console.log("------------------------------------------------");
            console.log(
              "\nLo que el archivo contine tras el append es:",
              fs.readFileSync(`./${nombreCarpeta}/${nombreArchivoConExtension}`, "utf8")
            );
            console.log("\n");
          }
        }
      );
    }

  //01. Método Save para guardar un objeto
  saveObject = async (objeto) => {
    try{
      console.log('OBJETO RECIBIDO: ', objeto);
    //Leer el archivo
    const data = fs.readFileSync(`./${this.folder}/${this.file}`, "utf8");

    //parseo de string a objeto
    const dataParseada = JSON.parse(data);
    console.log('OBJETO ANTES DE AGREGAR ID: ', objeto);

    // Cómo agregar una propiedad a un objeto? con dot notation. object.id --> acá le estamos añadiendo la propiedad id a tu objeto
    // Por otro lado, tomamos la longitud del array que existe en el json y vemos cuántos elementos tiene, para calcular un id le decimos que el nuevo id
    // tendrá un número más que la longitud = objeto.id = dataParseada.length + 1;
    if (dataParseada.length > 0) {
      objeto.identificador = dataParseada.length + 1;
    } else {
      objeto.identificador = 1;
    }

    console.log('OBJETO DESPUÉS DE AGREGAR ID: ', objeto);

    //Pushear los datos que quieres añadir
    dataParseada.push(objeto);
    // //Añadirlo al archivo
    fs.writeFileSync(`./${this.folder}/${this.file}`, JSON.stringify(dataParseada, null, 2));

    //Impresión por pantalla de los elementos tras la modificación
    console.log("-----------------------------------------------------");
    console.log("------Todos los elementos tras guardar un objeto-----");
    console.log("Lo que hay dentro del archivo: ", dataParseada);
    console.log("\n");
    }catch(err){
      console.log(err);
    }
  };

  /*02. Extraer un objeto por su ID*/
  getById = async (id) => {
    try {
      let data = await fs.promises.readFile(`./${this.folder}/${this.file}`, "utf8");
      const dataParseada = JSON.parse(data);

      // Filtrar el arreglo de objetos para encontrar uno con el mismo id que se le introduce
      const objetoEncontrado = dataParseada.find((item) => item.identificador == id);

      // # If there isnt a product with the same id, return null.
      console.log("---------------------------------------------------------------------------------------------------------------");
      console.log("El dato encontrado tiene guardado los siguientes valores = ", objetoEncontrado);
      console.log("---------------------------------------------------------------------------------------------------------------");
      console.log("\n");
      return objetoEncontrado.length ? value : null;
    } catch (err) {
      console.log("No hay ningún elemento con ese identificador")
      console.log(err);
    }
  };

  /*03. Extraer todos los datos del archivo*/
  getAll = async () => {
    try {
      let data = await fs.promises.readFile(`./${this.folder}/${this.file}`, "utf8");
      const dataParseada = JSON.stringify(JSON.parse(data), null, 2);

      console.log("El getAll da como resultado: " + dataParseada)
      return dataParseada;
    } catch (err) {
      console.log(err);
    }
  };

  /*04. Método-Función para borrar elementos por su id*/
  deleteById = async (id) => {
    try {
      let data = await fs.promises.readFile(`./${this.folder}/${this.file}`, "utf8");
      const dataParseada = JSON.parse(data);

      // Filtrar producto.
      let contenidoEditado = dataParseada.filter((item) => item.identificador !== id);

      await fs.promises.writeFile(`./${this.folder}/${this.file}`, JSON.stringify(contenidoEditado));

      console.log(`El producto con el identificador ${id} ha sido eliminado.`);
    } catch (err) {
      console.log(err);
    }
  };

  /*05. Método-Función para borrar todo */
  deleteAll = async () => {
    try {
      await fs.promises.writeFile(`./${this.folder}/${this.file}`, JSON.stringify([]));

      console.log("El archivo ha sido vaciado.");

    } catch (err) {
      console.log(err);
    }
  };

}

let RutaDondeCrear = "./BozaGarciaDaniel_Desafio2";

//Prueba 1 a ejecutar para crear los elementos y consultar un dato
const productos = new Contenedor("productos", "productos.txt");

productos.crearCarpeta(RutaDondeCrear, "productos");

productos.crearArchivo("productos", "productos.txt", "[]");

objetoUsuario1 = { title: "Producto1", price: 25, thumbnail: "https://cdn.pixabay.com/photo/2016/11/18/17/47/iphone-1836071_960_720.jpg"};
objetoUsuario2 = { title: "Producto2", price: 25, thumbnail: "https://image.dhgate.com/0x0s/f2-albu-g10-M00-3C-53-rBVaWV7Pe8KAZS-lAASdOCwpp1w302.jpg/17-key-de-alta-calidad-kalimba-africano-s.jpg"};
objetoUsuario3 = { title: "Producto3", price: 25, thumbnail: "https://cdn.pocket-lint.com/r/s/970x/assets/images/155087-laptops-review-microsoft-surface-laptop-go-review-image1-6ezitk9ymj.jpg"};
objetoUsuario4 = { title: "Producto4", price: 25, thumbnail: "https://ae01.alicdn.com/kf/H2de88ccdcbcb406abb9238ed5b3258adQ/Yoyobarista-yoyo-capuchino-para-jugador-profesional-1A-3A-5A-novedad-de-2021.jpg_Q90.jpg_.webp"};
objetoUsuario5 = { title: "Producto5", price: 25, thumbnail: "https://cdn.milenio.com/uploads/media/2020/07/13/arquitecto-escultor-hungaro-erno-rubik.jpg"};
productos.saveObject(objetoUsuario1); 
productos.saveObject(objetoUsuario2); 
productos.saveObject(objetoUsuario3); 
productos.saveObject(objetoUsuario4); 
productos.saveObject(objetoUsuario5); 

productos.getAll();

export * from Desafio2.js;