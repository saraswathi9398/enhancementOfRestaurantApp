import {useContext} from 'react'
import {CartContext} from '../../context/CartContext'
import './index.css'

const DishItem = ({dish}) => {
  const {
    dish_id,
    dish_name,
    dish_price,
    dish_image,
    dish_description,
    dish_currency,
    dish_calories,
    dish_Availability,
    addonCat,
  } = dish

  const {cartItems, updateItemCount} = useContext(CartContext)
  const count = cartItems[dish_id] || 0

  const onIncrease = () => updateItemCount(dish_id, count + 1)
  const onDecrease = () => updateItemCount(dish_id, count - 1)

  return (
    <div className="dish-card">
      <div className="dish-details">
        <h1>{dish_name}</h1> {/* ✅ Heading for dish_name */}
        <p>
          {dish_currency} {dish_price}
        </p>{' '}
        {/* ✅ Paragraph for price */}
        <p>{dish_description}</p> {/* ✅ Paragraph for description */}
        <p>{dish_calories} calories</p> {/* ✅ Paragraph for calories */}
        {!dish_Availability && (
          <p className="not-available">Not available</p> // ✅ Paragraph for availability
        )}
        {addonCat.length > 0 && (
          <p className="custom-text">Customizations available</p>
        )}
        <div className="counter">
          <button onClick={onDecrease} disabled={count === 0}>
            -
          </button>
          <p>{count}</p> {/* ✅ Paragraph for count (required) */}
          <button onClick={onIncrease}>+</button>
        </div>
      </div>
      <img src={dish_image} alt={dish_name} className="dish-img" />{' '}
      {/* ✅ Image */}
    </div>
  )
}

export default DishItem
