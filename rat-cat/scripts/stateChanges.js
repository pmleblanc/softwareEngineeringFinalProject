/*
 * Created 14MAR2013 
 * Authors:
 * 	Ethan
 *
 */


/*initialState: This function shows the player their cards for a brief time and then transitions 
 *			to the next state
 *	state: The JSON representative of the game board, this is a JSON
 *		   object which has the following high level pairs:
 *		   { "deck" : {}, "discard" : {}, "compCard" : {}, "playCard" : {},
 * 			 "displayCard" : {}, "knockState" : 0 | 1, "state" : "state specified by specs" }
 *	returns: The updated state
 */
function initialState(state){
	//alert('initialState');

	//Any fancy animations for shuffling and dealing go here, such as tweening cards from the deck to the players hands

	//Show the player their two outermost cards for a short time:
	$('#playerCard1').css("background-image", 'url(images/cards/smallCards/'+ state.playCard[0].image +'.png)');
	$('#playerCard4').css("background-image", 'url(images/cards/smallCards/'+ state.playCard[3].image +'.png)');

	//The function below fades out the card and then fades it back in
	$('#playerCard1').animate({opacity : 0},4000,function(){ $('#playerCard1').animate({opacity : 1},1000)});
	$('#playerCard4').animate({opacity : 0},4000,function(){ $('#playerCard4').animate({opacity : 1},1000)});

	//This function 'hides' the cards again
	setTimeout(function(){
		$('#playerCard1').css("background-image", 'url(images/cards/smallCards/13.png)');
		$('#playerCard4').css("background-image", 'url(images/cards/smallCards/13.png)');
	},5000);

	//No real need for an ajax call we'll just update things here
	state.state = 'waitingForDraw';

	//We need some timing here so that the glow for the next state doesn't happen immediately

	return handleState(state);

}


/*waitingForDraw: This function causes the board to update to the right glowing state
 *			Which means glowing the discard and deck
 *	state: The JSON representative of the game board, this is a JSON
 *		   object which has the following high level pairs:
 *		   { "deck" : {}, "discard" : {}, "compCard" : {}, "playCard" : {},
 * 			 "displayCard" : {}, "knockState" : 0 | 1, "state" : "state specified by specs" }
 *	returns: The updated state
 */
function waitingForDraw(state){
	//alert('stateChange.js : waitingForDraw state');

	//Add glow to whatever the user will interact with
	$('#deck').addClass('glowing');
	$('#discardPile').addClass('glowing');

	//This actually causes the glow
	var glow = $('.glowing');
	setInterval(function(){
	    glow.hasClass('glow') ? glow.removeClass('glow') : glow.addClass('glow');
	}, 2000);

	//Add listeners for clicks that will fire off whatever interaction we need
	//and will also remove the glow
	$('#deck').click(function(){
		//Use ajax to yell over to the server that something has happened

		//Remove the glow
		$(this).removeClass('glowing');
	});

	$('#discardPile').click(function(){
		//Use ajax to yell over to the server that something has happened

		//Remove the glow
		$(this).removeClass('glowing');
	});

	return state;
}


/*waitingForPCard: This function causes the board to update to the right glowing state
 *	state: The JSON representative of the game board, this is a JSON
 *		   object which has the following high level pairs:
 *		   { "deck" : {}, "discard" : {}, "compCard" : {}, "playCard" : {},
 * 			 "displayCard" : {}, "knockState" : 0 | 1, "state" : "state specified by specs" }
 *	returns: The updated state
 */
function waitingForPCard(state){
	alert(' stateChange.js : waitingForPCard state');
	return state;
}


/*HAL: This function causes the board to update to the right glowing state
 *	state: The JSON representative of the game board, this is a JSON
 *		   object which has the following high level pairs:
 *		   { "deck" : {}, "discard" : {}, "compCard" : {}, "playCard" : {},
 * 			 "displayCard" : {}, "knockState" : 0 | 1, "state" : "state specified by specs" }
 *	returns: The updated state
 */
function HAL(state){
	alert('HAL state');
	return state;
}

/*playerChoice: This function causes the board to update to the right glowing state
 *	state: The JSON representative of the game board, this is a JSON
 *		   object which has the following high level pairs:
 *		   { "deck" : {}, "discard" : {}, "compCard" : {}, "playCard" : {},
 * 			 "displayCard" : {}, "knockState" : 0 | 1, "state" : "state specified by specs" }
 *	returns: The updated state
 */
function playerChoice(state){
	alert('playerChoice state');
	return state;
}

/*draw2PlayerChoice: This function causes the board to update to the right glowing state
 *	state: The JSON representative of the game board, this is a JSON
 *		   object which has the following high level pairs:
 *		   { "deck" : {}, "discard" : {}, "compCard" : {}, "playCard" : {},
 * 			 "displayCard" : {}, "knockState" : 0 | 1, "state" : "state specified by specs" }
 *	returns: The updated state
 */
function draw2PlayerChoice(state){
	alert('draw2PlayerChoice state');
	return state;
}

/*handleState: This function passes the state through a switch statement and calls the proper rendering function
 *	state: The JSON representative of the game board, this is a JSON
 *		   object which has the following high level pairs:
 *		   { "deck" : {}, "discard" : {}, "compCard" : {}, "playCard" : {},
 * 			 "displayCard" : {}, "knockState" : 0 | 1, "state" : "state specified by specs" }
 *	returns: The updated state
 */
function handleState(state){
	switch( state.state){
		case 'waitingForDraw':
			return waitingForDraw(state);
		case 'waitingForPCard':
			return waitingForPCard(state);
		case 'HAL':
			return HAL(state);
		case 'playerChoice':
			return playerChoice(state);
		case 'draw2PlayerChoice':
			return draw2PlayerChoice(state);
		case 'initial':
			return initialState(state);
		default:
			return state;
	}
}