const request = require('request')

const forecast = (lat, long, callback) => {
    const url = `https://api.darksky.net/forecast/50656e10e737a51800d37d610b2374be/${lat},${long}`

	request({ url, json: true }, (error, {body}) => {
		if (error) {
			callback('Unable to connect to the weather service.')
		} else if (body.error) {
			callback('Unable to find location.')
		} else {
			const data = body.currently
			callback(undefined, {
                degrees: data.temperature,
                rainProbability: data.precipProbability
            })
		}
	})
	
}

module.exports = forecast