import {createContext, useState} from 'react'

export const CartContext = createContext()

export const CartProvider = ({children}) => {
  const [cartItems, setCartItems] = useState({})

  const updateItemCount = (dishId, count) => {
    setCartItems(prev => {
      const newCart = {...prev}
      if (count <= 0) {
        delete newCart[dishId]
      } else {
        newCart[dishId] = count
      }
      return newCart
    })
  }

  const getTotalItems = () =>
    Object.values(cartItems).reduce((sum, count) => sum + count, 0)

  return (
    <CartContext.Provider
      value={{
        cartItems,
        updateItemCount,
        getTotalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
