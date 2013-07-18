

Math.clip = function (value, lower, upper){
	if(value<lower){
		value=lower;
	}else if(value>upper){
		value=upper
	}
	return value;
}