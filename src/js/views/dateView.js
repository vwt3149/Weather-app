import {elements} from '../../config';

export const cleatDate = () =>{
    elements.day.innerHTML = "";
    elements.month.innerHTML = "";
    elements.year.innerHTML = "";
}

export const setDate = (day, month, year) => {
    elements.day.innerText = day;
    elements.month.innerText = month;
    elements.year.innerText = year;
}