"use strict";

var canvas = new Canvas("mainCanvas");

var player = new tPlayer();
var enemy = new tEnemy();
var platform = new tPlatform();

platform.cPosition.x = 100;
platform.cPosition.y = 100;

var platform2 = new tPlatform();

platform2.cPosition.x = 400;
platform2.cPosition.y = 300;
platform2.cPosition.r = -Math.PI/4;

var targets = [player, enemy, platform, platform2];

canvas.on("update",function(delta){
	for(var i = 0; i<targets.length; i++){
		targets[i].update();
		targets[i].cCollider.process();
	}
	//collide!
	
	
	
	
	var i;
	var j;
	var a;
	var b;
	
	var norms;
	
	for(i = 0; i<targets.length ; i++){
		for(j = i+1; j<targets.length ; j++){
			a = targets[i];
			b = targets[j];
			
			norms = a.pnorms.concat(b.pnorms);
			
			var n;
			for(z = 0; z< norms.length;z++){
				n = norms[z];
				
				
				// project all points of 'a' onto numberline and keep ref to max and min;
			
			}
		}
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
});

canvas.on("draw",function(ctx){
	canvas.ctx.clearRect(0, 0, canvas.canvas.width, canvas.canvas.height);
	for(var i = 0; i<targets.length; i++){
		targets[i].draw();
	}
});

canvas.on("resize",function(e){
	player.cContainer.w = e.w-10;
	player.cContainer.h = e.h-10;
});