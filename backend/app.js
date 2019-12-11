const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const fetch = require('node-fetch');

const User = require('./models/User');
const Product = require('./models/Product');

app.use(cors());

// Connexion à la BDD 
mongoose.connect('mongodb://localhost/tricycle?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true 
    })
    .then(() => console.log('Connexion à Mongodb réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));


/** Route pour récupérer les stats/dernier produit */
app.get('/api/user/stat-history/:id', (req, res) => {
    User.findOne({_id: req.params.id}, {number_scan: 1, history: 1})
        .then(user => res.status(200).json(user))
        .catch(error => res.status(404).json({error}))
});

/** Route pour récupérer l'historique de scan */
app.get('/api/user/history/:id', (req, res) => {
    User.findOne({_id: req.params.id}, {history: 1})
        .then(user => res.status(200).json(user))
        .catch(error => res.status(404).json({error}))
});

/** Route pour les informations du profil */
app.get('/api/user/:id', (req, res) => {
    User.findOne({_id: req.params.id}, {fullname: 1, mail: 1, timezone: 1, number_scan: 1, registration_date: 1})
        .then(user => res.status(200).json(user))
        .catch(error => res.status(404).json({error}));
});

/** Route pour récupérer un produit */
app.get('/api/product/:barcode', (req, res) => {
    
    Product.findOne({ barcode: req.params.barcode })
        .then(async product => {
            if(product) {
                res.status(200).json(product);
            } else {
                const reqOpenFoodFact = await fetch(`https://fr.openfoodfacts.org/api/v0/produit/${req.params.barcode}.json`);
                const result = await reqOpenFoodFact.json();
                res.status(200).json(result);
            }
        })
        .catch((error) => res.status(404).json({error}));
});



/** Génération d'une 404 si aucune route n'a matché */
app.use((req, res, next) => {
    res.setHeader('Content-Type', 'text/html');
    res.status(404).send("error");
});

module.exports = app;