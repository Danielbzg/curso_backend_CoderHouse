// import * as fs from "fs";

const fs = require('fs');

class Contenedor {

  constructor(file) {
    // this.folder = folder;
    this.file = file;
    this.idInicial;
  }

  //Método para crear la carpeta
  // crearCarpeta(rutaDondeCrear, nombreCarpeta) {
  //   //Crear carpeta con .mkdir("ruta", "NombreCarpeta"), que necesita una ruta y un nombre para la carpeta
  //   //Enlace explicativo https://www.geeksforgeeks.org/node-js-fs-mkdir-method/
  //   fs.mkdir((rutaDondeCrear, nombreCarpeta), (err) => {
  //     if (err) {
  //       return console.error(err);
  //     }
  //     console.log("Directorio creado correctamente");
  //   });
  // }

    //Método para crear un archivo y su contenido
    // crearArchivo(nombreCarpeta, nombreArchivoConExtension, contenidoArchivo) {
    //   //Agregar datos a un archivo, si no existe lo crea.
    //   fs.appendFileSync(`./${nombreCarpeta}/${nombreArchivoConExtension}`, `${contenidoArchivo}`, (err) => {
    //       if (err) {
    //         console.log(err);
    //       } else {
    //         // Leer el contenido del archivo tras el append
    //         console.log("------------------------------------------------");
    //         console.log(
    //           "\nLo que el archivo contine tras el append es:",
    //           fs.readFileSync(`./${nombreCarpeta}/${nombreArchivoConExtension}`, "utf8")
    //         );
    //         console.log("\n");
    //       }
    //     }
    //   );
    // }

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
  /* getById = async (id) => {
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
  }; */

  getById = async(number) => {
    try {
        let data = await fs.promises.readFile(`./${this.file}`, 'utf-8')
        console.log(data);
        
        const products = JSON.parse(data)
        console.log(products);
        const findId = products.findIndex(element => element.identificador === number)
        // console.log("Data products: " + products);
        if (findId != -1)
            return (JSON.stringify(products[findId]))
        else {
            console.error({message:`No se encontro el producto`})
        }

    } catch (e) {
console.error({code: 'Error', message: e})
    }
}

  /*03. Extraer todos los datos del archivo*/
  getAll = async () => {
    try {
      let data = await fs.promises.readFile(`./${this.file}`, "utf8");
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

  async getArrayProd(){
    try {
        const arrayEntero = await fs.promises.readFile(`./${this.file}`, 'utf-8')
        const array = await JSON.parse(arrayEntero) 

        return array.length

    } catch(e) {
        console.error(e)
    }
}

  getRandom = async ()=>{
    try{
      let data = await fs.promises.readFile(`./${this.file}`, "utf8");
      const dataParseada = JSON.parse(data);
      const id = await (Math.floor(Math.random() * (dataParseada.length)) + 1)
                if (id <= dataParseada.length) {
                    return this.getById(id);
                }
    }catch(e){
      console.error(e)

    }
  }

}
module.exports = Contenedor
