class Tile {
	constructor(image, id, position, bgcolor, board) {
		this._image = image;
		this._id = id;
		this._position = position;
		this._bgcolor = bgcolor;
		this._status = "back";
		this._board = board;
	}

	flip() {
		if (this._status == "back") {
			if (this._board._activeTiles.length < 2) { //sólo si no hay dos fichas ya visibles
				this._status = "disabled"; // impide flippear una ficha cuando no se terminó la jugada
				$(".square[data-position=" +this._position+ "]").flip(true); // muestra el frente de la ficha
				this._board.makeTileActive(this) // lo mando a activetiles

				if (this._board._activeTiles.length == 2) { //cuando termino de dar vuelta la ficha, me fijo si hay dos activas
						this._board.compareTiles(); // comparo las fichas
				}
			}
		}

		else if (this._status == "front") { //viene de flipBoth
			this._status = "back"; // cambio el estado
			$(".square[data-position=" +this._position+ "]").flip(false); //muestro el reverso de la ficha
		}
	}
}