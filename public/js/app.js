
const getForecast = (location) => {
	let textLocation = document.getElementById('forecast-location')
	let textForecast = document.getElementById('forecast-text')
	let textWind = document.getElementById('forecast-wind')

	textLocation.textContent = 'Loading...'
	textForecast.textContent = ''
	textWind.textContent = ''
	fetch(`/forecast?address=${location}`).then((response) => {
		response.json().then((data) => {
			if (data.error) {
				return textLocation.textContent = data.error
			}
			textLocation.textContent = data.location
			textForecast.textContent = data.forecast
			textWind.textContent = Math.round(data.windSpeed * 1.60934) + ' km/h winds'
		}) 
	})
}

const weatherForm = document.querySelector('button')
const search = document.querySelector('input')

weatherForm.addEventListener('click', (e) => {
	e.preventDefault()
	const location = search.value
	getForecast(location)
})