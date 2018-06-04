class Leaderboard {
	constructor(hiScores) {
		this.hiScores = hiScores;
	}

	addScore(winner) {
		this.hiScores.push(winner); //agrego el nuevo score
		this.hiScores.sort(function(a, b) {//sort-eo el array
			return a.attempts - b.attempts;
		});
		if (this.hiScores.length > 5) { //(máximo 5 hi scores)
			this.hiScores.splice(5, 1); //saco el score más bajo
		}
		localStorage.setItem("hiScores", JSON.stringify(this.hiScores)); //guardo en localStorage
	}

	checkHiScore(winner) { //me fijo si el score nuevo quedó en la tabla de hiscores
		let existing = this.hiScores.find(function(score) {
			return score.name == winner.name && score.attempts == winner.attempts;
		})

		if (existing) {
			return true;
		}
	}

	displayHiScores() {
		if (this.hiScores.length == 0) {
			$("#hiScores").html("<p style='font-size:12px; visibility:visible'>No hay puntajes para mostrar</p>");
		}

		else {
			$("#hiScores").empty();
			for (var player of this.hiScores) {
				let hiScore = `<li style='visibility:visible'>${player.name} - ${player.attempts} intentos</li>`;
				$("#hiScores").append(hiScore);
			}
		}
	}
}