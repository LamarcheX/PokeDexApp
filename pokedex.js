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

// Función para mostrar todos los Pokémon en el contenedor.
const displayAllPokemon = (pokemonList) => {
    // Limpiamos el contenido del contenedor de Pokémon.
    pokemonContainer.innerHTML = '';
    // Recorremos la lista de Pokémon y mostramos cada uno.
    pokemonList.forEach(pokemon => displayPokemon(pokemon));
};

// Función para crear y mostrar la tarjeta de un Pokémon específico.
const displayPokemon = (pokemon) => {
    // Creamos un elemento div para la tarjeta del Pokémon.
    const pokemonCard = document.createElement('div');
    // Añadimos la clase CSS 'pokemon-card' al div.
    pokemonCard.classList.add('pokemon-card');

    // Obtenemos las habilidades del Pokémon y las convertimos en una cadena.
    const abilities = pokemon.abilities.map(ability => ability.ability.name).join(', ');
    // Mapeamos las estadísticas del Pokémon a un nuevo formato.
    const stats = pokemon.stats.map(stat => ({
        name: stat.stat.name,
        base_stat: stat.base_stat
    }));

    // Creamos el HTML interno para la tarjeta del Pokémon.
    const pokemonInnerHTML = `
        <div class="number">#${pokemon.id.toString().padStart(3, '0')}</div>
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png" alt="${pokemon.name}">
        <h2>${pokemon.name}</h2>
        <p>Type: ${pokemon.types.map(type => type.type.name).join(', ')}</p>
        <p>Abilities: ${abilities}</p>
        <div class="stats">
            <canvas id="chart-${pokemon.id}"></canvas>
        </div>
    `;

    // Asignamos el HTML interno al div de la tarjeta.
    pokemonCard.innerHTML = pokemonInnerHTML;
    // Añadimos la tarjeta del Pokémon al contenedor de Pokémon.
    pokemonContainer.appendChild(pokemonCard);
    // Creamos un gráfico de estadísticas para el Pokémon.
    createChart(`chart-${pokemon.id}`, stats);
};