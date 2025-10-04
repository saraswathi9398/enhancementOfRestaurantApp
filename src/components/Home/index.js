import {useEffect, useState, useContext} from 'react'
import DishItem from '../DishItem'
import CartContext from '../../context/CartContext'
import './index.css'

const API_URL =
  'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details'

const Home = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [restaurantName, setRestaurantName] = useState('')
  const [tabs, setTabs] = useState([])
  const [activeTab, setActiveTab] = useState('')
  const [dishesByTab, setDishesByTab] = useState({})
  const [quantities, setQuantities] = useState({})

  const {
    addCartItem,
    incrementCartItemQuantity,
    decrementCartItemQuantity,
  } = useContext(CartContext)

  useEffect(() => {
    const fetchMenu = async () => {
      const res = await fetch(API_URL)
      const data = await res.json()
      const first = data[0]

      setRestaurantName(first.restaurant_name || 'UNI Resto Cafe')

      const menuList = first.table_menu_list || []
      const tabNames = menuList.map(m => m.menu_category)
      setTabs(tabNames)
      setActiveTab(tabNames[0] || '')

      const map = {}
      menuList.forEach(m => {
        map[m.menu_category] = m.category_dishes || []
      })
      setDishesByTab(map)

      // initialize dish quantities to 0
      const q = {}
      menuList.forEach(m => {
        ;(m.category_dishes || []).forEach(d => {
          q[d.dish_id] = 0
        })
      })
      setQuantities(q)

      setIsLoading(false)
    }
    fetchMenu()
  }, [])

  const onInc = dish => {
    setQuantities(prev => ({
      ...prev,
      [dish.dish_id]: (prev[dish.dish_id] || 0) + 1,
    }))

    if (quantities[dish.dish_id] === 0) {
      // first time add to cart
      addCartItem({
        id: dish.dish_id,
        dishName: dish.dish_name,
        dishImage: dish.dish_image,
        price: dish.dish_price,
      })
    } else {
      incrementCartItemQuantity(dish.dish_id)
    }
  }

  const onDec = dish => {
    setQuantities(prev => {
      const current = prev[dish.dish_id] || 0
      if (current <= 0) return prev
      return {...prev, [dish.dish_id]: current - 1}
    })

    if (quantities[dish.dish_id] > 0) {
      decrementCartItemQuantity(dish.dish_id)
    }
  }

  if (isLoading) {
    return <h1 className="loading">Loading...</h1>
  }

  const activeDishes = dishesByTab[activeTab] || []

  return (
    <div className="home">
      <h1 className="title">{restaurantName}</h1>

      <div className="tabs">
        {tabs.map(tab => (
          <button
            key={tab}
            type="button"
            className={`tab-btn ${tab === activeTab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <ul className="dishes">
        {activeDishes.map(dish => (
          <DishItem
            key={dish.dish_id}
            dish={dish}
            quantity={quantities[dish.dish_id] || 0}
            onIncrement={() => onInc(dish)}
            onDecrement={() => onDec(dish)}
            activeTab={activeTab}
          />
        ))}
      </ul>
    </div>
  )
}

export default Home
