const fs = require("fs");

const INPUT_CSV = "videogames.csv";
const OUTPUT_DIR = "export";
const OUTPUT_JSON = `${OUTPUT_DIR}/${INPUT_CSV.split(".")[0]}.json`;

// Si no existe el directorio de salida...
if (!fs.existsSync(OUTPUT_DIR)) {
	fs.mkdirSync(OUTPUT_DIR, { recursive: true });
	console.log(`Carpeta: ${OUTPUT_DIR} creada!`);
}

// Leer el CSV y normalizar los saltos de linea (posibles)
let texto = fs.readFileSync(INPUT_CSV, "utf-8");
texto = texto.replace(/\r\n/g, "\n").replace(/\r/g, "\n");

// Vamos a quedarnos con tocas las lineas que no estén vacias
const lineas = texto.split("\n").filter((linea) => linea.trim() !== "");
console.log("Lineas totales:", lineas.length);

// Vamos a recuperar las cabeceras
const cabeceras = lineas[0].split(",").map((cabecera) => cabecera.trim());
console.log("Cabeceras totales:", cabeceras.length);

// Vamos a transformar mediante bucles todas las lineas y cabeceras en un array de objetos
const objetos = [];

for (let i = 1; i < lineas.length; i++) {
	// Creamos una fila
	const fila = lineas[i];
	// Sacamos sus columnas
	const columnas = fila.split(",");
	// Inicializamos un objeto
	const objeto = {};

	// Recorremos las cabeceras
	for (let j = 0; j < cabeceras.length; j++) {
		objeto[cabeceras[j]] = (columnas[j] || "").trim();
	}

	objetos.push(objeto);
}

console.log("Total de objetos creados", objetos.length);

// Convertir este array de objetos en un JSON
fs.writeFileSync(OUTPUT_JSON, JSON.stringify(objetos, null, 2), "utf-8");
