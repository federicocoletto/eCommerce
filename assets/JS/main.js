import { getProducts } from "./api.js";
import { openMenu, activeNavbar, openCart, printCards, addFromProductsCards, printCartProducts, handleProductsInCart, printTotal, handleTotal, printAmount, handleMixtup } from "./functions.js";

async function main() {
    openMenu();
    activeNavbar();
    openCart();


    let products = JSON.parse(localStorage.getItem('products')) || await getProducts('https://ecommercebackend.fundamentos-29.repl.co/');
    let cart = JSON.parse(localStorage.getItem('cart')) || {};

    printCards(products);
    addFromProductsCards(products, cart);
    printCartProducts(cart);
    handleProductsInCart(products, cart);
    printTotal(cart);
    handleTotal(products, cart);
    printAmount(cart);
    handleMixtup();
    
}


window.addEventListener('load', main());

// window.addEventListener("load", function() {
//     setTimeout(function() {
//         const loadingDOMHTML = document.querySelector(".loadingDOM");
//         loadingDOMHTML.classList.add("loadingDOM__none");
//     }, 3000);
// })