$(document).ready(function (){ 
	console.log("The original price of apple is " + Market.apple);
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
	$("#appleDiv").on("click", function(){
	    thingToDo("apple");
	})

    //Set click functionality of #banana div to purchase 1 apple at the current price.
    $("#bananaDiv").on("click", function(){
        thingToDo("banana");
    })

    //Set click functionality of #orange div to purchase 1 apple at the current price.
    $("#orangeDiv").on("click", function(){
        thingToDo("orange");
    })

    //Set click functionality of #pear div to purchase 1 apple at the current price.
    $("#pearDiv").on("click", function(){
        thingToDo("pear");
    })
});

function thingToDo(fruit) {
    console.log("The market price of " + fruit + " is " + Market[fruit]);
    var thisPrice = Market[fruit];
    buyFruit(fruit, thisPrice);
    //Search in #[fruit] for each child corresponding to display bullets
    $("#" + fruit).children("#totalInv").text(Person[fruit]);
    $("#" + fruit).children("#avPrice").text(Person[fruit + "sAverage"]);
    $("#cash").text("Your available cash: $" + Person.totalCash);
}

//Create Market container (object) that holds each fruit as a property
var Market = {
    //Assign each new property (fruit) to the initial price
    //Initial price: find random integer between 50 and 999 using randomNumber(), divide by 100 to get $ value
	apple: (randomNumber(50, 999))/100,
	orange: (randomNumber(50, 999))/100,
	banana: (randomNumber(50, 999))/100,
	pear: (randomNumber(50, 999))/100
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
	//Create property for the number of fruits the user has purchased
    //Set initial value to 0
    apple: 0,
	orange: 0, 
	banana: 0, 
	pear: 0,
    //Create property for the total amount spent per each type of fruit
    //Set initial value to 0
	applesCost: 0,
	orangesCost: 0,
	bananasCost: 0, 
	pearsCost: 0,
    //Create property for the average amount spent per each type of fruit
    //Set initial value to 0
	applesAverage: 0,
	orangesAverage: 0,
	bananasAverage: 0,
	pearsAverage: 0 
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
        Person[fruit + "sAverage"] = precise_round((Person[fruit + "sCost"])/(Person[fruit]),2);
		console.log("Average cost of " + fruit + ": " + Person[fruit + "sAverage"]);
    } else {
		alert("You don't have enough money for that fruit!")
	}
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