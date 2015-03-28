//init preload

var online = false;
switch(window.location.protocol) {
	case 'http:':
		online = true;
		break;
	case 'https:':
     	online = true;
		break;
    break;
   	case 'file:':
   		online = false;
    	break;
	default: 
    	break;
}


if (online){
	var jsonPreload = '';

	if (mobile){
		jsonPreload = 'js/files_mobile.json';
	}else{
		jsonPreload = 'js/files.json';
	}

	var loaderAnimation = $("#html5Loader").LoaderAnimation();

	$.html5Loader({
		filesToLoad: jsonPreload,
		mediaBufferSizeToPreload: .8,
		onComplete: function () {
			setTimeout(function(){
				tl_inicio.play();
			}, 500);
		},
		onElementLoaded: function ( obj, elm) {
			//console.log("element loaded");
			//console.log(obj);
			//console.log(elm);
			//console.log("---------");
		},
		onMediaError: function( obj, elm ){
			//console.log("onMediaError");
			//console.log(obj);
			//console.log(elm);
			//console.log("---------");
		},
		onUpdate: loaderAnimation.update
	});
}else{
	setTimeout(function(){
		tl_inicio.play();
	}, 1000);
}