const request = require('request');

const forecast = (lat,long, cb) => {
    const url =  `https://api.darksky.net/forecast/0ec6aa6f511f701b254d99987463a38d/${lat},${long}`;

    request({
        url,
        json: true
    }, (err,{body}) => {
        if (err) {
            cb(`Error: Couldn't connect to the Weather API`, undefined);
        }  else if (body.error) {
            cb(`Error: No Matching result`, undefined);
        } else {
            cb(undefined, body);
        }
    })
}

module.exports = forecast;