const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

// path to manipulate the directory
const directoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../template/views");
const partialsPath = path.join(__dirname, "../template/partials");

app.set("view engine", "hbs");
app.set("views", viewsPath);
app.use(express.static(directoryPath));
hbs.registerPartials(partialsPath);

app.get('', (req,res) => {
    res.render('index', {
        website: "Weather Forecast",
        name: "Abit Weather Forecast"
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: "Abit Weather Forecast",
        name: "Abit Weather Forecast"
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        website: "Weather Forecast",
        name: "Abit Weather Forecast",
        message: "We are here at your service, get the accurate weather forecast for your Location"
    })
})

app.get('/weather', (req,res) => {
    let address = req.query.address;
    if(!address) {
        return res.send({
            Error: "Address Query is required"
        })
    }

    geocode(address, (err, {lat,long,locate} = {}) => {
        if (err) {
            return res.send({
                err
            })
        }
    
        forecast(lat, long, (err, data) => {
            if (err) {
                return res.send({
                    err
                })
            }
            res.send({
                location: locate,
                forecast: `${data.currently.summary}...It's currently ${data.currently.temperature} degrees out. There is ${data.currently.precipProbability}% chance of rain.`,
                icon: `${data.currently.icon}`
            })    
        })
    })
})

app.get("/products", (req,res)=> {
    if(!req.query.search) {
        return res.send({
            Error: "Search term is required",
        });
    } 
    res.send({
       products: [
           {}
       ]
    })
})

// wild card character

app.get('/help/*', (req,res) => {
    res.render("404", {
        message: "Help article not found"
    });
})

app.get('*', (req,res) => {
    res.render('404', {
        message: "Error 404"
    });
})

app.listen(port, () => {
    console.log(`Server active on port ${port}`);
})