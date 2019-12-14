const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const fetch = require('node-fetch');

// Routes
const userRoutes = require('./routes/user');
const productRoutes = require('./routes/product');

// Bdd connection
mongoose.connect('mongodb://localhost/tricycle?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
    .then(() => console.log('Connexion à Mongodb réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));


app.use(cors());
app.use(express.json());

app.use('/api/user', userRoutes);
app.use('/api/product', productRoutes);








/** Return 404 */
app.use((req, res, next) => {
    res.status(404).json({error: "Route non trouvé"});
});

module.exports = app;