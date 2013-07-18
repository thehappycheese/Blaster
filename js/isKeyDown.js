

var __keysDown=[];
for(var i =0;i<128;i++){
	__keysDown.push(false);
}

function __kdown(e){
	__keysDown[e.keyCode]=true;
	//console.log(e.keyCode);
}

function __kup(e){
	__keysDown[e.keyCode]=false;
}

function isKeyDown(kcode){
	return __keysDown[kcode]==true;
}

window.addEventListener("keydown",__kdown);
window.addEventListener("keyup",__kup);






var __buttonsDown=[false,false,false,false];

function __mdown(e){
	__buttonsDown[e.button]=true;
}

function __mup(e){
	__buttonsDown[e.button]=false;
}

function isButtonDown(button){
	return __buttonsDown[button]==true;
}

window.addEventListener("mousedown",__mdown);
window.addEventListener("mouseup",__mup);