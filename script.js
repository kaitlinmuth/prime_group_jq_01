$(document).ready(function (){
    //set initial price in DOM
    for (var fruit in Market) {
        $("#"+fruit).children("#price").text(Market[fruit]);
    }

	//Run every 15 seconds (Testing at 5 seconds):
    setInterval(function() {
        //Loop through each property in the Market object
		for (var fruit in Market) {
            //Set each property to a new price value according to randomChange function
			Market[fruit] = randomChange(Market[fruit]);
            $("#"+fruit).children("#price").text(Market[fruit]);
			console.log("The new value of " + fruit + " is " +
				Market[fruit]);
		}
	}, 15000);

    //Set click functionality of #apple div to purchase 1 apple at the current price.
	$("#pikachuDiv").on("click", ".btn-success", function(){
	    buyCalcs("pikachu");
	});

	//set click functionality of #pikachu div to sell 1 pikachu at the current price.
	$("#pikachuDiv").on("click", ".btn-danger", function(){
		sellCalcs("pikachu");
	});

    //Set click functionality of #banana div to purchase 1 apple at the current price.
    $("#charmanderDiv").on("click", ".btn-success", function(){
        buyCalcs("charmander");
    });

	//set click functionality of #pikachu div to sell 1 pikachu at the current price.
	$("#charmanderDiv").on("click", ".btn-danger", function(){
		sellCalcs("charmander");
	});

    //Set click functionality of #orange div to purchase 1 apple at the current price.
    $("#bulbasaurDiv").on("click", ".btn-success", function(){
        buyCalcs("bulbasaur");
    });
	//set click functionality of #pikachu div to sell 1 pikachu at the current price.
	$("#bulbasaurDiv").on("click", ".btn-danger", function(){
		sellCalcs("bulbasaur");
	});

    //Set click functionality of #pear div to purchase 1 apple at the current price.
    $("#squirtleDiv").on("click", ".btn-success", function(){
        buyCalcs("squirtle");
    });

	//set click functionality of #pikachu div to sell 1 pikachu at the current price.
	$("#squirtleDiv").on("click", ".btn-danger", function(){
		sellCalcs("squirtle");
	});


});

function buyCalcs(fruit) {
    var thisPrice = Market[fruit];
    buyFruit(fruit, thisPrice);
    //Search in #[fruit] for each child corresponding to display bullets
    $("#" + fruit).children("#totalInv").text("Inventory: "+Person[fruit]);
    $("#" + fruit).children("#avPrice").text(Person[fruit + "sAverage"]);
    $("#cash").text("Your available cash: $" + Person.totalCash);
}

function sellCalcs(pokemon){
	var thisPrice = Market[pokemon];
	sellPokemon(pokemon, thisPrice);
	$("#"+pokemon).children("#totalInv").text("Inventory: "+Person[pokemon]);
	$("#" + pokemon).children("#avPrice").text(Person[pokemon + "sAverage"]);
	$("#cash").text("Your available cash: $" + Person.totalCash);

}


//Create Market container (object) that holds each fruit as a property
var Market = {
    //Assign each new property (fruit) to the initial price
    //Initial price: find random integer between 50 and 999 using randomNumber(), divide by 100 to get $ value
	pikachu: (randomNumber(50, 999))/100,
	charmander: (randomNumber(50, 999))/100,
	bulbasaur: (randomNumber(50, 999))/100,
	squirtle: (randomNumber(50, 999))/100
};

//Find new price based on randomly generated change in price
function randomChange(price) {
	console.log("First Price ",price);
	//Generate a random number between -50 and 50
    var num = randomNumber (-25, 25);
	console.log("num is ", num);
	num /= 100;
	//Divide random number by 100 to get $ value
    console.log("num is " + num);
	//Add randomly generated change in price to current price
    price += num;
    //Round new price to 2 decimal points
    price = precise_round(price, 2);
	console.log("price is " + price);
	//If price is less than minimum (50 cents), set to minimum
    if (price < 0.50) {
		price = 0.50;
	//If price is greater than maximum (9.99), set to maximum
    } else if (price > 9.99) {
		price = 9.99;
	}
	console.log("The new price is " + price);
	return price;
}

//Create Person object for "current user"
var Person = {
    //Keep track of user's total cash
	totalCash: 50,
	//Create property for the number of fruits the user has in inventory
    //Set initial value to 0
    pikachu: 0,
	charmander: 0,
	bulbasaur: 0,
	squirtle: 0,

	//track the total number of each pokemon sold
	pikachuSold: 0,
	charmanderSold: 0,
	bulbasaurSold: 0,
	squirtleSold:0,

    //Create property for the total amount spent per each type of fruit
    //Set initial value to 0
	pikachusCost: 0,
	charmandersCost: 0,
	bulbasaursCost: 0,
	squirtlesCost: 0,
    //Create property for the average amount spent per each type of fruit
    //Set initial value to 0
	pikachusAverage: 0,
	charmandersAverage: 0,
	bulbasaursAverage: 0,
	squirtlesAverage: 0
};

//Function for user action of purchasing a piece of fruit
function buyFruit(fruit, price) {
    console.log("The user's total cash is " + Person.totalCash + ", and the current price is " + price);
	//Make sure user has enough cash on hand to purchase fruit
    if (Person.totalCash > price) {
		//Remove cost of fruit purchased from current total cash
        Person.totalCash = precise_round(Person.totalCash - price, 2);
		//Increase type of fruit quantity in user basket by 1
        Person[fruit]++;
		//Add cost of current fruit purchase to total amount paid per type of fruit
        Person[fruit + "sCost"] += price;
		console.log("Total cost of " + fruit + ": " + Person[fruit + "sCost"]);
		//Recalculate average price per fruit based on updated quantity and total cost per fruit type
        Person[fruit + "sAverage"] = precise_round((Person[fruit + "sCost"])/(Person[fruit]+Person[fruit+"Sold"]),2);
		console.log("Average cost of " + fruit + ": " + Person[fruit + "sAverage"]);
    } else {
		alert("You don't have enough money for that pokemon!")
	}
}

//Function for user action of selling a pokemon
function sellPokemon(pokemon, price) {
	console.log("The user's total cash is " + Person.totalCash + ", and the current price is " + price);
	if (Person[pokemon] > 0) {
		//Add cost of pokemon sold from current total cash
		Person.totalCash = precise_round(Person.totalCash + price, 2);
		//Decrease pokemon quantity in user basket by 1
		Person[pokemon]--;
		//Increment cost of Pokemon sold
		Person[pokemon + "Sold"]++;
		//Recalculate average price per fruit based on updated quantity and total cost per fruit type
		Person[pokemon + "sAverage"] = precise_round((Person[pokemon + "sCost"]) / (Person[pokemon] + Person[pokemon + "Sold"]), 2);
		console.log("Average cost of " + pokemon + ": " + Person[pokemon + "sAverage"]);
	} else {alert("You don't have any of that Pokemon to sell!");}
}

//Generate a random integer given a minimum and maximum range value
//Author: Scott Bromander
function randomNumber(min, max) {
	return Math.floor(Math.random() * (1 + max - min) + min);
}

//Round based on number and desired number of decimals to round to
//From: http://stackoverflow.com/questions/1726630/javascript-formatting-number-with-exactly-two-decimals
function precise_round(num,decimals){
    return Math.round(num*Math.pow(10,decimals))/Math.pow(10,decimals);
}