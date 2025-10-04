import './index.css'

const DishItem = ({dish, quantity, onIncrement, onDecrement}) => {
  const {
    dishId,
    dish_name: dishName,
    dish_currency: dishCurrency,
    dish_price: dishPrice,
    dish_description: dishDescription,
    dish_calories: dishCalories,
    dish_image: dishImage,
    dish_Availability: dishAvailability,
    addonCat,
  } = dish

  const hasCustomizations = Array.isArray(addonCat) && addonCat.length > 0

  return (
    <li className="dish-card">
      <img src={dishImage} alt={dishName} className="dish-img" />

      <div className="dish-content">
        <h1 className="dish-name">{dishName}</h1>
        <p className="dish-price">
          {dishCurrency} {dishPrice}
        </p>
        <p className="dish-desc">{dishDescription}</p>
        <p className="dish-cal">{dishCalories} calories</p>

        {dishAvailability ? (
          <div className="qty-controls">
            <button
              type="button"
              onClick={() => onDecrement(dishId)}
              className="qty-btn"
            >
              -
            </button>
            <p className="qty-count">{quantity}</p>
            <button
              type="button"
              onClick={() => onIncrement(dishId)}
              className="qty-btn"
            >
              +
            </button>
          </div>
        ) : (
          <p className="not-avail">Not available</p>
        )}

        {quantity > 0 && dishAvailability && (
          <button type="button" className="add-cart-btn">
            ADD TO CART
          </button>
        )}

        {hasCustomizations && (
          <p className="custom">Customizations available</p>
        )}
      </div>
    </li>
  )
}

export default DishItem
