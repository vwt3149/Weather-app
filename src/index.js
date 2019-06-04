import Clock from "./js/module/Clock";
import Date_ from "./js/module/Date";

import * as clockView from "./js/views/clockView";
import * as dateView from "./js/views/dateView";
import * as searchView from "./js/views/searchView";
import {elements} from './config';
import Search from "./js/module/Search";


const state = {}

const clockControl = () => {
    state.clock = new Clock();

    state.clock.getTime();
    clockView.setTime(state.clock.hours, state.clock.minutes, state.clock.seconds);

    setInterval(() => {
    state.clock.getTime();
    clockView.setTime(state.clock.hours, state.clock.minutes, state.clock.seconds);
    },1000)
}

const dateControl = () => {
    state.date = new Date_();
    state.date.getDate();
    dateView.setDate(state.date.day, state.date.month, state.date.year)
}
clockControl();
dateControl();
elements.search.focus();


//########################################################
//##############------CONTROLLORS--------##################
//########################################################
let query, queryLocalStorage;

// try {
//     if (localStorage.getItem('query')) {
//         query = localStorage.getItem('query');
//         elements.search.value = query
//         // console.log(query,'dacoooo');
        
//         elements.search.placeholder = query;
//         // elements.search.placeholder = 'Enter search';
//     }
// } catch (error) {
//     console.log(error);
// }

queryLocalStorage = localStorage.getItem('query');
elements.search.placeholder = queryLocalStorage;

const controlSearch =async () => {
   let err = false;
    
     if (searchView.getInput()) {
         query = searchView.getInput();
     }
    // console.log(query);
    if (query) {
        searchView.renderLoader();
       
        try {
            state.search = new Search(query);
            await state.search.getQuery()
            searchView.removeDailyHourlyContainer();
            // console.log(state.search,'##########');
            searchView.renderLeftContainer(state.search);
            searchView.renderMiddleContainer(state.search);
           
            searchView.renderDailyContainer(state.search)
            searchView.removeLoader();
            searchView.clearInput();
        } catch (error) {
            alert(`Some thing went wrong, try searching again!`);
            searchView.removeLoader();
            elements.search.value = '';
            err = true;
        }
        if(!err){
            localStorage.setItem('query', query);
            queryLocalStorage = localStorage.getItem('query');
            elements.search.placeholder = queryLocalStorage;
        }

    }else{
        searchView.checkInput(query);
        alert('Search box is empty!');
    } 
    
}
elements.btn_search.addEventListener('click', () =>{
    controlSearch();

});

window.addEventListener('click', (event) => {
    const class_Name= event.target.className;
    if (class_Name.includes('btn_daily')) {
        searchView.removeDailyHourlyContainer();
        searchView.renderDailyContainer(state.search, 'daily');
    }else if(class_Name.includes('btn_hourly')){
        searchView.removeDailyHourlyContainer();
        searchView.renderDailyContainer(state.search, 'hourly'); 
        document.querySelector('.weather_hourly').style = "overflow-x:scroll; ";
        document.querySelector('.cont_hourly').style = "width: 3880px; ";
        document.querySelector('.cont_hourly ul').style = "text-align: left; ";
    }
       
})

window.addEventListener('keypress', (event) => {

    if(event.keyCode === 13){
        controlSearch();
    }
})

window.a = state;