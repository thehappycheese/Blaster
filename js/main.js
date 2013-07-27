"use strict";

var canvas = new Canvas("mainCanvas");

var player = new tPlayer();
var enemy = new tEnemy();
var platform = new tPlatform();

platform.cPosition.x = 100;
platform.cPosition.y = 100;

var platform2 = new tPlatform();

platform2.cPosition.x = 200;
platform2.cPosition.y = 200;
platform2.cPosition.r = -Math.PI/4;
platform2.cVelocity.r = 0.01;

var targets = [player, platform, platform2];
var cnt = 0;
canvas.on("update",function(delta){
	if(canvas.isMouseDown(0)){
		cnt++;
		if(cnt>0){
			var temp = new tEnemy()
			targets.push(temp);
			temp.cPosition.x = canvas.mouseX;
			temp.cPosition.y = canvas.mouseY;
			temp.cVelocity.x = 1
			temp.cVelocity.y = 1
			temp.cPosition.r = Math.random()*Math.PI;
			cnt=0;
		}
	}
	for(var i = 0; i<targets.length; i++){
		targets[i].update();
		targets[i].cCollider.process();
	}
	//collide!
	
	var i;
	var j;
	var a;
	var b;
	
	var n;
	var z;
	var w;
	var norms;
	var val;
	var p1;
	var p2;
	
	for(i = 0; i<targets.length ; i++){
		for(j = i+1; j<targets.length ; j++){
			a = targets[i].cCollider;
			b = targets[j].cCollider;
			if(Math.distsqr(targets[i].cPosition, targets[j].cPosition)<60*60){
				continue;
			}
			
			norms = a.pnorms.concat(b.pnorms);
			
			var separated = false;
			var pen = {
				dir:null,
				mag:Infinity
			};
			
			for(z = 0; z< norms.length;z++){
				n = norms[z];
				
				
				// project all points of 'a' onto numberline
				// and keep ref to max and min points by index; 
				var ao = {
					max:-Infinity,
					maxpoint:null,
					min:Infinity,
					minpoint:null,
				}
				var bo = {
					max:-Infinity,
					maxpoint:null,
					min:Infinity,
					minpoint:null,
				}
				
				for(w=0;w<a.ppoints.length;w++){
					val = Math.dot(a.ppoints[w], n);
					if(val<ao.min){
						ao.min = val;
						ao.minpoint = w;
					}
					if(val>ao.max){
						ao.max = val;
						ao.maxpoint = w;
					}
				}
				for(w=0;w<b.ppoints.length;w++){
					val = Math.dot(b.ppoints[w], n);
					if(val<bo.min){
						bo.min = val;
						bo.minpoint = w;
					}
					if(val>bo.max){
						bo.max = val;
						bo.maxpoint = w;
					}
				}
				// Determine if a collision has occured;
				ao.w = ao.max - ao.min;
				bo.w = bo.max - bo.min;
				
				if(Math.max(bo.max-ao.min, ao.max-bo.min)>(ao.w+bo.w)){
					separated = true;
					break;
				}else{
					// calculate min penetration
					
					//    [----a----]
					//         [----b---]
					//         [-p1-]
					p1 =  ao.max - bo.min;
					
					//          [----a----]
					//      [----b---]
					//          [-p2-]
					p2 =  bo.max - ao.min;
					
					if(p1<p2){
						if(Math.abs(p1)<Math.abs(pen.mag)){
							pen.mag = -p1;
							pen.dir = n;
						}
					}else{
						if(Math.abs(p2)<Math.abs(pen.mag)){
							pen.mag = p2;
							pen.dir = n;
						}
					}
				}
				
			}
			
			if(!separated){
				// deal with collision! :D
				var mul = 0.5;
				if(a.lock || b.lock){
					mul = 1;
				}
				
				if(!a.lock){
					a.target.cPosition.x += pen.dir.x * pen.mag * mul;
					a.target.cPosition.y += pen.dir.y * pen.mag * mul;
					a.target.cContainer.air = false;
					if(a.target.cVelocity){
						a.target.cVelocity.x += pen.dir.x * pen.mag * mul;
						a.target.cVelocity.y += pen.dir.y * pen.mag * mul;
					}
				}
				if(!b.lock){
					b.target.cPosition.x -= pen.dir.x * pen.mag * mul;
					b.target.cPosition.y -= pen.dir.y * pen.mag * mul;
					b.target.cContainer.air = false;
					if(b.target.cVelocity){
						b.target.cVelocity.x -= pen.dir.x * pen.mag * mul;
						b.target.cVelocity.y -= pen.dir.y * pen.mag * mul;
					}
				}
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