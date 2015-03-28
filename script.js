/*una variable que guarde el número elegido al azar entre 1 y 10000

una accion al boton que es una apuesta, tomando el valor del campo de texto

una accion que, al hacer la apuesta, me diga si acerté o no y si estoy lejos o no

una variable de medida de lejos y cerca

una limpieza del campo de texto

al acertar, el número se muestra y un mensaje de parabienes

reset - new game

*/

$(function(){
	var numeroElegido = resetNumber();
	var bets = 0;
	var bet = 0;

	function init(){
		numeroElegido = resetNumber();
		resetGame();
		message("Inicia el juego");
	}

	function resetNumber(){
		return Math.round(Math.random()*1000);
	}

	function resetGame(){
		numeroElegido = resetNumber();
		$("#number").text(numeroElegido);
		$("#guess").val("");
		message("");
	}

	function message(msg){
		$("#message").text(msg);
	}

	function makeBet(){
		var numeroApostado = $("#guess").val();
		bets++;
		var msg = "0X0X0X0X"
		if (numeroApostado == numeroElegido){
			endGame();
		}else{
			var diff = Math.abs(numeroApostado - numeroElegido);
			var msg = "lejos";
			if (diff < 3){
				msg = "muy muy cerca";
			}else if (diff < 10){
				msg = "cerca";
			}else if (diff < 100){
				msg = "no tan lejos";
			}else if (diff < 500){
				msg = "vamos bien";
			}
		}
		message(msg);
	}



	function endGame(){
		message("Congratulations, el número es  " + numeroElegido + " y tu lo supiste luego de " + bets);
		setTimeout(function(){
			resetGame();
		}, 3000);
	}



	$("button#apostar").click(function(){
		makeBet();
	});

	$("#button#reiniciar").click(function(){
		resetGame();
	});

	init();
})

/*

Me gustaría construir un índice de cercanía con la cifra a adivinar (CAA).

*/