function treeHouseCompare(a,b){
    var houseArea=a*a+(a*a*2/3)/2;
    var treeArea=b+Math.PI*4*b* b/9;
    if(houseArea>treeArea){
        return "house/"+houseArea.toFixed(2);
    } else if(houseArea<treeArea){
        return "tree/"+treeArea.toFixed(2);
    } else{
        return "equal areas/"+ treeArea.toFixed(2);
    }
}

console.log(treeHouseCompare(3,2));
console.log(treeHouseCompare(3,3));
console.log(treeHouseCompare(4,5));