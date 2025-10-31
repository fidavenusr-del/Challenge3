const productBox = document.getElementById("productBox");
const cartBox = document.getElementById("cartBox");
const cartBtn = document.getElementById("cartBtn");
const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");
const checkoutBtn = document.getElementById("checkoutBtn");

let cartList = [];
let currentProduct = null;
let cartVisible = false;

function updateCart() {
  cartItems.innerHTML = "";
  let total = 0;
  cartList.forEach(item => {
    total += item.price;
    cartItems.innerHTML += `<div class="cart-item">
        <strong>${item.title}</strong><br>$${item.price.toFixed(2)}
      </div>`;
  });

  cartTotal.textContent = total.toFixed(2);
  cartCount.textContent = cartList.length;
}


cartBtn.addEventListener("click", () => {
  cartVisible = !cartVisible;
  if (cartVisible) {
  cartBox.classList.add("open");
} else {
  cartBox.classList.remove("open");
}
});


checkoutBtn.addEventListener("click", () => {
  if (cartList.length === 0) {
    alert("Cart is empty!");
  } else {
    alert("FunkyFab says: Product checked out successfully!");
    cartList = [];
    updateCart();
    cartBox.classList.remove("open");
    cartVisible = false;
  }
});

function showProduct(p) {
  currentProduct = p;
  productBox.innerHTML = `<img src="${p.image}" alt="${p.title}">
    <div class="details">
      <h2>${p.title}</h2>
      <p><b>${p.category}</b></p>
      <p>${p.description}</p>
      <p class="price">$${p.price.toFixed(2)}</p>
      <button class="btn add-btn" id="addBtn">Add to Cart</button>
      <button class="btn buy-btn" id="buyBtn">Buy Now</button>
    </div>`;


  document.getElementById("addBtn").addEventListener("click", () => {
    cartList.push(p);
    updateCart();
    alert(`${p.title} added to cart!`);
  });

  
  document.getElementById("buyBtn").addEventListener("click", () => {
    cartList.push(p);
    updateCart();
    cartBox.classList.add("open");
    cartVisible = true;
  });
}


async function apiCallForAProduct(id) {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  const data = await res.json();
  showProduct(data);
}

apiCallForAProduct(7);