
let url = "http://localhost:3000/api/cameras";
let imageContainer = document.getElementsByClassName('productImage');
let imageDetails = document.getElementsByClassName("card-body m-0 py-2");

function init() { // Main function
		
	setInitialCartState();
	
	fetch(url)
		.then(function(data) {
			return data.json();
		})
		.then(function(data) {
			console.log(data);

			resetProducts();
			displayProduct(data);
			updateCartBadge();
		}
	);
}

// Reset Products
function resetProducts() {
	imageContainer.innerHTML = "";
}

//Retrieve Image URL for each image and display images for each Product
function createProductImage(product, index) {
	let image = document.createElement('img');
	image.setAttribute("src", product.imageUrl);
	image.setAttribute("alt", product.description);
	image.setAttribute('class', 'card-img-top mx-auto d-block');
	imageContainer[index].appendChild(image);
}

//Retrieve name for each product
function createProductName(product, index) {
	let productName = document.createElement('h5');
	productName.setAttribute("class", "card-title");
    productName.innerHTML = product.name;
    imageDetails[index].appendChild(productName);
}

//Retrieve each product price
function createProductPrice(product, index) {
	/**
	 * TODO: Review Price Value
	 * The API returned a weird price
	 */
	let price = document.createElement('h5');
	let amount = product.price*0.01;
	let priceDisplay = amount.toFixed(2);
	price.setAttribute("class","card-text text-center");
	price.innerHTML = "$" + " " + priceDisplay;
	imageDetails[index].appendChild(price);
}

//Create button to send to product details page
function createDetailsButton(index){
	let detailsButton = document.createElement('button');
	detailsButton.setAttribute('id', 'b'+(index+1));
	detailsButton.setAttribute('type', 'button');
	detailsButton.setAttribute('class', 'btn btn-success mx-auto d-block font-weight-bold homeButton');
    detailsButton.innerHTML = "See Details";
    imageDetails[index].appendChild(detailsButton);
}

//Set URL Query Params for sending data to product Details page
function setUrlQueryParameters(productData, index) {
	let productButton = document.getElementById("b"+(index+1));

	productButton.addEventListener('click', function() {
		console.log(productData[index]._id);
		window.document.location = `product_page.html?id=${productData[index]._id}`;
	});
}

// Display Products
function displayProduct(products){
	for (i=0;i < products.length;i++) {
		createProductImage(products[i], i);
		createProductName(products[i], i);
		createProductPrice(products[i], i);
		createDetailsButton(i);
		setUrlQueryParameters(products, i);
	}
}

//Initializing local storage data
function setInitialCartState() {
	if(localStorage.getItem('cartItems')) {

	} else {
		let cart = [];
		localStorage.setItem('cartItems', JSON.stringify(cart));
	}
	


	/**
	 * IF IT EXISTS => DON'T DO ANYTHING
	 * IF IT DOESN'T EXIST => ASSIGN IT TO []
	 */
}

//Updatins cart items badge quantity
function updateCartBadge() {
	let cartItemsQuantity = document.getElementById('cartItemQuantity');
	let quantity = JSON.parse(localStorage.getItem('cartItems')).length;
	 
	if(quantity === 0 || quantity === null) {
		cartItemsQuantity.innerText = "";
		cartItemsQuantity.style.display = "none";
	}else {
		cartItemsQuantity.innerText = quantity;
	}
  }