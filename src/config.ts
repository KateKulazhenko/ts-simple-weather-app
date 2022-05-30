export interface IPlaceData {
	features: IPlaceFeatures[];
	query: [];
	type: string;
}

export interface IPlaceFeatures {
	id: string;
	place_name: string;
	text: string;
}

export interface IWeatherDataWeather {
	description: string;
	icon: string;
	id: number;
	main: string;
}

export interface IWeatherDataMain {
	feels_like: number;
	humidity: number;
	pressure: number;
	temp: number;
	temp_max: number;
	temp_min: number;
}

export interface IWeatherData {
	main: IWeatherDataMain;
	weather: {
		0: IWeatherDataWeather;
	};
	visibility: number;
	name: string;
}