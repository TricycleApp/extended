const express = require('express');
const router = express.Router();
const User = require('../models/User');

/** Get stats & last product scanned */
router.get('/stat-history/:id', (req, res) => {
    User.findOne({_id: req.params.id}, {number_scan: 1, history: 1})
        .then(user => res.status(200).json(user))
        .catch(error => res.status(404).json({error}))
});

/** Get history of scan products */
router.get('/history/:id', (req, res) => {
    User.findOne({_id: req.params.id}, {history: 1})
        .then(user => res.status(200).json(user))
        .catch(error => res.status(404).json({error}))
});

/** Get all users */
router.get('/all', (req, res) => {
    User.find()
        .then((users) => res.status(200).json(users))
        .catch(error => res.status(400).json({ error }));
});

/** Get information profile */
router.get('/:id', (req, res) => {
    User.findOne({_id: req.params.id}, {fullname: 1, mail: 1, timezone: 1, number_scan: 1, registration_date: 1})
        .then(user => res.status(200).json(user))
        .catch(error => res.status(404).json({error}));
});

/** Edit information profile */
router.put('/:id', (req, res) => {
    User.updateOne({ _id: req.params.id}, {...req.body, _id: req.params.id })
        .then(() => res.status(200).json({message: 'Informations du profil mis à jour'}))
        .catch(error => res.status(400).json({error}));
});

/** Delete a user */
router.delete('/delete/:id', (req, res) => {
    User.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Utilisateur supprimé'}))
        .catch((error) => res.status(400).json({error}));
});


module.exports = router;