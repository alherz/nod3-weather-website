const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');


// Setup handlebars engine and view location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
// This is for partials directory. Think templates that you share among other templates likes a nav
hbs.registerPartials(partialsPath)


// Setup static directory to serve
app.use(express.static(publicDirectoryPath))


// This gets the templates for the page request
app.get('', ((req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Andrew'
    })
}))

app.get('/about', ((req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Andrew'
    })
}))

app.get('/help', ((req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Andrew',
        message: 'This is a help paragraph that is only one line'
    })
}))


// This gets the static pages for the page request
app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide a address'
        })
    }

    geocode(req.query.address, (error, {longitude, latitude, location} = {}) => {
        if(error){
            return res.send({
                error: error
            })
        }

        forecast({longitude, latitude}, (error, forecastData = {}) => {
            if(error){
                return res.send({
                    error: error
                })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })



    /*res.send({
        location: 'Land O Lakes',
        forecast: 'It\'s 90 something probably',
        address: req.query.address
    })*/
})



app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query)
    res.send({
        products: []
    })
})


// This is 404 pages
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help',
        name: 'Andrew',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Help',
        name: 'Andrew',
        errorMessage: 'Page not found'
    })
})


// Starts Express web server
app.listen('3000', () => {
    console.log('Server is running on port 3000')
})