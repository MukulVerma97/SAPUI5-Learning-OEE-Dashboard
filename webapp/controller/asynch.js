

console.log("Hey 1");
console.log("Hey 2");

setTimeout(function(){
    console.log("Hey 3");
    
}, 3000)

console.log("Hey 4");

const one =1;
const obj ={
    "1":"a",
    1:"b",
   1:"c"
};

console.log(obj["1"]);

// need to learn promises , asynch await, inheritance , ten cathc block 


function Person(health,blood, CBC){

    this.health=health;
    this.blood=blood;
    this.CBC = CBC;

    this.healthReport= function (){

        console.log(this.health, this.blood, this.CBC)
    }


}

const person1 = new Person("OK",14.5,"good");

person1.healthReport()