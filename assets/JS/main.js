import { getProducts } from "./api.js";
import { openMenu, activeNavbar, openCart, printCards, addFromProductsCards, printCartProducts, handleProductsInCart, printTotal, handleTotal, printAmount, handleMixtup, showModule } from "./functions.js";

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
    showModule(products);
    // showModule(products);

// const module = document.querySelector('.module');

// for (const {
//     description,
//     id,
//     image,
//     name,
//     price,
//     quantity
// } of products) {
//     let html = '';


        

}


window.addEventListener('load', main());

window.addEventListener("load", function() {
    setTimeout(function() {
        const loadingDOMHTML = document.querySelector(".loadingDOM");
        loadingDOMHTML.classList.add("loadingDOM__none");
    }, 3000);
})