document.getElementById('searchButton').addEventListener('click', function() {
    console.log('Bouton cliqué!');
    const pokemonName = document.getElementById('searchInput').value.trim().toLowerCase();
    console.log('Recherche pour:', pokemonName);  // Afficher le nom recherché

    fetch('pokemons_data/pokemon_full.json')
        .then(response => response.json())
        .then(data => {
            console.log('Données chargées:', data);  // Afficher les données chargées pour vérifier
            // Utiliser Ramda pour trouver le Pokémon, en s'assurant que la comparaison est insensible à la casse
            const pokemon = R.find(p => p.name.toLowerCase() === pokemonName, data);
            console.log('Résultat de la recherche:', pokemon);  // Afficher le Pokémon trouvé

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
    function displayPokemon(pokemon) {
        const displayArea = document.getElementById('pokemonDisplay');
        const imageElement = document.getElementById('pokemonImage');

        // Construire le chemin de l'image
        // Assure-toi que le format de l'ID correspond à celui utilisé dans les noms de fichiers, par exemple '001', '002', ...
        const pokemonIdFormatted = String(pokemon.id).padStart(3, '0');
        const imageUrl = `pokemons_images/pokemons/${pokemonIdFormatted}.png`;

        // Mettre à jour l'attribut src de l'image
        imageElement.src = imageUrl;
        imageElement.alt = `Image of ${pokemon.name}`;

        // Mettre à jour les détails du Pokémon
        displayArea.innerHTML = `
        <h2>${pokemon.name}</h2>
        <p>Species: ${pokemon.species}</p>
        <p>Type: ${pokemon.type.join(', ')}</p>
        <p>Height: ${pokemon.height}</p>
        <p>Weight: ${pokemon.weight}</p>
        <p>Abilities: ${pokemon.abilities.join(', ')}</p>
        <p>Description: ${pokemon.description}</p>
    `;
    }


});
