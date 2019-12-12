const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const fetch = require('node-fetch');

const User = require('./models/User');
const Product = require('./models/Product');

app.use(cors());
app.use(express.json());

// Bdd connection
mongoose.connect('mongodb://localhost/tricycle?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
    .then(() => console.log('Connexion à Mongodb réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));


/** Get stats & last product scanned */
app.get('/api/user/stat-history/:id', (req, res) => {
    User.findOne({_id: req.params.id}, {number_scan: 1, history: 1})
        .then(user => res.status(200).json(user))
        .catch(error => res.status(404).json({error}))
});

/** Get history of scan products */
app.get('/api/user/history/:id', (req, res) => {
    User.findOne({_id: req.params.id}, {history: 1})
        .then(user => res.status(200).json(user))
        .catch(error => res.status(404).json({error}))
});

/** Get all users */
app.get('/api/users', (req, res) => {
    User.find()
        .then((users) => res.status(200).json(users))
        .catch(error => res.status(400).json({ error }));
});

/** Get information profile */
app.get('/api/user/:id', (req, res) => {
    User.findOne({_id: req.params.id}, {fullname: 1, mail: 1, timezone: 1, number_scan: 1, registration_date: 1})
        .then(user => res.status(200).json(user))
        .catch(error => res.status(404).json({error}));
});

/** Edit information profile */
app.put('/api/user/:id', (req, res) => {
    User.updateOne({ _id: req.params.id}, {...req.body, _id: req.params.id })
        .then(() => res.status(200).json({message: 'Informations du profil mis à jour'}))
        .catch(error => res.status(400).json({error}));
});

/** Delete a user */
app.delete('/api/user/delete/:id', (req, res) => {
    User.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Utilisateur supprimé'}))
        .catch((error) => res.status(400).json({error}));
});


/** Get all products */
app.get('/api/products', (req, res) => {
    Product.find()
        .then(products => res.status(200).json(products))
        .catch(error => res.status(400).json({error}));
});

/** Get a product */
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

/** Create a product */
app.post('/api/product/add', (req, res) => {
    const product = new Product({
        ...req.body
    });

    product.save()
        .then(() => res.status(201).json({ message: 'Produit enregistré'}))
        .catch(error => res.status(400).json({error}));
});

/** Edit a product */
app.put('/api/product/edit/:barcode', (req, res) => {
    Product.updateOne({ barcode: req.params.barcode }, { ...req.body})
        .then(() => res.status(200).json({ message: 'Produit mis à jour'}))
        .catch(error => res.status(400).json({error}));
});

/** Delete a product */
app.delete('/api/product/delete/:barcode', (req, res) => {
    Product.deleteOne({ barcode: req.params.barcode })
    .then(() => res.status(200).json({message: "Produit supprimé"}))
    .catch(error => res.status(400).json({ error }));
});




/** Return 404 */
app.use((req, res, next) => {
    res.setHeader('Content-Type', 'text/html');
    res.status(404).send("error");
});

module.exports = app;