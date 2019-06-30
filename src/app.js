const path = require('path')
const express = require('express')
const hbs = require('hbs')
const request = require('request')
//const chalk = require('chalk')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

// console.log(__dirname)
// console.log(__filename)
// console.log(path.join(__dirname,'../public'))

const app = express()
const port = process.env.PORT || 3000

//Define path for Express configuration
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../view/views')
const partialPath = path.join(__dirname,'../view/partials')

//setup handlebars engine and views location 
app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))




// app.get('',(req, res) =>{       will never work any more as express is now routing it to public directly
//     res.send('<h1>Weather</h1>')
// })

app.get('',(req,res) =>{
    res.render('index', {
        title: 'Weather App',
        name: 'Nitish Sharma'
    })
})

app.get('/weather', (req,res) => {
    if(!req.query.address){
        return res.send({
            error:'Please provide the location'
        })
    }
    // res.send({
    //     forecast:'chilled weather',
    //     location: 'delhi',
    //     address: req.query.address

    
    // })

    geocode(req.query.address,(error,{latitude,longitude,location} = {}) => {
        // console.log('Error',error)
        // console.log('data',data)
        if(error){
            return res.send({error})
            //return console.log(error)
        }
        forecast (latitude,longitude,(error, forecastData) => {
            if(error){
                return res.send(error)
                //  return console.log(error)
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
            //console.log(location)
            //console.log(forecastData)    
        })
    })
})

app.get('/products',(req,res) => {
    if(!req.query.search){
        return  res.send({
            error:'You must provide a search term'
        })
    }
    console.log(req.query)
    res.send({
        products:{}
    })
})

app.get('/about',(req,res) =>{
    res.render('about',{
        title:'About Me',
        name: 'Nitish Sharma'
    })
})

app.get('/help', (req,res) =>{
    res.render('help', {
        title:'Help Page',
        name: 'Nitish Sharma',
        msg: 'This is shity help page which dose not make any sence' 
    })
})

app.get('/help/*', (req,res) =>{
    res.render('404',{
        title:'404',
        msg:'Requested Help Article not Found',
        name:'Nitish Sharma'
    })
})

app.get('*', (req,res) =>{
    res.render ('404',{
        title:'404',
        msg:'Page not Found',
        name:'Nitish Sharma'
    })
})

app.listen(port, () =>{
    console.log('Server is up on port '+ port)
})