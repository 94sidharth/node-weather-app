const express = require('express');
const path = require('path');
const hbs = require('hbs');

const geocode = require('./utils/geocode.js')
const forcast = require('./utils/forcast.js')

let app = express();
const port = process.env.PORT || 3000;

// Define path for express config
const staticPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup static direcory to serve
app.use(express.static(staticPath));

//Setup handlebars engine and view
app.set('view engine', 'hbs');
app.set('views', viewPath);

//setup 
hbs.registerPartials(partialsPath);

app.get('', (req, res) => {
    res.render('index', {
        title: 'Welcome to Weather app',
        name: 'Sidharth'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'HELP PAGE',
        name: 'Sidharth'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'ABOUT PAGE',
        name: 'Sidharth'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address)
        return res.send({ error: 'Please provide address' });
    else {
        let address = req.query.address;
        geocode(address, (error, data) => {
            if (error) {
                return res.send({ error: 'Invalid address' })
            }
            let longitude = data.longitude;
            let latitude = data.latitude;
            forcast(longitude, latitude, (error, forcasetData) => {
                if (error) {
                    return res.send({ error: "Invalid data" })
                }
                res.send({
                    forcast: forcasetData,
                    address: req.query.address
                });
            })
        });

    }

})

app.get('/products', (req, res) => {
    if (!req.query.search)
        return res.send('Please provide a search query')
    else {
        res.send('{products:[]}')
    }
})

app.get('/help/*', (req, res) => {
    res.render('notfound', {
        message: "Help article not found"
    })
})

app.get('*', (req, res) => {
    res.render('notfound', {
        message: "404 Not Found "
    })
})

app.listen(port, () => {
    console.log("Server is up and running")
})