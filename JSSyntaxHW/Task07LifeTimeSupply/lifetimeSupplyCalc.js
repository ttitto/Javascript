function calcSupply(age, maxAge,daily) {
    var lifeAmount=(maxAge-age)*365*daily;
    var foods=["fruits","chocolate","nuts","cheese"];
    var currentfood=foods[Math.floor(Math.random()*foods.length)];
    return lifeAmount +" of "+ currentfood+ " would be enough until I am "+ maxAge+ " years old";
}

console.log(calcSupply(38,118,0.5));
console.log(calcSupply(20,87,2));
console.log(calcSupply(16,102,1.1));