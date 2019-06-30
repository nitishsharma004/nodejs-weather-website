const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoibml0aXNoMDA0IiwiYSI6ImNqd252ZnR2YjBvbmYzenIyamI1bmVlOXgifQ.Rs6SaX93i6FkuV5L2u2DAg&limit=1'
    request({url, json:true}, (error,{body}) => {
    
        if(error){
            //console.log(chalk.red('Unable to connect to location services'))
            callback('Unable to connect to location services',undefined)
        }else if(body.features.length === 0){
            callback('No result found! Try differnt keyword',undefined)
            //console.log(chalk.yellow('No result found! Try differnt keyword'))
        }else{ 
            callback(undefined,{
                latitude : body.features[0].center[1],
                longitude : body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode