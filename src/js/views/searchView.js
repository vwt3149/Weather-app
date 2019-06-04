import {elements, iconPaths, fahrenheitToCelsius, capitalize, mphToKmh, rainPrecentage, convertUNIXTimestampToTime, convertUNIXTimestampToDate, convertUNIXTimestampToDateTime} from '../../config';

export const getInput = () => {
    if (elements.search.value.length <= 30) {
       return elements.search.value
    }
};

export const clearInput = () => {
    elements.search.value = '';
    elements.search.focus();
};

export const checkInput = (query) => {
    if (!query) {
        elements.search.placeholder = 'Enter search';
    }
}

export const renderLoader = () => {
    elements.load_icon.setAttribute("style", "display: block");
}
export const removeLoader = () => {
    elements.load_icon.setAttribute("style", "display: none");
}
export const renderLeftContainer = (props) => {
    elements.left_town.innerText = `${props.city} / ${elements.left_code.innerText = props.code}`;
    elements.temp.innerText = fahrenheitToCelsius(props.temperature);
    elements.left_speed.innerText = mphToKmh(props.windSpeed);
}

 const rednerWeatherIcon = (iconName) => {
   for (const key in iconPaths) {
       if (iconName === key) {
           return iconPaths[key];
       }
   }
}

export const renderMiddleContainer = (props) => {
   elements.middle_weather_info.innerText = capitalize(props.summary);
   elements.middle_weather_temp.innerText = fahrenheitToCelsius(props.temperature);
   elements.middle_weather_ico.src = rednerWeatherIcon(props.icon);
   elements.middle_weather_temp_psi.innerText = `Uv: ${props.uvIndex}`;
   elements.middle_weather_temp_uv.innerText = `Psi: ${Math.floor(Math.round(props.pressure))}`;
//    console.dir(elements.middle_weather_temp);

//    console.dir(elements.middle_weather_temp," !!!!!!!!!!!!!!");
//    elements.weather_ico.src = rednerWeatherIcon(props.icon);
}

 export const renderDailyContainer = (props,dailyOrHourly='daily') => {

    // const hourly = props.weather.data.hourly.data;
    let arr;
    let list=``;
    
    if (dailyOrHourly === "daily") {
        arr = props.weather.data.daily.data;
        arr.forEach((element) => {
            list += `
                <li id="${element.time}">
                    <div class="hourly_date_temp">
                        <span class="date">${convertUNIXTimestampToDateTime(element.time)}</span>
                    </div>
                    <div class="hourly_img">
                        <img src="${rednerWeatherIcon(element.icon)}" alt="${element.icon}" srcset="">
                    </div>
                    <div class="hourly_temp">
                        <span class="min_temp">${fahrenheitToCelsius(element.apparentTemperatureMax)}</span> / <span class="temp">${fahrenheitToCelsius(element.apparentTemperatureMin)}</span>
                    </div>
                </li>`;
        });
    }else if(dailyOrHourly === "hourly"){
        arr = props.weather.data.hourly.data;
        arr.forEach((element,ind) => {
          
            if (ind <= 24) {
                list += `
                <li id="${element.time}">
                    <div class="hourly_date_temp">
                        <span class="date">${convertUNIXTimestampToDateTime(element.time,'time')}</span>
                    </div>
                    <div class="hourly_img">
                        <img src="${rednerWeatherIcon(element.icon)}" alt="${element.icon}" srcset="">
                    </div>
                    <div class="hourly_temp">
                        <span class="min_temp">${fahrenheitToCelsius(element.apparentTemperature)} / &nbsp;<i class="fas fa-tint rain_drop"></i>&nbsp;<span class="rain">${rainPrecentage(element.precipProbability)}%</span>
                    </div>
                </li>`;
            }
        });
    }
    
    const markup = `
     <div class=" row weather_hourly weather_daily hourly_daily ">
            <div class="cont_hourly ">
            <div class="heading">
               <h2 class="btn_daily ${dailyOrHourly === "daily" ? "active" : ""} ">Daily</h2><h2 class="btn_hourly ${dailyOrHourly === "hourly" ? "active" : ""}">Hourly</h2>
            </div>
                <ul id="">
                ${list}
                </ul>
            </div>
        </div>
     `;
     elements.weather_daily_hourly.insertAdjacentHTML('afterbegin',markup);
 }

 

 export const removeDailyHourlyContainer = () => {
     const cont = document.querySelector('.hourly_daily ');
     if (cont) {
         cont.remove();
     }
 }


// export const renderLeftContainer = (town, code, temp, speed) => {
//     const markup = `
    
//         <div class="cont_custom box_shadow">
//             <ul>
//                 <li>
//                     <img class="cont_img" src="./img/city.png" alt="" srcset="" />
//                     <div class="cont_value">${town} / <span>${code}</span></div>
//                 </li>
//                 <li>
//                     <img class="cont_img" src="./img/celsius.png" alt="" srcset="" />
//                     <div class="cont_value">${temp}°C</div>
//                 </li>
//                 <li>
//                     <img class="cont_img" src="./img/wind.png" alt="" srcset="" />
//                     <div class="cont_value">${speed} km/h</div>
//                 </li>
//             </ul>
//             </div>
        
//     `;
//     elements.weather_left.insertAdjacentHTML('afterbegin',markup);
// }