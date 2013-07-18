"use strict";

var canvas = new Canvas("mainCanvas");






var man = new ProcessTargetManager();

man.registerProcess(pRender);
man.registerComponents(cView, cPosition);


var player = new Player();
man.registerTarget(player);



canvas.on("update",function(delta){
	
});

canvas.on("draw",function(ctx){

});

