"use strict";

var canvas = new Canvas("mainCanvas");


function cPosition(ax, ay, ar){
	this.x = ax || 0;
	this.y = ay || 0;
	this.r = ar || 0;
	this.run = (function(){}).bind(this);
}

function cVelocity(ax, ay, ar){
	this.x = ax || 0;
	this.y = ay || 0;
	this.r = ar || 0;
	this.run = (function(){
		var position = this.target.cPosition;
		position.x += this.x;
		position.y += this.y;
		position.r += this.r;
	}).bind(this);
}

function cPhisics(amass, afriction, agravity){
	this.mass 		= amass		|| 0;
	this.friction 	= afriction	|| 0;
	this.gravity 	= agravity	|| 0;
	this.run = (function(){
		var velocity = this.target.cVelocity;
		velocity.y += this.gravity;
		
		velocity.x *= this.friction;
		velocity.y *= this.friction;
		velocity.r *= this.friction;
	}).bind(this);
}

function cView(aw,ah){
	this.img 		= null;
	this.animation 	= null;
	this.w 			= aw || 0;
	this.h 			= ah || 0;
	this.run = (function(){
		var position = this.target.cPosition;
		canvas.ctx.fillRect(position.x-this.w/2, position.y-this.h/2, this.w, this.h);
	}).bind(this);
}

function cContainer(ax,ay,aw,ah){
	this.x = ax;
	this.y = ay;
	this.w = aw;
	this.h = ah;
	this.friction = 0.8;
	this.air = true;
	this.run = (function(){
		this.air = true;
		var position 	= this.target.cPosition;
		var container 	= this.target.cContainer;
		var velocity 	= this.target.cVelocity;
		var touch = false;
		if(position.x>container.x+container.w){
			position.x = container.x+container.w;
			velocity.x *= -0.2;
			velocity.y *= container.friction;
			touch = true;
		}
		if(position.x<container.x){
			position.x = container.x;
			velocity.x *= -0.2;
			velocity.y *= container.friction;
			touch = true;
		}
		if(position.y > container.y+container.h){
			position.y = container.y+container.h;
			velocity.y *= -0.4;
			velocity.x *= container.friction;
			touch = true;
		}
		if(position.y < container.y){
			position.y = container.y;
			velocity.y *= -0.4;
			velocity.x *= container.friction;
			touch = true;
		}
		if(touch){
			this.air = false;
		}
	}).bind(this);
}

function cController (){
	this.air = false;
	this.run = (function(){
		var velocity = this.target.cVelocity;
		var container = this.target.cContainer;
		if(container == undefined || !container.air){
			if(input.isKeyDown(input.w) || input.isKeyDown(input.up)){
				velocity.y -= 5;
			}
			if(input.isKeyDown(input.a) || input.isKeyDown(input.left)){
				velocity.x -= 1;
			}
			if(input.isKeyDown(input.s) || input.isKeyDown(input.down)){
				velocity.y += 1;
			}
			if(input.isKeyDown(input.d)  || input.isKeyDown(input.right)){
				velocity.x += 1;
			}
		}
	}).bind(this);
}





function tPlayer(){
	this.exe = [];
	this.update = (function(){
		
	}).bind(this);
	this.add = (function(a){
		this[a.constructor.name] = a;
		a.target = this;
	}).bind(this);
	this.add(new cPosition(6, 9, 0));
	this.add(new cVelocity(10, 10, 0));
	this.add(new cPhisics( 1, 0.9999, 0.1));
	this.add(new cController());
	this.add(new cContainer(5, 5, canvas.canvas.width-10, canvas.canvas.height-10));
	this.add(new cView(10, 10));
}


var player = new tPlayer();




canvas.on("update",function(delta){
	player.cController.run();
	player.cContainer.run();
	player.cVelocity.run();
	player.cPhisics.run();
	
});

canvas.on("draw",function(ctx){
	canvas.ctx.clearRect(0, 0, canvas.canvas.width, canvas.canvas.height);
	player.cView.run();
});

canvas.on("resize",function(e){
	player.cContainer.w = e.w-10;
	player.cContainer.h = e.h-10;
	
});