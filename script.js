let orders = JSON.parse(sessionStorage.getItem("orders")) || [];

function saveOrder(burger) {
  orders.push(burger);
  sessionStorage.setItem("orders", JSON.stringify(orders));
}

function renderHistory() {
  let orderList = document.getElementById("orderHistory");
  orderList.innerHTML = "";
  orders.forEach((o, i) => {
    let li = document.createElement("li");
    li.textContent = `Order ${i+1}: ${o.bun} bun with ${o.toppings.join(", ")} – ₹${o.price}`;
    orderList.appendChild(li);
  });
}