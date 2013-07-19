"use strict";

var canvas = new Canvas("mainCanvas");















function pRender(position, view){
	canvas.ctx.fillRect(position.x-view.w/2, position.y-view.h/2, view.w, view.h);
}

function pMove(position, velocity, phisics){
	position.x += velocity.xs;
	position.y += velocity.ys;
	position.r += velocity.rs;
	
	velocity.ys += phisics.gravity;
	
	velocity.xs *= phisics.friction;
	velocity.ys *= phisics.friction;
	velocity.rs *= phisics.friction;
}

function pContain(position, velocity, container){
	if(position.x>
}

// TODO!#####################################
// ############################################

function cPosition(ax, ay, ar){
	this.x = ax || 0;
	this.y = ay || 0;
	this.r = ar || 0;
}

function cVelocity(axs, ays, ars){
	this.xs = axs || 0;
	this.ys = ays || 0;
	this.rs = ars || 0;
}

function cPhisics(amass, afriction, agravity){
	this.mass 		= amass		|| 0;
	this.friction 	= afriction	|| 0;
	this.gravity 	= agravity	|| 0;
}

function cView(aw,ah){
	this.img = null;
	this.animation = null;
	this.w = aw || 0;
	this.h = ah || 0;
}



function tPlayer(){
	this.position = new cPosition(6,9,0);
	this.velocity = new cVelocity(10,10,0);
	this.phisics = new cPhisics(1,0.95,1);
	this.view = new cView(10,10);
}




var ptm = new ProcessTargetManager();

ptm.addProcess(pRender, [cPosition, cView]);
ptm.addProcess(pMove,   [cPosition, cVelocity, cPhisics]);

var player = new tPlayer();
ptm.addTarget(player, [pRender, pMove]);



canvas.on("update",function(delta){
	ptm.execute(pMove)
});

canvas.on("draw",function(ctx){
	canvas.ctx.clearRect(0, 0, canvas.canvas.width, canvas.canvas.height);
	ptm.execute(pRender)
});