var tileGame = (function() {
	var defaultValue = "CLICK";
	var tiles = ['hello', 'hello', 'random', 'random', 'world', 'world', 'javascript', 'javascript', 'object', 'object', 'game', 'game', 'memory', 'memory', 'tile', 'tile', 'idea', 'idea', 'nothing', 'nothing'];
	var flipped = [];

	var shuffle = function() {
		var currentIndex = tiles.length, temporaryValue, randomIndex;
		// While there remain elements to shuffle...
		while (0 !== currentIndex) {
			// Pick a remaining element...
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;

			// And swap it with the current element.
			temporaryValue = tiles[currentIndex];
			tiles[currentIndex] = tiles[randomIndex];
			tiles[randomIndex] = temporaryValue;
		}
	};

	var check_tiles = function(tile_id) {
		var length = flipped.length;
		if(flipped.length > 1) {
			if(tiles[flipped[0]] !== tiles[flipped[1]]) {
				clearTiles();
			}

			flipped = [];
		}
		
		if(flipped.length < 2) {
			flipped.push(tile_id);
		}
	};

	var clearTiles = function() {
		var board_tiles = document.getElementsByClassName('tile'), length = flipped.length, i;
		for(i = 0; i < length; i++) {
			board_tiles[flipped[i]].innerHTML = defaultValue;
		}
	};

	var clear = function() {
		var board_tiles = document.getElementsByClassName('tile'), i, length = board_tiles.length;
		for(i = 0; i < length; i++) {
			board_tiles[i].innerHTML = defaultValue;
		}
	};

	var init_tiles = function() {
		var board_tiles = document.getElementsByClassName('tile'), i, length = board_tiles.length;
		for(i = 0; i < length; i++) {
			board_tiles[i].removeEventListener('click', tile_click, false);
			board_tiles[i].addEventListener('click', tile_click, false);
		}
	};

	var tile_click = function(e) {
		var tile = e.target;
		var tile_id = tile.getAttribute('id');

		check_tiles(tile_id);

		tile.innerHTML = tiles[tile_id];
	};

	return {
		start: function() {
			shuffle();
			clear();
			init_tiles();
		}
	};
}());

var start_button = document.getElementById('startGame');
start_button.addEventListener('click', tileGame.start, false);