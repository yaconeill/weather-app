import transformForecast from "../services/transformForecast";
import transformWeather from "../services/transformWeather";

export const SET_CITY = 'SET_CITY';
export const SET_FORECAST_DATA = 'SET_FORECAST_DATA';
export const SET_WEATHER_CITY = 'SET_WEATHER_CITY';
export const GET_WEATHER_CITY = 'GET_WEATHER_CITY';

// Action creator
const setCity = payload => ({ type: SET_CITY, payload });
const setForecastData = payload => ({ type: SET_FORECAST_DATA, payload });

const getWeatherCity = payload => ({ type: GET_WEATHER_CITY, payload });
const setWeatherCity = payload => ({ type: SET_WEATHER_CITY, payload });

const api_key = 'df15bed6f51bf3c773aeab60409aca61';
const url = 'http://api.openweathermap.org/data/2.5/forecast';
const url_weather = 'http://api.openweathermap.org/data/2.5/weather';


export const setSelectedCity = payload => {
    return (dispatch, getState) => {
        const api_weather = `${url}?q=${payload}&units=metric&appid=${api_key}`;

        // activar en el estado un indicador de búsqueda de datos
        dispatch(setCity(payload));

        const state = getState();
        const date = state.cities[payload] && state.cities[payload].forecastDataDate;
        const now = new Date();
        if (date && (now - date) < 1 * 60 * 1000)
            return;

        return fetch(api_weather)
            .then(res => res.json())
            .then(weather_data => {
                const forecastData = transformForecast(weather_data);

                // modificar el estado con el resultado de la promise (fetch)
                dispatch(setForecastData({ city: payload, forecastData }));
            });

    }
};

export const setWeather = payload => {
    return dispatch => {
        payload.forEach(city => {
            dispatch(getWeatherCity(city));
            const api_weather = `${url_weather}?q=${city}&units=metric&appid=${api_key}`;
            fetch(api_weather)
                .then(res => res.json())
                .then(json => {
                    const weather = transformWeather(json);
                    dispatch(setWeatherCity({ city, weather }));
                });
        })
    }
};