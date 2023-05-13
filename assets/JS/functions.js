export function openMenu() {
    const menuHTML = document.querySelector('.navbar__menu');
    document.querySelector('.fa-chevron-left').addEventListener('click', () => menuHTML.classList.add('menu__close'));
    document.querySelector('.fa-chevron-right').addEventListener('click', () => menuHTML.classList.remove('menu__close'));
}

export function activeNavbar() {
    const navbarHTML=document.querySelector(".navbar");
    window.addEventListener("scroll", () => {
        window.scrollY > 80 
            ? navbarHTML.classList.add("act")
            : navbarHTML.classList.remove("act")
    });    
}

export function openCart() {
    const cartHTML = document.querySelector('.cart');
    document.querySelector('.fa-cart-shopping').addEventListener('click', () => cartHTML.classList.add('cart_show'));
    document.querySelector('.fa-xmark').addEventListener('click', () => cartHTML.classList.remove('cart_show'));
}

export function addFromProductsCards(cardProducts, cartProducts) {
    document.getElementById('products-cards').addEventListener('click', function (e) {
        if (e.target.classList.contains('fa-plus')) {
            
            const cardId = Number(e.target.id.slice(5));
            const productFind = cardProducts.find((product) => product.id === cardId);

            if (cartProducts[productFind.id]) {

                if (productFind.quantity === cartProducts[productFind.id].amount) {return alert('Stock insuficiente')};
                
                cartProducts[productFind.id].amount++;

            } else {
                cartProducts[productFind.id] = {
                    ...productFind,
                    amount: 1,
                }
            }
            window.localStorage.setItem('cart', JSON.stringify(cartProducts));
            printCartProducts(cartProducts);
            printTotal(cartProducts);
            printAmount(cartProducts);
        }
    });
}

export function printCards(cardProducts) {
    let html = '';
    for (const {id, name, image, price, quantity, category} of cardProducts) {
        html += `
        <div class="product-card ${category}">
            <div class="card-img">
                ${
                    quantity
                    ? `<i class="fa-solid fa-plus card-plus" id="card-${id}"></i>`
                    : ``
                }
                <img src="${image}" alt="">
            </div>
            <div class="card-body">
                <span class="card-body_price">$${price}.00</span>
                ${
                    quantity
                    ? `<span class="card-body_stock">Stock: ${quantity}</span>`
                    : `<span class="sold-out">SOLD OUT</span>`
                }
                <p class="card-body_name" id="card_name-${id}">${name}</p>
            </div>
        </div>
        `;
        document.getElementById('products-cards').innerHTML = html;
    }
};

export function printCartProducts(cartProducts) {
    const cartTopHTML = document.querySelector('.cart-top');

    let html = '';
    for (const product in cartProducts) {
        const {id, amount, quantity, name, price, image} = cartProducts[product]
        html += `
        <div class="cart-item">
            <div class="cart-item_img">
                <img src="${image}" alt="">
            </div>
            <div class="cart-item_detail">
                <p class="cart-item_name">${name}</p>
                <span class="cart-item_stock">${quantity}</span>
                <span class="cart-item_price">$${price}.00</span>
                <p class="cart-item_subtotal">$${price * amount}</p>
                <div class="cart-item_units" id=cart-${id}>
                    <i class="fa-solid fa-minus"></i>
                    <span class="units">${amount} units</span>
                    <i class="fa-solid fa-plus"></i>
                    <i class="fa-solid fa-trash"></i>
                </div>
            </div>
        </div>
        `;
    }
    cartTopHTML.innerHTML = html;
}

export function handleProductsInCart(cardProducts, cartProducts) {
    document.querySelector('.cart-top').addEventListener('click', function(e) {
    
        if (e.target.classList.contains('fa-minus')) {
            const cartId = Number(e.target.parentElement.id.slice(5));
            const productFind = cardProducts.find((product) => product.id === cartId);
            if (cartProducts[productFind.id].amount === 1) {
                const response = confirm('¿Seguro quieres eliminar este producto?');
                if (!response) {return};
                delete cartProducts[cartId];
            } else {
                cartProducts[cartId].amount--;
            }
        }
        
        if (e.target.classList.contains('fa-plus')) {
            const cartId = Number(e.target.parentElement.id.slice(5));
            const productFind = cardProducts.find((product) => product.id === cartId);
            if (productFind.quantity === cartProducts[productFind.id].amount) {return alert('Stock insuficiente')};
            cartProducts[cartId].amount++;

        }
        
        if (e.target.classList.contains('fa-trash')) {
            const cartId = Number(e.target.parentElement.id.slice(5));
            const response = confirm('¿Seguro quieres eliminar este producto?');
            if (!response) {return};
            delete cartProducts[cartId];
        }
        window.localStorage.setItem('cart', JSON.stringify(cartProducts));
        printCartProducts(cartProducts);
        printTotal(cartProducts);
        printAmount(cartProducts);
    })
}

export function printTotal(cartProducts) {
    const cartBottomHTML = document.querySelector('.cart-bottom');
    let totalCash = 0;
    let totalItems = 0;
    let html = '';

    for (const product in cartProducts) {
        const {amount, price} = cartProducts[product]
        totalItems += amount;
        totalCash += totalItems * price;
        html = `
        <div class="cart-total">
            <p class="total-items">${totalItems} items</p>
            <p class="total-cash">$${totalCash}.00</p>
        </div>
        `;
        cartBottomHTML.innerHTML = html;
        window.localStorage.setItem('cart', JSON.stringify(cartProducts));
        printCartProducts(cartProducts);
    };

}

export function handleTotal(cardProducts, cartProducts) {
    const buyBTN = document.getElementById('buy-btn');
    buyBTN.addEventListener('click', function() {

        if (!Object.values(cartProducts).length) 
        return alert('No tienes nada añadido al carrito');
        
        const response = confirm('Confirmar compra');
        if (!response) return;

        
        const currentProducts = [];
        for (const product of cardProducts) {
            const cartProduct = cartProducts[product.id]
            if (product.id === cartProduct?.id) {
                currentProducts.push({
                    ...product,
                    quantity: product.quantity - cartProduct.amount,
                });
            } else {
                currentProducts.push(product)
            }
        }
        
        cardProducts = currentProducts;
        cartProducts = {};

        window.localStorage.setItem('products', JSON.stringify(cardProducts));
        window.localStorage.setItem('cart', JSON.stringify(cartProducts));
        printTotal(cartProducts);
        printCartProducts(cartProducts);
        printCards(cardProducts);
        printAmount(cartProducts);
    })
}

export function printAmount(cartProducts) {
    
    const amountHTML = document.querySelector('.cart-amount-items');
    let amountItems = 0;
    
    for (const product in cartProducts) {
        amountItems += cartProducts[product].amount;
    };
    
    amountHTML.textContent = amountItems;

}

export function handleMixtup() {
    mixitup("#products-cards", {
        selectors: {
            target: ".product-card",
        },
        animation: {
            duration: 300,
        },
    });
}

export function showModule(cardProducts) {
    document.getElementById(`products-cards`).addEventListener('click', (e) => {
        const moduleHTML = document.querySelector('.module');
        const cardId = Number(e.target.id.slice(10));
        const productFind = cardProducts.find((product) => product.id === cardId);
        let html = '';
        for (const {id, image, name, description, price, quantity } of cardProducts) {
            if (cardId === id) {
                html = `
                <div class="module-product"> 
                    <i class="fa-solid fa-xmark module_close"></i>
                    <div class="module-img">
                        <img src="${image}" alt="${name.split(' ')[0]}">
                    </div>
                    <div class="module-body">
                        <h5>${name}</h5>
                        <p class="descrip">${description}</p>
                    </div>
                    <div class="module-footer">
                        <p class="price">$${price.toFixed(2)}</p>
                        <i class="fa-solid fa-plus"></i>
                        ${
                            quantity
                            ? `<p class="stock">Stock: ${quantity}</p>`
                            : `<span class="sold-out">SOLD OUT</span>`
                        }                        
                    </div>
                </div>
                `;
                moduleHTML.innerHTML = html;
                moduleHTML.classList.add('module_show');
                closeModule();
            }
            function closeModule() {
                document.querySelector('.module_close').addEventListener('click', () => moduleHTML.classList.remove('module_show'))
            }
        }
    });
}