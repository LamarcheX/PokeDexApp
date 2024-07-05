// Obtenemos el elemento del contenedor de Pokémon y la barra de búsqueda desde el DOM.
const pokemonContainer = document.getElementById('pokemon-container');
const searchBar = document.getElementById('search-bar');

// Definimos el número de Pokémon que queremos obtener. En este caso, 151.
const numberOfPokemon = 151; 
// Creamos un array para almacenar todos los Pokémon que obtendremos.
let allPokemon = [];

// Añadimos un evento al input de búsqueda para filtrar los Pokémon cuando se escribe en la barra de búsqueda.
searchBar.addEventListener('input', (e) => {
    // Convertimos el valor de búsqueda a minúsculas.
    const searchValue = e.target.value.toLowerCase();
    // Filtramos los Pokémon según el nombre.
    const filteredPokemon = allPokemon.filter(pokemon => pokemon.name.toLowerCase().includes(searchValue));
    // Mostramos los Pokémon filtrados.
    displayAllPokemon(filteredPokemon);
});

// Función asíncrona para obtener datos de un Pokémon específico por su ID.
const fetchPokemon = async (id) => {
    // Construimos la URL para la API de Pokémon con el ID proporcionado.
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    // Hacemos una solicitud fetch a la API.
    const res = await fetch(url);
    // Convertimos la respuesta a formato JSON.
    const pokemon = await res.json();
    // Añadimos el Pokémon obtenido al array allPokemon.
    allPokemon.push(pokemon);
};

// Función asíncrona para obtener todos los Pokémon desde 1 hasta numberOfPokemon.
const fetchAllPokemon = async () => {
    // Usamos un bucle for para obtener cada Pokémon por su ID.
    for (let i = 1; i <= numberOfPokemon; i++) {
        // Esperamos a que se obtenga el Pokémon antes de continuar con el siguiente.
        await fetchPokemon(i);
    }
    // Mostramos todos los Pokémon obtenidos.
    displayAllPokemon(allPokemon);
};