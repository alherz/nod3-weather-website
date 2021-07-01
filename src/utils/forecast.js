const request = require('postman-request')

const forecast = ({latitude, longitude}  = {}, callback) => {
    let url = `http://api.weatherstack.com/current?access_key=79758c7264e3ffe1648b041c1c1d7958&query=${latitude},${longitude}&units=f`
    request({url, json:true}, (error, {body} = {}) => {
        if(error){
            callback('Unable to connect to forecast services', undefined)
        } else if(body.error) {
            callback('Unable to find weather data for that location. Try another search.', undefined)
        } else {
            /*const degrees = response.body.current.temperature;
            const feelsLike = response.body.current.feelslike;
            const weatherDescription = response.body.current.weather_descriptions[0];
            console.log(`${weatherDescription}. It's currently ${degrees} degrees outside in ${location.location}, but it feels like ${feelsLike} degrees`);*/
            callback(undefined,
                `${body.current.weather_descriptions[0]}. It's currently ${body.current.temperature} degrees outside, but it feels like ${body.current.temperature} degrees.`
            )
        }
    });
}

module.exports = forecast