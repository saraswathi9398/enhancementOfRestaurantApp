import {useContext} from 'react'
import {CartContext} from '../../context/CartContext'
import './index.css'

const Header = () => {
  const {getTotalItems} = useContext(CartContext)

  return (
    <nav className="header">
      <h1 className="app-title">UNI Resto Cafe</h1>
      <div className="cart-container">
        <p className="my-orders">My Orders</p>
        <div className="cart-badge">{getTotalItems()}</div>
      </div>
    </nav>
  )
}

export default Header
