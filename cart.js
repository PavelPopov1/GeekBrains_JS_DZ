const $cart = document.querySelector('#cart');
const $goodsList = document.querySelector('#goods-list');
const $popup = document.querySelector('#popup');


class Product {
  constructor(name, price) {
    this.name = name;
    this.price = price;
	this.quantity = 1;
  } 
}

class Basket {
  constructor() { 
    this.basket_list = [];
  }

  addProduct(product) {
    this.basket_list.push(product);
  }
  
  getListProd() {
	  return this.basket_list;
  }

  sumPrice() {
    var sum = 0;
    this.basket_list.forEach(element => {
      sum += element.price*element.quantity;
    });
    return sum;
  }
  
  sumQuantity() {
    var sum = 0;
    this.basket_list.forEach(element => {
      sum += element.quantity;
    });
    return sum;
  }
  
  addStatus(beforeEl) {
	beforeEl.textContent = '';
	const p = document.createElement('p');
	
	if(this.basket_list.length > 0) {
        p.textContent = `в корзине ${this.sumQuantity()} товаров, на сумму  ${this.sumPrice()} рублей`;
    } else {
        p.textContent = 'корзина пуста'
    }
    
    beforeEl.appendChild(p);
  }
  
  addQuantity(name) { 
	this.basket_list.forEach(element => {
	  if (element.name == name) {
		element.quantity++;
	  }
    });
  }
  
  findInd(name) {
	var k = -1;
	for (var i=0; i<this.basket_list.length; i++) {
		if (this.basket_list[i].name == name) {
			k = i;
			break;
		}
	}
	return k;
  }
  
}

var bask = new Basket();
const goods = [];


function Good(title, price) {
    this.name = title;
    this.price = price;
    this.images = [
        './img/1.jpg',
        './img/2.jpg',
        './img/3.jpg',
    ]
}

function getPrice() {
    return bask.sumPrice();
}

function getQuantity() {
    return bask.sumQuantity();
}

function drawCart() {
    return bask.addStatus($cart);
}

function drawGoods() {
    goods.forEach(function (good, i) {
        const imagesHtml = good.images.map(function(src) {
            return `<img width="30" src="${src}"></img>`
        }).join('');

        console.log(imagesHtml);
        const html = `<div class="good"><h5>${good.name}</h5><p>${good.price}</p>${imagesHtml}<button data-id="${i}">Купить</button></div>`;
        $goodsList.insertAdjacentHTML('beforeend', html);
    })
}

document.addEventListener('keydown', function(e) {
    if(e.key === 'Escape') {
        $popup.style.display = 'none';
    }
})

$goodsList.addEventListener('click', function(e) {
    if( e.target.tagName === 'IMG' ) {
        $popup.textContent = '';
        $popup.style.display = 'block';
        $popup.insertAdjacentHTML('beforeend', `<img src="${e.target.getAttribute('src')}">`);
    }
});

$goodsList.addEventListener('click', function(e) {
    if( e.target.tagName === 'BUTTON' ) {
        const id = Number(e.target.getAttribute('data-id'));
        const good = goods[id];
		
        const uniqeId = bask.findInd(good.name);

        if(uniqeId < 0) {
            bask.addProduct(new Product(good.name, good.price));
        } else {
            bask.addQuantity(good.name);
        }
		
		for (var i=0; i<bask.getListProd().length; i++) {
			console.log(`name: ${bask.getListProd()[i].name}, price: ${bask.getListProd()[i].price}, quantity: ${bask.getListProd()[i].quantity}`);
		}

        drawCart();
    }
});

goods.push(new Good('Bread', 20));
goods.push(new Good('Beer', 40));
goods.push(new Good('Milk', 10));
goods.push(new Good('Eggs', 70));

drawCart();
drawGoods();

// console.log(cart)