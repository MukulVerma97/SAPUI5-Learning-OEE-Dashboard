

console.log("Hello");
a=20
console.log(` this is due to a ${a}`)

a=10

console.log(`after assigning ${a}`);

var b ={
    name:"John",
    age:30,
    city:"New York"
}

var c ={
    name:"array",
    age:40,
    city:"Los Angeles"
}


c = { ...b }; // creates a shallow copy of b
console.log(c.name);

function test(){
    console.log(`calling function test : ${a}`);
    var a = 100;

}
test();

if(true){
    var z =30;

}

console.log(`value of z is : ${z}`);


bar ();
 function bar(){
    console.log("helllo from bar ");
    
}


console.log(y);
var y =20;

/// objects ---------

const persn = {
    fname :"mukul",
    lname: "sharma",
    contact: "99999",
    getName: function(){
        console.log("getName function ");
        
    },
};

console.log(persn.fname)


class Person {
    constructor(fname, lname, contact) {

        this.fname = fname;
        this.lname = lname;
        this.contact = contact;

        this.getName = function () {
            console.log(this.fname, this.lname);

        };

    }
};



person1 = new Person ("Mukul", "Verma", 99999)

person1.getName();
console.log(person1);



class Animal {
     
    constructor(name,type,dangeours){

        this.name = name,
        this.type = type;
        this.dangeours = dangeours;

        this.getAnimalType = function (){
            console.log(` Animal is ${this.name} and it may be dangeours ${this.dangeours}`)
        }

    }

}


animal1 = new Animal("Tiger", "Cat", "no")


animal1.getAnimalType();