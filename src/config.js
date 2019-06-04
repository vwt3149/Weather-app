import axios from "axios";
export const keys = {
    locationKey: '482785cf38ca454db2aecec7788f3f17',
    WeatherKey: '49a578a52c9b0f5e2185a41f5490272b'
}

export const elements = {
    hours: document.getElementById('hours'),
    minutes: document.getElementById('minutes'),
    seconds: document.getElementById('seconds'),
    day: document.getElementById('day'),
    month: document.getElementById('month'),
    year: document.getElementById('year'),
    search: document.querySelector('.search_input'),
    btn_search: document.querySelector('.btn_search'),
    load_icon:document.querySelector('.load'),
    weather_left:document.querySelector('.weather_left'),
    weather_middle:document.querySelector('.weather_middle'),
    left_town:document.querySelector('.town'),
    temp:document.querySelector('.temp'),
    left_speed:document.querySelector('.speed'),
    left_code:document.querySelector('#code'),
    middle_weather_info:document.querySelector('.weather_info'),
    middle_weather_ico:document.querySelector('.weather_ico'),
    middle_weather_temp:document.querySelector('.weather_temp'),
    middle_weather_temp_uv:document.querySelector('#uv'),
    middle_weather_temp_psi:document.querySelector('#psi'),
    weather_daily_hourly:document.querySelector('.daily_hourly'),
    btn_daily:document.querySelector('.btn_daily'),
    btn_hourly:document.querySelector('.btn_hourly')
}


export const iconPaths = {
        "clear-day": './img/weather icons/svg/clearday.svg',
        "clear-night": './img/weather icons/svg/clearnight.svg',
        "rain": './img/weather icons/svg/rain.svg',
        "snow":'./img/weather icons/svg/snow.svg',
        "sleet":'./img/weather icons/svg/sleet.svg',
        "wind": './img/weather icons/svg/wind.svg',
        "cloudy": './img/weather icons/svg/cloudy.svg',
        "fog": './img/weather icons/svg/fog.svg',
        "partly-cloudy-day": './img/weather icons/svg/partlycloudyday.svg',
        "partly-cloudy-night": './img/weather icons/svg/partlycloudynight.svg',
}

export  const fahrenheitToCelsius = (f) => {
    let res = `${ (f - 32) * 5/9}`;
    res = Math.floor(Math.round(res));
   return res + '°';
}

export const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1);
  }


export const mphToKmh = (m) =>{
    let res = m * 1.609;
    res = Math.floor(Math.round(res));
    return res + " Km/h";
}

export const convertUNIXTimestampToDateTime = (input,dateTime="date") => {
            var time,date;
            time = new Date(input * 1000);
            if (dateTime === "date") {
                time = time.toString() + '\n' + time.toLocaleTimeString();
                // console.log(time,'*****************');
                date = time.slice(4,11);
                time = time.slice(0,3);
                return `${time} / ${date}`
            }
            else if(dateTime === "time"){
                return time.getHours() + ':00';
            }
            
}

export const rainPrecentage = (prc) =>{
    let el, c, d, b;
    prc = prc.toString();
    el= prc.slice(2);
    if(el.length < 2){
        el+= '0';
    }
    el = Math.round(el).toString();
    b = el.slice(1);
    c = el.slice(1,2);
    d = el.slice(0,1);
   if(c > 4){
       d++;
       d+='0';
   }
   else{d+='0';}
   if(d == "00"){d = '0';}
    return d;
}
