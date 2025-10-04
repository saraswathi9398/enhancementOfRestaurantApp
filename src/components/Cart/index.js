import {useContext} from 'react'
import CartContext from '../../context/CartContext'
import './index.css'

const CartItem = ({item, onInc, onDec}) => (
  <li className="cart-item">
    <img src={item.dishImage} alt={item.dishName} className="cart-item-image" />
    <div className="cart-item-details">
      <p className="cart-item-name">{item.dishName}</p>
      <div className="quantity-container">
        <button type="button" onClick={() => onDec(item.id)}>
          -
        </button>
        <p>{item.quantity}</p>
        <button type="button" onClick={() => onInc(item.id)}>
          +
        </button>
      </div>
      <p className="cart-item-price">₹{(item.price || 0) * item.quantity}</p>
    </div>
  </li>
)

const Cart = () => {
  const {
    cartList,
    removeAllCartItems,
    incrementCartItemQuantity,
    decrementCartItemQuantity,
  } = useContext(CartContext)

  if (cartList.length === 0) {
    return (
      <div className="empty-cart">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png"
          alt="empty cart"
        />
        <h1>Your Cart is Empty</h1>
      </div>
    )
  }

  return (
    <div className="cart-container">
      <button
        type="button"
        className="remove-all-btn"
        onClick={removeAllCartItems}
      >
        Remove All
      </button>
      <ul className="cart-items-list">
        {cartList.map(each => (
          <CartItem
            key={each.id}
            item={each}
            onInc={incrementCartItemQuantity}
            onDec={decrementCartItemQuantity}
          />
        ))}
      </ul>
    </div>
  )
}

export default Cart
