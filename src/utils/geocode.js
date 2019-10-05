const request = require('request');

const geocode = (address, cb) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?types=address&access_token=pk.eyJ1IjoiZGV2YWJpZGVtaSIsImEiOiJjazExNThtdjYwMTlwM2NvMHcxem45eW1kIn0.YT5DFGr3NUEJsFZiieBplg`;

    request({
        url,
        json: true
    }, (err, {body}) => {
        if (err) {
            cb(`Error Message: Couldn't access MapBox GeoCode Services`, undefined);
        } else if (body.features.length === 0) {
            cb(`Error Message: No Matching Results, Try another Search`, undefined);
        } else if (body.message) {
            cb(`${body.message}`, undefined);
        } else {
            let data = body;
            let features = data.features[0];
            let lat = features.center[1];
            let long = features.center[0];

            cb(undefined,{
                lat,
                long,
                location: features.place_name
            })
        }
    })
}

module.exports = geocode;