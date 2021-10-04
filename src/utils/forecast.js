const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=ec3aacedb54af38a9ab6439689db075a&query=' + latitude + ',' + longitude + '&units=f'
    //   request({ url: url, json: true }, (error, response) => {
    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('unable to connect1' + error, undefined)
        } else if (body.error) {
            callback('unable to location', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + " it is currently temperature " + body.current.temperature+
            "degress out. it feels like "+body.current.feelslike+" degress out.The humidity is "+body.current.humidity+"%."
            )
        }
    })
}

module.exports = forecast