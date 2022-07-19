var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];


export function getTimeFromDate(date: Date){
    let hours = date.getHours();
    let minutes = date.getMinutes();
   
    let ampm = "a.m.";
    if( hours > 12 ) {
        hours -= 12;
        ampm = "p.m.";
    }

    return hours + ":" + minutes + " "+ ampm;
}

export function getFullDateFormmated(date: Date){
    let month = months[date.getMonth()];
    let year = date.getFullYear();
    let fulldate = date.getDate() + " " + month + ". " + year;
    return fulldate;
}