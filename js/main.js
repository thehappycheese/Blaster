"use strict";

var canvas = new Canvas("mainCanvas");

var tm = new TargetManager();

var player = new tPlayer();

tm.addTarget(player);
tm.addTarget(makePlatformRect(0,400,600,30));
tm.addTarget(makePlatformRect(0,0,30,500));
tm.addTarget(makePlatformRamp(200,410,200,60));




function makePlatformRect(x,y,w,h){
	// makes a patform with topl left registation like it was a ctx.drawRect() call
	var result = new tPlatform()
	
	result.cPosition.x = x;
	result.cPosition.y = y;
	
	result.cCollider.points = [
		{x:0,y:0},
		{x:w,y:0},
		{x:w,y:h},
		{x:0,y:h}
	];
	result.cCollider.bake();
	
	return result;
}

function makePlatformRamp(x,y,w,h){
	// makes a patform with topl left registation like it was a ctx.drawRect() call
	var result = new tPlatform()
	
	result.cPosition.x = x;
	result.cPosition.y = y;
	
	result.cCollider.points = [
		{x:0,y:0},
		{x:w,y:-h},
		{x:w,y:0}
	];
	result.cCollider.bake();
	
	return result;
}



var cnt = 0;

function Clippy(){
	this.init = (function(){
		this.max = -Infinity;
		this.maxpoint = null;
		this.min = Infinity;
		this.minpoint = null;
	}).bind(this);
	this.init();
}

var ao = new Clippy();
var bo = new Clippy();

canvas.on("update",function(delta){
	if(canvas.isMouseDown(0)){
		cnt++;
		if(cnt>0){
			var temp = new tEnemy()
			tm.addTarget(temp);
			temp.cPosition.x = canvas.mouseX;
			temp.cPosition.y = canvas.mouseY;
			temp.cVelocity.x = 1
			temp.cVelocity.y = 1
			temp.cPosition.r = Math.random()*Math.PI;
			cnt=0;
		}
	}
	
	var i;
	
	for(i = 0; i<tm.targets.length; i++){
		tm.targets[i].update();
		tm.targets[i].cCollider.process();
	}

	var j;
	for(i = 0; i<tm.targets.length ; i++){
		for(j = i+1; j<tm.targets.length ; j++){
			pCollide(tm.targets[i].cCollider, tm.targets[j].cCollider);
		}
	}
});

canvas.on("draw",function(ctx){
	canvas.ctx.clearRect(0, 0, canvas.canvas.width, canvas.canvas.height);
	for(var i = 0; i<tm.targets.length; i++){
		tm.targets[i].draw();
	}
});

canvas.on("resize",function(e){
	
});