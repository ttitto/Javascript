function calcCylinderVol(radius, height){
var vol=Math.PI*radius*radius*height;
    return vol.toFixed(3);
}

console.log(calcCylinderVol(2,4));
console.log(calcCylinderVol(5,8));
console.log(calcCylinderVol(12,3));