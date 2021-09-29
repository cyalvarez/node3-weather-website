const path = require('path')
const hbs = require('hbs')
const express = require('express')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000
const publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
app.use(express.static(publicDirectory))

/*app.get('', (req, res) => {
    res.send('<h1>Hello</h1>')
})


app.get('/help', (req, res) => {
    res.send({
        name:'Cindy',
        age:29
    })
})*/

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'XXX'
    })
})


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location }={}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            return res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })

    /* res.send({
         forecast: 'Cindy',
         location: 29,
         address:req.query.address
     })*/
})


app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    res.send({
        products: []

    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'Help',
        title: 'Help',
        name: 'XXX'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: '404',
        errorMesssage: 'Help article not found'

    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '',
        name: '404',
        errorMesssage: 'Page not found'

    })
})

//inicar el servidor
app.listen(port, () => {

    console.log('server is up port  '+port)
})