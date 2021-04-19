"use strict";

var basketArray = [["Одежда", 50], ["Продукты", 20]];

function countBasketPrice(basketArray) {
	var sum = 0;
	basketArray.forEach(elem => {
		sum += elem[1];
	});
	return sum;
}

console.log(countBasketPrice(basketArray));