var App = {
	"setDeck": function(data){
		this.deckId = data["deck_id"]; 
		//console.log(this.deckId);
		// return this.deckId;
	},
	"getDeck" : function() {
		//console.log(this.deckId);
		return this.deckId;
	},

	"draw26Cards" : function(data) {
		this.playerHand = data["cards"];
		//console.log(this.playerHand);


	},

	"getDrawnCards" : function() {
		// console.log(this.playerHand);
		return this.playerHand;
	},

	"setCard" : function(data){
		this.cardValue = data[0]["value"];
	},

	"getCard" : function() {
		console.log(this.cardValue);
		return this.cardValue;
	}

	// "getPileId" : function() {
	// 	this.pileId = data["deck_id"]
	// },

	// "getPlayer1Cards" : function() {
	// 	this.player1PileId = this.pileId;
	// 	return this.player1PileId;
	// 	// this.player1Hand = this.playerHand
	// 	// console.log(this.player1Hand)
	// 	// return this.playerHand
	// },

	// "getPlayer2Cards" : function() {
	// 	this.player2PileId = this.PileId;
	// 	return this.player2PileId;
	// },



};



var CardsAPI = {
	"base": "https://deckofcardsapi.com/api/deck/",

	"getDeck": function getDeck( callback ){
		callback = (callback ? callback:function(){});
		$.ajax({
			"url": this.base + "new/shuffle/", 
			"crossDomain": true,
			"dataType": "json"
		}).then(function( data, status, responseObject ){
			callback( data );
		});

	},

	"drawCard": function drawCard(deckId, callback ){
		callback = (callback ? callback:function(){});
		$.ajax({
			"url": this.base + deckId + "/draw/?count=26", 
			"crossDomain": true,
			"dataType": "json"
		}).then(function( data, status, responseObject ){
			callback( data );
		});
	},
	"addToPile" : function addToPile (deckId, pile_name, cards, callback){
		callback = (callback ? callback:function(){});
		$.ajax({
			"url": this.base + deckId + "/pile/" + pile_name + "/add/?cards=" + cards,
			"crossDomain": true,
			"dataType": "json"
		}).then(function( data, status, responseObject ){
			callback( data );
		});
	},	
	
	"drawFromPile" : function drawFromPile(deckId, pile_name, callback) {
		callback = (callback ? callback:function(){});
		$.ajax({
			"url": this.base + deckId + "/pile/" + pile_name + "/draw/",
			"crossDomain": true,
			"dataType": "json"
		}).then(function( data, status, responseObject ){
			callback( data );
		});
	},	

};


// var WarModel {
// 	"deckID" = "", 
// 	player1Hand = [],
// 	player2Hand = []


// }



$(document).ready(function(){

	$getDeckButton = $( "#getNewDeck" );
	$dealCardsButton = $( "#dealCards" );
	$playTurnButton = $( "#playTurn" );

	$getDeckButton.on( "click", function( event ){
		event.preventDefault();
		
		var getDeckID = function( data ){
			App.setDeck( data );
			// var deckId = App.getDeck()
			// return deckId


			// var template, rendered;

			// // grab the template from the page
			// template = $( "#card-deck-template" ).html();
			
			// // give Mustache the `template` and the `data`
			// // Mustache will take the instructions in the `template` 
			// // and attempt to build html with the data.
			// rendered = Mustache.render( template, {"content": data });
			// $("#nflArrestsData").html( rendered );

		};

		CardsAPI.getDeck( getDeckID );



	});

	$dealCardsButton.on( "click", function( event ){
		event.preventDefault();	

		var draw26Cards = function (data) {
			var deckId = App.getDeck();
			App.draw26Cards( data );
			var drawnCards = App.getDrawnCards();
			CardsAPI.addToPile(deckId, "player1Hand", drawnCards);


			App.draw26Cards( data );
			drawnCards = App.getDrawnCards();
			CardsAPI.addToPile(deckId, "player2Hand", drawnCards);
			// console.log(data["piles"["player1Hand"]]);
			// console.log((data["piles"])["player2Hand"]);


		}


	
		var deckId = App.getDeck();
		CardsAPI.drawCard(deckId, draw26Cards);

		
	
	} );


	$playTurnButton.on( "click", function( event ){
		event.preventDefault();
		
		var drawCard = function( data ){
			App.setCard(data);
			App.getCard();
			// var deckId = App.getDeck()
			// return deckId


			// var template, rendered;

			// // grab the template from the page
			// template = $( "#card-deck-template" ).html();
			
			// // give Mustache the `template` and the `data`
			// // Mustache will take the instructions in the `template` 
			// // and attempt to build html with the data.
			// rendered = Mustache.render( template, {"content": data });
			// $("#nflArrestsData").html( rendered );
		}
		var deckId = App.getDeck();
		console.log(deckId);
		CardsAPI.drawFromPile(deckId, "player1Hand", drawCard);
		CardsAPI.drawFromPile(deckId, "player2Hand", drawCard);


		});





	// });

});

