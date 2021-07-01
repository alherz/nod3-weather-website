const request = require('postman-request')

const geocode = (address, callback) => {
    let url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiYWhlcnoiLCJhIjoiY2txNGdwN3UwMTg1NzJ4azF1Z3JlOGJrZSJ9.K894WSxnKJf9uj8CXbiCKQ&limit=1`
    request({url, json:true}, (error, {body} = {}) => {
        if(error){
            callback('Unable to connect to location services', undefined)
        } else if(body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    });
}

module.exports = geocode