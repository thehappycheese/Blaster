

var input = new (function(){
	
	EventDispatcher.call(this);
	
	this.target = window;
	
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
	
	
	
	this.buttonsDown = [false,false,false,false,false];
	
	this.mouseUp = (function(e){
		e.stopPropagation();
		this.dispatch("mouseup",e);
		this.keysDown[e.keyCode] = false;
	}).bind(this);
	
	this.mouseDown = (function(e){
		e.stopPropagation();
		this.dispatch("mousedown",e);
		if(e.button == 1 || e.button == 2){
			e.preventDefault();
		}
		this.keysDown[e.keyCode] = true;
	}).bind(this);
	
	this.isMouseDown = (function(kcode){
		return this.keysDown[kcode];
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
		this.target.addEventListener("contextmenu", this.preventContextMenu);
	}).bind(this);
	
	
	
	this.setTarget(window);
	
	
	
	this.leftButton = 0;
	this.middleButton = 1;
	this.rightButton = 2;
	
	this.w	= 87;
	this.a	= 65;
	this.s	= 83;
	this.d	= 68;
	this.space	= 32;
	this.enter	= 13;
	this.up		= 38;
	this.left	= 37;
	this.down	= 40;
	this.right	= 39;
	
})();