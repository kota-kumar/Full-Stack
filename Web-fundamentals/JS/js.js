// myCarDetails.prototype.displayInfo= function(){
//     console.log(
//         `this car is from ${this.name} with ${this.color} color and manufactured in ${this.year}`
//     );
// };
// function myCarDetails(Name, ManufactureYear, Color){
//     this.name = Name;
//     this.year = ManufactureYear;
//     this.color=Color;
// }
// let car1 = new myCarDetails("Tata", 2021, "Black")
// let car2 = new myCarDetails("MG", 2022, "Red")
// console.log(car1)
// console.log(car2)
// car1.displayInfo();
// car2.displayInfo();\

let displaydetails ={
    displayInfo:function(){
        console.log(`this car is from ${this.name} with ${this.color} color and manufactured in ${this.year}`
                )
            },  
    displayName: function(){
        console.log(`${this.name}`)
    
    }
}
let car1 = Object.create(displaydetails)
car1.name = "Hundai"
car1.year = 2023;
car1.color="Gray"
console.log(car1);
car1.displayName();