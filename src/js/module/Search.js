const axios = require('axios');

import {keys} from '../../config'

export default  class Search {
    constructor(query){
        this.query = query;
        this.data = [];
    }

    async getLocation(){
        
            const res = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${this.query}&key=${keys.locationKey}`)
            this.locationRes = res;
            let i = 0;
            while (true) {
                this.code = res.data.results[i].components["ISO_3166-1_alpha-2"];
                this.lat = res.data.results[i].geometry.lat;
                this.lng = res.data.results[i].geometry.lng;
                if (res.data.results[i].components.town) {
                    this.city = res.data.results[i].components.town;
                    break;
                }
                else if (res.data.results[i].components.city) {
                    this.city = res.data.results[i].components.city;
                    break;
                }
                else if (res.data.results[i].components.village) {
                    this.city = res.data.results[i].components.village;
                    break;
                }
                else{
                    i++;
                }
                this.data[0] = {
                    left:{
                        city: this.city,
                    }
                }
            }
            // console.log(this.city,'-------------------------');
            
            // console.log(`Lat ${this.lat}  lng ${this.lng}`);
            return res;
    }

    async getWeather(){
               
            const res = await axios.get(`https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${keys.WeatherKey}/${this.lat},${this.lng}`)
            this.weather = res;
            // console.log("wreme",this.weather);
            this.temperature = res.data.currently.temperature;
            this.windSpeed = res.data.currently.windSpeed;
            this.icon = res.data.currently.icon;
            this.uvIndex = res.data.currently.uvIndex;
            this.pressure = res.data.currently.pressure;
            this.summary = res.data.currently.summary;

           return res
         
    }
    async getQuery(){
        // WHERE SOLUTION WAS FOUND --> https://stackoverflow.com/questions/50949594/axios-having-cors-issue
        axios.defaults.baseURL = 'http://localhost:8080/';
        axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
        axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
        
        await this.getLocation()
        await this.getWeather()
        // axios.all([
        //    await this.getLocation(),  await this.getWeather()])
        // .then(axios.spread(function (loc, wea) {
        // })).catch((err) => {
        //     console.log("ne radie",err);

        // })
        
        // function convertUNIXTimestampToTime (input) {
        //     var time = new Date(input * 1000);
        //     return time.toGMTString() + '\n' + time.toLocaleTimeString();
        //     }
        
    }
   
}