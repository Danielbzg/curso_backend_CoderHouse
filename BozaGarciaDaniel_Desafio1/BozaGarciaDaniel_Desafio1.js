class Usuario{
    constructor(nombre, apellido){
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = [];
        this.mascotas = [];
    }

    //getFullName(): String. Retorna el completo del usuario. Utilizar template strings.
    getFullName() {
        return `El nombre del usuario es ${this.nombre} y el apellido es ${this.apellido}.`;
    }

    //addMascota(String): void. Recibe un nombre de mascota y lo agrega al array de mascotas.
    addMascota(nombreMascota) {
        this.mascotas.push(nombreMascota);
    }

    //countMascotas(): Number. Retorna la cantidad de mascotas que tiene el usuario.
    countMascotas() {
        let CantidadMascotas = this.mascotas.length;
        return `La cantidad de mascotas que tiene ${this.nombre} es: ` + CantidadMascotas;
    }

    //addBook(String, String): void. Recibe un string 'nombre' y un string 'autor' y debe agregar un objeto: { nombre: String, autor: String } al array de libros.
    addBook(nombreLibro, nombreAutor) {
        this.libros.push({nombreLibro, nombreAutor});
    }

    //getBookNames(): String[]. Retorna un array con sólo los nombres del array de libros del usuario.
    getBooksNames() {
        let librosExistentes;
        for(let i=0; i<this.libros.length; i++){
            librosExistentes = this.libros[i].nombreLibro;
            console.log(`Título existente entre los libros de ${this.nombre}: ${[i + 1]}. `  + librosExistentes);
        }
    }

}

let persona1 = new Usuario("Daniel", "Boza", [], []);
persona1.addMascota("Tigre");
persona1.addMascota("Gato");
persona1.addBook("Ensayo sobre la ceguera", "José Saramago");
persona1.addBook("El Principito", "Antoine de Saint-Exupéry");

console.log("------------------------Datos del usuario-------------------------");
console.log(persona1);

console.log("------------------------Método 1 Nombre completo-------------------------");
console.log(persona1.getFullName());

console.log("------------------------Método 2 Nombre de los títulos de los libros-------------------------");
console.log(persona1.getBooksNames());

console.log("------------------------Método 3 Contador de mascotas-------------------------");
console.log(persona1.countMascotas());
