const axios = require("axios");
const readline = require("node:readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function input(question) {
  return new Promise((resolve) => {
     rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}
const API_BASE = "https://swapi.dev/api";
const clearConsole = () => {
  console.clear();
};
const getPerson = async (id) => {
  const response = await axios.get(`${API_BASE}/people/${id}/`);
  return response.data;
};

const getPeopleList = async (offset = 0, limit = 10) => {
  const url = API_BASE.endsWith("/") ? API_BASE : API_BASE + "/";
  const response = await axios.get(
      `${url}people?offset=${offset}&limit=${limit}`,
  );
  return response.data.results;
};
const printPeopleList = async () => {
  clearConsole();
  console.log("Cargando personajes...");
  const people = await getPeopleList();   
  clearConsole();
  console.log("Lista de personajes:");
  for (const person of people) {
    console.log(`* ${person.name}`);
  }
  await input("Presione Enter para continuar...");
};
const printPersonInfo = async () => {
  clearConsole();
  
  const id = await input("Ingrese el ID del personaje: ");
  const person = await getPerson(id);

    
  console.log(`Nombre: ${person.name}`);
  console.log(`Estatura: ${person.height} cm`);
  console.log(`Peso: ${person.mass} kg`);
  console.log(`Año de nacimiento: ${person.birth_year}`);
  console.log(`Género: ${person.gender}`);
    
  await input("Presione Enter para continuar...");
};
const getPlanetsList = async (offset = 0, limit = 10) => {
  const url = API_BASE.endsWith("/") ? API_BASE : API_BASE + "/";
  const response = await axios.get(
      `${url}planets?offset=${offset}&limit=${limit}`,
  );
  return response.data.results;
};
const printPlanetsList = async () => {
  clearConsole();
  console.log("Cargando planetas...");
  const planets = await getPlanetsList();   
  clearConsole();
  console.log("Lista de planetas:");
  for (const planet of planets) {
    console.log(`* ${planet.name}`);
  }
  await input("Presione Enter para continuar...");
};
const printMenu = (isInvalidOption, option) => {
  if (isInvalidOption) {
    console.log(`La opción '${option}' ingresada no es válida`);
  }
  console.log("================================================");
  console.log("1. Ver lista de personajes");
  console.log("2. Ver información de un personaje");
  console.log("3. Ver lista de planetas")
  console.log("4. Salir");
  console.log("================================================");
};


const main = async () => {
  clearConsole();

  let option = "";
  let isInvalidOption = false;
  while (true) {
    printMenu(isInvalidOption, option);
    option = await input("Ingrese la opción: ");

    if (option === "1") {
      await printPeopleList();
      clearConsole();
      isInvalidOption = false;
      continue; 
    }
    
    if (option === "2") {
      clearConsole();
      await printPersonInfo();
      isInvalidOption = false;
      continue;
    }

    if (option === "3") {
      await printPlanetsList();
      clearConsole();
      isInvalidOption = false;
      continue;
    }

    if (option === "4") {
      process.exit(0);
      break;
    }
   
    if (option !== "1" && option !== "2" && option !== "3" && option !== "4") {
      isInvalidOption = true;
      clearConsole();
      continue;
    }
  }
};

main();