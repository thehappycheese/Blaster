
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
		canvas.ctx.moveTo(temp.x,temp.y);
		
		for(var i = 1;i<=this.ppoints.length;i++){
			temp = this.ppoints[Math.loopover(i, 0, this.ppoints.length)];
			canvas.ctx.lineTo(temp.x,temp.y);
		}
		canvas.ctx.fill();
		
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
					// normals are in same direction; destroy one of them
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





















