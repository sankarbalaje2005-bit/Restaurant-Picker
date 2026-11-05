function RestaurantCard({ restaurant, isSelected, onPick }) {
  return (
    <article
      className={`restaurant-card ${isSelected ? "selected" : ""}`}
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.15), rgba(0,0,0,0.85)), url("${restaurant.image}")`,
      }}
    >
      <h2>{restaurant.name}</h2>
      <p>Cuisine: {restaurant.cuisine}</p>
      <p>Price: {restaurant.price}</p>
      <p>Rating: {restaurant.rating} / 5</p>

      <button type="button" onClick={() => onPick(restaurant.id)}>
        {isSelected ? "Selected" : "Pick this restaurant"}
      </button>
    </article>
  );
}

export default RestaurantCard;
