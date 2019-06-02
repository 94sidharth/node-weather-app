const request = require('request');

const geocode = (address, callback) => {
    const mapBox = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1Ijoic2lkaGFydGgxOTk0IiwiYSI6ImNqdzdrNTBrNjB2YmQ0YXFrcHFmcnoyMTAifQ.wjyNj2jREAtytv4SNRvjzw&limit=1";

    request({ url: mapBox, json: true }, (error, response) => {
        if (error) {
            callback("Error")
        }
        else {
            if (!response.body.features.length)
                callback("Location not found")
            else {
                const longitude = response.body.features[0].center[0];
                const latitude = response.body.features[0].center[1];
                callback(undefined, {
                    longitude: longitude,
                    latitude: latitude
                })
            }

        }
    })
}

module.exports = geocode;