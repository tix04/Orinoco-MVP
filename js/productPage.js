
let imageContainer = document.getElementById("productImage");
let productDetails = document.getElementById("productDetails");

//Retrieve required data for URL Query paramaters
let productsListUrl = "http://localhost:3000/api/cameras";
let productUrl = window.location.search.slice(4);
console.log(productUrl);

let personalizedLens;
let product;

//Fetching full products list and display appropriate product details
fetch(productsListUrl)
    .then(function(data) {
        return data.json();
    })
    .then(function(data) {
      console.log(data);

      findMatchingId(data);
      displayImage();
      productNameDisplay();
      productDescriptionDisplay();
      titleForPersonalizedLenses();
      personalizeProduct(product.lenses);
      productPriceDisplay();
      createCartButton();
      updateCartBadge();
      
    }
  );

  //Identify which product to display
function findMatchingId(productsList) {
  for (i = 0; i < productsList.length;i++){
    if(productUrl == productsList[i]._id){
      product = productsList[i];
    }
  }
}


//Display appropriate image of product chosen
function displayImage() {
  let image = document.createElement('img');
  image.setAttribute("src", product.imageUrl);
  image.setAttribute("alt", product.name);
  image.classList.add("img-thumbnail","border-dark");
  imageContainer.appendChild(image);
}

//Display appropriate product name of product chosen
function productNameDisplay() {
  let name = document.createElement('h2');
  name.innerHTML = product.name;
  productDetails.appendChild(name);
}

//Display appropriate product description of product chosen
function productDescriptionDisplay() {
  let description = document.createElement('p');
  description.innerHTML = product.description;
  productDetails.appendChild(description);
}

//Display appropriate product price of product chosen
function productPriceDisplay() {
  let priceContainer = document.createElement('h4');
  priceContainer.classList.add("mt-4", "mb-3");
  let amount = product.price * 0.01;
  let price = amount.toFixed(2);
  priceContainer.innerHTML = '$' + ' ' + price;
  productDetails.appendChild(priceContainer);
}

//Create label for different personalization options
function titleForPersonalizedLenses() {
  let title = document.createElement('h4');
  title.classList.add("mt-3");
  productDetails.appendChild(title);
  title.innerText = "Personalized Features (Optional)";
}

//Create container for personalization radio buttons
function personalizeProduct(lensOptions) {
  for(let i = 0; i < lensOptions.length; i++) {
    let inputWrapper = document.createElement('div');
    inputWrapper.classList.add('form-check', 'form-check-inline');

    let input = document.createElement('input');
    input.setAttribute("type", "radio");
    input.setAttribute('id',lensOptions[i]);
    input.setAttribute('name', 'Lenses');
    input.setAttribute('value', lensOptions[i]);
    input.classList.add('form-check-input');
    
    let label = document.createElement('label');
    label.setAttribute('for', lensOptions[i]);
    label.classList.add('form-check-label', 'font-weight-bold');
    
    inputWrapper.append(input, label);

    productDetails.appendChild(inputWrapper);
    label.innerText = lensOptions[i];
  }
}

//Create add to cart button for the product
function createCartButton(index) {
  let addToCartButton = document.createElement('button');
  addToCartButton.setAttribute('type', 'button');
  addToCartButton.setAttribute('class', 'btn btn-primary');
  addToCartButton.setAttribute('onclick', "storingCartItem()");
  addToCartButton.innerHTML = "Add to Cart";
  productDetails.appendChild(addToCartButton);
}

//Sending which personalization option chosen to localstorage
function updatePersonalizedFeatures() {
  let options = document.querySelectorAll('input');

  for (let i=0; i<options.length; i++) {

    if (options[i].checked) {
      personalizedLens = options[i].value;
    }
  }
  return personalizedLens;
}

//Update Cart item icon quantity if item added to cart
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

//Sending required data to local Storage
function storingCartItem() {
 
  /**
   * TODO: Create Product Object
   */
  let cartItem = product;
  cartItem.quantity = 1;
  cartItem.lensOption = updatePersonalizedFeatures();

   /**
    * TODO: Get "cartItems" value 
    */
   let cartItems = JSON.parse(localStorage.getItem('cartItems'));


    /**
     * TODO: Update "cartItems" value with new Product Object (Push to the Array)
     */
    cartItems.push(cartItem);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    // update cart badge
    let cartItemsQuantity = document.getElementById('cartItemQuantity');
    cartItemsQuantity.style.display = "inline-block";
    updateCartBadge();
    
     /**
      * TODO: Further "Add to cart" stuff....
      */
     //goToCartPage();
  
  console.log(cartItems);

}

//Sending user to cart page-Stopped Automatically sending user to cart page all the time
function goToCartPage() {
  window.document.location = 'cart_page.html';
  //addPersonalizedLens();
}
