const mongoose = require('mongoose');
const Space = require('../models/Spaces');
const cities = require('./cities');
const images = require('./images');
const descriptions = require('./descriptions');

const {places, descriptors} = require('./seedHelpers');

mongoose.connect('mongodb://localhost:27017/SpaceBazaar', {});

// const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding")
// const mapBoxToken = process.env.MAPBOX_TOKEN;
// const geocoder = mbxGeocoding({accessToken: mapBoxToken})

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", ()=>{
    console.log("Database connected");
})

const sample = (array)=>array[Math.floor(Math.random()*array.length)];

const seedDb = async ()=>{
    await Space.deleteMany();
    for(let i = 0; i < 250; i++){
        const random1000 = Math.floor(Math.random() *cities.length);
        const price = Math.floor(Math.random() * 2000) + 10;
        const area = Math.floor(Math.random() * 50) + 10;

        const space = new Space({
            author: '63ad4784e4c83b64bd97302d',
            location: `${cities[random1000].name}, ${cities[random1000].state}`,
            title:  `${sample(descriptors)} ${sample(places)}`,
            images: [
              {
                url: `${images[i%images.length].url}`,
                filename: `${images[i%images.length].filename}`
              },
              {
                url: `${images[(i+1)%images.length].url}`,
                filename: `${images[(i+1)%images.length].filename}`
              },
              {
                url: `${images[(i+2)%images.length].url}`,
                filename: `${images[(i+2)%images.length].filename}`
              }
            ],
            geometry: {
              type: "Point",
              coordinates: [
                cities[random1000].lon,
                cities[random1000].lat
              ]
            },
            area: area,
            description: descriptions[i%descriptions.length],
            price: price
        })
        // Space.geometry = geoData.body.features[0].geometry
        // console.log(space.geometry)
        space.save();
    }
}
seedDb();

// const space = new Space(req.body.Space);

// geometry: {
//   type: {
//     type: String,
//     enum: ['Point'],
//     required: true
//   },
//   coordinates: {
//     type: [Number],
//     required: true
//   }
// },