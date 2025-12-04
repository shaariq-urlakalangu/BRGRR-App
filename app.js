// Step 1: Define toppings
const toppings = [
  { name: "Cheese", price: 20 },
  { name: "Bacon", price: 30 },
  { name: "Lettuce", price: 10 },
  //  Add more if you like
];

// Step 2: Select elements
const toppingsArea = document.getElementById("toppings");
const burgerList = document.getElementById("burger-list");
const priceSpan = document.getElementById("price");

let totalPrice = 0;
let currentToppings=[];
// Step 3: Create buttons dynamically
toppings.forEach(topping => {
  const btn = document.createElement("button");
  btn.textContent = `${topping.name} (₹${topping.price})`;

  // Step 4: Handle clicks
  btn.addEventListener("click", () => {
    //  Add topping to list
    let toppingLi=topping.name;
    let n=document.createElement("li");
    n.textContent=toppingLi;
    burgerList.appendChild(n);
    // Increase total price
    totalPrice+=topping.price;
    currentToppings.push(toppingLi);
    //  Update price display
    priceSpan.textContent=totalPrice;
  });

  toppingsArea.appendChild(btn);
});

// Collect current burger
const burger = {
  toppings: currentToppings,   // e.g. ["Cheese", "Bacon"]
  price: totalPrice            // e.g. 50
};

// Get existing favorites or start empty
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

// Add new burger combo
favorites.push(burger);

// Save back to localStorage
localStorage.setItem("favorites", JSON.stringify(favorites));

function showRecommendations() {
  const container = document.getElementById("recommendations");
  container.innerHTML = "";

  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  favorites.forEach((combo, index) => {
    const btn = document.createElement("button");
    btn.textContent = `${combo.toppings.join(" + ")} (₹${combo.price})`;

    btn.addEventListener("click", () => loadCombo(combo));
    container.appendChild(btn);
  });
}

function loadCombo(combo) {
  burgerList.innerHTML = "";
  totalPrice = combo.price;

  combo.toppings.forEach(topping => {
    const li = document.createElement("li");
    li.textContent = topping;
    burgerList.appendChild(li);
  });

  document.getElementById("price").textContent = totalPrice;
}

const form = document.getElementById("burger-form");
const bunSelect = document.getElementById("bun");
const feedback = document.getElementById("form-feedback");

form.addEventListener("submit", function(event) {
  event.preventDefault(); // prevent page reload
  if (bunSelect.value === "") {
    feedback.textContent = "Please select a bun before building your burger!";
    feedback.style.color = "red";
  } else {
    feedback.textContent = "Great choice! Building your burger...";
    feedback.style.color = "green";
  }
});

bunSelect.addEventListener("change", function() {
  if (bunSelect.value === "") {
    feedback.textContent = "Bun type is required.";
    feedback.style.color = "red";
  } else {
    feedback.textContent = "Looks good!";
    feedback.style.color = "green";
  }
});