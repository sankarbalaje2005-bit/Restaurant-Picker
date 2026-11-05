import { useState } from "react";
import RestaurantCard from "./components/RestaurantCard";
import "./App.css";

const restaurants = [
  {
    id: 1,
    name: "Spice Garden",
    cuisine: "Indian",
    price: "Moderate",
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 2,
    name: "Pizza Corner",
    cuisine: "Italian",
    price: "Premium",
    rating: 4.3,
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=85",
  },

  {
    id: 3,
    name: "Wok Express",
    cuisine: "Chinese",
    price: "Budget",
    rating: 4.1,
    image:
      "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=900&q=85",
  },

  {
    id: 4,
    name: "Coromandel Cafe",
    cuisine: "Continental",
    price: "Premium",
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=900&q=85",
  },
];

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCuisine, setSelectedCuisine] = useState("All");
  const [selectedPrice, setSelectedPrice] = useState("All");
  const [selectedRestaurantId, setSelectedRestaurantId] = useState(null);

  function handlePick(restaurantId) {
    setSelectedRestaurantId((currentId) =>
      currentId === restaurantId ? null : restaurantId,
    );
  }

  function handleClearFilters() {
    setSearchTerm("");
    setSelectedCuisine("All");
    setSelectedPrice("All");
  }

  const hasActiveFilters =
    searchTerm !== "" || selectedCuisine !== "All" || selectedPrice !== "All";

  const filteredRestaurants = restaurants.filter((restaurant) => {
    const searchText = searchTerm.toLowerCase();

    const matchesSearch =
      restaurant.name.toLowerCase().includes(searchText) ||
      restaurant.cuisine.toLowerCase().includes(searchText);

    const matchesCuisine =
      selectedCuisine === "All" || restaurant.cuisine === selectedCuisine;

    const matchesPrice =
      selectedPrice === "All" || restaurant.price === selectedPrice;

    return matchesSearch && matchesCuisine && matchesPrice;
  });

  return (
    <main className="app">
      <header>
        <p className="eyebrow">Find your next meal</p>
        <h1>Restaurant Picker</h1>
        <p>Search, filter, and shortlist a restaurant.</p>
      </header>

      <section className="filter-section">
        <div>
          <label htmlFor="restaurant-search">Search restaurants</label>

          <input
            id="restaurant-search"
            type="search"
            placeholder="Try Indian or Pizza..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="cuisine-filter">Cuisine</label>

          <select
            id="cuisine-filter"
            value={selectedCuisine}
            onChange={(event) => setSelectedCuisine(event.target.value)}
          >
            <option value="All">All cuisines</option>
            <option value="Indian">Indian</option>
            <option value="Italian">Italian</option>
            <option value="Chinese">Chinese</option>
            <option value="Continental">Continental</option>
          </select>
        </div>

        <div>
          <label htmlFor="price-filter">Price</label>

          <select
            id="price-filter"
            value={selectedPrice}
            onChange={(event) => setSelectedPrice(event.target.value)}
          >
            <option value="All">All prices</option>
            <option value="Budget">Budget</option>
            <option value="Moderate">Moderate</option>
            <option value="Premium">Premium</option>
          </select>
        </div>

        <button
          type="button"
          className="clear-button"
          onClick={handleClearFilters}
          disabled={!hasActiveFilters}
        >
          Clear filters
        </button>
      </section>

      <section className="restaurant-list">
        {filteredRestaurants.map((restaurant) => (
          <RestaurantCard
            key={restaurant.id}
            restaurant={restaurant}
            isSelected={selectedRestaurantId === restaurant.id}
            onPick={handlePick}
          />
        ))}
      </section>

      {filteredRestaurants.length === 0 && (
        <p className="empty-message">
          No restaurants match the selected filters.
        </p>
      )}
    </main>
  );
}

export default App;
