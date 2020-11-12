let stringSearch = window.location.search;
let idLocation = stringSearch.indexOf('?id=');
let totalPriceLocation = stringSearch.indexOf('?totalPrice=');
let sexLocation = stringSearch.indexOf('?sex=');
let fullNameLocation = stringSearch.indexOf('?fullName=');

let orderId = stringSearch.slice((idLocation + 4),(totalPriceLocation));
let totalPurchasePrice = decodeURIComponent(stringSearch.slice((totalPriceLocation + 12),(sexLocation)));
let sex = stringSearch.slice((sexLocation + 5),(fullNameLocation));
let fullName = decodeURIComponent(stringSearch.slice(fullNameLocation + 10));
let container = document.getElementById('confirmationCard');
let gender;

/*console.log(orderId);
console.log(totalPurchasePrice);
console.log(sex);
console.log(fullName);*/

init();

function init() {
    updateCartBadge();
    thankYouMessage();
    priceDisplay();
    orderIdDisplay();
}

function updateCartBadge() {
    let cartItemsQuantity = document.getElementById('cartItemQuantity');
    let quantity = JSON.parse(localStorage.getItem('cartItems')).length;

    if (quantity === 0 || quantity === null) {
        cartItemsQuantity.innerText = "";
        cartItemsQuantity.style.display = "none";
    } else {
        cartItemsQuantity.innerText = quantity;
    }
}






function thankYouMessage() {
    let message = document.createElement('h3');

    if(sex === "undefined") {
        gender = "";
    }else if(sex === "male") {
        gender = "Mr.";
    }else {
        gender = "Mrs./Ms.";
    }

    message.innerText = `${gender} ${fullName}, thank you for using our services `;
    message.classList.add('text-success', 'mb-4', 'display-4');
    container.appendChild(message);
}

 function priceDisplay() {
     let priceContainer = document.createElement('p');
     priceContainer.innerText ='Your Purchase total is ';

     let price = document.createElement('span');
     price.innerText = totalPurchasePrice;
     price.classList.add('text-danger', 'font-weight-bold');

     container.appendChild(priceContainer);
     priceContainer.appendChild(price);
 }

 function orderIdDisplay() {
     let orderIdContainer = document.createElement('p');
     orderIdContainer.innerText = 'Your Confirmation ID is: ';

     let id = document.createElement('span');
     id.innerText = orderId;
     id.classList.add('text-success', 'font-weight-bold');

     container.appendChild(orderIdContainer);
     orderIdContainer.appendChild(id);
 }

