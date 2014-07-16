function variablesTypes(value) {
    var result="My name: "+value[0]+" //type is "+ typeof(value[0])+"\n"+ "My age: "+value[1]+" //type is "+ typeof(value[1])+"\n"+ "I am male: "+value[2]+" //type is "+ typeof(value[2])+"\n"+ "My favorite foods are: "+value[3]+" //type is "+ typeof(value[3])+"\n";
    return result;
}
console.log(variablesTypes(['Pesho', 22, true, ['fries', 'banana', 'cake']]));