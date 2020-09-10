const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const array_heroes = JSON.parse(fs.readFileSync(__dirname + '/data/heroes.json', 'utf-8')); // Respuesta de Drive
app.listen(3000, () => { console.log('Servidor corriendo'); });

app.get('/', function (req, res) {
    let file = path.resolve('index.html');
    res.sendFile(file);
});

app.get('/heroes', function (req, res) {
    res.send(array_heroes);
});

app.get('/heroes/detalle/:id', function (req, res) {
    if (array_heroes.includes(array_heroes[req.params.id - 1])) {
        let heroe = array_heroes[req.params.id - 1];
        res.send(`Hola, mi nombre es ${heroe.nombre} y soy ${heroe.profesion}`);
    } else {
        res.send('¡Heroe no encontrado!');
    }
})

app.get('/heroes/bio/:id/:ok', function (req, res) {
    if (array_heroes.includes(array_heroes[req.params.id - 1])) {
        if (req.params.ok != 'ok'){
            res.send('Lamento que no desees saber más de mi :(');
        } else {
            let heroe = array_heroes[req.params.id - 1];
            res.send(`Nombre del heroe: ${heroe.nombre} <br><br>
            Reseña: ${heroe.resenia}`);
        }
    } else {
        res.send('No encontramos un héroe para mostrarte su biografía');
    }
})

app.get('/creditos', (req, res) => {
    let creditos = `Director: Carlos Jaurechi<br>
    Producción: Carlos Jaurechi<br>
    Aguatero: Carlos Jaurechi`
    res.send(creditos);
});

app.get('*', (req, res) => {
    res.status(404).send('404 not found. <br> ¡Houston, tenemos un problema!');
});