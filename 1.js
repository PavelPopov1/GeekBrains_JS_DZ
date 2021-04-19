"use strict";

var i = 1;

while (i<=100) {
	var flag = true;
	var j = 2;
	while (j < i) {
		if ((i % j) === 0) {
			flag = false;
			break;
		}
		j++;
	}
	if (flag) {
		console.log(i);
	}
	i++;
}