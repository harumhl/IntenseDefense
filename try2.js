
//class Zombie {}

var money = 1000;
var lane = "center";
var zombies = [];
var towers = [];
var x_positions = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var y_positions = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

// Object constructor function
function Zombie(type, health, speed, position_x, position_y, position_index, zombieLane) {
    this.type = type;
    this.health = health;
    this.speed = speed;
    this.position_x = position_x;
    this.position_y = position_y;
    this.position_index = position_index;
    this.zombieLane = zombieLane;
    this.damage = function (damages) {
        this.health -= damages;
    };
}
function Tower(type, health, attack_speed, position_x, position_y) {
    this.type = type;
    this.health = health;
    this.attach_speed = attach_speed;
    this.position_x = position_x;
    this.position_y = position_y;
    
}
function addStandardZombie() {
    if (money < 100) {
        window.alert("Not Enough Money");
        return;
    }
   if(lane == "center")
    {
	    zombies.push({
		         type: "standard",
		         health: 100,
		         speed: 5,
		         position_x: 5,
		         position_y: 0,
		         position_index: 0,
			 zombieLane: "center"
		         });
    }
    else if(lane == "right")
    {
	zombies.push({
		         type: "standard",
		         health: 100,
		         speed: 5,
		         position_x: 5,
		         position_y: 0,
		         position_index: 0,
			 zombieLane: "right"
		         });
    }
    else
    {
	zombies.push({
		         type: "standard",
		         health: 100,
		         speed: 5,
		         position_x: 5,
		         position_y: 0,
		         position_index: 0,
			 zombieLane: "left"
		         });
    }
    money -= 100;
    document.getElementById("demo").innerHTML = "Num Zombies: " + zombies.length +
    "\n" + "Money left: " + money;
}
function addStrongZombie() {
    if (money < 200) {
        window.alert("Not Enough Money");
        return;
    }
    if(lane == "center")
    {
	    zombies.push({
		         type: "strong",
                 health: 300,
                 speed: 2,
                 position_x: 5,
                 position_y: 0,
                 position_index: 0,
		 zombieLane: "center"
		         });
    }
    else if(lane == "right")
    {
	zombies.push({
		         type: "strong",
                 health: 300,
                 speed: 2,
                 position_x: 5,
                 position_y: 0,
                 position_index: 0,
			 zombieLane: "right"
		         });
    }
    else
    {
	zombies.push({
	         type: "strong",
        	 health: 300,
       		  speed: 2,
      		   position_x: 5,
        	 position_y: 0,
       		  position_index: 0,
		 zombieLane: "left"
	         });
    }
    money -= 200;
    document.getElementById("demo").innerHTML = "Num Zombies: " + zombies.length +
    "\n" + "Money left: " + money;
}


// Updating the zombies' positions every second
function start() {
    setInterval(updatePositions, 1000); // 1000 miliseconds = 1 sec
}
function pickLane()
{
	if(lane == "center")
		lane = "right";
	else if(lane == "right")
		lane = "left";
	else
		lane = "center";

	document.getElementById("lane").innerHTML = "Current Lane "+lane+"\n";
}
function updatePositions() {
    var position_str = "";
    for (var i=0; i < zombies.length; i++) 
    {
        var pos_index = zombies[i].position_index;
	if(zombies[i].zombieLane == "center")
	{	
		if(zombies[i].position_y <20)
		{
			zombies[i].position_y = y_positions[pos_index+1];
			zombies[i].position_index++;;
		}	
	}
	else if(zombies[i].zombieLane == "right")
	{
		if(zombies[i].position_x < 10 && zombies[i].position_y == 0)
		{		
			zombies[i].position_x = x_positions[pos_index+1];
			zombies[i].position_index++;
		}
		else if(zombies[i].position_x == 10 && zombies[i].position_y < 20)
		{		
			zombies[i].position_y = y_positions[pos_index+1];
			zombies[i].position_index++;
		}
		else if(zombies[i].position_x > 5 && zombies[i].position_y == 20)
		{		
			zombies[i].position_x = x_positions[pos_index-1];
			zombies[i].position_index++;
			
		}
	}
	else
	{
		if(zombies[i].position_x > 0 && zombies[i].position_y == 0)
		{		
			zombies[i].position_x = x_positions[pos_index-1];
			zombies[i].position_index++;
		}
		else if(zombies[i].position_x == 0 && zombies[i].position_y < 20)
		{		
			zombies[i].position_y = y_positions[pos_index+1];
			zombies[i].position_index++;
		}
		else if(zombies[i].position_x < 5 && zombies[i].position_y == 20)
		{		
			zombies[i].position_x = x_positions[pos_index+1];
			zombies[i].position_index++;
		}
	}
	position_str += " [" +zombies[i].position_x + ", " + zombies[i].position_y +", "+zombies[i].zombieLane+"]";
    }
    
    document.getElementById("positions").innerHTML = "positions: " +position_str;
}
function addTower() {
    document.getElementById("towers").innerHTML = "accept input: ";
    var tower_x = document.getElementById("tower_x").value;
    var tower_y = document.getElementById("tower_y").value;
    
    // default initialization if not provided
    if (tower_x == "") tower_x = 0;
    if (tower_y == "") tower_y = 0;
    
    document.getElementById("towers").innerHTML = "accept input x: [" + tower_x +", " +tower_y +"]";
    towers.push({
                type: "regular",
                health: 150,
                attack_speed: 3,
                position_x: tower_x,
                position_y: tower_y
    });
    var position_str = "";
    for (var i=0; i < towers.length; i++) {
        position_str += " [" +towers[i].position_x + ", " + towers[i].position_y +"]";
    }
    document.getElementById("towers").innerHTML = "num: "+towers.length +" towers: " +position_str;
//    document.getElementById("towers").innerHTML = "tower x: [" + tower_x +", " +tower_y +"] / num: "+towers.length;
}
/*
 document.getElementById("textbox_1").value='';
 document.getElementById("textbox_2").value='';
 if(document.getElementById("textbox_1").focused){
 document.getElementById("textbox_1").value=text_to_be_inserted;
 }
 function addtext() {
	var newtext = document.myform.inputtext.value;
	if (document.myform.placement[1].checked) {
        document.myform.outputtext.value = "";
    }
	document.myform.outputtext.value += newtext;
 }
 */
/*
var zombie1 = new Zombie("standard", 100, 5, 0); // creating an object
zombie1.damage(10); // calling the object function

for (var i=0; i < 10; i++) {
    zombies.push({
                 type: "standard",
                 health: 100,
                 speed: 5,
                 position: 0
    });
}
for (var counter=0; counter < zombies.length; counter++) {
    var array_index = 0;
    if (zombies[i].health <= 0) {
        zombies.splice(array_index, 1);
        continue;
    }
    array_index++;
}
// function expression example
var x = function (a, b) { return a * b; };
var z = x(4, 3);

*/
/*
 JavaScript function definitions do not specify data types for parameters.
 
 JavaScript functions do not perform type checking on the passed arguments.
 
 JavaScript functions do not check the number of arguments received.
 
 If a function is called with missing arguments (less than declared), the missing values are set to: undefined
 
 If a function is called with too many arguments (more than declared), these arguments can be reached using the arguments object.
 example: function findMax() --> findMax(4,5,6) --> access the arguments with arguments[i]
 
 */
/*
var add = (function () {
           javascript counter = 0;
           return function () {return counter+=1;};
           })();

add();
add();
add(); // counter is 3

 This add function above allows counter variable to be used only in add (vs making it global)
 while avoiding re-declaration of the variable whenever we call the function*/