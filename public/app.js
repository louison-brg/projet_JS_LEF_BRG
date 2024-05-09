document.getElementById('searchButton').addEventListener('click', function() {
    searchPokemon();
});

document.getElementById('searchInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        searchPokemon();  // Appeler la même fonction de recherche que celle du clic
    }
});

function searchPokemon() {
    const pokemonName = document.getElementById('searchInput').value.trim().toLowerCase();
    console.log('Recherche pour:', pokemonName);

    fetch('pokemons_data/pokemon_full.json')
        .then(response => response.json())
        .then(data => {
            console.log('Données chargées:', data);
            const pokemon = R.find(p => p.name.toLowerCase() === pokemonName, data);
            console.log('Résultat de la recherche:', pokemon);

            if (pokemon) {
                displayPokemon(pokemon);
            } else {
                document.getElementById('pokemonDisplay').innerHTML = 'Pokémon non trouvé';
            }
        })
        .catch(error => {
            console.error('Erreur lors du chargement des données:', error);
            document.getElementById('pokemonDisplay').innerHTML = 'Erreur lors du chargement des données';
        });
}

function displayPokemon(pokemon) {
    const imageElement = document.getElementById('pokemonImage');
    const infoElement = document.getElementById('pokemonInfo');

    // Mise à jour de l'image
    const pokemonIdFormatted = String(pokemon.id).padStart(3, '0');
    const imageUrl = `pokemons_images/pokemons/${pokemonIdFormatted}.png`;
    imageElement.src = imageUrl;
    imageElement.alt = `Image of ${pokemon.name}`;

    // Mise à jour des informations
    infoElement.innerHTML = `
        <h2>${pokemon.name}</h2>
        <p>Species: ${pokemon.species}</p>
        <p>Type: ${pokemon.type.join(', ')}</p>
        <p>Height: ${pokemon.height}</p>
        <p>Weight: ${pokemon.weight}</p>
        <p>Abilities: ${pokemon.abilities.join(', ')}</p>
        <p>Description: ${pokemon.description}</p>
    `;
}

