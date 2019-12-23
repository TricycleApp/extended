const User = require('../models/User');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

/** Add a product scanned in history of user */
exports.addProductInHistory = (req, res) => {
    const idProduct = mongoose.Types.ObjectId(req.body.product);
    
    User.updateOne({ _id: req.params.id }, { 
        $push: {
            history: { product: idProduct, date_scan: new Date(), owner: false }
        },
        $inc: { number_scan: 1 }
    })
    .then(() => res.status(201).json({ message: 'Produit scannés ajouté à l\'historique'}))
    .catch(error => res.status(400).json({ error }));
}

/** Return stats and last product scanned for user */
exports.getStatsAndLastProduct = (req, res) => {
    const userId = mongoose.Types.ObjectId(req.params.id);

    User.aggregate([
        { $match: { _id: userId }},
        { $lookup: { from: 'product', localField: 'history.product', foreignField: '_id', as: 'productInfo'} },
        { $project: { number_scan: 1, productInfo: 1, history: { $slice: ['$history', -1] }, productInfo: { $slice: ['$productInfo', -1]} }}
    ])
        .then(user => res.status(200).json(user))
        .catch(error => res.status(404).json({error}));
};

/** Return history of user */
exports.getHistoryOfUser = (req, res) => {
    const userId = mongoose.Types.ObjectId(req.params.id);

    User.aggregate([
        { $match: {_id: userId }},
        { $lookup: { from: 'product', localField: 'history.product', foreignField: '_id', as: 'productInfo'} }, 
        { $project: { history: 1, productInfo: 1 } }
    ])
        .then(user => res.status(200).json(user))
        .catch(error => res.status(404).json({error}));
};

/** Return all users */
exports.getAllUsers = (req, res) => {
    User.find()
        .then((users) => res.status(200).json(users))
        .catch(error => res.status(400).json({ error }));
};

/** Return information of user */
exports.getInformationOfUser = (req, res) => {
    User.findOne({_id: req.params.id}, {fullname: 1, mail: 1, timezone: 1, number_scan: 1, registration_date: 1})
        .then(user => res.status(200).json(user))
        .catch(error => res.status(404).json({error}));
};

/** Edit informations of user */
exports.editInformationOfUser = (req, res) => {
    User.updateOne({ _id: req.params.id}, {...req.body, _id: req.params.id })
        .then(() => res.status(200).json({message: 'Informations du profil mis à jour'}))
        .catch(error => res.status(400).json({error}));
};

/** Delete user  */
exports.deleteUser = (req, res) => {
    User.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Utilisateur supprimé'}))
        .catch((error) => res.status(400).json({error}));
};

exports.login = (req, res) => {
    User.findOne({ mail: req.body.mail })
        .then(user => {
            if(!user) {
                return res.status(401).json({ error: "L'utilisateur n'existe pas"});
            }

            bcrypt.compare(req.body.password, user.password) 
                .then(valid => {
                    if(!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect'});
                    }
                    req.session.user = { userId: user._id, mail: user.mail, roles: user.roles };
                    return res.status(200).json({message: 'Utilisateur authentifié', user: { userId: user._id, role: user.roles } });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({error}));
};


exports.logout = (req, res) => {
    if(!req.session.user) {
        return res.status(400).json({ error: 'Déconnexion impossible'});
    }   

    try {
        req.session.destroy(err => {
            if(err) throw (err);
            res.clearCookie('user_sid');
            res.status(200).json({ message: 'Utilisateur déconnecté'});
        });
    } catch (err) {
        res.status(422).json({ err });
    }
    
};

    