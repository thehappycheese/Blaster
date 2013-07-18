"use strict";

var canvas = new Canvas("mainCanvas");















function pRender(position){
	console.log(this);
	console.log("rendering: ",position.x,position.y);
}
function pMove(position){
	
}
function cPosition(ax,ay){
	this.x = ax;
	this.y = ay;
}

function tPlayer(){
	this.position = new cPosition(6,9);
}




var ptm = new ProcessTargetManager();

ptm.addProcess(pRender, [cPosition]);
ptm.addProcess(pMove,   [cPosition]);

var player = new tPlayer();
ptm.addTarget(player);



canvas.on("update",function(delta){
	
});

canvas.on("draw",function(ctx){
	
});