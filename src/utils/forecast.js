const request = require('request')

const forecast = (lat,long,callback) =>{
    const url = 'https://api.darksky.net/forecast/bc51e987282f005139f3b37ab63b8782/'+ encodeURIComponent(lat) +',' + encodeURIComponent(long) + '?units=si&lang=en'
    request({url, json: true}, (error,{body}) =>{
        if(error){
            //console.log(chalk.red('Unable to connect to location services'))
            callback('Unable to connect to forecast services',undefined)
        }else if(body.error){
            callback('No result found! Try differnt Coordinates',undefined)
            //console.log(chalk.yellow('No result found! Try differnt keyword'))
        }else{
            callback(undefined, body.daily.data[0].summary +' It is currently ' + body.currently.temperature + ' degree out. There is a ' + body.currently.precipProbability + '% chance of rain.')
        }        
    })
}

module.exports = forecast
