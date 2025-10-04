import {useContext} from 'react'
import CartContext from '../../context/CartContext'
import './index.css'

const CartItem = ({item}) => {
  const {updateItemCount} = useContext(CartContext)

  const onIncrease = () => {
    updateItemCount(item.dish_id, item.dish_quantity + 1)
  }

  const onDecrease = () => {
    if (item.dish_quantity > 1) {
      updateItemCount(item.dish_id, item.dish_quantity - 1)
    }
  }

  return (
    <li className="cart-item">
      <img
        src={item.dish_image}
        alt={item.dish_name}
        className="cart-item-img"
      />
      <div className="cart-item-details">
        <h3 className="cart-item-name">{item.dish_name}</h3>
        <p className="cart-item-price">₹{item.dish_price}</p>
        <div className="cart-item-quantity">
          <button className="qty-btn" onClick={onDecrease}>
            -
          </button>
          <span className="qty-count">{item.dish_quantity}</span>
          <button className="qty-btn" onClick={onIncrease}>
            +
          </button>
        </div>
      </div>
    </li>
  )
}

export default CartItem
