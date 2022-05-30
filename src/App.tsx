import React, { useState } from 'react';
// API
import { getPlace, getWeather } from './api';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
// Interfaces
import { IPlaceData, IPlaceFeatures, IWeatherData } from './config';

function App() {
    const [autocompliteData, setAutoCompliteData] = useState<IPlaceData>({features: [], query: [], type:''});
    const [inputValue, setInputValue] = useState<string>('');
    const [weatherData, setWeatherData] = useState<IWeatherData | null>();

    const handleChangeInput = async(event: React.SyntheticEvent, newValue: string) => {
        setInputValue(newValue);

        if (!inputValue) return;
        const placeRes = await getPlace(inputValue);

        setAutoCompliteData(placeRes);
    }

    const handleSelectPlace = async (event: React.SyntheticEvent, newValue: IPlaceFeatures | null) => {
        if (newValue) {
            setInputValue(newValue.text);
            const weatherRes = await getWeather(newValue.text);
            console.log(weatherRes);
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            weatherRes.error ? setWeatherData(null) : setWeatherData(weatherRes);
        }
    }

return (
    <Container>
        <Box 
            display='flex'
            flexDirection='column'
            justifyContent='center'
            alignItems='center'
            minHeight='100vh'
            maxWidth='450px'
            sx={{ mx: "auto" }}
        >
        <Grid item>
            <Autocomplete
                disablePortal
                id="city-autocomplite"
                onInputChange={handleChangeInput}
                onChange={(event, newValue) => handleSelectPlace(event, newValue)}
                options={autocompliteData.features}
                onReset={() => setAutoCompliteData({features: [], query: [], type:''})}
                getOptionLabel={(option: any) => option.place_name}
                sx={{ width: 450, m: 3 }}
                renderInput={(params) => <TextField {...params} label="Search City" />}
            />
        </Grid>
        {weatherData ? (
            <Grid container item direction="row">
                <Grid item xs={5}>
                    <Typography variant="h4" gutterBottom sx={{ textAlign: 'center' }}>{Math.floor(weatherData.main.temp)}°C</Typography>
                    <Box display='flex' justifyContent='center' alignItems='center'>
                        <img src={`https://openweathermap.org/img/wn/${weatherData.weather?.[0].icon}@2x.png`}  alt={weatherData.weather?.[0].description} />
                    </Box>
                    <Typography variant="subtitle1" gutterBottom sx={{ textAlign: 'center' }}>{weatherData.weather?.[0].description.toUpperCase()}</Typography>
                </Grid>
                <Grid item xs={7} sx={{ paddingLeft: 4 }}>
                    <Typography variant="h5" gutterBottom>{weatherData.name}</Typography>
                    <Typography variant="subtitle2" gutterBottom>FEELS LIKE: {Math.floor(weatherData.main.feels_like)}°C</Typography>
                    <Typography variant="subtitle2" gutterBottom>MAX TEMP: {Math.floor(weatherData.main.temp_max)}°C</Typography>
                    <Typography variant="subtitle2" gutterBottom>MIN TEMP: {Math.floor(weatherData.main.temp_min)}°C</Typography>
                    <Typography variant="subtitle2" gutterBottom>HUMIDITY: {weatherData.main.humidity}%</Typography>
                    <Typography variant="subtitle2" gutterBottom>PRESSURE: {weatherData.main.pressure}</Typography>
                </Grid>
            </Grid>

        ) : <Typography variant="h5" gutterBottom sx={{ textAlign: 'center' }}>No information to display</Typography>}
        </Box>
    </Container>
);}

export default App;
