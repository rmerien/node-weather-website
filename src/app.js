const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setupd Handlebars and Views directory
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirPath))

app.get('/forecast', (req, res) => {
	if (!req.query.address) {
		return res.send({
			error: 'Please enter a location'
		})
	}

	geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
		if (error) {
			return res.send({ error })
		}
		forecast(latitude, longitude, (error, {degrees, rainProbability} = {}) => {
			if (error) {
				return res.send({ error })
			}
			res.send({
				location,
				forecast: `Weather: ${degrees} degrees out. There is a ${rainProbability}% chance of rain.`,
				address: req.query.address
			});
		})
	 })
})

app.get('', (req, res) => {
	res.render('index', {
		title: 'Weather App',
		name: 'Ronan Merien'
	})
})

app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About Me:',
		name: 'Ronan Merien'
	})
})

app.get('/help', (req, res) => {
	res.render('help', {
		title: 'Need Help?',
		name: 'Ronan Merien',
		paragraph: 'You can contact me at: merienronan@gmail.com for help'
	})
})

app.get('/forecast', (req, res) => {
	if (!req.query.search) {
		return res.send({
			error: 'you must provide a search term'
		})
	}
	req.query.search
	res.send({
		products: []
	})
})

app.get('/help/*', (req, res) => {
	res.render('404', {
		title: 'Error 404',
		name: 'Ronan Merien',
		error: 'Help article not found.'
	})
})

app.get('*', (req, res) => {
	res.render('404', {
		title: 'Error 404',
		name: 'Ronan Merien',
		error: 'Page not found.'
	})
})

// app.com
// app.com/help
// app.com/about

app.listen(port, () => {
	console.log(`Server is up on port ${port}.`)
})