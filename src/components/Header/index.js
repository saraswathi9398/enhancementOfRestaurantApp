import {useContext} from 'react'
import {Link} from 'react-router-dom'
import CartContext from '../../context/CartContext'
import './index.css'

const Header = () => {
  const {getTotalItems} = useContext(CartContext)
  const totalCount = getTotalItems()

  return (
    <nav className="header-container">
      <h1 className="header-title">My Orders</h1>
      <Link to="/cart" data-testid="cart" className="cart-link">
        <button type="button" className="cart-icon-btn">
          🛒
          <span className="cart-count">{totalCount}</span>
        </button>
      </Link>
    </nav>
  )
}

export default Header
