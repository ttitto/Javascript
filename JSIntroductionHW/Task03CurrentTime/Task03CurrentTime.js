function printCurrentTime() {
    var currentTime = new Date();
    var m=currentTime.getMinutes();
    currentTime=''+ currentTime.getHours()+':'+(m<=9?'0'+m:m);

    console.log(currentTime);
}
printCurrentTime();