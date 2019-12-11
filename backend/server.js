const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send("test");
});

/** Génération d'une 404 si aucune route n'a matché */
app.use((req, res, next) => {
    res.setHeader('Content-Type', 'text/html');
    res.status(404).send("error");
});

app.listen(8080);