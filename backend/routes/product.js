const express = require('express');
const router = express.Router();
const Product = require('../models/Product');


/** Get all products */
router.get('/all', (req, res) => {
    Product.find()
        .then(products => res.status(200).json(products))
        .catch(error => res.status(400).json({error}));
});

/** Get a product */
router.get('/:barcode', (req, res) => {
    
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
router.post('/add', (req, res) => {
    const product = new Product({
        ...req.body
    });

    product.save()
        .then(() => res.status(201).json({ message: 'Produit enregistré'}))
        .catch(error => res.status(400).json({error}));
});

/** Edit a product */
router.put('/edit/:barcode', (req, res) => {
    Product.updateOne({ barcode: req.params.barcode }, { ...req.body})
        .then(() => res.status(200).json({ message: 'Produit mis à jour'}))
        .catch(error => res.status(400).json({error}));
});

/** Delete a product */
router.delete('/delete/:barcode', (req, res) => {
    Product.deleteOne({ barcode: req.params.barcode })
    .then(() => res.status(200).json({message: "Produit supprimé"}))
    .catch(error => res.status(400).json({ error }));
});

module.exports = router;