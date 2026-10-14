/* =========================================================
   MICHAEL DEALERSHIP
   VERSION 3.1
   COMPLETE WORKING JAVASCRIPT
========================================================= */


/* =========================================================
   CAR DATABASE
========================================================= */

const cars = [

    {
        id: 1,
        name: "BMW X5",
        category: "SUV",
        price: 85000000,
        image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=900&q=85",
        description: "A powerful luxury SUV combining performance, comfort and modern technology."
    },

    {
        id: 2,
        name: "Mercedes-Benz C-Class",
        category: "Sedan",
        price: 72000000,
        image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=900&q=85",
        description: "Elegant German engineering with premium comfort and exceptional driving performance."
    },

    {
        id: 3,
        name: "Porsche 911",
        category: "Sports",
        price: 150000000,
        image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=85",
        description: "An iconic sports car built for thrilling performance and unforgettable driving."
    },

    {
        id: 4,
        name: "Range Rover Autobiography",
        category: "Luxury",
        price: 180000000,
        image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=900&q=85",
        description: "Premium luxury SUV offering refined comfort, technology and commanding presence."
    },

    {
        id: 5,
        name: "Toyota Hilux",
        category: "Truck",
        price: 65000000,
        image: "https://images.unsplash.com/photo-1551830820-330a71b99659?auto=format&fit=crop&w=900&q=85",
        description: "A dependable pickup truck designed for strength, reliability and everyday work."
    },

    {
        id: 6,
        name: "Tesla Model S",
        category: "Electric",
        price: 95000000,
        image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=900&q=85",
        description: "A high-performance electric vehicle combining technology, range and acceleration."
    },

    {
        id: 7,
        name: "Audi Q8",
        category: "SUV",
        price: 88000000,
        image: "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=900&q=85",
        description: "A stylish premium SUV with sophisticated design and advanced technology."
    },

    {
        id: 8,
        name: "Lamborghini Huracan",
        category: "Sports",
        price: 250000000,
        image: "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=900&q=85",
        description: "An exotic Italian supercar built for breathtaking speed and dramatic performance."
    },

    {
        id: 9,
        name: "Toyota Camry",
        category: "Sedan",
        price: 55000000,
        image: "https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=900&q=85",
        description: "A reliable and comfortable sedan perfect for everyday driving."
    },

    {
        id: 10,
        name: "Mercedes-Benz G-Wagon",
        category: "Luxury",
        price: 210000000,
        image: "https://images.unsplash.com/photo-1520031441872-265e4ff70366?auto=format&fit=crop&w=900&q=85",
        description: "An unmistakable luxury SUV combining rugged capability with premium design."
    },

    {
        id: 11,
        name: "Ford F-150",
        category: "Truck",
        price: 75000000,
        image: "https://images.unsplash.com/photo-1592840496694-26c035b52b48?auto=format&fit=crop&w=900&q=85",
        description: "A legendary pickup offering impressive capability, power and practicality."
    },

    {
        id: 12,
        name: "Porsche Taycan",
        category: "Electric",
        price: 130000000,
        image: "https://images.unsplash.com/photo-1614200179396-2bdb77ebf81b?auto=format&fit=crop&w=900&q=85",
        description: "A premium electric sports sedan delivering instant power and futuristic technology."
    }

];


/* =========================================================
   DOM ELEMENTS
========================================================= */

const carsContainer = document.getElementById("carsContainer");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const carFound = document.getElementById("carFound");
const clearSearch = document.getElementById("clearSearch");
const resetFilters = document.getElementById("resetFilters");

const openCart = document.getElementById("openCart");
const closeCart = document.getElementById("closeCart");
const cartSidebar = document.getElementById("cartSidebar");
const cartOverlay = document.getElementById("cartOverlay");
const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");
const checkoutButton = document.getElementById("checkoutButton");

const modalOverlay = document.getElementById("modalOverlay");
const closeModal = document.getElementById("closeModal");
const modalImage = document.getElementById("modalImage");
const modalName = document.getElementById("modalName");
const modalCategory = document.getElementById("modalCategory");
const modalPrice = document.getElementById("modalPrice");
const modalDescription = document.getElementById("modalDescription");
const modalAddCart = document.getElementById("modalAddCart");

const contactForm = document.getElementById("contactForm");
const contactCar = document.getElementById("contactCar");
const formStatus = document.getElementById("formStatus");

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");


/* =========================================================
   APPLICATION STATE
========================================================= */

let cart = loadStorage("michaelCart", []);
let favorites = loadStorage("michaelFavorites", []);
let selectedModalCar = null;


/* =========================================================
   LOCAL STORAGE HELPER
========================================================= */

function loadStorage(key, fallback) {

    try {

        const saved = localStorage.getItem(key);

        if (!saved) {
            return fallback;
        }

        return JSON.parse(saved);

    } catch (error) {

        console.error(`Could not load ${key}:`, error);
        return fallback;

    }

}


/* =========================================================
   PRICE FORMATTER
========================================================= */

function formatPrice(price) {

    return new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
        maximumFractionDigits: 0
    }).format(price);

}


/* =========================================================
   RENDER INVENTORY
========================================================= */

function renderCars(carList) {

    carsContainer.innerHTML = "";

    carFound.textContent = `${carList.length} vehicle${carList.length === 1 ? "" : "s"} found`;

    if (carList.length === 0) {

        carsContainer.innerHTML = `
            <div class="no-results">
                <i class="fa-solid fa-car-side"></i>
                <h3>No vehicles found</h3>
                <p>Try another search term or category.</p>
            </div>
        `;

        return;
    }

    carList.forEach(function(car) {

        const card = document.createElement("article");
        card.className = "car-card";

        const isFavorite = favorites.includes(car.id);

        card.innerHTML = `
            <div class="car-image">
                <img src="${car.image}" alt="${car.name}" loading="lazy">
                <button type="button" class="favorite-btn ${isFavorite ? "active" : ""}" data-action="favorite" data-id="${car.id}" aria-label="Favorite ${car.name}">
                    <i class="fa-solid fa-heart"></i>
                </button>
            </div>

            <div class="car-info">
                <span class="car-category">${car.category}</span>
                <h3>${car.name}</h3>
                <p class="car-description">${car.description}</p>

                <div class="car-bottom">
                    <strong class="car-price">${formatPrice(car.price)}</strong>

                    <div class="car-actions">
                        <button type="button" class="details-btn" data-action="details" data-id="${car.id}" aria-label="View ${car.name}">
                            <i class="fa-solid fa-eye"></i>
                        </button>

                        <button type="button" class="add-cart-btn" data-action="add" data-id="${car.id}" aria-label="Add ${car.name} to cart">
                            <i class="fa-solid fa-cart-plus"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;

        carsContainer.appendChild(card);

    });

}


/* =========================================================
   SEARCH + CATEGORY FILTER
========================================================= */

function filterCars() {

    const searchTerm = searchInput.value.toLowerCase().trim();
    const selectedCategory = categoryFilter.value;

    const filteredCars = cars.filter(function(car) {
        const searchableText = [car.name, car.category, car.description].join(" ").toLowerCase();
        const matchesSearch = searchTerm === "" || searchableText.includes(searchTerm);
        const matchesCategory = selectedCategory === "all" || car.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    renderCars(filteredCars);

    clearSearch.classList.toggle("visible", searchInput.value.trim() !== "");
}

searchInput.addEventListener("input", filterCars);
categoryFilter.addEventListener("change", filterCars);

clearSearch.addEventListener("click", function() {
    searchInput.value = "";
    filterCars();
    searchInput.focus();
});

resetFilters.addEventListener("click", function() {
    searchInput.value = "";
    categoryFilter.value = "all";
    filterCars();
});


/* =========================================================
   INVENTORY BUTTON EVENTS
========================================================= */

carsContainer.addEventListener("click", function(event) {

    const button = event.target.closest("button");

    if (!button) {
        return;
    }

    const id = Number(button.dataset.id);
    const action = button.dataset.action;

    if (action === "favorite") {
        toggleFavorite(id);
    }

    if (action === "details") {
        openCarDetails(id);
    }

    if (action === "add") {
        addToCart(id);
    }

});


/* =========================================================
   FAVORITES
========================================================= */

function toggleFavorite(id) {

    const index = favorites.indexOf(id);

    if (index !== -1) {
        favorites.splice(index, 1);
    } else {
        favorites.push(id);
    }

    localStorage.setItem("michaelFavorites", JSON.stringify(favorites));
    filterCars();

}


/* =========================================================
   ADD TO CART
========================================================= */

function addToCart(id) {

    const existing = cart.find(function(item) {
        return item.id === id;
    });

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ id: id, quantity: 1 });
    }

    saveCart();
    renderCart();
    openCartSidebar();

}


/* =========================================================
   REMOVE CART ITEM
========================================================= */

function removeFromCart(id) {

    cart = cart.filter(function(item) {
        return item.id !== id;
    });

    saveCart();
    renderCart();

}


/* =========================================================
   CHANGE QUANTITY
========================================================= */

function changeQuantity(id, amount) {

    const item = cart.find(function(cartItem) {
        return cartItem.id === id;
    });

    if (!item) {
        return;
    }

    item.quantity += amount;

    if (item.quantity <= 0) {
        removeFromCart(id);
        return;
    }

    saveCart();
    renderCart();

}


/* =========================================================
   SAVE CART
========================================================= */

function saveCart() {
    localStorage.setItem("michaelCart", JSON.stringify(cart));
}


/* =========================================================
   RENDER CART
========================================================= */

function renderCart() {

    cartItems.innerHTML = "";

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <div class="empty-cart">
                <i class="fa-solid fa-cart-shopping"></i>
                <h3>Your cart is empty</h3>
                <p>Add a vehicle to get started.</p>
            </div>
        `;

        cartCount.textContent = "0";
        cartTotal.textContent = formatPrice(0);
        return;
    }

    let total = 0;
    let quantityTotal = 0;

    cart.forEach(function(item) {

        const car = cars.find(function(vehicle) {
            return vehicle.id === item.id;
        });

        if (!car) {
            return;
        }

        const itemTotal = car.price * item.quantity;
        total += itemTotal;
        quantityTotal += item.quantity;

        const cartItem = document.createElement("div");
        cartItem.className = "cart-item";

        cartItem.innerHTML = `
            <img src="${car.image}" alt="${car.name}">

            <div>
                <h4>${car.name}</h4>
                <p class="cart-item-price">${formatPrice(car.price)}</p>

                <div class="cart-controls">
                    <button type="button" data-action="decrease" data-id="${car.id}">-</button>
                    <span>${item.quantity}</span>
                    <button type="button" data-action="increase" data-id="${car.id}">+</button>
                    <button type="button" class="remove-item" data-action="remove" data-id="${car.id}" aria-label="Remove ${car.name}">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            </div>
        `;

        cartItems.appendChild(cartItem);
    });

    cartCount.textContent = quantityTotal;
    cartTotal.textContent = formatPrice(total);

}


/* =========================================================
   CART BUTTON EVENTS
========================================================= */

cartItems.addEventListener("click", function(event) {

    const button = event.target.closest("button");

    if (!button) {
        return;
    }

    const id = Number(button.dataset.id);
    const action = button.dataset.action;

    if (action === "increase") {
        changeQuantity(id, 1);
    }

    if (action === "decrease") {
        changeQuantity(id, -1);
    }

    if (action === "remove") {
        removeFromCart(id);
    }

});


/* =========================================================
   OPEN CART
========================================================= */

function openCartSidebar() {
    cartSidebar.classList.add("active");
    cartOverlay.classList.add("active");
    document.body.classList.add("no-scroll");
}


/* =========================================================
   CLOSE CART
========================================================= */

function closeCartSidebar() {
    cartSidebar.classList.remove("active");
    cartOverlay.classList.remove("active");
    document.body.classList.remove("no-scroll");
}

openCart.addEventListener("click", openCartSidebar);
closeCart.addEventListener("click", closeCartSidebar);
cartOverlay.addEventListener("click", closeCartSidebar);


/* =========================================================
   CAR DETAILS
========================================================= */

function openCarDetails(id) {

    const car = cars.find(function(vehicle) {
        return vehicle.id === id;
    });

    if (!car) {
        return;
    }

    selectedModalCar = car;

    modalImage.src = car.image;
    modalImage.alt = car.name;
    modalName.textContent = car.name;
    modalCategory.textContent = car.category;
    modalPrice.textContent = formatPrice(car.price);
    modalDescription.textContent = car.description;

    modalOverlay.classList.add("active");
    document.body.classList.add("no-scroll");

}


/* =========================================================
   CLOSE MODAL
========================================================= */

function closeCarDetails() {
    modalOverlay.classList.remove("active");
    document.body.classList.remove("no-scroll");
    selectedModalCar = null;
}

closeModal.addEventListener("click", closeCarDetails);

modalOverlay.addEventListener("click", function(event) {
    if (event.target === modalOverlay) {
        closeCarDetails();
    }
});


/* =========================================================
   MODAL ADD TO CART
========================================================= */

modalAddCart.addEventListener("click", function() {
    if (!selectedModalCar) {
        return;
    }

    addToCart(selectedModalCar.id);
    closeCarDetails();
});


/* =========================================================
   CATEGORY CARDS
========================================================= */

document.querySelectorAll(".category-card").forEach(function(card) {
    card.addEventListener("click", function() {
        const category = card.dataset.category;

        searchInput.value = "";
        categoryFilter.value = category;
        filterCars();

        document.getElementById("inventory").scrollIntoView({
            behavior: "smooth"
        });
    });
});


/* =========================================================
   CONTACT CAR DROPDOWN
========================================================= */

cars.forEach(function(car) {
    const option = document.createElement("option");
    option.value = car.name;
    option.textContent = car.name;
    contactCar.appendChild(option);
});


/* =========================================================
   CONTACT FORM
========================================================= */

contactForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const submitButton = contactForm.querySelector('button[type="submit"]');
    const name = document.getElementById("contactName").value.trim();

    if (!name) {
        formStatus.textContent = "Please enter your name.";
        formStatus.className = "form-status error";
        return;
    }

    submitButton.disabled = true;
    formStatus.textContent = "Sending your message...";
    formStatus.className = "form-status";

    fetch(contactForm.action, {
        method: "POST",
        body: new FormData(contactForm),
        headers: {
            Accept: "application/json"
        }
    })
        .then(function(response) {
            if (!response.ok) {
                throw new Error("Message could not be sent.");
            }

            return response.json();
        })
        .then(function() {
            formStatus.textContent = `Thank you, ${name}! Your message has been sent.`;
            formStatus.className = "form-status success";
            contactForm.reset();
        })
        .catch(function() {
            formStatus.textContent = "We could not send your message. Please try again.";
            formStatus.className = "form-status error";
        })
        .finally(function() {
            submitButton.disabled = false;
        });
});


/* =========================================================
   CHECKOUT
========================================================= */

checkoutButton.addEventListener("click", function() {

    if (cart.length === 0) {
        alert("Your cart is empty. Please add a vehicle first.");
        return;
    }

    let message = "Hello Michael Dealership,%0A%0A";
    message += "I am interested in:%0A";

    let total = 0;

    cart.forEach(function(item) {
        const car = cars.find(function(vehicle) {
            return vehicle.id === item.id;
        });

        if (!car) {
            return;
        }

        const itemTotal = car.price * item.quantity;
        total += itemTotal;
        message += `- ${car.name} x ${item.quantity}%0A`;
    });

    message += `%0ATotal: ${formatPrice(total)}%0A%0A`;
    message += "Please provide more information about purchasing these vehicles.";

    const whatsappUrl = `https://wa.me/2348123682308?text=${message}`;
    window.open(whatsappUrl, "_blank");
});


/* =========================================================
   MOBILE MENU
========================================================= */

menuBtn.addEventListener("click", function() {
    navLinks.classList.toggle("active");
});

navLinks.querySelectorAll("a").forEach(function(link) {
    link.addEventListener("click", function() {
        navLinks.classList.remove("active");
    });
});


/* =========================================================
   ESCAPE KEY
========================================================= */

document.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
        closeCartSidebar();
        closeCarDetails();
        navLinks.classList.remove("active");
    }
});


/* =========================================================
   INITIALIZE
========================================================= */

renderCars(cars);
renderCart();
