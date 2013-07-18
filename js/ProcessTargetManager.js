

function ProcessTargetManager(){
	
	
	this.targets = [];
	this.processes = [];
	this.components = {};
	
	
	
	this.addTarget = (function(t){
		this.targets.push(t);
		t.manager = this;
		
		// createHash
		
		t.hash = {};
		for(var item in t){
			if(this.components[t[item].constructor.name] != undefined){
				console.log(item, t[item].constructor.name);
				t.hash[t[item].constructor.name] = t[item];
			}
		}
		
	}).bind(this);
	
	
	// p is a function to be executed, atags is array of functions:
	// Targets will be searched for properties with constructors matching
	// the elements of the atags array. All processes must be added before
	// any targets are added.
	// TODO: Add code which will force recalculation of all dependancies
	//		 by first reprocessing all processes and then revisiting all
	//		 targets.
	this.addProcess = (function(p,atags){
		this.processes.push(p);
		p.manager = this;
		p.tags = atags;
		for(var i = 0;i<atags.length;i++){
			this.components[atags[i].name] = atags[i];
		}
	}).bind(this);
	
	
	// TODO: #############################################################
	//		 ################### DO THIS ONE FIRST! ######################
	//		 the next thing to do is change this whole code so that each
	//		 target keeps a hash like this:
	//		 {pRender:[refToLocalPosition, refToLocalView],pPhisics:[...],...}
	//		 This will prevent the costly array making process i am writing below
	
	this.execute = (function(p){
		for(var i = 0;i<this.targets.length;i++){
			if(this.isMatch(p, this.targets[i])){
				var args = [];
				for(var j = 0;j<p.tags.length;j++){
					args.push(this.targets[i].hash[p.tags[j].name]);
				}
				p.apply(this.targets[i], args)
			}
		}
	}).bind(this);
	
	
	// TODO:
	
	this.isMatch = (function(t, p){
		return true;
	}).bind(this);
}