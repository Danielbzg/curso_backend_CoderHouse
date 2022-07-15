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
const prueba = new Contenedor("prueba", "archivoCreado.json");

prueba.crearCarpeta(RutaDondeCrear, "prueba");

prueba.crearArchivo("prueba", "archivoCreado.json", "[]");

objetoUsuario1 = { nombre: "Lu", edad: 25 };
objetoUsuario2 = { nombre: "Daniel", edad: 31 };
objetoUsuario3 = { nombre: "Pepe", edad: 23 };
objetoUsuario4 = { nombre: "Flor", edad: 31 };
objetoUsuario5 = { nombre: "Giani", edad: 28 };
prueba.saveObject(objetoUsuario1); 
prueba.saveObject(objetoUsuario2); 
prueba.saveObject(objetoUsuario3); 
prueba.saveObject(objetoUsuario4); 
prueba.saveObject(objetoUsuario5); 
 
prueba.getById(4);

/*
//Prueba 2 a ejecutar para eliminar un dato, comprobar que devuelve el undefined y un extracto de todo lo que hay en el archivo creado
prueba.deleteById(4);

prueba.getById(4)

prueba.getAll(); 
*/

/* 
//Prueba 3 a ejecutar para borrar todos los elementos y comprobar que no hay nada en el documento.
prueba.deleteAll(); 

prueba.getAll();  */