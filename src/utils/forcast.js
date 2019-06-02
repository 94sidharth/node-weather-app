const request = require('request');

const forcast = (longitude, latitude, callback) => {
    const url = "https://api.darksky.net/forecast/7d7c787b151732930b5c55a3c93250a8/" + latitude + "," + longitude + "?units=si";
    request({ url:url, json: true }, (error, response) => {
        if (error) {
            callback("Error");
        }
        else {
            if (response.body.error)
                callback(response.body.error)
            else {
                const data = response.body.daily.data;
                callback(undefined, data[0].summary);
            }

        }
    });
}

module.exports = forcast;

