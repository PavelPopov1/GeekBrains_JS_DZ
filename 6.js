function add(a, b) {
	return a+b;
}

function sub(a, b) {
	return a-b;
}

function mul(a, b) {
	return a*b;
}

function div(a, b) {
	return a/b;
}

function mathOperation(arg1, arg2, operation) {
	if (operation == "add") {
		return add(arg1, arg2);
	} else 
	if (operation == "sub") {
		return sub(arg1, arg2);
	} else 
	if (operation == "mul") {
		return mul(arg1, arg2);
	} else
	if (operation == "div") {
		return div(arg1, arg2);
	} else 
	return NaN;
}

alert(mathOperation(10, 30, "mul"));
alert(mathOperation(10, 30, "und"));
