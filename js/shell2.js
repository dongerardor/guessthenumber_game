var tl_inicio = new TimelineMax();
var tl_vpower = new TimelineMax();
var current_section = "";
var gasolina_selected = "";
var gasolina_selecionada = "";
var status_painel = 0; //0 --> nada , 1 --> painel gasolina, 2--> detalhe gasolina
var current_popup = 1;
var timer_sprite;
//var gasolina_temp;
var mobile = detectmob();//detetamos se é mobile
var FF = !(window.mozInnerScreenX == null);//detetamos si o browser é firefox
var arr_gasolinas_visitadas = [];
var vpower_ativo = false;


$(function() {

	if (mobile){//se for mobile, apago os videos
		$("#video_main").remove();
    }else{
		$("#video_gif").remove();
		document.getElementById("video_main").pause();//video inicial paused
    }

	tl_inicio.addLabel('section1');
	tl_inicio.addDelay(1);
	tl_inicio.addLabel('section1_pos');
	tl_inicio.to(logo_Vpower, .1, {
		onComplete:function(){
			play_video_inicial();
		}
	});
	tl_inicio.to(section1, .5, {display: "block", opacity: 1});
	tl_inicio.addDelay(3);
	tl_inicio.to(logo_Vpower, .5, {opacity: 0});
	tl_inicio.to(titulo_principal, .5, {display: "none", opacity: 0});
	tl_inicio.to(btn_comecar, .5, {display: "block", opacity: 1});
	tl_inicio.to(cabezalho_inicial, .5, {display: "none", opacity: 0});
	tl_inicio.to(cabezalho_comum, .5, {display: "block", opacity: 1});//show cabezalho comum
	//fim inicio

	//begin section2
	tl_inicio.addLabel('section2');
	tl_inicio.addDelay(.3);
	tl_inicio.to(section1_fundo, .5, {display: "none", opacity: 0});//video out
	
	tl_inicio.to(btn_comecar, .5, {display: "none", opacity: 0});//btn começar out

	tl_inicio.addLabel('section21');//start bolinha vermelha
	tl_inicio.to(section2, .1, {display: "block",
			onStart: function(){
				$("#icon_nav_ppal").css({ "opacity":0 }).attr("src", "images/icon_nav_1.png");//troca icono nav ppal
				//$("#gasolina_verde").hide();//reset gasolina verde
				$("#gasolina_vermelha").show();//reset gasolina vermelha
				set_bolinhas_navPpal(1);//ativamos a primeira bolinha do nav ppal
				vpower_ativo = false;
				//tiramos o .branco do cabezalho
				$("div#cabezalho_comum h3").removeClass("branco");
				//botamos o botão certo em cada gasolina
				$(".btns_gasolinas").each(function(i, obj){
					if ($(this).parent().attr("id") == "vpower"){
						$(this).attr("src", "images/icon_shellVPower.png")
					}else{
						$(this).attr("src", "images/icon_mais.png")
					}
				}).hide();

				//colocamos as gasolinas no lugar, para formar o triangulo inicial,
				//caso elas hajam sido deslocadas em passos prévios
				$("div#imgs_gasolinas div#comum").css( {"top": "100px", "left": "400px" } );
				$("div#imgs_gasolinas div#aditivada").css( {"top": "183px", "left": "283px" } );
				$("div#imgs_gasolinas div#premium").css( {"top": "183px", "left": "422px" } );
				$("div#imgs_gasolinas div#vpower").css( {"top": "227px", "left": "352px" } );
			}
		});//aparecen as gasolinas
	tl_inicio.addDelay(2);
	tl_inicio.to(bola_vermelha_section21, .5, {display: "block", opacity: 1});//show bola vermelha
	tl_inicio.fromTo($("#imgs_gasolinas div"), 1, {display: "none", opacity: 0}, {display: "block", opacity: 1});//show imgs pote gasolina
	tl_inicio.to(icons_nav_ppal, .5, {display: "block", opacity: 1});//show icones/bolinhas nav ppal
	tl_inicio.addDelay(2);
	//tl_inicio.to(icon_nav_ppal, .5, {opacity: 1});//show icon nav ppal


	tl_inicio.addLabel('section22');
	tl_inicio.addDelay(1);
	tl_inicio.to(comum, .5, {display: "block", top: "220px", left: "5px",
		onStart:function(){
			current_section = "section22";
			set_bolinhas_navPpal(2);//ativamos a segunda bolinha do nav ppal
			$("#icon_nav_ppal").attr("src", "images/icon_nav_2.png");//troca icono nav ppal
		}
	});
	tl_inicio.to(aditivada, .5, {top: "220px", left: "238px"}, "-=.3");
	tl_inicio.to(premium, .5, {top: "220px", left: "470px"}, "-=.5");
	tl_inicio.to(vpower, .5, {top: "220px", left: "700px",
		onStart:function(){
			//$("#gasolina_verde").show();
			$("#gasolina_vermelha").hide();
		}
	}, "-=.7");
	tl_inicio.addDelay(5);
	tl_inicio.to(bola_vermelha_section21, 1, {display: "none", opacity: 0}, "-=.5");//hide bola vermelha
	tl_inicio.to($(".txt_gasolinas"), .5, {display: "block", opacity: 1});//show txts gasolinas
	tl_inicio.to($(".btns_gasolinas"), .5, {display: "block", opacity: 1,
		onComplete:function(){
			status_painel = 1;
		}
	});//show botoes mais
	tl_inicio.to($(".bandinha_gasolinas"), .5, {display: "block", opacity: 1});//show bandinhas gasolinas
	tl_inicio.to($("#legenda_pe"), .5, {display: "block", opacity: 1});//show bandinhas gasolinas

	tl_inicio.addLabel('section23');
	tl_inicio.addDelay(1);
	tl_inicio.to($(".txt_gasolinas"), .5, {display: "none", opacity: 0});
	tl_inicio.to($(".imgs_gasolinas"), .5, {display: "none", opacity: 0});
	tl_inicio.to($(".btns_gasolinas"), .5, {display: "none", opacity: 0});
	tl_inicio.to($(".bandinha_gasolinas"), .5, {display: "none", opacity: 0});//hide bandinhas gasolinas
	tl_inicio.to(section23, .5, {display: "block", opacity: 1});






////////////////////////////////////////////////////////////
	tl_inicio.addPause("section1");
	tl_inicio.addPause("section2");
	//tl_inicio.addPause("section22");
	tl_inicio.addPause("section23");
	//tl_inicio.play("section21");
	//tl_inicio.timeScale(2);
////////////////////////////////////////////////////////////





	$("#btn_comecar").click(function(){
		tl_inicio.play('section2' + 1);
	})

	$(".btns_gasolinas").click(function(evt){
		 evt.stopPropagation();
		//se o painel estiver ativo (status_painel == 1)
		//ativo o detalhe (status_painel == 2).
		if(status_painel == 1){
			status_painel = 2;
		//se o detalhe estiver ativo, volto para o painel (status_painel == 1).
		}else if(status_painel == 2){
			status_painel = 1;
		}

		gasolina_selected = $(this).parent().attr("id");
		//admin de painel gasolinas, passamos gasolina selecionada (no id)
		manage_gasolinas(gasolina_selected);
	});

	$("#imgs_gasolinas>div").click(function(evt){
		if (status_painel == 0){ return; }

		//se o painel estiver ativo (status_painel == 1)
		//ativo o detalhe (status_painel == 2).
		if(status_painel == 1){
			status_painel = 2;
		//se o detalhe estiver ativo, volto para o painel (status_painel == 1).
		}else if(status_painel == 2){
			status_painel = 1;
		}

		gasolina_selected = $(this).attr("id");
		//admin de painel gasolinas, passamos gasolina selecionada (no id)
		manage_gasolinas(gasolina_selected);

	});

	//administro pop-up
	$(".detalhe_img_ampliar").click(function(){
		show_pop_up(gasolina_selected);
	});
	$("#pop_up #btn_fechar").click(function(){
		hide_pop_up();
	});
	$("#pop_up #btn_next").click(function(){
		manage_popup("next");
	});
	$("#pop_up #btn_prev").click(function(){
		manage_popup("prev");
	});
	//fecho section23 VPOWER
	$("#section23_vpower #btn_fechar").click(function(){
		//se o painel estiver ativo (status_painel == 1)
		//ativo o detalhe (status_painel == 2).
		if(status_painel == 1){
			status_painel = 2;
		//se o detalhe estiver ativo, volto para o painel (status_painel == 1).
		}else if(status_painel == 2){
			status_painel = 1;
		}
		manage_gasolinas("vpower");
	})

	//btns ampliar destaques vpower
	$("#section23_vpower .btns_ampliar").click(function(){
		var destaque_to_show = $(this).attr("id").split("btn_ampliar_")[1];
		manage_destaque_vpower(destaque_to_show);
	})
	//btn fechar destaque vpower
	$('#section23_vpower img[src="images/icon_fechar_destaqueVpower.png"]').click(function(){//botão que fecha os DESTAQUES do VPOWER
		manage_destaque_vpower("");
	});

	$("#section3 #btn_reiniciar").click(function(){
		restart();
	});

		///navegador inferior
	$(".bolinhas_nav_ppal").click(function(evt){
		var bolinha_clicked = $(this).attr("id");
		switch(bolinha_clicked){
			case ("bolinha_nav_ppal1"):
				status_painel = 0;
				hide_painel();
				hide_detalhe();
				tl_inicio.play('section21');
				break;
			case ("bolinha_nav_ppal2"):
				status_painel = 1;
				manage_gasolinas("");
				break;
			/*case ("bolinha_nav_ppal3"):
				status_painel = 2;
				manage_gasolinas("vpower");
				break;*/
			default:
				break;
		}
	}).mouseover(function(evt){//aparece o icone
		switch($(this).attr("id")){
			case ("bolinha_nav_ppal1"):
				$("#icon_nav_ppal").attr("src", "images/icon_nav_1.png").css("opacity", 1);//troca icono nav ppal
				break;
			case ("bolinha_nav_ppal2"):
				$("#icon_nav_ppal").attr("src", "images/icon_nav_2.png").css("opacity", 1);//troca icono nav ppal
				break;
			case ("bolinha_nav_ppal3"):
				$("#icon_nav_ppal").attr("src", "images/icon_nav_3.png").css("opacity", 1);//troca icono nav ppal
				break;
			default:
				break;
		}
	}).mouseout(function(evt){//some o icone
		$("#icon_nav_ppal").css("opacity", 0);
	});
});//fim onload











function manage_gasolinas(gasolina_selected){

	if (status_painel == 0){
		hide_painel();
		hide_detalhe();
		return;
	//caso 1 - estou mostrando o painel e preciso mostrar o detalhe da gasolina
	}else if (status_painel == 1){
		//hide_inicio_bola_vermelha();
		build_painel();
		hide_detalhe();
	}else if (status_painel == 2){ // caso 2 - estou no detalhe e preciso reconstruir o painel das 4 gasolinas
		hide_detalhe();
		hide_painel(gasolina_selected);
		build_detalhe(gasolina_selected);
	}
}



////////////////////////////////////////////////////////
//// INICIO /////////////////


/*function hide_inicio_bola_vermelha(){
	tl_inicio.to(bola_vermelha_section21, .1, {display: "none", opacity: 0});//hide bola vermelha novamente, se é o caso de o cara vier do passo 2
}*/






////////////////////////////////////////////////////////
//// PAINEL /////////////////

function build_painel(gasolina_selected){

	tl_inicio.stop();

	$("#section22").show();
	$("#bola_vermelha_section21").hide();//hide bola vermelha novamente, se é o caso de o cara vier do passo 2
	$("#gasolina_vermelha").fadeOut();

	hide_detalhe();//zera tudo detalhe

	if (arr_gasolinas_visitadas.length >= 5 && vpower_ativo){
		show_fechamento();
		return;
	}
	//gasolina_temp = gasolina_selected;

	$("#cabezalho_comum").show();//cabezalho hide
	//manage nav ppal styles

	$("#icon_nav_ppal").attr("src", "images/icon_nav_2.png");//troca icono nav ppal
	set_bolinhas_navPpal(2);//segunda bolinha ligada
	$(".bolinhas_nav_ppal").removeClass("detalhe_vpower");//vpower tem as bolinhas diferentes

	//switch botoes mais
	$(".btns_gasolinas").hide()
	.each(function(i, obj){
		if ($(this).parent().attr("id") == "vpower"){
			$(this).attr("src", "images/icon_shellVPower.png")
		}else{
			$(this).attr("src", "images/icon_mais.png")
		}
	})
	.delay( 800 )
	.fadeIn( 400 );

	$("#cabezalho_comum h3").removeClass("branco");//cabezalho h3 vermelho
	TweenLite.to(section23, .5, {display: "none", opacity: 0});//desligamos detalhe
	manage_destaque_vpower("");//hide bola text vpower

	TweenLite.to(section23_vpower, .5, {display: "none", opacity: 0,
		onComplete:function(){
			build_painel_gasolinas(gasolina_selected);
		}
	});//desligamos detalhe vpower

}


function build_painel_gasolinas(gasolina_selected){

	var pos_gasolinas = {};
	pos_gasolinas.comum 		= "5px";
	pos_gasolinas.aditivada 	= "238px";
	pos_gasolinas.premium 		= "470px";
	pos_gasolinas.vpower 		= "700px";


	if (vpower_ativo){//se viermos do vpower
		for (var gasolina in pos_gasolinas){
			$("#" + gasolina).css({
				"display":"block",
				"left":pos_gasolinas[gasolina],
				"top": "220px"
			}).show();
			TweenLite.to($(".txt_gasolinas"), .5, {display: "block", opacity: 1}, "+=1");
			$(".bandinha_gasolinas_on").hide();//hide bandinhas on
			$(".bandinha_gasolinas").show();//show  bandinhas
		}
	}else{
		TweenLite.to($("#" + gasolina_selected), .5, {display: "block", top: "220px", left: pos_gasolinas[gasolina_selected],
			onComplete:function(){
				for (var gasolina in pos_gasolinas){
					if (gasolina != gasolina_selected){
						TweenLite.to($("#" + gasolina), .5, {display: "block", top: "220px", left: pos_gasolinas[gasolina]});
					}
				}
				TweenLite.to($(".txt_gasolinas"), .5, {display: "block", opacity: 1}, "+=1");
				$(".bandinha_gasolinas_on").hide();//hide bandinhas on
				$(".bandinha_gasolinas").show();//show  bandinhas
			}
		});
	}

	$("#legenda_pe").show();
	
	gasolina_selected = "";
	vpower_ativo = false;
}


           /////////////////////////////////
////////////////////////////////////////////
////////////////////////////////////////////
////////////////////////////////////////////
           /////////////////////////////////



function hide_painel(gasolina_selected){

	
	tl_inicio.stop();

	//começa transição para o detalhe
	$(".txt_gasolinas").hide();//hide os 4 textos das gasolinas
	$(".bandinha_gasolinas, .bandinha_gasolinas_on").hide();//hide bandinhas

		//oculto el resto de las gasolinas
	if (gasolina_selected != ""){
		$(".btns_gasolinas").each(function( index ) {
	  		if (gasolina_selected != $( this ).parent().attr("id") || gasolina_selected == "vpower"){
	  			$(this).parent().hide();//hide gasolinas no painel
	  		}
		});
	}else{
		$("#imgs_gasolinas div").hide();
	}

	//caso a animação esteja rolando ainda, paro ela e oculto
	$("#bola_vermelha_section21").hide();
/*	$("#section21").hide();
	$("#section22").hide();*/
}













////////////////////////////////////////////////////////
//// DETALHES /////////////////

function build_detalhe(gasolina_selected){


	hide_painel(gasolina_selected);

	//switch botao mais
	$(".btns_gasolinas").hide()
	.attr("src", "images/icon_menos.png")
	.delay(800)
	.fadeIn(400, function(){
		$(".bandinha_gasolinas_on").show();//show  bandinha
	});

	TweenLite.to($("#" + gasolina_selected), .5, {top:"220px", left:"5px",
		onComplete:function(){
			build_detalhe_txts();		
		}
	});
	//fim transição para o detalhe

	function build_detalhe_txts(){
		//seleciono o conteúdo do detalhe das gasolinas
		var obj_content_gasolina_selected = {};
		switch (gasolina_selected){
			case "comum":
				obj_content_gasolina_selected = detalhe_comum;
				break;
			case "aditivada":
				obj_content_gasolina_selected = detalhe_aditivada;
				break;
			case "premium":
				obj_content_gasolina_selected = detalhe_premium;
				break;
			case "vpower":
				obj_content_gasolina_selected = detalhe_vpower;
				break;
			default:
				break;
		}

		//construção da tela de cada gasolina
		if (gasolina_selected == "vpower"){//se a gasolina selecionada é vpower, tela vermelha
			build_detalhe_vpower();
		}else{
			$("#detalhe_txt_gasolina_titulo").html(obj_content_gasolina_selected.detalhe_txt_gasolina_titulo).css("left", obj_content_gasolina_selected.titulo_left);
			$("#detalhe_txt_gasolina").html(obj_content_gasolina_selected.detalhe_txt_gasolina).css("left", obj_content_gasolina_selected.text_left);
			$("#detalhe_img_cabezalho").attr("src", "images/" + obj_content_gasolina_selected.detalhe_img_cabezalho);
			$("#detalhe_img_ampliar").show();
			$("#ul_formulacao").html(obj_content_gasolina_selected.ul_formulacao);
			$("#ul_entrega").html(obj_content_gasolina_selected.ul_entrega);

			TweenLite.to(section23, .5, {display: "block", opacity: 1});
		}
	}

	function build_detalhe_vpower(){

		vpower_ativo = true;

		$(".detalhe_img_ampliar").hide();//oculto (por enquanto) o btn octanas
		$("#cabezalho_comum h3").addClass("branco");//cabezalho h3 branco
		$("#cabezalho_comum").hide();//cabezalho hide
		$("#legenda_pe").hide();//hide legenda pe

		$("#icons_nav_ppal").hide();
		$("#icon_nav_ppal").attr("src", "images/icon_nav_3.png");//troca icono nav ppal
		$(".bolinhas_nav_ppal").addClass("detalhe_vpower");
		set_bolinhas_navPpal(3);//terceira bolinha ligada
			//manage nav ppal styles

		tl_vpower.to(section23_vpower, .5, {display: "block", opacity: 1});
		tl_vpower.to($("#icon_shellVpower"), 1, {display: "block", opacity: 1});
		tl_vpower.to($("#icon_shellVpower"), .5, {display: "none", opacity: 0});
		tl_vpower.to($("#img_gasolina_vpower"), 1, {display: "block", opacity: 1});
		tl_vpower.to($("#titulo_vpower"), 1, {display: "block", opacity: 1});
		tl_vpower.to($("#txt_description"), 2, {display: "block", opacity: 1});
		tl_vpower.to($("#txt_description2"), .2, {display: "block", opacity: 1});
		//tl_vpower.addDelay(1);
		tl_vpower.to($(".btns_ampliar"), .5, {display: "block", opacity: 1});
		tl_vpower.to($("#section23_vpower #btn_fechar"), .5, {display: "block", opacity: 1}, "-=1.5");
		//tl_vpower.addDelay(1);
		tl_vpower.to($("#cabezalho_comum"), .5, {display: "block", opacity: 1});
		tl_vpower.to($("#icons_nav_ppal"), .5, {display: "block", opacity: 1}, "-=.5");
		tl_vpower.to($(".detalhe_img_ampliar"), .5, {display: "block", opacity: 1});
	}

	////COUNTER GASOLINAS VISITADAS
	///acrecento a gasolina visitada no array arr_gasolinas_visitadas
	var gasolina_ja_visitada = false;
	for (var i=0; i < arr_gasolinas_visitadas.length; i++){
		if (gasolina_selected == arr_gasolinas_visitadas[i]){
			gasolina_ja_visitada = true;
			i = arr_gasolinas_visitadas.length;
		}
	}
	if (!gasolina_ja_visitada){//se a gasolina não foi visitada ainda
		arr_gasolinas_visitadas.push(gasolina_selected);
	}
}

//manage dos circulos de destaque de detalhe vpower
function manage_destaque_vpower(destaque_to_show){
	$(".destaque_vpower").css({
		"display": "none",
		"opacity": 0
	});
	var prefix_destaque = "destaque_vpower_";
	if(destaque_to_show != ""){
		TweenLite.to($("#" + prefix_destaque + destaque_to_show), 1, {display: "block", opacity: 1});
		//$("#" + prefix_destaque + destaque_to_show).show("slow");
	}
}

function hide_detalhe(){
	$(".bandinha_gasolinas_on").hide();
	TweenLite.to(section23, .5, {display: "none", opacity: 0});//desligamos detalhe
	hide_detalhe_vpower();
}

function hide_detalhe_vpower(){
	tl_vpower.to(section23_vpower, .1, {display: "none", opacity: 0});
	tl_vpower.to($("#icon_shellVpower"), .1, {display: "none", opacity: 0});
	tl_vpower.to($("#img_gasolina_vpower"), .1, {display: "none", opacity: 0});
	tl_vpower.to($("#titulo_vpower"), .1, {display: "none", opacity: 0});
	tl_vpower.to($("#txt_description"), .1, {display: "none", opacity: 0});
	tl_vpower.to($("#txt_description2"), .1, {display: "none", opacity: 0});
	//tl_vpower.to($("#cabezalho_comum"), .1, {display: "none", opacity: 0});
	//tl_vpower.to($(".detalhe_img_ampliar"), .1, {display: "none", opacity: 0});
	tl_vpower.to($("#section23_vpower #btn_fechar"), .1, {display: "none", opacity: 0});
	tl_vpower.to($(".btns_ampliar"), .1, {display: "none", opacity: 1});
}




////////////////////////////////////////////////////////
//// OCTANAS /////////////////


function show_pop_up(){
	$("#icons_nav_ppal").hide();
	$("section#section23_vpower div.detalhe_img_ampliar").hide();

	$("#pop_up_wrapper_geral").fadeIn();
	timer_sprite = setTimeout(function(){
		start_sprite_animation("sprite1");
	}, 300);
}

function hide_pop_up(){
	$("#icons_nav_ppal").show();
	$("section#section23_vpower div.detalhe_img_ampliar").show();

	$("#pop_up_wrapper_geral").fadeOut("fast", function(){
		reset_pop_up();
	});
}

function reset_pop_up(){
	reset_sprite_animations();
	$(".pop_ups").hide();
	$("#pop_up1").show().css({"left" : "0px", "opacity" : 1});
	current_popup = 1;
	manage_bolinhas_pop_up()
}

function manage_popup(direction){


	var pos_central 			= "5px";
	var pos_in 					= "1000px";
	var pos_out 				= "-500px";

	if (direction == "prev"){
		var pos_in 				= "-500px";
		var pos_out 			= "1000px";
	}


	var obj_current_popup = "pop_up" + current_popup;
	TweenLite.fromTo($("#pop_up" + current_popup), .5,  {display: "block", opacity: 1, left: pos_central}, {display: "none", opacity: 0, left: pos_out});
	//atualizo o pop up
	if (direction == "next"){
		if (current_popup == 3){
			hide_pop_up();
			return;
		}else{
			++current_popup;
		}
		//current_popup = current_popup>2?1:++current_popup;
	}else{
		current_popup = current_popup<2?3:--current_popup;
	}

	TweenLite.fromTo($("#pop_up" + current_popup), .5, {display: "none", opacity: 0, left: pos_in}, {display: "block", opacity: 1, left: pos_central});

	var which_sprite = "sprite" + current_popup;
	var total_frames = 0;
	
	switch(current_popup){
		case 1:
			total_frames = 43;
			break;
		case 2:
			total_frames = 24;
			break;
		case 3:
			total_frames = 55;
			break;
		default:
			total_frames = 0;
			break;
	}

	clearTimeout(timer_sprite);
	$(".sprite").css("background-position", 0);

	timer_sprite = setTimeout(function(){
		start_sprite_animation(which_sprite);
	}, 300);

	manage_bolinhas_pop_up();

	if (current_popup == 3){
		var gasolina_ja_visitada = false;
		for (var i=0; i < arr_gasolinas_visitadas.length; i++){
			if (arr_gasolinas_visitadas[i] == "octanas"){
				gasolina_ja_visitada = true;
				i = arr_gasolinas_visitadas.length;
			}
		}
		if (!gasolina_ja_visitada){
			arr_gasolinas_visitadas.push("octanas");
		}
	}
}


function set_bolinhas_navPpal(bolinha_selected){
	if(bolinha_selected != 3){
		$(".bolinhas_nav_ppal").removeClass("detalhe_vpower");
	}
	$(".bolinhas_nav_ppal").removeClass("selected");
	$("#bolinha_nav_ppal" + bolinha_selected).addClass("selected");
}

function manage_bolinhas_pop_up(){
	$(".bolinhas_nav_popup").removeClass("selected");
	$("#bolinha_nav_popup" + current_popup).addClass("selected");
}


function play_video_inicial() {

	if (mobile){
		$("#video_gif").attr('src', 'images/videos/fundo.gif');
	}else{
   		var video = document.getElementById("video_main");
   		video.currentTime = 0;
    	video.play();
	}
}

function show_fechamento(){
	arr_gasolinas_visitadas = [];
	$("#section2").hide();
	$("#icons_nav_ppal").hide();
	$("#cabezalho_comum").hide();
	$("#section3").fadeIn("slow");
}

function restart(){
	//document.getElementById("video_main").currentTime = 0;
	$("#section1, #section2, #section23, #section23_vpower, #section3").hide();
	$("#cabezalho_comum h3").removeClass("branco");
	$("#icon_nav_ppal").attr("src", "images/icon_nav_1.png");//troca icono nav ppal
	$(".bolinhas_nav_ppal").removeClass("detalhe_vpower");//vpower tem as bolinhas
	$(".btns_gasolinas").each(function(i, obj){
		if ($(this).parent().attr("id") == "vpower"){
			$(this).attr("src", "images/icon_shellVPower.png")
		}else{
			$(this).attr("src", "images/icon_mais.png")
		}
	});
	status_painel = 0;

	tl_inicio.play("section1_pos");
}