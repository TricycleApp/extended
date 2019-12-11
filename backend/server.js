const express = require('express');
const app = express();
const mongoose = require('mongoose');

// Connexion à la BDD 
mongoose.connect('mongodb://localhost/tricycle',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true 
    })
    .then(() => console.log('Connexion à Mongodb réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));



app.get('/', (req, res) => {
    res.send("test");
});

/** Génération d'une 404 si aucune route n'a matché */
app.use((req, res, next) => {
    res.setHeader('Content-Type', 'text/html');
    res.status(404).send("error");
});

app.listen(8080);