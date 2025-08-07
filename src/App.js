import Home from './components/Home'
import {CartProvider} from './context/CartContext'
import './App.css'

const App = () => (
  <CartProvider>
    <Home />
  </CartProvider>
)

export default App
