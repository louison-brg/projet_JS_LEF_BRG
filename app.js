document.getElementById('searchButton').addEventListener('click', function() {
    console.log('Bouton cliqué!');
    const pokemonName = document.getElementById('searchInput').value.trim().toLowerCase();
    console.log('Recherche pour:', pokemonName);  // Afficher le nom recherché

    fetch('pokemons_data/pokemon_full.json')
        .then(response => response.json())
        .then(data => {
            console.log('Données chargées:', data);  // Afficher les données chargées pour vérifier
            // Utiliser Ramda pour trouver le Pokémon
            const pokemon = R.find(R.propEq('name', pokemonName), data);
            console.log('Résultat de la recherche:', pokemon);  // Afficher le Pokémon trouvé

            if (pokemon) {
                displayPokemon(pokemon);
            } else {
                document.getElementById('pokemonDisplay').innerHTML = 'Pokémon non trouvé';
            }
        });
});
