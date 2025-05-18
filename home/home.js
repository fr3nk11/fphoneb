const images = [
  "/img/goglepixel9.jpg",
  "/img/airpodspro2.jpg",
  "/img/applewatch10.jpg",
  "/img/ipadair.jpg",
  "/img/samsung24ultra.jpg"
];

let currentIndex = 0;
const sliderImage = document.getElementById("slider-image");

function prevImage() {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  sliderImage.src = images[currentIndex];
  sliderImage.style.opacity = 0;
  setTimeout(() => {
    sliderImage.style.opacity = 1;
  }, 100);
}

function nextImage() {
  currentIndex = (currentIndex + 1) % images.length;
  sliderImage.src = images[currentIndex];
  sliderImage.style.opacity = 0;
  setTimeout(() => {
    sliderImage.style.opacity = 1;
  }, 100);
}

// Funksioni për hapjen e popup
function openPopup(title, imageSrc) {
  const popup = document.getElementById("product-popup");
  const popupTitle = document.getElementById("popup-title");
  const popupImage = document.getElementById("popup-image");

  popupTitle.textContent = title;
  popupImage.src = imageSrc;
  popup.style.display = "flex";
}

// Funksioni për mbylljen e popup
function closePopup() {
  const popup = document.getElementById("product-popup");
  popup.style.display = "none";
}

// Lidhja e klikimeve të produkteve me popup
document.querySelectorAll(".product").forEach(product => {
  product.addEventListener("click", (e) => {
    e.preventDefault();
    const productTitle = product.querySelector("p").textContent;
    const productImage = product.querySelector("img").src;
    openPopup(productTitle, productImage);
  });
});

// Lidhja e butonit të mbylljes
document.querySelector(".close-btn").addEventListener("click", closePopup);

// Mbyllja e popup kur klikohet jashtë
window.addEventListener("click", (e) => {
  const popup = document.getElementById("product-popup");
  if (e.target === popup) {
    closePopup();
  }
});

// JavaScript për të ndaluar videot pas një herë shfaqjeje
window.addEventListener('load', () => {
  const videos = document.querySelectorAll('video');
  
  videos.forEach(video => {
    video.play();
    video.onended = () => {
      video.pause();
    };
  });
});

// Lista e produkteve në shportë
let cartItems = [];

// Funksioni për shtimin e produktit në shportë
function addToCart(productTitle, memory, condition) {
  cartItems.push({ title: productTitle, memory: memory, condition: condition });
  updateCartDropdown();
}

// Funksioni për përditësimin e dropdown list të shportës
function updateCartDropdown() {
  const cartItemsContainer = document.getElementById("cart-items");
  cartItemsContainer.innerHTML = "";

  cartItems.forEach((item, index) => {
    const productDiv = document.createElement("div");
    productDiv.textContent = `${item.title} - ${item.memory} - ${item.condition}`;
    cartItemsContainer.appendChild(productDiv);
  });

  if (cartItems.length > 0) {
    document.getElementById("cart-dropdown").style.display = "block";
  } else {
    document.getElementById("cart-dropdown").style.display = "none";
  }
}

// Lidhja e butonit "Add to Cart" me funksionin e shtimit në shportë
document.getElementById("add-to-cart-btn").addEventListener("click", () => {
  const selectedMemory = document.querySelector('input[name="memory"]:checked');
  const selectedCondition = document.querySelector('input[name="condition"]:checked');

  if (!selectedMemory || !selectedCondition) {
    alert("Ju lutem zgjidhni memorien dhe gjendjen!");
    return;
  }

  const productTitle = document.getElementById("popup-title").textContent;
  addToCart(productTitle, selectedMemory.value, selectedCondition.value);
});

// Lidhja e ikonës së shportës për të hapur/mbyllur dropdown list
document.getElementById("cart-icon").addEventListener("click", (e) => {
  e.stopPropagation();
  const cartDropdown = document.getElementById("cart-dropdown");
  if (cartDropdown.style.display === "block") {
    cartDropdown.style.display = "none";
  } else {
    cartDropdown.style.display = "block";
  }
});

window.addEventListener("click", () => {
  document.getElementById("cart-dropdown").style.display = "none";
});

// Lidhja e butonit "Checkout"
document.getElementById("checkout-btn").addEventListener("click", () => {
  alert("Ju keni bërë checkout!");
  cartItems = [];
  updateCartDropdown();
});


