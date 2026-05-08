let products = [
  {
    id: 1,
    name: "Smartphone",
    price: 45000,
    img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=200&fit=crop",
  },
  {
    id: 2,
    name: "Wireless Earbuds",
    price: 3500,
    img: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=300&h=200&fit=crop",
  },
  {
    id: 3,
    name: "Smartwatch",
    price: 8000,
    img: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=300&h=200&fit=crop",
  },
  {
    id: 4,
    name: "Gaming Laptop",
    price: 65000,
    img: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop",
  },
  {
    id: 5,
    name: "Power Bank",
    price: 1500,
    img: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=300&h=200&fit=crop",
  },
  {
    id: 6,
    name: "Bluetooth Speaker",
    price: 2500,
    img: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300&h=200&fit=crop",
  },
];

let myCart = [];
let savedCart = localStorage.getItem("myZenitCart");

if (savedCart !== null) {
  myCart = JSON.parse(savedCart);
}

function toggleCart() {
  let drawer = document.getElementById("cart-drawer");
  let overlay = document.getElementById("cart-overlay");

  if (drawer.className === "cart-drawer open") {
    drawer.className = "cart-drawer";
    overlay.style.display = "none";
  } else {
    drawer.className = "cart-drawer open";
    overlay.style.display = "block";
  }
}

function showProducts() {
  let list = document.getElementById("product-list");
  list.innerHTML = "";

  for (let i = 0; i < products.length; i++) {
    let currentProduct = products[i];
    let inCart = false;

    for (let j = 0; j < myCart.length; j++) {
      if (myCart[j].id === currentProduct.id) {
        inCart = true;
      }
    }

    let buttonString = "";
    if (inCart === true) {
      buttonString = `<button class="add-btn" disabled>Already Added</button>`;
    } else {
      buttonString = `<button class="add-btn" onclick="addToCart(${currentProduct.id})">Add to Cart</button>`;
    }

    let card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
            <img src="${currentProduct.img}" class="product-image">
            <h3>${currentProduct.name}</h3>
            <p>P ${currentProduct.price.toLocaleString()}</p>
            ${buttonString}
        `;
    list.appendChild(card);
  }
}

function addToCart(id) {
  let selectedItem = null;

  for (let i = 0; i < products.length; i++) {
    if (products[i].id === id) {
      selectedItem = products[i];
    }
  }

  if (selectedItem !== null) {
    let newItem = {
      id: selectedItem.id,
      name: selectedItem.name,
      price: selectedItem.price,
      img: selectedItem.img,
      qty: 1,
    };
    myCart.push(newItem);
    updatePage();

    let drawer = document.getElementById("cart-drawer");
    if (drawer.className !== "cart-drawer open") {
      toggleCart();
    }
  }
}

function showCart() {
  let cartBox = document.getElementById("cart-items");
  let emptyMsg = document.getElementById("empty-message");
  let footer = document.getElementById("cart-footer");

  cartBox.innerHTML = "";
  let totalItems = 0;
  let totalPrice = 0;

  if (myCart.length === 0) {
    emptyMsg.style.display = "block";
    footer.style.display = "none";
  } else {
    emptyMsg.style.display = "none";
    footer.style.display = "block";

    for (let i = 0; i < myCart.length; i++) {
      let item = myCart[i];
      let itemTotal = item.price * item.qty;

      totalItems = totalItems + item.qty;
      totalPrice = totalPrice + itemTotal;

      let row = document.createElement("div");
      row.className = "cart-item";
      row.innerHTML = `
                <img src="${item.img}" class="cart-item-img">
                <div class="cart-item-details">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">P ${item.price.toLocaleString()}</div>
                </div>
                <div class="cart-item-controls">
                    <input type="number" class="qty-input" value="${item.qty}" min="1" onchange="changeQty(${item.id}, this.value)">
                    <button class="remove-btn" onclick="removeItem(${item.id})">X</button>
                </div>
            `;
      cartBox.appendChild(row);
    }
  }

  document.getElementById("cart-count").innerText = totalItems;
  document.getElementById("cart-total").innerText = totalPrice.toLocaleString();
}

function changeQty(id, newQty) {
  let value = parseInt(newQty);

  if (value <= 0) {
    removeItem(id);
  } else {
    for (let i = 0; i < myCart.length; i++) {
      if (myCart[i].id === id) {
        myCart[i].qty = value;
      }
    }
    updatePage();
  }
}

function removeItem(id) {
  let tempCart = [];

  for (let i = 0; i < myCart.length; i++) {
    if (myCart[i].id !== id) {
      tempCart.push(myCart[i]);
    }
  }

  myCart = tempCart;
  updatePage();
}

function checkout() {
  if (myCart.length > 0) {
    alert("Order placed! Thank you.");
    clearCart();
    toggleCart();
  }
}

function clearCart() {
  myCart = [];
  updatePage();
}

function updatePage() {
  localStorage.setItem("myZenitCart", JSON.stringify(myCart));
  showProducts();
  showCart();
}

showProducts();
showCart();
