const Product = require('../models/Product');
const User = require('../models/User');
const fetch = require('node-fetch');
const mongoose = require('mongoose');


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

/** Add a product created in history of user */
const addProductInHistory = (idUser, idProduct) => {
    User.updateOne({ _id: idUser }, { 
        $push: {
            history: { product: idProduct, date_scan: new Date(), owner: true }
        },
        $inc: { number_scan: 1 }
    })
    .catch(error => console.log(error) );
}

/** Add a product  */
exports.addProduct = (req, res) => {
    const product = new Product({
        ...req.body
    });
    
    product.save()
        .then((product) => {
            const idUser = mongoose.Types.ObjectId(req.session.user.userId);
            const idProduct = mongoose.Types.ObjectId(product._id);
            return [idUser, idProduct]
        })
        .then((result) => addProductInHistory(result[0], result[1]))
        .then(() => res.status(201).json({ message: 'Produit enregistré et ajouté dans l\'historique'}))
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
    const idProduct = mongoose.Types.ObjectId(req.params.id);

    Product.deleteOne({ _id: req.params.id })
    .then(() => {
        // Update history of user
        User.updateMany({ 
            history: {$elemMatch: { product: { $eq: idProduct } } } 
         }, {
            $pull: {history: { product: {$eq: idProduct} } } 
        })
        .then(() => res.status(200).json({message: "Produit supprimé"}))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(400).json({ error }));
};