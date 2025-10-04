import {useContext} from 'react'
import CartContext from '../../context/CartContext'
import './index.css'

const URL =
  'https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png'

const CartRoute = () => {
  const {
    cartItems,
    incrementCartItemQuantity,
    decrementCartItemQuantity,
    removeAllCartItems,
  } = useContext(CartContext)

  if (cartItems.length === 0) {
    return (
      <div className="cart-empty" data-testid="cart">
        <img src={URL} alt="empty cart" />
      </div>
    )
  }

  return (
    <div className="cart-items-container" data-testid="cart">
      <button
        type="button"
        className="remove-all-button"
        onClick={removeAllCartItems}
      >
        Remove All
      </button>

      {cartItems.map(item => (
        <div className="cart-item" key={item.id}>
          <img
            src={item.dishImage}
            alt={item.dishName}
            className="cart-item-image"
          />
          <p className="cart-item-name">{item.dishName}</p>

          <div className="quantity-buttons">
            <button
              type="button"
              onClick={() => decrementCartItemQuantity(item.id)}
              className="decrement-button"
              data-testid={`decrement-${item.id}`}
            >
              -
            </button>
            <p data-testid={`quantity-${item.id}`} className="item-quantity">
              {item.quantity}
            </p>
            <button
              type="button"
              onClick={() => incrementCartItemQuantity(item.id)}
              className="increment-button"
              data-testid={`increment-${item.id}`}
            >
              +
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default CartRoute
