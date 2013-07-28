

function Canvas(acanvasID){
	"use strict";
	
	EventDispatcher.call(this);
	InputReciever.call(this, this.canvas);
	
	this.canvas = window.document.getElementById(acanvasID);
	this.canvas.tabIndex = 1;
	this.canvas.focus();
	
	this.ctx = this.canvas.getContext("2d");
	this.aspectRatio = 16/9;
	this.hasFocus = true;
	this.paused = false;
	
	
	
	
	
	this.currentTime = (new Date()).getTime();
	this.previousTime = this.currentTime;
	
	
	
	this.fillContainer = (function(){
		var container = this.canvas.parentNode;
		
		this.canvas.style.width = "0";
		this.canvas.style.height = "0";
		
		var contStyle = getComputedStyle(container);
		
		var aw = parseFloat(contStyle.width);
		var ah = parseFloat(contStyle.height);
		
		if(aw/this.aspectRatio > ah){
			// aw is used to get ah, the height would be too much too fit; use ah to get aw
			aw = ah*this.aspectRatio;
		}else{
			ah = aw/this.aspectRatio;
		}
		
		this.canvas.width = aw;
		this.canvas.height = ah;
		
		this.canvas.style.width = aw.toFixed(0)+"px";
		this.canvas.style.height = ah.toFixed(0)+"px";
		
		this.dispatch("resize",{w:aw,h:ah});
		
	}).bind(this);
	
	
	
	this.toggleFullscreen = (function(){
		var elem = this.canvas;
		if(window.document.webkitFullscreenElement === elem){
			window.document.webkitExitFullscreen();
		}else{
			elem.webkitRequestFullscreen()
			elem.webkitRequestPointerLock();
		}
	}).bind(this);
	
	
	
	this.animate = (function(){
		if(this.paused == false  &&  this.hasFocus == true){
			this.currentTime = (new Date()).getTime();
			var delta = (this.currentTime - this.previousTime)*(60/1000);
			
			if(delta > (1000/20)){
				delta = 20;
			}
			
			this.dispatch("update", delta);
			this.dispatch("draw", this.ctx);
			
			this.mouseDeltaX = 0;
			this.mouseDeltaY = 0;
			
			// Calculate the number of ms required to run the game loop:
			//this.msLoad = (new Date()).getTime() + this.currentTime;
			
			this.previousTime = this.currentTime;
		}
		window.requestAnimationFrame(this.animate);
	}).bind(this);
	
	
	
	
	// == EVENT LISTENERS ==
	
	this.canvas.addEventListener("blur",(function(e){
		if(this.hasFocus == true){
			this.dispatch("blur");
			this.hasFocus = false;
		}
	}).bind(this));
	
	
	
	this.canvas.addEventListener("focus",(function(e){
		if(this.hasFocus == false){
			this.dispatch("focus");
			this.hasFocus = true;
		}
	}).bind(this));
	
	
	
	this.canvas.addEventListener("keydown", (function(kEvent){
		if(kEvent.keyCode == 32 && kEvent.ctrlKey) this.toggleFullscreen();
	}).bind(this));
	
	
	
	window.addEventListener("resize", (function(){
		this.fillContainer();
	}).bind(this));
	
	
	
	// == INIT CALLS ==
	
	this.fillContainer();
	window.requestAnimationFrame(this.animate);
	//setInterval(this.animate,20);
}