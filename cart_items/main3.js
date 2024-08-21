import 'bootstrap/dist/css/bootstrap.min.css';
import './public/assets/style.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import App from './src/app';

//document.querySelector('#app').appendChild(App());

document.addEventListener('DOMContentLoaded', () => {
    const cart = [];
    const cartElement = document.querySelector('#lista-carrito tbody');
    const emptyCartButton = document.querySelector('#vaciar-carrito');
    const addToCartButtons = document.querySelectorAll('.button-carrito');

    

  addToCartButtons.forEach(button => {
      button.addEventListener('click', addToCart);
  });

  emptyCartButton.addEventListener('click', emptyCart);

});

