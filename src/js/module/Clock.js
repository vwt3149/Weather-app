
export default class Clock{
    
    getTime(){
        this.hours = new Date().getHours();
        this.minutes = new Date().getMinutes();
        this.seconds = new Date().getSeconds();
    }
}