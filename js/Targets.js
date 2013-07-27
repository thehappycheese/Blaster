
function Target(){
	this.update = function(){};
	this.add = (function(a){
		this[a.constructor.name] = a;
		a.target = this;
	}).bind(this);
}



function tPlayer(){
	Target.call(this);
	
	this.update = (function(){
		this.cController.run();
		this.cContainer.run();
		this.cVelocity.run();
		this.cPhisics.run();
	}).bind(this);
	
	this.draw = (function(){
		this.cView.run();
		this.cCollider.draw();
	}).bind(this);
	
	
	this.add(new cPosition(6, 9, 0));
	this.add(new cVelocity(10, 10, 0));
	this.add(new cPhisics( 1, 0.9999, 0.1));
	
	var temp = new cCollider();
	temp.points.push({x:-5,y:-5});
	temp.points.push({x: 5,y:-5});
	temp.points.push({x: 5,y: 5});
	temp.points.push({x:-5,y: 5});
	temp.bake();
	this.add(temp);
	
	this.add(new cController());
	this.add(new cContainer(5, 5, canvas.canvas.width-10, canvas.canvas.height-10));
	this.add(new cView(10, 10, "red"));
}


function tEnemy(){
	Target.call(this);
	this.update = (function(){
		this.cContainer.run();
		this.cVelocity.run();
		this.cPhisics.run();
	}).bind(this);
	
	this.draw = (function(){
		this.cView.run();
		this.cCollider.draw();
	}).bind(this);
	
	this.add(new cPosition(6, 9, 0));
	this.add(new cVelocity(10, 10, 0));
	this.add(new cPhisics( 1, 0.9999, 0.1));
	
	var temp = new cCollider();
	temp.points.push({x:-8,y:-3});
	temp.points.push({x: 8,y:-3});
	temp.points.push({x: 8,y: 3});
	temp.points.push({x:-8,y: 3});
	temp.bake();
	this.add(temp);
	
	this.add(new cContainer(5, 5, canvas.canvas.width-10, canvas.canvas.height-10));
	this.add(new cView(5, 5, "black"));
}

function tPlatform(){
	Target.call(this);
	this.update = (function(){
		this.cVelocity.run();
	}).bind(this);
	
	this.draw = (function(){
		this.cView.run();
		this.cCollider.draw();
	}).bind(this);
	
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
	this.add(new cView(100, 10, "green"));
}