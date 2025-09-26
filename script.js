// EV Explorer - Full JS
document.addEventListener("DOMContentLoaded", () => {
  const carList = document.getElementById("car-list");
  const searchInput = document.getElementById("search");
  const sortSelect = document.getElementById("sort");

  let carsData = [];
  let favorites = new Set();

  // Fetch car data from local JSON or public API
  fetch("./cars.json")
    .then(res => res.json())
    .then(data => {
      carsData = data;
      renderCars(carsData);
    })
    .catch(err => console.error("Error fetching cars:", err));
https://dashboard.render.com/web/srv-d3bekiali9vc738jnk00/deploys/dep-d3bekiqli9vc738jnk90
  // ===== Event Listeners =====
  // 1. Search filter
  searchInput.addEventListener("input", e => {
    const query = e.target.value.toLowerCase();
    const filtered = carsData.filter(car =>
      car.name.toLowerCase().includes(query)
    );
    renderCars(filtered);
  });

  // 2. Sort dropdown
  sortSelect.addEventListener("change", e => {
    let sorted = [...carsData];
    if (e.target.value === "price") {
      sorted.sort((a, b) => a.price - b.price);
    } else if (e.target.value === "range") {
      sorted.sort((a, b) => b.range - a.range);
    }
    renderCars(sorted);
  });

  // 3. Favorite button handled dynamically
  carList.addEventListener("click", e => {
    if (e.target.classList.contains("fav-btn")) {
      const carId = parseInt(e.target.dataset.id);
      if (favorites.has(carId)) {
        favorites.delete(carId);
      } else {
        favorites.add(carId);
      }
      renderCars(carsData);
    }
  });

  // ===== Helper Functions =====
  function renderCars(cars) {
    carList.innerHTML = "";
    cars.forEach(car => {
      const card = document.createElement("div");
      card.className = "car-card";
      card.innerHTML = `
        <img src="${car.image}" alt="${car.name}" class="car-img">
        <h3>${car.name}</h3>
        <p>Range: ${car.range} miles</p>
        <p>Price: $${car.price.toLocaleString()}</p>
        <button class="fav-btn" data-id="${car.id}">
          ${favorites.has(car.id) ? "Favorited" : "Add to Favorites"}
        </button>
      `;
      carList.appendChild(card);
    });
  }
});