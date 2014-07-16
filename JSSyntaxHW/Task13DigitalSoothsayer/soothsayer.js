function soothsayer(value){
    var result=new Array(4);
    for(var i=0;i<4;i++){
        result[i]=value[i][Math.floor(Math.random()*5)];
    }
    return "You will work "+ result[0] +" years on "+ result[1]+". You will live in "+ result[2]+" and drive "+ result[3]+".";
}
console.log( soothsayer([[3, 5, 2, 7, 9], ["Java", "Python", "C#", "JavaScript", "Ruby"],
    ["Silicon Valley", "London", "Las Vegas", "Paris", "Sofia"], ["BMW", "Audi", "Lada", "Skoda", "Opel"]]) );
