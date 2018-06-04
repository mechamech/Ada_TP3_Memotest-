function initBoard(attempts, playerName, leaderboard) {
	let board = new Board(attempts, playerName, leaderboard);
	board.makeTiles();
	$(".square").flip({front: '.back', back: '.front', trigger: 'manual'}); // inicializo la animación flip para todas las fichas
	// listener de las fichas
	$(document).on("click", ".square", function() {
		let position = $(this).data("position");
		let tile = board._tiles.find(function(tile) {
			return tile._position == position;
		});
		tile.flip(); //llamo a flip sobre el objeto al clickear una ficha (NO ES la animación)
	})
}

function endGame(status, winner, leaderboard) {
	let msg;
	if (status == "win") {
		msg = `<p>¡Ganaste!</p>
		<p>Intentos: ${winner.attempts}</p>`;

		if (leaderboard.checkHiScore(winner) || leaderboard.hiScores.length < 5) {
			msg = msg.concat(`<p>¡Nuevo High Score!</p>`);
		}
	}

	else if (status == "lose") {
		msg = "<p>¡Perdiste!</p>";
	}

	let restartBtn = `<button class="restartGame" onclick="location.reload()">Jugar otra vez</button>`;

	$("#gameEnd").append(msg).append(restartBtn);

	$(".board").addClass("overlay");
	$(".square").remove();
	$("#gameEnd").css("display", "flex");
}

$(".dificultad").on("click", function() {
	//nombre del jugador
	let playerName;
	if ($("#input").val() == "") {
		playerName = "Anónimo";
	}
	else {
		playerName =  $("#input").val();
	}
	$("#playerNameDisplay").text(playerName);
	//dificultad
	let attempts = $(this).val();
	$(".attempts").text(attempts);
	//saco el overlay, muestro datos e inicializo el juego
	$("#nameInput").remove();
	$(".board").removeClass("overlay");
	$("aside").css("display", "block");
	$("h1").prependTo("aside");
	//inicializa leaderboard
	var hiScores = localStorage.getItem("hiScores");
	if (!hiScores) {
		hiScores = [];
	}

	else {
		hiScores = JSON.parse(hiScores);
	}	
	
	var leaderboard = new Leaderboard(hiScores);
	leaderboard.displayHiScores();
	initBoard(attempts, playerName, leaderboard);
});