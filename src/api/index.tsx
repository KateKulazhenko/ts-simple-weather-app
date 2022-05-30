const OPEN_WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather?';
const OPEN_WEATHER_API_KEY = '7cc572451fbb29ddaa8b9a017b8a6f9c';
const MAPBOX_URL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';
const MAPBOX_TOKEN = 'pk.eyJ1IjoiZWx1bmNoIiwiYSI6ImNsM290OW4ydTBwOG4za255bWkwMG03bTAifQ.piNpgKPEI3e-ya3RguopcA';

export const getWeather = async (place: string) => { // get request for weather data
	console.log(place);
	try {
		const res = await fetch(`${OPEN_WEATHER_API_URL}q=${place}&appid=${OPEN_WEATHER_API_KEY}&units=metric`);
		console.log(res);
		if (!res.ok) throw new Error(res.statusText);
		return res.json()
	} catch (error) {
		return {error: 'Unanble to retrive weather'}	;
	}
}

export const getPlace = async (place: string) => { // get request for autocomplite search city
	try {
		const res = await fetch(`${MAPBOX_URL}${place}.json?access_token=${MAPBOX_TOKEN}&autocomplete=true&types=place`);
		if(!res.ok) throw new Error(res.statusText);
		return res.json();
	} catch(error) {
		return {error: 'Unanble to retrive places'}	;
	}
}
