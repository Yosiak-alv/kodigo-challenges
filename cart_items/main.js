import 'bootstrap/dist/css/bootstrap.min.css';
import './public/assets/style.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import App from './src/app';
//document.querySelector('#app').appendChild(App());

const cart = [];
const cartElement = document.querySelector('#lista-carrito tbody');
const emptyCartButton = document.querySelector('#vaciar-carrito');
const addToCartButtons = document.querySelectorAll('.button-carrito');

addToCartButtons.forEach(button => {
    button.addEventListener('click', addToCart);
});

emptyCartButton.addEventListener('click', emptyCart);

function addToCart(event) {
    const button = event.target;
    const product = button.closest('.card');
    const imageSrc = product.querySelector('.card-img-top').src;
    const className = product.querySelector('.card-title').textContent;
    const price = product.querySelector('.precio').textContent;

    const productData = {
        imageSrc,
        className,
        price,
    };

    cart.push(productData);
    renderCart();
}

function renderCart() {
    cartElement.innerHTML = '';

    cart.forEach((item, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${item.imageSrc}" width="50"></td>
            <td>${item.className}</td>
            <td>${item.price}</td>
            <td><a href="#" class="btn btn-danger btn-sm remove-item" data-index="${index}">X</a></td>
        `;
        cartElement.appendChild(row);
    });

    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', removeItem);
    });
}

function removeItem(event) {
    const index = event.target.dataset.index;
    cart.splice(index, 1);
    renderCart();
}

function emptyCart() {
    cart.length = 0; 
    renderCart();
}