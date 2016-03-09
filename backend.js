 /* Back-end JS */
//class Zombie {}

function func(){
    window.alert("ADFGHSFGJHSFGJ");
}


var lane_position = "center";
var money = 1000; // money for the offensive player
var zombies = []; // keeps all (alive) zombie objects
var towers = [];  // keeps all (alive) tower objects

var image = new Image(); // TEMP: tried to display zombie/tower image on canvas

// game canvas
var myGameArea;

// Object constructor function
// You can treat Zombie and Tower as Classes (or rather, Struct)
function Zombie(type, health, speed, position_x, position_y, lane) {
    this.type = type;
    this.health = health;
    this.speed = speed;
    this.position_x = position_x;
    this.position_y = position_y;
    this.lane = lane || "center";
    this.position_index = 0;
    
    // member functions
    this.damage = function (damages) {
        this.health -= damages;
    };
}
function Tower(type, health, damage, attack_speed, position_x, position_y, attack_range) {
    this.type = type;
    this.health = health;
    this.damage = damage;
    this.attach_speed = attach_speed;
    this.position_x = position_x;
    this.position_y = position_y;
    this.attack_range = attack_range || [-1]; // [top-y, bottom-y, left-x, right-x];
}


// Adam's image testing
// I THINK WE SHOULD TRY TO GET JUST THE ZOMBIE PICTURE WITHOUT THE ORANGE BOX AROUND IT (I wasn't shouting)
var ctx = document.getElementById('canvas');
var standardZombie = new Image;
var strongZombie = new Image;
var healingZombie = new Image;
var generationsZombie = new Image;
var standardTower = new Image;
var strongTower = new Image;
var splashTower = new Image;
var slowTower = new Image;
var background = new Image;
standardZombie.src = "http://www.googledrive.com/host/0B48gj1-oLHONUGQ5Q3VvSFFEalk/blueZombie.png";
strongZombie.src = "http://www.googledrive.com/host/0B48gj1-oLHONUGQ5Q3VvSFFEalk/greenZombie.png";
healingZombie.src = "http://www.googledrive.com/host/0B48gj1-oLHONUGQ5Q3VvSFFEalk/healingZombie.png";
generationsZombie.src = "http://www.googledrive.com/host/0B48gj1-oLHONUGQ5Q3VvSFFEalk/generationsZombie.png";
standardTower.src = "http://www.googledrive.com/host/0B48gj1-oLHONUGQ5Q3VvSFFEalk/standardTower.png";
strongTower.src = "http://www.googledrive.com/host/0B48gj1-oLHONUGQ5Q3VvSFFEalk/strongTower.png";
splashTower.src = "http://www.googledrive.com/host/0B48gj1-oLHONUGQ5Q3VvSFFEalk/bombTower.png";
slowTower.src = "http://www.googledrive.com/host/0B48gj1-oLHONUGQ5Q3VvSFFEalk/iceTower.png";
background.src = "http://www.googledrive.com/host/0B48gj1-oLHONUGQ5Q3VvSFFEalk/mockupWebpage.png";
var zombieImage = new Image;

background.onload = function(){
    ctx.drawImage(background,0,0, 480, 270);   
}

// Game Canvas declaration, as well as methods for redraw
myGameArea = {
    canvas : document.getElementById("canvas"), //createElement()
   
    // functions related to the canvas
    drawCanvas : function () {
        canvas.width = 686; // temporary dimension
        canvas.height = 290;
        this.context = canvas.getContext("2d");
		
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        document.getElementById("lane").innerHTML = "Current Lane: "+'\u2191'+"\n";
		
    },
    clear : function() { // clears out the canvas
        this.context.clearRect(0,0,480,270);
		this.context.drawImage(background,0,0, 480, 270);
    },
    moveZombie : function(x, y, type) { // TEMP NAME + IMPLEMENTATION
        if      (type == "standard")    zombieImage = standardZombie;
        else if (type == "strong")      zombieImage = strongZombie;
		else if (type == "healing")     zombieImage = healingZombie;
		else							zombieImage = generationsZombie;
        
        if (x == undefined || y == undefined) return;
        this.context.drawImage(zombieImage,x,y,30,30);
    },
    addZombie : function(type, x, y) { // TEMP IMPLEMENTATION
        if      (type == "standard")    zombieImage = standardZombie;
        else if (type == "strong")      zombieImage = strongZombie;
		else if (type == "healing")     zombieImage = healingZombie;
		else							zombieImage = generationsZombie;
        
        this.context.drawImage(zombieImage,x,y,30,30);
    },
    drawTower : function(x, y, type) { // TEMP IMPLEMENTATION
        if      (type == "standard")    towerImage = standardTower;
        else if (type == "strong") 		towerImage = strongTower;
		else if (type == "splash")		towerImage = splashTower;
		else 							towerImage = slowTower;
        
        this.context.drawImage(towerImage,x,y,30,30);
    },
    zombieAttacked : function(x, y) {

        this.context.fillStyle = "red";
        this.context.fillRect(x+15,y+15,5,5);
    },
    loadImage : function() {
        /*
        image.src = "/Users/HaruLee/GitHub/IntenseDefenseP2D1/standard tower.png";
        image.onload = function() {
            document.getElementById("demo").innerHTML = "LOADED?!";
            this.context.drawImage(image, 100, 100);
        }
        document.getElementById("positions").innerHTML = " image size: " +image.x +"_" +image.y;
        */
    }

}

// Adding zombies
function addZombie(zombieType) {
    if ((zombieType == "standard" && money < 100) ||
        (zombieType == "strong"   && money < 200))
    {
        window.alert("Not Enough Money");
        return;
    }
    myGameArea.addZombie(zombieType, 240, 0);
    
    if (zombieType == "standard") {
        zombies.push({
                     type: "standard",
                     health: 100,
                     speed: 5,
                     position_x: 240,
                     position_y: 0,
                     lane: lane_position
                     });
        money -= 100;
    }
    else if (zombieType == "strong") {
        zombies.push({
                     type: "strong",
                     health: 300,
                     speed: 2,
                     position_x: 240,
                     position_y: 0,
                     lane: lane_position
                     });
        money -= 200;
    }
	else if (zombieType == "healing") {
        zombies.push({
                     type: "healing",
                     health: 300,
                     speed: 2,
                     position_x: 240,
                     position_y: 0,
                     lane: lane_position
                     });
        money -= 200;
    }
	else if (zombieType == "generations") {
        zombies.push({
                     type: "generations",
                     health: 300,
                     speed: 2,
                     position_x: 240,
                     position_y: 0,
                     lane: lane_position
                     });
        money -= 200;
    }
    document.getElementById("demo").innerHTML = "Num Zombies: " + zombies.length +
    "\n" + "Money left: " + money;
}

// Adding towers
function addTower(towerType) {
    
    // "x || 0" just means "if there is a value for x, use that. Otherwise use 0."
    var tower_x = document.getElementById("tower_x").value || 270; // TEMP SET OF DEFAULT AS 90
    var tower_y = document.getElementById("tower_y").value || 90;

    // I AM NOT SO SURE ABOUT THE RANGE!
    // SINCE THE TOWER POSITION IS NOT THE CENTER OF THE DRAWING BUT THE LEFT TOP
    if(towerType == "standard")
	{
		var tower_attack_range = [tower_y-30, tower_y+60, tower_x-30, tower_x+60];
		
		myGameArea.drawTower(tower_x, tower_y, "standard");

		towers.push({
					type: "standard",
					health: 150,
					damage: 30,
					attack_speed: 3,
					position_x: tower_x,
					position_y: tower_y,
					attack_range: tower_attack_range
					});
	}
	else if(towerType == "strong")
	{
		var tower_attack_range = [tower_y-30, tower_y+60, tower_x-30, tower_x+60];
		
		myGameArea.drawTower(tower_x, tower_y, "strong");

		towers.push({
					type: "strong",
					health: 200,
					damage: 50,
					attack_speed: 1,
					position_x: tower_x,
					position_y: tower_y,
					attack_range: tower_attack_range
					});
	}
	else if(towerType == "splash")
	{
		var tower_attack_range = [tower_y-30, tower_y+60, tower_x-30, tower_x+60];
		
		myGameArea.drawTower(tower_x, tower_y, "splash");

		towers.push({
					type: "splash",
					health: 200,
					damage: 15,
					attack_speed: 1,
					position_x: tower_x,
					position_y: tower_y,
					attack_range: tower_attack_range
					});
	}
	else if(towerType == "slow")
	{
		var tower_attack_range = [tower_y-30, tower_y+60, tower_x-30, tower_x+60];
		
		myGameArea.drawTower(tower_x, tower_y, "slow");

		towers.push({
					type: "slow",
					health: 200,
					damage: 0,
					attack_speed: 1,
					position_x: tower_x,
					position_y: tower_y,
					attack_range: tower_attack_range
					});
	}
    // for print out
    var position_str = "";
    for (var i=0; i < towers.length; i++) {
        position_str += " [" +towers[i].position_x + ", " + towers[i].position_y +"]";
    }
    document.getElementById("towers").innerHTML = "num: "+towers.length +" towers: " +position_str;
    for(var i = 0; i<towers.length; i++)
		setInterval(function() { towerAttack(); }, 500);
}


// Updating the zombies' positions every second
function start() {
    setInterval(updatePositions, 200); // 1000 miliseconds = 1 sec
}
function updatePositions() {
    var position_str = "";
    var dead_zombies = []; // store indices for dead zombies
    
    myGameArea.clear();
    
    // simply redrawing the towers again
    for (var i=0; i < towers.length; i++) {
        myGameArea.drawTower(towers[i].position_x, towers[i].position_y, towers[i].type);
    }
    
    for (var i=0; i < zombies.length; i++) {
        
        if (zombies[i].lane == "center" && zombies[i].position_y < 240)
        {
            zombies[i].position_y += zombies[i].speed;
        }
        else if (zombies[i].lane == "right")
        {
            if (zombies[i].position_x < 450 && zombies[i].position_y == 0)
            {
                zombies[i].position_x += zombies[i].speed;
            }
            else if (zombies[i].position_x == 450 && zombies[i].position_y < 240)
            {
                zombies[i].position_y += zombies[i].speed;
            }
            else if (zombies[i].position_x > 225 && zombies[i].position_y == 240)
            {		
                zombies[i].position_x -= zombies[i].speed;
                
            }
        }
        else
        {
            if(zombies[i].position_x > 30 && zombies[i].position_y == 0)
            {
                zombies[i].position_x-=zombies[i].speed
            }
            else if(zombies[i].position_x == 30 && zombies[i].position_y < 240)
            {
                zombies[i].position_y+=zombies[i].speed
            }
            else if(zombies[i].position_x < 225 && zombies[i].position_y == 240)
            {		
                zombies[i].position_x+=zombies[i].speed
            }
        }
        
        // DEAD?
        // IN THE REAL GAME, WE WILL HAVE TO SEPARATE IF THE ZOMBIE ATTACKS THE BASE OR DIES FROM THE TOWER ATTACK
        if (((zombies[i].position_x < 242 && zombies[i].position_x > 225) && zombies[i].position_y > 235) ||
            zombies[i].health <= 0) {
            dead_zombies.push(i);
            continue;
        }
        
        myGameArea.moveZombie(zombies[i].position_x, zombies[i].position_y, zombies[i].type);
        
        position_str += " [" +zombies[i].position_x + ", " + zombies[i].position_y +", health: " +zombies[i].health +"]";
    }
    
    // delete all dead zombies
    for (var i=0; i < dead_zombies.length; i++) {
        zombies.splice(dead_zombies[i], 1);
    }
    if (dead_zombies.length > 0) // update how many zombies alive
        document.getElementById("demo").innerHTML = "Num Zombies: " + zombies.length +
    "\n" + "Money left: " + money;

    document.getElementById("positions").innerHTML = "positions: " +position_str;
    
}
function towerAttack() {
    // ASSUME "FIRST IN RANGE"
	for(var i=0; i<towers.length; i++)
	{
		var tower = towers[i];
    // AR stands for attack range
    var ar_top    = tower.attack_range[0];
    var ar_bottom = tower.attack_range[1];
    var ar_left   = tower.attack_range[2];
    var ar_right  = tower.attack_range[3];
    
    var within_range = []; // indices of those zombies within the attack range
    
    // Searching for zombies within the attack range
    for (var i=0; i < zombies.length; i++) {
        
        if (zombies[i].position_x >= ar_left && zombies[i].position_x <= ar_right &&
            zombies[i].position_y >= ar_top  && zombies[i].position_y <= ar_bottom)
        {
            within_range.push(i);
        }
    }
    
    var the_front = -1; // index of the zombie that is in the most front (while within the attack range)
    var the_front_x = -1;
    var the_front_y = -1;

    // Looking for the_front
    for (var i=0; i < within_range.length; i++) {
        var index = within_range[i];
        
        function downFront(zombie, index) {
            if (zombie.position_y > the_front_y) {
                the_front   = index;
                the_front_y = zombie.position_y;
            }
        }
        function leftFront(zombie, index) {
            if (zombie.position_x < the_front_x) {
                the_front   = index;
                the_front_x = zombie.position_x;
            }
        }
        function rightFront(zombie, index) {
            if (zombie.position_x > the_front_x) {
                the_front   = index;
                the_front_x = zombie.position_x;
            }
        }

        // THIS WILL NEED AN UPDATE AS IT ASSUMES THAT A TOWER CAN ONLY ATTACK ONE LANE
        // WHEREAS A TOWER MAY ATTACK EITHER LEFT/RIGHT LANE AS WELL AS CENTER LANE
        
        // THIS ALSO DOES POOR CALCULATION IN THE CORNER AS WELL
        
        if (tower.position_x < 240) { // ASSUMING THIS ONLY ATTACKS LEFT LANE
            
            if (tower.position_y == 0) { // going left
                leftFront(zombies[index], index);
            }
            else if (tower.position_y > 0 && tower.position_y < 240) { // going down
                downFront(zombies[index], index);
            }
            else { // going right
                rightFront(zombies[index], index);

            }
        }
        else if (tower.position > 270) { // ASSUMING THIS ONLY ATTACKS RIGHT LANE
            
            if (tower.position_y == 0) { // going right
                rightFront(zombies[index], index);
            }
            else if (tower.position_y > 0 && tower.position_y < 240) { // going down
                downFront(zombies[index], index);
            }
            else { // going left
                leftFront(zombies[index], index);
            }
        }
        else { // ASSUMING THIS ONLY ATTACKS CENTER LANE
            downFront(zombies[index], index);
        }
    }
    if (the_front != -1)
        zombies[the_front].health -= tower.damage; // there is a function but this will do too

    // putting a dot on top of the zombie
    myGameArea.zombieAttacked(zombies[the_front].position_x, zombies[the_front].position_y);
	}
}

function pickLane()
{
    var lane_arrow;
    if      (lane_position == "center") { lane_position = "right";  lane_arrow = '\u2192';}
    else if (lane_position == "right")  { lane_position = "left";   lane_arrow = '\u2190';}
    else                                { lane_position = "center"; lane_arrow = '\u2191';}
    
    document.getElementById("lane").innerHTML = "Current Lane: "+lane_arrow+"\n";
}