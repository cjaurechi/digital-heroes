const express = require('express');
const app = express();
const path = require('path');
// const fs = require('fs');
let heroes = require('../digital_heroes/data/heroes.json')

app.listen(3000, () => { console.log('Servidor corriendo'); });
app.get('/', function (req, res) {
    let file = path.resolve('index.html');
    res.sendFile(file);
});

app.get('/heroes', function (req, res) {
    // const heroes = JSON.parse(fs.readFileSync(__dirname + '/data/heroes.json', 'utf-8')); // Respuesta de Drive
    res.send(heroes);
});