const Product = require('../models/Product');
const fetch = require('node-fetch');

/** Return all products */
exports.getAllProducts = (req, res) => {
    Product.find()
    .then(products => res.status(200).json(products))
    .catch(error => res.status(400).json({error}));
};

/** Return a product */
exports.getProduct = (req, res) => {
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
};

/** Add a product  */
exports.addProduct = (req, res) => {
    const product = new Product({
        ...req.body
    });

    product.save()
        .then(() => res.status(201).json({ message: 'Produit enregistré'}))
        .catch(error => res.status(400).json({error}));
};

/** Edit a product */
exports.editProduct = (req, res) => {
    Product.updateOne({ barcode: req.params.barcode }, { ...req.body})
        .then(() => res.status(200).json({ message: 'Produit mis à jour'}))
        .catch(error => res.status(400).json({error}));
};

/** Delete a product */
exports.deleteProduct = (req, res) => {
    Product.deleteOne({ barcode: req.params.barcode })
    .then(() => res.status(200).json({message: "Produit supprimé"}))
    .catch(error => res.status(400).json({ error }));
};