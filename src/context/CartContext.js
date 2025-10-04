import {createContext, useState} from 'react'

const CartContext = createContext()

export const CartProvider = ({children}) => {
  const [cartItems, setCartItems] = useState([])

  const addCartItem = item => {
    setCartItems(prev => {
      const exist = prev.find(each => each.dish_id === item.dish_id)
      if (exist) {
        return prev.map(each =>
          each.dish_id === item.dish_id
            ? {...each, quantity: each.quantity + 1}
            : each,
        )
      }
      return [...prev, {...item, quantity: 1}]
    })
  }

  const incrementCartItemQuantity = dishId => {
    setCartItems(prev =>
      prev.map(item =>
        item.dish_id === dishId ? {...item, quantity: item.quantity + 1} : item,
      ),
    )
  }

  const decrementCartItemQuantity = dishId => {
    setCartItems(prev =>
      prev
        .map(item =>
          item.dish_id === dishId
            ? {...item, quantity: item.quantity - 1}
            : item,
        )
        .filter(item => item.quantity > 0),
    )
  }

  const removeAllCartItems = () => setCartItems([])

  const getTotalItems = () =>
    cartItems.reduce((acc, item) => acc + item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addCartItem,
        incrementCartItemQuantity,
        decrementCartItemQuantity,
        removeAllCartItems,
        getTotalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export default CartContext
