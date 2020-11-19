

let cartSection = document.getElementById('summaryContainer');
let totalPrice = 0;
let quantityValue;
let cartItems = JSON.parse(localStorage.getItem('cartItems'));
let totalCartPrice = document.getElementById('totalPrice');
let contact = new Object();


//Init Functions invoking majority of functions required when page loads either with or without cart items added
function init() {

    if (cartItems === "" || cartItems === null) {
        cartItemsEmpty();
    } else if (cartItems.length === 0) {
        cartItemsEmpty();
    } else {
        for (let i = 0; i < cartItems.length; i++) {
            console.log(cartItems[i]);
            createTableRow(i);
            createTableData(i);
            createImagePreview(i);
            getProductName(i);
            getPersonalizedAccessory(i);
            getProductPrice(i);
            createQuantityInput(i);
            createRemoveButton(i);
            calculateTotal(i);
            deleteItems(i);
            updateCartBadge();

        }
    }
}

//Function if no cart items present
function cartItemsEmpty() {
    let mainContent = document.querySelector('main');
    mainContent.setAttribute("class", "col-12 text-center text-danger display-3 p-5");
    mainContent.style.height = "689px";
    document.body.style.backgroundColor = "lightgrey";
    mainContent.innerHTML = "You do not have any items in your cart!!";
}

//Create Table Row Element container holding cart items summary details
function createTableRow(index) {
    let row = document.createElement("tr");
    row.setAttribute('id', `item${index + 1}`);
    cartSection.appendChild(row);
}

//Create Table Data Elements that will contain each cart item information detail
function createTableData(index) {
    for (let i = 0; i < 6; i++) {
        let itemContainer = document.getElementById(`item${index + 1}`);
        let tableData = document.createElement('td');
        itemContainer.appendChild(tableData);
    }
}

//Display Image for each cart item added 
function createImagePreview(index) {
    let imageContainer = document.querySelectorAll(`#item${index + 1} td`)[0];
    let image = document.createElement('img');
    image.setAttribute('src', cartItems[index].imageUrl);
    image.setAttribute('alt', cartItems[index].name);
    image.classList.add('img-fluid');
    imageContainer.appendChild(image);

}

//Display product Name to identify each added cart item
function getProductName(index) {
    let nameContainer = document.querySelectorAll(`#item${index + 1} td`)[1];
    nameContainer.classList.add('font-weight-bold', 'productName','fontSize');
    nameContainer.innerText = cartItems[index].name;
}

//Display any personalization feature chosen or standard features
function getPersonalizedAccessory(index) {
    let accessoryContainer = document.querySelectorAll(`#item${index + 1} td`)[2];
    accessoryContainer.classList.add('font-italic','fontSize');
    if(cartItems[index].lensOption === null || cartItems[index].lensOption === undefined) {
        accessoryContainer.innerText = "Default Lens";
    }else{
        accessoryContainer.innerText = cartItems[index].lensOption;
    }
}

//Display product price of any cart item added
function getProductPrice(index) {
    let priceContainer = document.querySelectorAll(`#item${index + 1} td`)[3];
    priceContainer.classList.add('font-weight-bold','fontSize');
    let productPrice = (cartItems[index].price) * 0.01;
    priceContainer.innerText = "$" + productPrice;
}

//Create Quantity functionality for each cart item added
function createQuantityInput(index) {
    let quantityContainer = document.querySelectorAll(`#item${index + 1} td`)[4];
    let quantity = document.createElement('input');
    quantity.setAttribute('id', `productQuantity${index + 1}`);
    quantity.setAttribute('type', 'number');
    quantity.setAttribute('value', cartItems[index].quantity);
    quantity.addEventListener("change", function (event) {
        let value = event.target.value;
        updateQuantity(index, value++);
    });
    quantityContainer.appendChild(quantity);

}

//Create Remove button for eact cart item added
function createRemoveButton(index) {
    let buttonContainer = document.querySelectorAll(`#item${index + 1} td`)[5];
    let removeButton = document.createElement('button');
    let trashIcon = document.createElement('i');

    removeButton.setAttribute('type', 'button');
    removeButton.setAttribute('id', 'removeProduct' + (index + 1));
    removeButton.classList.add('btn', 'btn-danger', 'buttonWidth');
    removeButton.innerText = "REMOVE";
    buttonContainer.appendChild(removeButton);

    trashIcon.classList.add('trash', 'fa', 'fa-trash-alt', 'ml-2');
    removeButton.appendChild(trashIcon);

}

//Function for updating total price for all cart items
function calculateTotal() {

    // Reset total price everytime when we calculate
    let total = 0;

    // Loop over cartItems, and update the total
    cartItems.map(cartItem => {
        total += cartItem.quantity * cartItem.price;
    });

    totalCartPrice.innerText = "$" + " " + (total * 0.01).toFixed(2);
}

//Function updating total price when any cart items quantity modified
function updateQuantity(index, value) {

    // 1) Get all cartItems
    let newCartItems = cartItems;

    // 2) Update the quantity of the selected/required cartItem
    newCartItems[index].quantity = value;

    // 3) Delete the cartItems from LocalStorage
    localStorage.removeItem("cartItems");

    // 4) Add the new version of cartItems
    localStorage.setItem('cartItems', JSON.stringify(newCartItems));

    // 5) Re-calculate total cart price
    calculateTotal();

}


/**
 * Update Cart Badge
 */
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


/* ****Remove items with button********** */
function deleteItems(index) {
    let deleteItem = document.querySelectorAll(`#summaryContainer button`)[index];
    deleteItem.addEventListener('click', function () {
        //Retrieve array from localStorage
        let cartArray = cartItems;

        //Select the item to be removed
        let item = cartItems[index];
        console.log(item);

        //Get the index of the item to be removed
        let itemIndex = cartItems.indexOf(item);
        console.log(itemIndex);

        //Delete item from array
        console.log("Before delete: ", cartArray);
        let deletedCartItem = cartArray.splice(itemIndex, 1);
        console.log("After delete: ", deletedCartItem);

        //Remove Table Row containing deleted item from local Storage by reloading the page
        deleteItem.parentElement.parentElement.remove();


        //Delete old localStorage Data and replace with updated array
        localStorage.removeItem('cartItems');
        localStorage.setItem('cartItems', JSON.stringify(cartArray));

        //Recalculate Total Price
        calculateTotal();

        // update cart badge
        updateCartBadge();

        //Hide Elements if no cart Items is left
        if (cartItems === "" || cartItems === null) {
            cartItemsEmpty();
        } else if (cartItems.length === 0) {
            cartItemsEmpty();
        } else {
            //Retrieve updated data and Recalculate total price
            newCartItems = JSON.parse(localStorage.getItem('cartItems'));

            // console.log(newCartItems);
            let total = 0;

            newCartItems.map(cartItem => {
                total += cartItem.quantity * cartItem.price;
            });

            totalCartPrice.innerHTML = "$" + " " + (total * 0.01).toFixed(2);
        }
    });
}

init();

/* ************Form Validation*********************** */

let userInputBox = document.querySelectorAll('form input');

for (let i = 0; i < 5; i++) {

    userInputBox[i].addEventListener('blur', function () {
        if (userInputBox[i].value === "" || typeof userInputBox[i].value === !('string')) {
            userInputBox[i].style.background = "pink";
            userInputBox[i].style.borderColor = "#dc3545";
            userInputBox[i].style.boxShadow = "0 0 0 0.2rem #dc3545";
            document.querySelectorAll('form span')[i].style.display = "inline";
            document.querySelectorAll('form span')[i].innerText = "** Please Fill in the Information";
            document.querySelectorAll('form span')[i].style.color = "#dc3545";
        }
        else {
            userInputBox[i].style.background = "RGB(150,232,169,1";
            userInputBox[i].style.borderColor = "#28a745";
            userInputBox[i].style.boxShadow = "0 0 0 0.2rem #28a745";
            document.querySelectorAll('form span')[i].style.display = "none";
        }
    });
}

//Contact Object and Products array to POST
function createContactObject() {

    let firstName = document.getElementById('firstName').value;
    let lastName = document.getElementById('lastName').value;
    let email = document.getElementById('email').value;
    let address = document.getElementById('address').value;
    let city = document.getElementById('city').value;

    contact.firstName = firstName;
    contact.lastName = lastName;
    contact.email = email;
    contact.address = address;
    contact.city = city;
    return contact;
}

//Products Array listing Product Id
function createProductsArray() {
    let finalCartItems = JSON.parse(localStorage.getItem('cartItems'));
    let productsArray = [];

    for (let i = 0; i < finalCartItems.length; i++) {
        productsArray.push(finalCartItems[i]._id);
    }

    return productsArray;
}

//Determine if user is male or female
function maleOrFemale() {
    let options = document.querySelectorAll('input[type="radio"');
    let manOrWoman;
  
    for (let i=0; i<options.length; i++) {
  
      if (options[i].checked) {
        manOrWoman = options[i].value;
      }
    }
    return manOrWoman;
  }


let myForm = document.getElementById('contactForm');
myForm.addEventListener('submit', function (e) {
	e.preventDefault(); // avoid refresh after submission

    //Send Data to order endpoint
	let endpoint = 'http://localhost:3000/api/cameras/order';
	let contact = createContactObject();
	let products = createProductsArray();

	let data = {
		contact,
		products
	};

	fetch(endpoint, {
		method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      contact: data.contact,
      products: data.products
    })
    })
    //Retrieve data from server
		.then(function (response) {
			return response.json();
        })
    //Send final data to Confirmation Page
		.then(function (data) {
            let totalOrderPrice = document.getElementById('totalPrice').innerText;
            let fullName = `${contact.firstName} ${contact.lastName}`;
			window.document.location = `confirmation_page.html?id=${data.orderId}?totalPrice=${totalOrderPrice}?sex=${maleOrFemale()}?fullName=${fullName}`;
        })
    //Delete Local Storage data after user submits form data
    let cart = [];
    localStorage.setItem('cartItems', JSON.stringify(cart));
    updateCartBadge();
})

/*To do: 
1- Retrieve Total Price from cart page
2- Display data from url into confirmation page
*/
