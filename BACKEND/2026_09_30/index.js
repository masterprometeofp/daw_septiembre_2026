const fs = require("fs");

/* fs.writeFile(
	"archivoNuevo.txt",
	"Hola, bienvenidos y bienvenidas a Backend con NodeJS, scripting y JavaScript",
	"utf-8",
	(error) => {
		if (error) {
			console.error("No se ha podido escribir el nuevo fichero");
			return;
		}
		console.log("Fichero creado");
	},
); */

fs.readFile("archivoNuevo.txt", "utf-8", (error, data) => {
	if (error) {
		console.error("No se pudo leer el fichero");
		return;
	}

	const newDataA = data.replaceAll("a", "o");
	const newDataB = newDataA.replaceAll("e", "o");
	const newDataC = newDataB.replaceAll("i", "o");
	const newDataD = newDataC.replaceAll("u", "o");

	console.log(newDataD);
});
