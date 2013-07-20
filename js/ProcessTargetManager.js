

function ProcessTargetManager(){
	
	
	this.targets = [];
	this.processes = [];
	this.components = {};
	
	
	
	this.addTarget = (function(t, p){
		this.targets.push(t);
		t.manager = this;
		
		
		// Create a hash table connecting component names to target members
		// {"cPosition":{...}, "cView":{...}}
		var hash = {};
		for(var item in t){
			if(this.components[t[item].constructor.name] != undefined){
				hash[t[item].constructor.name] = t[item];
			}
		}
		
		// Create a hash matching processes to required arguments:
		// {"pMove":[{},{}], ....}
		var hash2 = {}
		for(var i = 0;i<p.length;i++){
			hash2[p[i].name] = [];
			
			for(var j = 0; j < p[i].requiredComponents.length; j++){
				var component = hash[p[i].requiredComponents[j].name];
				if(component === undefined){
					console.error("Target type '"+t.constructor.name+"' does not have the required component '"
									+p[i].requiredComponents[j].name + "' for the process '"+
									p[i].name+"'");
					return;
				}else{
					hash2[p[i].name].push(hash[p[i].requiredComponents[j].name]);
				}
				
			}
			
		}
		
		t.processes = hash2;
		
	}).bind(this);
	
	
	/// p is a function to be executed, atags is array of functions:
	/// Targets will be searched for properties with constructors matching
	/// the elements of the atags array. All processes must be added before
	/// any targets are added.
	
	this.addProcess = (function(p){
		this.processes[p.name] = p;
		p.manager = this;
		p.requiredComponents = arequiredComponents;
		for(var i = 0; i < p.requiredComponents.length; i++){
			this.components[p.requiredComponents[i].name] = p.requiredComponents[i];
		}
	}).bind(this);
	
	
	// TODO: Add code which will force recalculation of all dependancies
	//		 by first reprocessing all processes and then revisiting all
	//		 targets.
	
	
	this.execute = (function(p){
		for(var i = 0;i<this.targets.length;i++){
			if(this.targets[i].processes[p.name] !== undefined){
				p.apply(this.targets[i],this.targets[i].processes[p.name])
			}
		}
	}).bind(this);
	
	
	// TODO:
	
	this.isMatch = (function(t, p){
		for(var item in t){
			if(this.components[t[item].constructor.name] != undefined){
				t.hash[t[item].constructor.name] = t[item];
			}
		}
		return true;
	}).bind(this);
}