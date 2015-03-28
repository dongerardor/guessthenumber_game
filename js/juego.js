
$(function(){
	var numeroElegido = resetNumber();
	var bets = [];
	var bet = 0;
	var rango = {min: 0, max: 1000};

	function init(){
		numeroElegido = resetNumber();
		resetGame();
	}

	function resetNumber(){
		return Math.round(Math.random()*1000);
	}

	function resetGame(){
		numeroElegido = resetNumber();
		$("#number").removeClass("show").text(numeroElegido);
		$("#message").text("");
		$("#guess").val("");
		$("button#reiniciar").hide();
		$("#clue_resultado div#barra").css("width", 0);
	}

	function makeBet(){
		var numeroApostado = $("#guess").val();
		bets.push(numeroApostado);
		var cercania = evaluarCercania(numeroApostado, numeroElegido);

		if (numeroApostado == numeroElegido){
			endGame();
		}else{
			var diff = Math.abs(numeroApostado - numeroElegido);
			showCercania(cercania, numeroApostado, numeroElegido);
		}
	}

	function showCercania(cercania, numeroApostado, numeroElegido){
		$("#clue_resultado div#barra").css("width", cercania + "%");
		showMsgCercania(cercania, numeroApostado, numeroElegido);
	}

	function showMsgCercania(cercania, numeroApostado, numeroElegido){

		var msg = "Mmmm...";
		if(cercania > 90){
			msg = "Pésimo";
		}else if(cercania > 80){
			msg = "Podría ser peor"
		}else if(cercania > 70){
			msg = "Seguí participando";
		}else if(cercania > 60){
			msg = "Todavía estás lejos";
		}else if(cercania > 50){
			msg = "Estás a mitad de camino";
		}else if(cercania > 40){
			msg = "No tan mal"
		}else if(cercania > 30){
			msg = "No taaan lejos";
		}else if(cercania > 20){
			msg = "Bastante bien";
		}else if(cercania >10){
			msg = "Bien!";
		}else{
			msg = mensajeProximidad(numeroApostado, numeroElegido);
		}

		$("#clue_resultado p").text(msg);

		function mensajeProximidad(numeroApostado, numeroElegido){
			var msg = "";
			if (numeroApostado > numeroElegido){
				msg = "Te pasaste";
			}else if(numeroApostado<numeroElegido){
				msg = "Es mayor"
			}else if(numeroApostado == numeroElegido){
				msg = "Excelente!";
			}
			return msg;
		}
	}

	function evaluarCercania(numeroApostado, numeroElegido){
		var distancia = Math.abs(numeroElegido - numeroApostado);
		var mayorLejaniaPosible = Math.abs(numeroElegido - rango.min) > Math.abs(numeroElegido - rango.max)?Math.abs(numeroElegido - rango.min):Math.abs(numeroElegido - rango.max);
		var cercania_base100 = Math.round(distancia/mayorLejaniaPosible*100);
		return cercania_base100;
	}

	function endGame(){
		$("#message").text("Congratulations, el número es  " + numeroElegido + " y tu lo supiste luego de " + bets.length + " apuestas");

		$("#number").addClass("show");

		$("#clue_resultado p").text("Acertaste!");

		setTimeout(function(){
			$("button#reiniciar").show();
		}, 3000);
	}

	$("button#apostar").click(function(){
		makeBet();
	});

	$("button#reiniciar").click(function(){
		resetGame();
	});


	init();
})