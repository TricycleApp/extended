const Product = require('../models/Product');
const User = require('../models/User');
const fetch = require('node-fetch');
const mongoose = require('mongoose');
const fs = require('fs');

/**
 * @api {get} /all Return all products
 * @apiGroup Product
 * @apiSuccess {Object} data All products
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    [{
 *      "_id": "jejfljef464fe464effe",
 *      "brand": ["Super U"],
 *      "categories": ["Epicerie"],
 *      "packaging": ["Boîte en verre"],
 *      "bin": ["verre"],
 *      "name": "Echalotte",
 *      "description": "Echalotte en poudre",
 *      "img": "http://google.com",
 *      "barcode": "54346434664223",
 *      "creation_date": "2020-02-06"
 *      },
 *      {
 *          "_id": "jejfljef464fe464effe",
 *          "brand": ["Super U"],
 *          "categories": ["Epicerie"],
 *          "packaging": ["Boîte en verre"],
 *          "bin": ["verre"],
 *          "name": "Echalotte",
 *          "description": "Echalotte en poudre",
 *          "img": "http://google.com",
 *          "barcode": "54346434664223",
 *          "creation_date": "2020-02-06"
 *      }
 *    ]
 */
/** Return all products */
exports.getAllProducts = (req, res) => {
    Product.find()
    .then(products => res.status(200).json(products))
    .catch(error => res.status(400).json({error}));
};


/**
 * @api {get} /:barcode Return a product
 * @apiGroup Product
 * @apiParam {String} barcode Product barcode
 * @apiSuccess {Object} data One product
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *        "_id": "jejfljef464fe464effe",
 *        "brand": ["Super U"],
 *        "categories": ["Epicerie"],
 *        "packaging": ["Boîte en verre"],
 *        "bin": ["verre"],
 *        "name": "Echalotte",
 *        "description": "Echalotte en poudre",
 *        "img": "http://google.com",
 *        "barcode": "54346434664223",
 *        "creation_date": "2020-02-06"
 *    }
 */
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

/**
 * @api {post} /add Add a product
 * @apiGroup Product
 * @apiSuccess {String} message Message success
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *       "message": "Produit enregistré et ajouté dans l'historique"
 *    }
 */
/** Add a product  */
exports.addProduct = (req, res) => {
    const productObject = req.body.product ? JSON.parse(req.body.product) : req.body;

    const product = new Product(req.file ? {
        ...productObject,
        img: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        creation_date: new Date()
    } : { ...productObject, creation_date: new Date() });
    
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

/**
 * @api {put} /edit/:barcode Edit a product
 * @apiGroup Product
 * @apiParam {String} barcode Product barcode
 * @apiSuccess {String} message Message success
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *       "message": "Produit mis à jour"
 *    }
 */
/** Edit a product */
exports.editProduct = (req, res) => {
    const productObject = req.file ?
    {
     ...JSON.parse(req.body.product),
         img: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    }: { ...JSON.parse(req.body.product) };
 
 
     Product.updateOne({ barcode: req.params.barcode }, { ...productObject})
         .then(() => res.status(200).json({ message: 'Produit mis à jour'}))
         .catch(error => res.status(400).json({error}));
 };


 /**
 * @api {delete} /delete/:id Delete a product
 * @apiGroup Product
 * @apiParam {String} id Product id
 * @apiSuccess {String} message Message success
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *       "message": "Produit supprimé"
 *    }
 */
/** Delete a product */
exports.deleteProduct = (req, res) => {
    const idProduct = mongoose.Types.ObjectId(req.params.id);

    Product.findOne({ _id: req.params.id })
        .then(product => {
            const filename = product.img.split('/images/')[1];

            fs.unlink(`images/${filename}`, () => {

                Product.deleteOne({ _id: req.params.id })
                    .then(() => {
                        // Update history of user
                        User.updateMany({ 
                            history: {$elemMatch: { product: { $eq: idProduct } } } 
                        }, {
                            $inc: { number_scan: -1 },
                            $pull: {history: { product: {$eq: idProduct} } } 
                        })
                        .then(() => res.status(200).json({message: "Produit supprimé"}))
                        .catch(error => res.status(400).json({ error }));
                    })
                    .catch(error => res.status(400).json({ error }));
            });
        })
        .catch(error => res.status(500).json({ error }));
};