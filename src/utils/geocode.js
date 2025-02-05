const request = require('request')

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiZ3JhbW1hdGljYXN0cmUiLCJhIjoiY2s2Nm95NG44MTB6ejNwbzdza2RkdHhwbyJ9.JlxIZ0nxrTEdSGHlrIP-MA&limit=1`

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to location services')
        } else if (body.features.length == 0) {
            callback('Unable to find location. Try another search.')
        } else {
            callback(undefined, {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode