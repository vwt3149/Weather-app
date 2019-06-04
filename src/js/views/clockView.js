import {elements} from '../../config';
import { cleatDate } from './dateView';

export const clearTime = () => {
    elements.hours.innerHTML = "";
    elements.minutes.innerHTML = "";
    elements.seconds.innerHTML = "";
    
}
export const setTime = (hours, minutes, seconds) => {
    let zero;
    
    if (seconds < 10) {
        zero = '0'+ seconds.toString();
        elements.seconds.innerText = zero;
    }
    else{
        elements.seconds.innerText = seconds;
    }
    if (minutes < 10) {
        zero = '0'+ minutes.toString();
        elements.minutes.innerText = zero;
    }
    else{
        elements.minutes.innerText = minutes;
    }
    if (hours < 10) {
        zero = '0'+ hours.toString();
        elements.hours.innerText = zero;
    }
    else{
        elements.hours.innerText = hours;
    }
}