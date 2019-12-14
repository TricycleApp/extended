const User = require('../models/User');

/** Return stats and last product scanned for user */
exports.getStatsAndLastProduct = (req, res) => {
    User.findOne({_id: req.params.id}, {number_scan: 1, history: 1})
        .then(user => res.status(200).json(user))
        .catch(error => res.status(404).json({error}));
};

/** Return history of user */
exports.getHistoryOfUser = (req, res) => {
    User.findOne({_id: req.params.id}, {history: 1})
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
    
    