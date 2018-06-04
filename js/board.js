class Board {
	constructor(attempts, playerName, leaderboard) {
		this._progress = 0; // pares ya encontrados (máximo 6)
		this._win = 6; 
		this._tiles = []; // objetos ficha
		this._activeTiles = []; // fichas dadas vuelta (máximo 2)
		this._attempts = attempts; // intentos en total
		this._attemptsRemaining = attempts; // intentos que quedan
		this._playerName = playerName;
		this._leaderboard = leaderboard;
	}

	//GENERA FICHAS
	makeTiles() {
		let board = this; // para usar "this" dentro de funciones
		let tileImgs = ["badtzmaru", "chococat", "hellokitty", "keroppi", "mymelody", "twinstars"]; // recorro este array y creo dos fichas con cada imagen //cargo las imágenes desde css con clases
		let bgColors = ["salmon", "#4AB37E", "#4881A2", "#FFBC69", "#DF5C8A", "#71A5C3"]; //salmon, verde, azul, naranja, magenta, celeste

		function getRandomColor() {
			let color = Math.floor(Math.random() * bgColors.length);
			return bgColors.splice(color, 1)[0];
		}

		tileImgs.forEach(function(element, index) { //por cada imagen de ficha
			//genero un par de fichas de igual imagen y id
			let color = getRandomColor(); // el mismo color para las dos fichas
			let tile1 = new Tile(element, index, 0, color, board); //la posición se genera al mezclar las fichas en placeTiles()
			let tile2 = new Tile(element, index, 0, color, board);
			board._tiles.push(tile1, tile2);
		}); 

		board.placeTiles();
	}

	//MEZCLA LAS FICHAS, LES ASIGNA POSICIÓN Y GENERA DIVS
	placeTiles() {
		let shuffledTiles = this._tiles.sort(function() {
			return Math.random() - 0.5;
		});

		shuffledTiles.forEach(function(tileObj, index) {
			let tile = `<div class='square' data-position='${index}'><div class='front' style='background-color:${tileObj._bgcolor}'><img src='./recursos/${tileObj._image}.png'></div><div class='back'><img src='./recursos/reverso.png'></div></div>`;
			tileObj._position = index;
			$(".board").append(tile);
		})
	}

	//MANEJAN FICHAS ACTIVAS
	makeTileActive(tile) {
		this._activeTiles.push(tile);
	}

  //COMPARA FICHAS ACTIVAS (cuando hay 2)
	compareTiles() {
		if (this._activeTiles[0]._id == this._activeTiles[1]._id) {//si las fichas activas tienen el mismo id
			this._progress += 1; //sumo 1 al progreso
			this._activeTiles = []; //vacío activeTiles
		}		

		else {//si no matchean
			let board = this;
			function flipBoth() {
				board._activeTiles[1]._status = "front" ;
				board._activeTiles[1].flip();
				board._activeTiles[0]._status = "front";
				board._activeTiles[0].flip();
				board._activeTiles = []; //vacío activeTiles (cuando los terminé de usar (por el timeout))
			}
			window.setTimeout(flipBoth, 1000);
		}

		this._attemptsRemaining -= 1; // si no gané ni perdí, sólo resto un intento
		this.checkWinLose.bind(this)();  // me fijo si gané o perdí
	}

	checkWinLose() {
		if (this._progress == this._win) {
			let winner = {
				name: this._playerName,
				attempts:  this._attempts - this._attemptsRemaining
			}
			this._leaderboard.addScore(winner);
			window.setTimeout(endGame.bind(null, "win", winner, this._leaderboard), 1000);
		}

		else if (this._attemptsRemaining == 0 && this._progress !== this._win) {//impide perder si se gana en el último intento
			window.setTimeout(endGame.bind(null, "lose", this._leaderboard), 1000);
		}

		else {
			$(".attempts").text(this._attemptsRemaining); // muestro intentos restantes
		}
	}
}