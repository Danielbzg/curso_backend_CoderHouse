const fs = require("fs");


    //Crear carpeta con .mkdir("ruta", "NombreCarpeta"), que necesita una ruta y un nombre para la carpeta
    //Enlace explicativo https://www.geeksforgeeks.org/node-js-fs-mkdir-method/
    fs.mkdir(("./BozaGarciaDaniel_Desafio2", nombreArchivo), (err) => {
      if (err) {
        return console.error(err);
      }
      console.log("Directorio creado correctamente");
    });

    //Agregar datos a un archivo, si no existe lo crea.
    fs.appendFileSync("./archivo/primerArchivo.json", '{ "cosas": []}', (err) => {
        if (err) {
          console.log(err);
        } else {
          // Leer el contenido del archivo tras el append
          console.log("------------------------------------------------");
          console.log(
            "\nLo que el archivo contine tras el append es:",
            fs.readFileSync("./archivo/primerArchivo.json", "utf8")
          );
          console.log("\n");
        }
      }
    );


//Leer el archivo
const data = fs.readFileSync("./archivos/primerArchivo.json", "utf8");

//parseo de string a objeto
const stuff = JSON.parse(data);

/*1. Guardar un objeto*/
const save = (nombreCosa, idRecibido) => {
  //Pushear los datos que quieres añadir
  stuff.cosas.push({
    nombre: nombreCosa,
    id: idRecibido,
  });

  //Añadirlo al archivo
  fs.writeFileSync(
    "./archivos/primerArchivo.json",
    JSON.stringify(stuff, null, 2)
  );

  //Impresión por pantalla de los elementos tras la modificación
  console.log("-----------------------------------------------------");
  console.log("------Todos los elementos tras guardar un objeto-----");
  console.log("Lo que hay dentro del archivo: ", stuff);
  console.log("\n");
};

save("Luu", 1);
save("Edu", 2);
save("Carmelo", 3);
save("Eva", 4);
save("Lara", 5);
save("Pepe", 6);
save("Daniel", 7);

/*2. Extraer un objeto por algún dato concreto*/
const EncontrarPorId = (idRecibido) => {
  const objetoEncontrado = stuff.cosas.find((cosas) => cosas.id === idRecibido);
  //Separo los valores de dentro del objeto para que quede más claro.
  const nombreEncontrado = objetoEncontrado.nombre;
  const idEncontrada = objetoEncontrado.id;
  console.log(
    "---------------------------------------------------------------------------------------------------------------"
  );
  console.log(
    `El dato encontrado tiene guardado los siguientes valores = nombre: ${nombreEncontrado} / id: ${idEncontrada}`
  );
  console.log(
    "---------------------------------------------------------------------------------------------------------------"
  );
  console.log("\n");
};

EncontrarPorId(7);

/*3.  Muestra los datos que hay dentro de un archivo*/
const mostrarDatos = (rutaArchivo) => {
  //Leer el archivo
  const datosRuta = fs.readFileSync(`${rutaArchivo}`, "utf8");

  //parseo de string a objeto e imprimirlo en pantalla
  const stuff = JSON.parse(datosRuta);

  //imprimir lo que hay en el archivo
  console.log("------------------------------------------------");
  console.log("------Todos los elementos con Mostrar Datos-----");
  console.log("Lo que hay dentro del archivo: ", stuff);
  console.log("\n");
};

/* mostrarDatos("./archivos/primerArchivo.json"); */

/*4. Eliminar un objeto por un dato concreto */
const borrarObjeto = (idRecibido) => {
  const objetoEncontrado = stuff.cosas.find((cosas) => cosas.id === idRecibido);

  if (objetoEncontrado != null) {
    console.log(
      "---------------------------------------------------------------------------"
    );
    console.log(
      "Borrando a " + objetoEncontrado.nombre + " con id " + objetoEncontrado.id
    );
    delete objetoEncontrado.nombre;
    delete objetoEncontrado.id;
  } else {
    console.log("------------------------------------------------");
    console.log("No hay ningún id de valor ", idRecibido);
    console.log("\n");
  }
  fs.writeFileSync(
    "./archivos/primerArchivo.json",
    JSON.stringify(stuff, null, 2)
  );
  console.log("----------------------------------------------------");
  console.log("---Elementos con la modificación de Borrar Objetos---");
  console.log(stuff);
  console.log("\n");
};

/* borrarObjeto(2); */

/*5. Borrar todo los objetos presentes en el archivo */
const borrarTodo = () => {
  delete stuff.cosas;
  console.log("------------------------------------------------");
  console.log("-----------Elementos tras Borrar todo-----------");
  console.log(stuff);
  console.log("------------------------------------------------");
  fs.writeFileSync(
    "./archivos/primerArchivo.json",
    JSON.stringify(stuff, null, 2)
  );
  console.log("\n");
};

/* borrarTodo(); */
