// ================== IMG SLIDER ====================

var TrandingSlider = new Swiper('.tranding-slider', {
  effect: 'coverflow',
  grabCursor: true,
  centeredSlides: true,
  loop: true,
  slidesPerView: 'auto',
  coverflowEffect: {
    rotate: 0,
    stretch: 0,
    depth: 100,
    modifier: 2.5,
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  }
});



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