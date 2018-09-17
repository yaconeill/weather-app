import convert from 'convert-units';
import {
    // CLOUD,
    CLOUDY,
    RAIN,
    SNOW,
    SUN,
    // WINDY,
    THUNDER,
    DRIZZLE
} from './../constants/weathers'
const getSpeed = meterPerSecond => {
    return convert(meterPerSecond).from('m/s').to('km/h').toFixed(2);
}

const getWeatherState = weather => {
    const { id } = weather[0];
    if (id < 300)
        return THUNDER;
    else if (id < 400)
        return RAIN;
    else if (id < 600)
        return DRIZZLE;
    else if (id < 700)
        return SNOW;
    else if (id === 800)
        return SUN;
    else
        return CLOUDY;
}

const transformWeather = (weather_data) => {
    const { humidity, temp } = weather_data.main;
    const { weather } = weather_data;
    const { speed } = weather_data.wind;
    const weatherState = getWeatherState(weather);
    const wind = getSpeed(speed);

    const data = {
        humidity,
        temperature: Number(temp.toFixed(1)),
        weatherState,
        wind: `${wind} km/h`,
    }
    return data;
}

export default transformWeather;