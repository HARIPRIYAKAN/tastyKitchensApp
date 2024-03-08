import {Component} from 'react'
import Cookies from 'js-cookie'
import {BiRupee} from 'react-icons/bi'
import {AiFillStar} from 'react-icons/ai'
import Loader from 'react-loader-spinner'
import NavBar from '../NavBar/NavBar'

import FoodItem from '../FoodItem'
import Footer from '../Footer'

import './index.css'

const restaurantsApiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class RestaurantDetails extends Component {
  state = {
    apiStatus: restaurantsApiStatusConstants.initial,
    restaurantData: [],
    loadfooter: false,
  }

  componentDidMount() {
    this.getRestaurantData()
    window.scrollTo(0, 0)
  }

  convertItemsData = foodArray => {
    const item = {
      cost: foodArray.cost,
      foodType: foodArray.food_type,
      id: foodArray.id,
      imageUrl: foodArray.image_url,
      name: foodArray.name,
      rating: foodArray.rating,
    }

    return item
  }

  convertData = object => {
    const converted = {
      costForTwo: object.cost_for_two,
      cuisine: object.cuisine,
      foodItems: object.food_items.map(eachItem =>
        this.convertItemsData(eachItem),
      ),
      restaurantId: object.id,
      imageUrl: object.image_url,
      itemCount: object.items_count,
      location: object.location,
      name: object.name,
      opensAt: object.opens_at,
      rating: object.rating,
      reviewsCount: object.reviews_count,
    }
    return converted
  }

  getRestaurantData = async () => {
    this.setState({apiStatus: restaurantsApiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/restaurants-list/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      const convertedData = this.convertData(data)
      this.setState({
        apiStatus: restaurantsApiStatusConstants.success,
        restaurantData: convertedData,
        loadfooter: true,
      })
    }
  }

  restaurantView = () => {
    const {restaurantData} = this.state
    const {
      costForTwo,
      name,
      restaurantId,
      cuisine,
      imageUrl,
      location,
      rating,
      reviewsCount,
    } = restaurantData
    return (
      <div className="restaurant-details-main-container">
        <div className="restaurant-details-container" key={restaurantId}>
          <img
            src={imageUrl}
            alt="restaurant"
            className="restaurant-details-img"
          />
          <div className="details-container">
            <h1 className="restaurant-detail-name">{name}</h1>
            <p className="restaurant-detail-cuisine">{cuisine}</p>
            <p className="restaurant-detail-location">{location}</p>
            <div className="restaurant-detail-rating-cost-container">
              <div className="restaurant-detail-ratings-container">
                <div className="restaurant-detail-ratings">
                  <AiFillStar className="restaurant-detail-star" />
                  <p className="restaurant-detail-rating-para">{rating}</p>
                </div>
                <p className="restaurant-detail-reviews">
                  {reviewsCount}+ Ratings
                </p>
              </div>
              <div className="restaurant-detail-vertical-line">
                <p style={{display: 'none'}}>.</p>
              </div>
              <div className="restaurant-detail-cost-container">
                <div className="restaurant-detail-cost">
                  <BiRupee className="restaurant-detail-rupee" />
                  <p className="restaurant-detail-cost-for-two">{costForTwo}</p>
                </div>
                <p className="restaurant-detail-cost-para">Cost for two</p>
              </div>
            </div>
          </div>
        </div>
        {this.foodItemsView()}
      </div>
    )
  }

  restaurantsDisplayLoading = () => (
    <div
      className="restaurant-details-loader"
      testid="restaurant-details-loader"
    >
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  foodItemsView = () => {
    const {restaurantData} = this.state
    const {foodItems} = restaurantData

    // console.log(foodItems)
    return (
      <ul className="restaurant-detail-food-items-container">
        {foodItems.map(eachItem => (
          <FoodItem key={eachItem.id} foodItem={eachItem} />
        ))}
      </ul>
    )
  }

  onRenderDisplayRestaurantDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case restaurantsApiStatusConstants.success:
        return this.restaurantView()
      case restaurantsApiStatusConstants.inProgress:
        return this.restaurantsDisplayLoading()
      case restaurantsApiStatusConstants.failure:
        return null
      default:
        return null
    }
  }

  render() {
    const {loadfooter} = this.state
    return (
      <>
        <div className="restaurant-details-background-container">
          <NavBar />
          {this.onRenderDisplayRestaurantDetails()}
          {loadfooter && <Footer />}
        </div>
      </>
    )
  }
}
export default RestaurantDetails
