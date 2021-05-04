const $cart = document.querySelector('#cart');
const $goodsList = document.querySelector('#goods-list');
const $popup = document.querySelector('#popup');
const $showPopupBtn = document.querySelector('#showPopupBtn');
const $closePopupBtn = document.querySelector('#closePopupBtn');
const $body = document.querySelector('body');


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
        const html = `<div class="good"><h5>${good.name}</h5><p>${good.price}</p><button data-id="${i}">Купить</button></div>`;
        $goodsList.insertAdjacentHTML('beforeend', html);
    })
}

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




const images = [
    ['img/1.jpg', 'img/2.jpg', 'img/3.jpg']
]

function showPopup() {
    $popup.style.display = 'block';
}

function closePopup(e) {
    if(e.type === 'click' || e.key === 'Escape') {
        $popup.style.display = 'none';
    }
}

$showPopupBtn.addEventListener('click', showPopup);
$closePopupBtn.addEventListener('click', closePopup);
document.addEventListener('keydown', closePopup);


function drawGallery(images, start = 0) {
    $popup.lastChild.remove();

    const htmlIMG = images.map(function(img, idx) {
        return `<img class="slide-img" src="${img}" />`
    }).join(' ');
    const htmlSlider = `<div id="slider">
        <button id="prv"><</button>
        <div id="slide">${htmlIMG}</div>
        <button id="nxt">></button>
    </div>`

    $popup.insertAdjacentHTML('beforeend', htmlSlider);

    initSlider($popup.querySelector('#slider'), start);
}

function initSlider($slider, start) {
    let currentSlide = parseInt(start);
    const images = $slider.querySelectorAll('img');
	console.log(images[currentSlide]);
	console.log(typeof currentSlide);
	console.log(images[currentSlide+1]);

    function nxtSlide() {
        images[currentSlide].style.display = 'none';
        currentSlide = (currentSlide === images.length - 1) ? 0 : currentSlide + 1;
		console.log(currentSlide);
        images[currentSlide].style.display = 'block';
    }

    function prvSlide() {
        images[currentSlide].style.display = 'none';
        currentSlide = (currentSlide === 0) ? images.length - 1 : currentSlide - 1;
        images[currentSlide].style.display = 'block';
    }

    $slider.querySelector('#prv').addEventListener('click', prvSlide);
    $slider.querySelector('#nxt').addEventListener('click', nxtSlide);
	
	console.log(images);
	images[currentSlide].style.display = 'block';
	
}

function drawGalleryPreview(images) {
    const htmlIMG = images.map(function(img, idx) {
        return `<img data-idx="${idx}" class="preview-img" src="${img}" />`
    }).join(' ');

    const htmlPreview = `<div class="preview" style="display: none;">
        ${htmlIMG}
    </div>`;

    $body.insertAdjacentHTML('beforeend', htmlPreview);

    const $preview = $body.lastChild;

    $showPopupBtn.addEventListener('click', function(e) {
        drawGallery(images);
        showPopup();
    })
}

for(let img of images) {
    drawGalleryPreview(img);
}