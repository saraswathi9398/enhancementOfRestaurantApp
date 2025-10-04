// App.js
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'
import Cookies from 'js-cookie'

import {CartProvider} from './context/CartContext'
import Header from './components/Header'
import Home from './components/Home'
import Login from './components/Login'
import Cart from './components/Cart'
import CartItem from './components/CartItem'
import NotFound from './components/NotFound'
import './App.css'

const ProtectedRoute = ({component: Component, ...rest}) => {
  const token = Cookies.get('jwt_token')
  return (
    <Route
      {...rest}
      render={props =>
        token ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  )
}

const App = () => (
  <CartProvider>
    <Router>
      <div className="app-container">
        <Header />
        <main className="main-content">
          <Switch>
            <Route exact path="/login" component={Login} />
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute exact path="/cart" component={Cart} />
            <ProtectedRoute exact path="/cartItem" component={CartItem} />
            <Route component={NotFound} />
          </Switch>
        </main>
      </div>
    </Router>
  </CartProvider>
)

export default App
