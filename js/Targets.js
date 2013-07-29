
function TargetManager(){
	EventDispatcher.call(this);
	
	this.targets = [];
	
	this.addTarget = (function(nt){
		this.targets.push(nt);
	}).bind(this);
	
	this.removeTarget = (function(obj){
		for(var i = 0; i <this.targets.length;i++){
			if(this.targets[i] === obj){
				this.targets.splice(i, 1);
				break;
			}
		}
	}).bind(this);
	
	this.update = (function(){
		
	}).bind(this);
}

function Target(){
	this.update = function(){};
	this.manager = null;
	this.add = (function(a){
		this[a.constructor.name] = a;
		a.target = this;
	}).bind(this);
}



function tPlayer(){
	Target.call(this);
	this.air = true;
	
	this.add(new cPosition(6, 9, 0));
	this.add(new cVelocity(10, 10, 0));
	this.add(new cPhisics( 1, 0.95, 1));
	
	var temp = new cCollider();
	temp.points.push({x:-10,y:-10});
	temp.points.push({x: 10,y:-10});
	temp.points.push({x: 10,y: 10});
	temp.points.push({x:-10,y: 10});
	temp.bake();
	this.add(temp);
	
	
	this.update = (function(){
		this.userInput();
		this.cVelocity.run();
		this.cPhisics.run();
	}).bind(this);
	
	this.draw = (function(){
		this.cCollider.draw();
	}).bind(this);
	
	this.userInput = (function(){
		var velocity = this.cVelocity;
		var sped = 1;
		if(this.air==false){
			if(canvas.isKeyDown(KEYS.w) || canvas.isKeyDown(KEYS.up)){
				velocity.y -= 20*sped;
			}
			if(canvas.isKeyDown(KEYS.a) || canvas.isKeyDown(KEYS.left)){
				velocity.x -= sped;
			}
			if(canvas.isKeyDown(KEYS.s) || canvas.isKeyDown(KEYS.down)){
				velocity.y += sped;
			}
			if(canvas.isKeyDown(KEYS.d)  || canvas.isKeyDown(KEYS.right)){
				velocity.x += sped;
			}
		}
		this.air = true;
	}).bind(this);
	
	
}


function tEnemy(){
	Target.call(this);
	
	
	this.add(new cPosition(6, 9, 0));
	this.add(new cVelocity(10, 10, 0));
	this.add(new cPhisics( 1, 0.9999, 0.1));
	
	var temp = new cCollider();
	temp.points.push({x:-10,y:-4});
	temp.points.push({x: 10,y:-4});
	temp.points.push({x: 10,y: 4});
	temp.points.push({x:-10,y: 4});
	temp.bake();
	this.add(temp);
	
	
	this.update = (function(){
		this.cVelocity.run();
		this.cPhisics.run();
	}).bind(this);
	
	this.draw = (function(){
		this.cCollider.draw();
	}).bind(this);
	
}

function tPlatform(){
	Target.call(this);
	
	
	this.add(new cPosition(6, 9, 0));
	this.add(new cVelocity(0, 0, 0));
	var temp = new cCollider();
	temp.points.push({x:-50,y:-5});
	temp.points.push({x: 50,y:-5});
	temp.points.push({x: 50,y: 5});
	temp.points.push({x:-50,y: 5});
	temp.lock = true;
	temp.bake();
	this.add(temp);
	
	
	this.update = (function(){
		this.cVelocity.run();
	}).bind(this);
	
	this.draw = (function(){
		this.cCollider.draw();
	}).bind(this);
	
}