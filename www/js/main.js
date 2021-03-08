


// ibg
function ibg() {
	let ibg = document.querySelectorAll(".ibg");
	for (var i = 0; i < ibg.length; i++) {
		if (ibg[i].querySelector('img')) {
			ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('img').getAttribute('src') + ')';
		}
	}
}
ibg();











//добавление счетчика товаров в иконку корзины
class Header {

	render(count) {
		const html = `
			<div class="header__cart-img">
				<svg width="28" height="23" viewBox="0 0 28 23" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path
						d="M21.8699 7.07692L20.4234 2.00808C20.2588 1.43436 19.8798 0.925163 19.3465 0.561352C18.8132 0.197541 18.1562 -3.38738e-05 17.4798 4.3561e-09H10.5202C9.84385 -3.38738e-05 9.18684 0.197541 8.65353 0.561352C8.12022 0.925163 7.74118 1.43436 7.57659 2.00808L6.13006 7.07692H0L3.97543 20.9919C4.14002 21.5656 4.51906 22.0748 5.05237 22.4386C5.58568 22.8025 6.24269 23 6.91908 23H21.0809C21.7573 23 22.4143 22.8025 22.9476 22.4386C23.4809 22.0748 23.86 21.5656 24.0246 20.9919L28 7.07692H21.8699ZM12.9884 15.9231V21.2308H10.7934L9.65029 15.9231H12.9884ZM9.27601 14.1538L8.13295 8.84615H12.9884V14.1538H9.27601ZM15.0116 15.9231H18.3497L17.2066 21.2308H15.0116V15.9231ZM15.0116 14.1538V8.84615H19.8671L18.724 14.1538H15.0116ZM21.9205 8.84615H25.4104L23.8931 14.1538H20.7775L21.9205 8.84615ZM9.53902 2.44154C9.5944 2.24526 9.72499 2.0715 9.90904 1.94917C10.0931 1.82685 10.3195 1.76334 10.5506 1.76923H17.5101C17.7412 1.76334 17.9676 1.82685 18.1517 1.94917C18.3357 2.0715 18.4663 2.24526 18.5217 2.44154L19.7861 7.07692H8.21387L9.53902 2.44154ZM6.07948 8.84615L7.22254 14.1538H4.10694L2.5896 8.84615H6.07948ZM5.90751 20.5585L4.61272 15.9231H7.6474L8.78035 21.2308H6.91908C6.688 21.2367 6.46159 21.1732 6.27754 21.0508C6.09349 20.9285 5.9629 20.7547 5.90751 20.5585ZM22.0318 20.5585C21.9789 20.7459 21.8574 20.9131 21.6857 21.0345C21.514 21.1559 21.3016 21.2248 21.0809 21.2308H19.2702L20.4032 15.9231H23.4379L22.0318 20.5585Z"
						fill="#35383A" />
				</svg>
			</div>
			<span class="header__cart-text">Корзина</span>
			<span class="header__cart-quantity">${count}</span>
		`;

		ROOT_HEADER.innerHTML = html;
	}
}

const headerPage = new Header();

const productsStore = localStorageUtil.getProducts();
headerPage.render(productsStore.length);


//добавление товаров в корзину
class Products {
	constructor() {
		this.classNameActive = 'item-catalog__btn_active';
		this.labelAdd = 'Добавить в корзину';
		this.labelRemove = 'В корзине';
	}

	handleSetLocationStorage(element, id) {
		const { pushProduct, products } = localStorageUtil.putProducts(id);

		if (pushProduct) {
			element.classList.add(this.classNameActive);
			element.innerHTML = this.labelRemove;
		} else {
			element.classList.remove(this.classNameActive);
			element.innerHTML = this.labelAdd;
		}

		headerPage.render(products.length);
	}

	render() {
		const productsStore = localStorageUtil.getProducts();
		let htmlCatalog = '';

		CATALOG.forEach(({ id, img, name, price }) => {
			let activeClass = '';
			let activeText = '';

			if (productsStore.indexOf(id) === -1) {
				activeText = this.labelAdd;
			} else {
				activeClass = ' ' + this.classNameActive;
				activeText = this.labelRemove;
			}

			htmlCatalog += `
				<div class="catalog__col">
					<div class="catalog__item item-catalog">
						<img src="${img}" alt="" class="item-catalog__img">
						<p class="item-catalog__text">
							${name}
						</p>
						<p class="item-catalog__price">
							${price.toLocaleString()} ₽
						</p>
						<div href="#" class="item-catalog__btn${activeClass} btn" onclick="productsPage.handleSetLocationStorage(this, '${id}');">
							${activeText}
						</div>
					</div>
				</div>
			`;
		});

		ROOT_PRODUCTS.innerHTML = htmlCatalog;
	}
}

const productsPage = new Products();
if (document.querySelector('.catalog')) {
	productsPage.render();
};


class Shopping {

	handleSetLocationStorage(element, id) {
		const { pushProduct, products } = localStorageUtil.putProducts(id);

		if (pushProduct) {
			element.classList.add(this.classNameActive);
			element.innerHTML = this.labelRemove;
		} else {
			element.classList.remove(this.classNameActive);
			element.innerHTML = this.labelAdd;
		}

		headerPage.render(products.length);
	}

	render() {
		const productsStore = localStorageUtil.getProducts();
		let htmlCatalog = '';
		let sumCatalog = 0;

		CATALOG.forEach(({ id, img, name, count, price }) => {
			if (productsStore.indexOf(id) !== -1) {
				htmlCatalog += `
					<div class="list-cart__item">
						<div class="list-cart__img">
							<img src="${img}" alt="">
						</div>
						<p class="list-cart__text">
							${name}
						</p>
						<div class="list-cart__quantity">
							<div class="list-cart__btn list-cart__btn_minus">
								<svg width="19" height="1" viewBox="0 0 19 1" fill="none" xmlns="http://www.w3.org/2000/svg">
									<line x1="0.476562" y1="0.5" x2="18.5066" y2="0.5" stroke="black" />
								</svg>
							</div>
							<div class="list-cart__input">
								<input id="${id}" type="text" value="1" disabled>
							</div>
							<div class="list-cart__btn list-cart__btn_plus">
								<svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M0 9L18 9" stroke="black" />
									<path d="M9.12598 0V17" stroke="black" />
								</svg>
							</div>
						</div>
						<p class="list-cart__price">${Number(price * count).toLocaleString()} ₽</p>
						<div class="list-cart__delete btn-delete">
							<svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
								<line y1="-0.5" x2="17.5227" y2="-0.5"
									transform="matrix(0.727587 0.686015 -0.727587 0.686015 0.250488 0.843262)" stroke="black" />
								<line y1="-0.5" x2="17.5227" y2="-0.5"
									transform="matrix(-0.727587 0.686015 -0.727587 -0.686015 13 0.135986)" stroke="black" />
							</svg>
						</div>
						<div type="button" class="list-cart__delete-btn btn-delete">
							<svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
								<line y1="-0.5" x2="17.5227" y2="-0.5"
									transform="matrix(0.727587 0.686015 -0.727587 0.686015 0.250488 0.843262)" stroke="black" />
								<line y1="-0.5" x2="17.5227" y2="-0.5"
									transform="matrix(-0.727587 0.686015 -0.727587 -0.686015 13 0.135986)" stroke="black" />
							</svg>
							<span>Удалить</span>
						</div>
					</div>
				`;

				sumCatalog += price * count;
			}
		});

		const html = `
			<h1 class="cart__title">Корзина</h1>
			<div class="cart__list list-cart">
				${htmlCatalog}
				<p class="list-cart__total-price">
					Сумма <span></span> ₽
				</p>
			</div>
		`;

		ROOT_SHOPPING.innerHTML = html;
	}
}

const shoppingPage = new Shopping();

if (document.querySelector('.cart')) {
	shoppingPage.render();
};




//проверка что документ загрузился
if (document.readyState == 'loading') {
	document.addEventListener('DOMContentLoaded', ready)
} else {
	ready()
}


function ready() {
	// подсчет количества и цены в корзине
	// кнопка удаления товара из корзины
	let deleteCartButtons = document.querySelectorAll('.btn-delete');
	for (let i = 0; i < deleteCartButtons.length; i++) {
		let button = deleteCartButtons[i];
		button.addEventListener('click', removeCartItem)
	}

	let quantityInputs = document.querySelectorAll('.list-cart__input>input')
	for (let i = 0; i < quantityInputs.length; i++) {
		let input = quantityInputs[i];
		input.addEventListener('change', quantityChanged);
	}
}

// удаление товара из корзины
function removeCartItem(event) {
	let buttonClicked = event.target;
	buttonClicked.parentElement.remove();
	updateCartTotal();
}

// изменение количества товаров в инпуте
function quantityChanged(event) {
	let input = event.target;
	updateCartTotal();
}



//обновление общей цены в корзине
function updateCartTotal() {
	let cartItemContainer = document.querySelectorAll('.list-cart')[0];
	let cartItems = cartItemContainer.querySelectorAll('.list-cart__item');
	let total = 0;
	for (let i = 0; i < cartItems.length; i++) {
		let cartItem = cartItems[i];
		let priceItem = cartItem.querySelectorAll('.list-cart__price')[0];
		let quantityElement = cartItem.querySelectorAll('input')[0];
		let price = parseFloat(priceItem.innerText.replace(/[^0-9-.]/g, ''));
		let quantity = quantityElement.value;
		total = total + (price * quantity);
	}
	document.querySelector('.list-cart__total-price>span').innerText = total.toLocaleString();

}

updateCartTotal();









//List Cart Quantity
let quantityButtons = document.querySelectorAll('.list-cart__btn');
if (quantityButtons.length > 0) {
	for (let index = 0; index < quantityButtons.length; index++) {
		const quantityButton = quantityButtons[index];
		quantityButton.addEventListener('click', function (e) {
			let value = parseInt(quantityButton.closest('.list-cart__quantity').querySelector('input').value);
			if (quantityButton.classList.contains('list-cart__btn_plus')) {
				value++;
				if (value >= 10) {
					value = 10
				}
			} else {
				value = value - 1;
				if (value < 1) {
					value = 1
				}
			}
			quantityButton.closest('.list-cart__quantity').querySelector('input').value = value;
		});
	}
}
