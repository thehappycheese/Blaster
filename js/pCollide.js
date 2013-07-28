
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
var mul;
var qq;

function pCollide(a, b){
	
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
		
		ao.init();
		bo.init();
		var val;
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
		mul = 0.5;
		if(a.lock || b.lock){
			mul = 1;
		}
		qq = pen.mag * mul
		ff = Math.abs(pen.dir.y)-1 
		if(ff <0.1 && ff>-0.1){
				a.target.air = false;
				b.target.air = false;
			}
		if(!a.lock){
			a.target.cPosition.x += pen.dir.x * qq ;
			a.target.cPosition.y += pen.dir.y * qq;
			if(a.target.cVelocity){
				//a.target.cVelocity.x *=0.9;
				//a.target.cVelocity.y *=0.9;
				a.target.cVelocity.x += pen.dir.x * qq/2;
				a.target.cVelocity.y += pen.dir.y * qq/2;
			}
		}
		if(!b.lock){
			b.target.cPosition.x -= pen.dir.x * qq;
			b.target.cPosition.y -= pen.dir.y * qq;
			
			if(b.target.cVelocity){
				//a.target.cVelocity.x *=0.9;
				//a.target.cVelocity.y *=0.9;
				b.target.cVelocity.x -= pen.dir.x * qq/2;
				b.target.cVelocity.y -= pen.dir.y * qq/2;
			}
		}
	}
}