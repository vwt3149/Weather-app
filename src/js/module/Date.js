
export default class Date_{
    
    getDate(){
        let date = new Date()
        this.day = date.getDate(); //getDay returns num 0 to 6
        // const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        // this.day = days[this.day];
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        this.month = months[date.getMonth()];
        
        this.year = date.getFullYear();
        console.log(this.year);
    }
}
