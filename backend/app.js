const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

// Routes
const userRoutes = require('./routes/user');
const productRoutes = require('./routes/product');

app.disable('x-powered-by');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({
    credentials: true,
    origin: function(origin, callback){
        return callback(null, true);
    }
}));
app.use(session({
    name: 'user_sid',
    secret: 'tricycle',
    saveUninitialized: false,
    resave: false,
    store: new MongoStore({
        mongooseConnection: mongoose.connection
    }),
    cookie: {
        path: '/',
        httpOnly: true,
        secure: false,
        sameSite: 'none',
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}));

// Bdd connection mongodb://localhost/tricycle?retryWrites=true&w=majority
mongoose.connect('mongodb+srv://tricycleadmin:tricycleapp@tricycle-ubhyl.mongodb.net/tricycle?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
    .then(() => console.log('Connexion à Mongodb réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));


app.use('/api/user', userRoutes);
app.use('/api/product', productRoutes);



/** Return 404 */
app.use((req, res, next) => {
    res.status(404).json({error: "Route non trouvé"});
});

module.exports = app;