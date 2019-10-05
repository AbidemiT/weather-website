const request = require('request');

const geocode = (address, cb) => {
    // const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?types=address&access_token=pk.eyJ1IjoiZGV2YWJpZGVtaSIsImEiOiJjazExNThtdjYwMTlwM2NvMHcxem45eW1kIn0.YT5DFGr3NUEJsFZiieBplg`;

    const url = `http://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(address)}&appid=d4d54bced604f68a879fd8a07609ad9e`

    request({
        url,
        json: true
    }, (err, {body}) => {
        if (err) {
            cb(`Error Message: Couldn't access open weather GeoCode Services`, undefined);
        } else if (body.message) {
            cb(`Error Message: No Matching Results, Try another Search`, undefined);
        } else {
            let data = body;
            let lat = data.coord.lat;
            let long = data.coord.lon;
            let locate = data.name;

            cb(undefined,{
                lat,
                long,
                locate
            })
        }
    })
}

module.exports = geocode;