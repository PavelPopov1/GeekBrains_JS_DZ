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
}

var num1 = new Product("Сок", 50);
var num2 = new Product("Хлеб", 20);
var basket = new Basket();
basket.addProduct(num1);
basket.addProduct(num2);
console.log(basket.sumPrice());
