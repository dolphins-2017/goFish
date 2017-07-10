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
	"drawCard": function drawCard(deck_id, callback ){
		callback = (callback ? callback:function(){});
		$.ajax({
			"url": this.base + deck_id + "/draw/?count=26", 
			"crossDomain": true,
			"dataType": "json"
		}).then(function( data, status, responseObject ){
			callback( data );
		});
	},
	"addToPile" : function addToPile (deck_id, pile_name, cards, callback){
		callback = (callback ? callback:function(){});
		$.ajax({
			"url": this.base + deck_id + "/pile/" + pile_name + "/add/?cards=" + cards,
			"crossDomain": true,
			"dataType": "json"
		}).then(function( data, status, responseObject ){
			callback( data );
		});
	},	
	
	"drawFromPile" : function drawFromPile(deck_id, pile_name, callback) {
		callback = (callback ? callback:function(){});
		$.ajax({
			"url": this.base + deck_id + "/pile/" + pile_name + "/draw/",
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

	$getDeckButton.on( "click", function( event ){
		event.preventDefault();
		
		var getDeckID = function( data ){
			var deckID = data["deck_id"];
			return deckID;
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
		//var deckID = getDeckID();
		//console.log(deckID);


	});

	$dealCardsButton.on( "click", function( event ){
		event.preventDefault();	

		var draw26Cards = function (data) {
			var hand = data["cards"]
			return hand;
		}

		player1Hand = CardsAPI.drawCard(deckID, draw26Cards);
		player2Hand = CardsAPI.drawCard(deckID, draw26Cards);		
		//WarModel["deckID"] = getDeckID;
	
	} );


});

