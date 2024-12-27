// ================= CART FUNCTION ===================

// Open & Close Cart
const cartIcon = document.querySelector("#cart-icon");
const cart = document.querySelector(".cart");
const closeCart = document.querySelector("#cart-close");

// Show cart when clicked
cartIcon.addEventListener("click", () => {
  cart.classList.add("active");
});

// Hide cart when clicked
closeCart.addEventListener("click", () => {
  cart.classList.remove("active");
});

// Check if the document is still loading
if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
  start();
}



// Initialize the cart
function start() {
  loadCartFromLocalStorage();
  addEvents();
}

// Update the cart and save changes
function update() {
  addEvents();
  updateTotal();
  saveCartToLocalStorage();
}



// ========================== ADD CART EVENTS ==========================

function addEvents() {
  // Remove items from cart
  let cartRemove_btns = document.querySelectorAll(".cart-remove");
  cartRemove_btns.forEach((btn) => {
    btn.addEventListener("click", handle_removeCartItem);
  });

  // Change item quantity
  let cartQuantity_inputs = document.querySelectorAll(".cart-quantity");
  cartQuantity_inputs.forEach((input) => {
    input.addEventListener("change", handle_changeItemQuantity);
  });

  // Add item to cart
  let addCart_btns = document.querySelectorAll(".add-cart-btn, .buy-now-btn");
  addCart_btns.forEach((btn) => {
    btn.addEventListener("click", handle_addCartItem);
  });

  // Buy Order in cart
  const buy_btn = document.querySelector(".btn-buy");
  buy_btn.addEventListener("click", handle_buyOrder);

  // Buy Order
  const buynow_btn = document.querySelector(".buy-now-btn");
  buynow_btn.addEventListener("click", handle_buynowOrder);
}



// ============= HANDLE EVENTS FUNCTIONS =============

let itemsAdded = [];
function handle_addCartItem() {
  let product = this.closest(".main-wrapper");
  let title = product.dataset.productName;
  let price = product.dataset.productPrice;
  let imgSrc = product.dataset.productImage;
  let newToAdd = {
    title,
    price,
    imgSrc,
    quantity: 1
  };

  // Check if the item is already in the cart
  let existingItem = itemsAdded.find(item => item.title === newToAdd.title);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
      itemsAdded.push(newToAdd);
    }

  updateCartInDOM();
  update();
}



// ============ REMOVE ITEMS FROM CART =============

function handle_removeCartItem() {
  this.parentElement.remove();
  itemsAdded = itemsAdded.filter(
    (el) =>
    el.title != this.parentElement.querySelector(".cart-product-title").innerHTML
  );

  update();
}



// ============= CHANGE ITEMS QUANTITY =============

function handle_changeItemQuantity() {
  if (isNaN(this.value) || this.value < 1) {
    this.value = 1;
  }
  this.value = Math.floor(this.value);
  let title = this.closest(".cart-box").querySelector(".cart-product-title").innerHTML;
  let item = itemsAdded.find(item => item.title === title);
  if (item) {
    item.quantity = parseInt(this.value);
  }

  update();
}



// ====================== BUY ORDER ======================

function handle_buynowOrder() {
  const cartContent = cart.querySelector(".cart-content");
  cartContent.innerHTML = "";
  setTimeout(function() { 
    window.location.href = 'checkout.html';
  }, 500);
}



// ====================== BUY ORDER IN CART ======================

function handle_buyOrder(event) {
  event.preventDefault(); 
  const cartContent = cart.querySelector(".cart-content");

  // Check if the cart is empty
  if (itemsAdded.length === 0) {
    cartContent.innerHTML = `
      You do not have any products in your cart.
    `;
    cartContent.style.display = "flex";
    cartContent.style.flexDirection = "column";
    cartContent.style.justifyContent = "center";
    cartContent.style.alignItems = "center";
    cartContent.style.color = "crimson";
    cartContent.style.fontWeight = "500";
    cartContent.style.zIndex = "900";
    cartContent.style.marginTop = "20px";
    cartContent.style.marginBottom = "20px";

    const closeBtn = document.getElementById("cart-close");
    if (closeBtn) {
      closeBtn.addEventListener("click", clearCartContent);
    }
  } else {
    cartContent.innerHTML = "";
    setTimeout(function() {
      window.location.href = 'checkout.html';
    }, 500);
  }
}

// Function to clear cart content
function clearCartContent() {
  const cartContent = document.querySelector(".cart-content");
  cartContent.innerHTML = "";
  itemsAdded = []; // Assuming itemsAdded is a global variable representing items in the cart

  // Reset the style
  cartContent.style.display = "";
  cartContent.style.flexDirection = "";
  cartContent.style.justifyContent = "";
  cartContent.style.alignItems = "";
  cartContent.style.color = "";
  cartContent.style.fontWeight = "";
  cartContent.style.zIndex = "";
  cartContent.style.marginTop = "";
  cartContent.style.marginBottom = "";
}

// Add event listener to cart-close button outside of handle_buyOrder function
document.getElementById("cart-close").addEventListener("click", clearCartContent);



// ================ UPDATE TOTAL PRICE & QUANTITY =================

function updateTotal() {
  let cartBoxes = document.querySelectorAll(".cart-box");
  const totalElement = cart.querySelector(".total-price");
  let total = 0;
  let totalItems = 0;

  cartBoxes.forEach((cartBox) => {
    let priceElement = cartBox.querySelector(".cart-price");
    let price = parseFloat(priceElement.innerHTML.replace("$", ""));
    let quantity = cartBox.querySelector(".cart-quantity").value;
    total += price * quantity;
    totalItems += parseInt(quantity);
  });

  total = total.toFixed(2);
  totalElement.innerHTML = "$" + total;
  document.querySelector('.badge').innerText = totalItems;

  updateCartCount(totalItems);
}



// ============ HIDE QUANTITY WHEN CART NONE ===============

function updateCartCount(count) {
  const cartCountElement = document.querySelector('.badge');
  cartCountElement.textContent = count;
  if (count > 0) {
    cartCountElement.style.display = 'flex';
  } else {
    cartCountElement.style.display = 'none';
  }
}



// ===================== UPDATE CART =====================

function updateCartInDOM() {
  const cartContent = cart.querySelector(".cart-content");
  cartContent.innerHTML = '';
  itemsAdded.forEach(item => {
    const cartBoxElement = CartBoxComponent(item.title, item.price, item.imgSrc, item.quantity);
    let newNode = document.createElement("div");
    newNode.innerHTML = cartBoxElement;
    cartContent.appendChild(newNode);
  });
}



// ================ SAVE CART TO LOCAL STORAGE =================

function saveCartToLocalStorage() {
  localStorage.setItem('cartItems', JSON.stringify(itemsAdded));
}



// ================ LOAD CART FROM LOCAL STORAGE =================

function loadCartFromLocalStorage() {
  let savedItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  savedItems.forEach(item => {
    addToCartInCurrentPage(item.title, item.price, item.imgSrc, item.quantity);
    itemsAdded.push(item);
  });

  updateTotal();
}



// ==================== ADD TO CART IN CURRENT PAGE ====================

function addToCartInCurrentPage(title, price, imgSrc, quantity) {
  const cartContent = cart.querySelector(".cart-content");
  const cartBoxElement = CartBoxComponent(title, price, imgSrc, quantity);
  let newNode = document.createElement("div");
  newNode.innerHTML = cartBoxElement;
  cartContent.appendChild(newNode);
}



// ==================== HTML COMPONENTS ====================

function CartBoxComponent(title, price, imgSrc, quantity) {
  return `
    <div class="cart-box">
      <img src=${imgSrc} alt="" class="cart-img">
        <div class="detail-box">
          <div class="cart-product-title">${title}</div>
          <div class="cart-price">${price}</div>
          <input type="number" value="${quantity}" class="cart-quantity">
        </div>
        <!-- REMOVE CART  -->
        <i class='bx bxs-trash-alt cart-remove'></i>
    </div>`;
}



// ========================== SEARCH BOX ===============================

document.getElementById('search').addEventListener('input', function() {
  const query = this.value.toLowerCase();
  const resultsDiv = document.getElementById('results');

  // List of products
  const products = [
    { name: 'Airpods Max', link: 'airpodmax.html' },
    { name: 'iPhone 14 (128GB)', link: 'iphone14.html' },
    { name: 'Apple Watch Series 9', link: 'applewatch9.html' },
    { name: 'iPad Air 5 (M1) 128GB', link: 'ipadair5.html' }
  ];

  // Filter products based on search query
  const results = products.filter(product => product.name.toLowerCase().startsWith(query) && query.length > 0);

  // Display search results
  resultsDiv.innerHTML = '';
  if (query && results.length > 0) {
    resultsDiv.style.display = 'block';
    results.forEach(result => {
      const div = document.createElement('div');
      const link = document.createElement('a');
      link.textContent = result.name;
      link.href = result.link;
      div.appendChild(link);
      resultsDiv.appendChild(div);
    });
  } else {
      resultsDiv.style.display = 'none';
    }
});



// ======================= HOVER CONTAINER ===================================

const allHoverImages4 = document.querySelectorAll('.hover-container div img');
const imgContainer4 = document.querySelector('.img-container4');

window.addEventListener('DOMContentLoaded', () => {
  allHoverImages4[0].parentElement.classList.add('active');
});

allHoverImages4.forEach((image) => {
  image.parentElement.addEventListener('click', () =>{
    imgContainer4.querySelector('img').src = image.src;
    resetActiveImg();
    image.parentElement.classList.add('active');
  });
});

function resetActiveImg(){
  allHoverImages4.forEach((img) => {
    img.parentElement.classList.remove('active');
  });
}



// ==================== MENU ICON ========================

const miniMenuIcon = document.querySelector("#menu-icon");
const minimenu = document.querySelector(".minimenu");
const closeminiMenu = document.querySelector("#menupid");

miniMenuIcon.addEventListener("click", () => {
  minimenu.classList.add("perd");
});

closeminiMenu.addEventListener("click", () => {
  minimenu.classList.remove("perd");
});



// ==================== SEARCH ICON ==========================

const miniSearchIcon = document.querySelector("#search-icon");
const minisearch = document.querySelector(".minisearch");

miniSearchIcon.addEventListener("click", () => {
  minisearch.classList.toggle("now");
});

// Close mini search if width is >= 1001px
function checkWidthAndClose() {
  if (window.innerWidth >= 1001) {
    minisearch.classList.remove("now");
  }
}

window.addEventListener("resize", checkWidthAndClose);
window.addEventListener("load", checkWidthAndClose);



// ============================ MINI SEARCH BOX ==================================

document.getElementById('searchmini-input').addEventListener('input', function() {

  const query = this.value.toLowerCase();
  const resultsDiv = document.getElementById('resultsmini');

  // List of products
  const products = [
    { name: 'Airpods Max', link: 'airpodmax.html' },
    { name: 'iPhone 14 (128GB)', link: 'iphone14.html' },
    { name: 'Apple Watch Series 9', link: 'applewatch9.html' },
    { name: 'iPad Air 5 (M1) 128GB', link: 'ipadair5.html' }
  ];

  // Filter products based on the query
  const results = products.filter(product => product.name.toLowerCase().startsWith(query) && query.length > 0);

  // Display search results
  resultsDiv.innerHTML = '';
  if (query && results.length > 0) {
    resultsDiv.style.display = 'block';
    results.forEach(result => {
      const div = document.createElement('div');
      const link = document.createElement('a');
      link.textContent = result.name;
      link.href = result.link;
      div.appendChild(link);
      resultsDiv.appendChild(div);
    });
  } else {
      resultsDiv.style.display = 'none';
    }
});



// =================== CLEAR MINI SEARCH BOX RESULT =======================

document.getElementById('searchpid').addEventListener('click', function() {

  const searchInput = document.getElementById('searchmini-input');
  const resultsDiv = document.getElementById('resultsmini');

  searchInput.value = '';
  resultsDiv.innerHTML = '';
  resultsDiv.style.display = 'none';
});