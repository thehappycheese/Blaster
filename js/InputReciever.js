

function InputReciever (atarget){
	
	EventDispatcher.call(this);
	
	this.target = atarget || window;
	
	this.keysDown = [];
	for(var i =0;i<128;i++){this.keysDown.push(false);}
	
	
	this.keyUp = (function(e){
		e.stopPropagation();
		this.dispatch("keyup",e);
		this.keysDown[e.keyCode] = false;
	}).bind(this);
	
	this.keyDown = (function(e){
		e.stopPropagation();
		if(this.keysDown[e.keyCode] == false){
			this.dispatch("keydown",e);
		}
		this.keysDown[e.keyCode] = true;
	}).bind(this);
	
	this.isKeyDown = (function(kcode){
		return this.keysDown[kcode];
	}).bind(this);
	
	
	
	// ========= MOUSE ================
	
	this.mouseX = 0;
	this.mouseY = 0;
	this.mouseDeltaX = 0;
	this.mouseDeltaY = 0;
	
	this.buttonsDown = [false,false,false,false,false];
	
	this.mouseUp = (function(e){
		e.stopPropagation();
		this.dispatch("mouseup",e);
		this.buttonsDown[e.button] = false;
	}).bind(this);
	
	this.mouseDown = (function(e){
		e.stopPropagation();
		this.dispatch("mousedown",e);
		if(e.button == 1 || e.button == 2){
			e.preventDefault();
		}
		this.buttonsDown[e.button] = true;
	}).bind(this);
	
	this.mouseMove = (function(e){
		this.mouseX = event.offsetX;
		this.mouseY = event.offsetY;
		this.mouseDeltaX += event.webkitMovementX;
		this.mouseDeltaY += event.webkitMovementY;
	}).bind(this);
	
	this.isMouseDown = (function(mcode){
		return this.buttonsDown[mcode];
	}).bind(this);
	
	this.preventContextMenu = (function(e){
		e.preventDefault();
	}).bind(this);
	
	
	
	this.removeTarget = (function(){
		if(this.target!=null){
			this.target.removeEventListener("keyup",   this.keyUp);
			this.target.removeEventListener("keydown", this.keyDown);
			this.target.removeEventListener("mouseup",   this.mouseUp);
			this.target.removeEventListener("mousedown", this.mouseDown);
			this.target.removeEventListener("mousemove", this.mouseMove);
			this.target.removeEventListener("contextmenu", this.preventContextMenu);
			this.target = null;
		}
	}).bind(this);
	
	
	
	this.setTarget = (function(t){
		this.removeTarget(this.target);
		this.target = t;
		this.target.addEventListener("keyup",   this.keyUp);
		this.target.addEventListener("keydown", this.keyDown);
		this.target.addEventListener("mouseup",   this.mouseUp);
		this.target.addEventListener("mousedown", this.mouseDown);
		this.target.addEventListener("mousemove", this.mouseMove);
		this.target.addEventListener("contextmenu", this.preventContextMenu);
	}).bind(this);
	
	
	
	this.setTarget(window);
	
	
	
	this.leftButton = 0;
	this.middleButton = 1;
	this.rightButton = 2;
	
	
}

var KEYS = {

	w		: 87,
	a		: 65,
	s		: 83,
	d		: 68,
	space	: 32,
	enter	: 13,
	up		: 38,
	left	: 37,
	down	: 40,
	right	: 39
}