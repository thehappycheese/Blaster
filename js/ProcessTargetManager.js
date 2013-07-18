

function ProcessTargetManager(){
	this.targets = [];
	this.processes = [];
	this.components = [];
	
	this.addTarget = (function(t){
		this.targets.push(t);
		t.manager = this;
		// inspect the object and locate it's components
	}).bind(this);
	
	this.addProcess (function(p,atags){
		this.processes.push(p);
		p.manager = this;
		p.tags = atags;
	}).bind(this);
	
	this.execute = (function(process){
		
	}).bind(this);
}