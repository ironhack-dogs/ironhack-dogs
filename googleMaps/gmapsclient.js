var googleMapsClient = require('@google/maps').createClient({
  key: process.env.GEOAPIKEY,
  Promise: Promise
});

module.exports = googleMapsClient;
