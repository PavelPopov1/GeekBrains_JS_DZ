
"use strict";

class Product {
  constructor(name, price) {
    this.name = name;
    this.price = price;
  } 
}

class Basket {
  constructor() { 
    this.basket_list = [];
  }

  addProduct(product) {
    this.basket_list.push(product);
  }

  sumPrice() {
    var sum = 0;
    this.basket_list.forEach(element => {
      sum += element.price;
    });
    return sum;
  }
  
  addStatus() {
	var doc = document.getElementById("basc");
	if (this.basket_list.length > 0) {
		var sum = this.sumPrice();
		doc.innerHTML = `В корзине ${this.basket_list.length} товаров на сумму ${sum}`;
	  } else {
		doc.innerHTML = "Корзина пуста!"
	  }
  }
  
}

var bask = new Basket();

bask.addStatus();
bask.addProduct({"name": "продукты", "price": 50});
bask.addStatus();
