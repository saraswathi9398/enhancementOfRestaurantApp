import {useEffect, useState} from 'react'
import Loader from 'react-loader-spinner'
import DishItem from '../DishItem'
import Header from '../Header'
import './index.css'

const Home = () => {
  const [menuData, setMenuData] = useState([])
  const [activeTab, setActiveTab] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getMenu = async () => {
      const response = await fetch(
        'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details',
      )
      const data = await response.json()
      const formattedMenu = data[0].table_menu_list
      setMenuData(formattedMenu)
      setActiveTab(formattedMenu[0].menu_category)
      setLoading(false)
    }
    getMenu()
  }, [])

  const currentDishes =
    menuData.find(each => each.menu_category === activeTab)?.category_dishes ||
    []

  return (
    <>
      <Header />
      {loading ? (
        <div className="loader-container">
          <Loader type="ThreeDots" color="#000" height={50} width={50} />
        </div>
      ) : (
        <div className="home-container">
          <div className="tabs-container">
            {menuData.map(each => (
              <button
                key={each.menu_category}
                onClick={() => setActiveTab(each.menu_category)}
                className={`tab-btn ${
                  activeTab === each.menu_category ? 'active-tab' : ''
                }`}
              >
                {each.menu_category}
              </button>
            ))}
          </div>
          <div className="dishes-container">
            {currentDishes.map(dish => (
              <DishItem key={dish.dish_id} dish={dish} />
            ))}
          </div>
        </div>
      )}
    </>
  )
}

export default Home
