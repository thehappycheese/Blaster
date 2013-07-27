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

function cController(){
	this.air = false;
	this.run = (function(){
		var velocity = this.target.cVelocity;
		var container = this.target.cContainer;
		var sped = 1;
		if(container.air == true){
			sped = 0.05
		}else{
			if(canvas.isKeyDown(KEYS.w) || canvas.isKeyDown(KEYS.up)){
				velocity.y -= 5*sped;
			}
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

	}).bind(this);

}

function cCollider(){
	// clockwise points
	
	this.points = [];
	this.norms = [];
	
	this.ppoints = [];
	this.pnorms  = [];
	
	this.lock = false;
	
	this.draw = (function(){
		
		
		var temp = this.ppoints[0];
		// GLOBAL REF
		canvas.ctx.beginPath();
		canvas.ctx.strokeStyle = "cyan";
		canvas.ctx.moveTo(temp.x,temp.y);
		
		for(var i = 1;i<=this.ppoints.length;i++){
			temp = this.ppoints[Math.loopover(i, 0, this.ppoints.length)];
			canvas.ctx.lineTo(temp.x,temp.y);
		}
		canvas.ctx.stroke();
		
	}).bind(this);
	
	
	
	this.bake = (function(){
		// save left normal from each face
		var a;
		var b;
		for(var i = 0; i < this.points.length; i++){
			a = this.points[i];
			b = this.points[Math.loopover(i + 1, 0, this.points.length)];
			
			var vec = {
				x:b.x-a.x,
				y:b.y-a.y
			};
			
			Math.leftHand(vec)
			Math.normalise(vec);
			
			this.norms.push(vec);
		}
		
		// filter norms to remove similar ones
		var d;
		for(i=0; i<this.norms.length; i++){
			for(j=i+1; j<this.norms.length; j++){
				a = this.norms[i];
				b = this.norms[j];
				if(Math.abs(Math.dot(a,b)) == 1){
					// normals are in same direction destroy one of them
					this.norms.splice(j, 1);
					j--;
				}
			}
		}
		
		// fill ppoints with blank points
		this.ppoints = [];
		for(var i = 0;i<this.points.length;i++){
			this.ppoints.push({	x:0, y:0 });
		}
		
		// fill pnorms with blank points
		this.pnorms = [];
		for(var i = 0; i<this.norms.length;i++){
			this.pnorms.push({	x:0, y:0 });
		}
	}).bind(this);
	
	
	this.process = (function(){
		var p = this.target.cPosition;
		// transform this.points and store in this.ppoints;
		for(var i = 0; i<this.points.length; i++){
			this.ppoints[i].x = this.points[i].x;
			this.ppoints[i].y = this.points[i].y;
			Math.rotateTranslate(this.ppoints[i], p.x, p.y, p.r);
		}
		for(var i = 0; i<this.norms.length; i++){
			this.pnorms[i].x = this.norms[i].x;
			this.pnorms[i].y = this.norms[i].y;
			Math.rotate(this.pnorms[i], p.r);
		}
		
	}).bind(this);
}


function cPosition(ax, ay, ar){
	this.x = ax || 0;
	this.y = ay || 0;
	this.r = ar || 0;
	this.run = (function(){}).bind(this);
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


function cView(aw, ah, astyle){
	
	this.w 			= aw || 0;
	this.h 			= ah || 0;
	this.style = astyle;
	
	this.run = (function(){
		/*var position = this.target.cPosition;
		canvas.ctx.save();
		canvas.ctx.fillStyle = this.style;
		canvas.ctx.translate(position.x, position.y);
		canvas.ctx.rotate(position.r);
		canvas.ctx.fillRect(-this.w/2, -this.h/2, this.w, this.h);
		canvas.ctx.restore();*/
	}).bind(this);
}






















