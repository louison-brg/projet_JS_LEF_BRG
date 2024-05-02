const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Sert les fichiers statiques du dossier 'public'
app.use(express.static('public'));

// Route principale
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
