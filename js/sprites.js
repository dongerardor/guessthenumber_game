var frame_width   = 600,
    frame_height  = 462,
    motor_time_interval = 200,
    circles_time_interval = 400,
    time_timeout,//timeout
    cursor_sprite  = 0,
    sprite_timer,
    sprite_ativo;

//defino os objetos dos sprites
var sprite1 = [
  { nome: "sprite1", pos: 0, img_name: "images/videos/motor_in.png", length: 31, fps: motor_time_interval },
  { nome: "sprite1", pos: 1, img_name: "images/videos/sprite_octanas1.png", length: 12, fps: circles_time_interval }
];
var sprite2 = [
  { nome: "sprite2", pos: 0, img_name: "images/videos/sprite_octanas2.png", length: 24, fps: circles_time_interval }
];
var sprite3 = [
  { nome: "sprite3", pos: 0, img_name: "images/videos/sprite_octanas3.png", length: 23, fps: circles_time_interval },
  { nome: "sprite3", pos: 1, img_name: "images/videos/motor_out.png", length: 32, fps: motor_time_interval }
];

//var arr_sprites = [sprite1, sprite2, sprite3];

function start_sprite_animation(which_sprite){ 

  switch (which_sprite){
    case "sprite1":
      sprite_ativo = sprite1;
      break;
    case "sprite2":
      sprite_ativo = sprite2;
      break;
    case "sprite3":
      sprite_ativo = sprite3;
      break;
    default:
      break;
  }

  manage_sprite_animation(0);
}

function manage_sprite_animation(subsprite_executar){
  clearInterval(sprite_timer);
  clearTimeout(time_timeout);

  if (subsprite_executar >= sprite_ativo.length){
    time_timeout = setTimeout(
      function(){
        do_animation_sprite(sprite_ativo[0]);
      }
    , 4000);
  }else{
    do_animation_sprite(sprite_ativo[subsprite_executar]);
  }
}

function do_animation_sprite(obj_subsprite){
  var nome        = obj_subsprite.nome;
  var pos         = obj_subsprite.pos;
  var img_name    = obj_subsprite.img_name;
  var length      = obj_subsprite.length;
  var fps         = obj_subsprite.fps;
  var frame_counter = 0;//frame counter

  $("#" + nome).css("background-image", "url('" + img_name + "')"); 
  $(".sprite").css("background-position", 0);


  sprite_timer = setInterval(function(){

    var sprite_background_position = "-" + (frame_width * frame_counter) + "px";

    $("#" + nome).css("background-position", sprite_background_position);
    frame_counter++;
    if (frame_counter == length){
      
      clearInterval(sprite_timer);

      manage_sprite_animation(++pos);//restart next subsprite

    }
  }, fps);
}

function stop_animate_sprite() {
  clearInterval(sprite_timer);
  clearTimeout(time_timeout);
}

function reset_sprite_animations(){
  clearInterval(sprite_timer);
  clearTimeout(time_timeout);
  $(".sprite").css("background-position", 0);
}
















  //clearTimeout(time_timeout);
  //clearInterval(sprite_timer);
  //cursor_sprite = 0;
  //$(".sprite").css("background-position", 0); 
  
  //sprite_timer = setInterval(function(){
  //  animate_sprite(which_sprite, total_frames, speed)},
  //time_interval);
//}


/*var frame_width   = 600,
    frame_height  = 462,
    time_interval = 150,
    time_timeout,//timeout
    cursor_sprite  = 0,
    sprite_timer,//interval
    speed = 1;



function start_sprite_animation(which_sprite, total_frames){ 
  clearTimeout(time_timeout);
  clearInterval(sprite_timer);
  cursor_sprite = 0;
  $(".sprite").css("background-position", 0); 
  sprite_timer = setInterval(function(){
    animate_sprite(which_sprite, total_frames, speed)},
  time_interval);
}

function animate_sprite(which_sprite, total_frames){

  console.log(total_frames);

  cursor_sprite++;
  var sprite_background_position = "-" + (frame_width * cursor_sprite) + "px";
  $("#" + which_sprite).css("background-position", sprite_background_position);
  if (cursor_sprite == total_frames-1){
    cursor_sprite = 0;
    clearInterval(sprite_timer);
    time_timeout = setTimeout(function(){
      start_sprite_animation(which_sprite, total_frames)
    },4000);
    
    //stop_animate_sprite();
  }
}

function stop_animate_sprite() {
  clearInterval(sprite_timer);
}

function reset_sprite_animations(){
  clearInterval(sprite_timer);
  cursor_sprite  = 0;
  $(".sprite").css("background-position", 0);
}*/