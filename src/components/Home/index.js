import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsFilterLeft} from 'react-icons/bs'

import Slider from 'react-slick'

import NavBar from '../NavBar/NavBar'
import AllRestaurantsListItem from '../AllRestaurantsListItem'
import Counter from '../Counter'
import Footer from '../Footer'

import './index.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const limit = 9

const sortByOptions = [
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 2,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]

const carouselApiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const restaurantsApiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    carouselApiStatus: carouselApiStatusConstants.initial,
    restaurantApiStatus: restaurantsApiStatusConstants.initial,
    carouselData: [],
    selectedSortByValue: sortByOptions[1].value,
    activePage: 1,
    allRestaurants: [],
    searchInput: '',
    loadFooter: false,
  }

  componentDidMount() {
    window.scrollTo(0, 0)
    this.getCarouselData()
    this.getAllRestaurantsData()
  }

  convertRestaurantObjects = object => {
    const converted = {
      costForTwo: object.cost_for_two,
      cuisine: object.cuisine,
      groupByTime: object.group_by_time,
      hasOnlineDelivery: object.has_online_delivery,
      hasTableBooking: object.has_table_booking,
      id: object.id,
      imageUrl: object.image_url,
      isDeliveringNow: object.is_delivering_now,
      location: object.location,
      menuType: object.menu_type,
      name: object.name,
      opensAt: object.opens_at,
      userRating: {
        rating: object.user_rating.rating,
        ratingColor: object.user_rating.rating_color,
        ratingText: object.user_rating.rating_text,
        totalReviews: object.user_rating.total_reviews,
      },
    }
    return converted
  }

  getCarouselData = async () => {
    this.setState({carouselApiStatus: carouselApiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/restaurants-list/offers'
    const options = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      this.setState({
        carouselApiStatus: carouselApiStatusConstants.success,
        carouselData: data.offers,
      })
    }
  }

  getActivePage = page => {
    window.scrollTo(500, 500)
    this.setState({activePage: page}, this.getAllRestaurantsData)
  }

  getAllRestaurantsData = async () => {
    this.setState({
      restaurantApiStatus: restaurantsApiStatusConstants.inProgress,
    })
    const {selectedSortByValue, activePage, searchInput} = this.state

    const jwtToken = Cookies.get('jwt_token')
    const offset = (activePage - 1) * limit

    const restaurantsApiUrl = `https://apis.ccbp.in/restaurants-list?search=${searchInput}&offset=${offset}&limit=${limit}&sort_by_rating=${selectedSortByValue}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(restaurantsApiUrl, options)

    if (response.ok === true) {
      const data = await response.json()
      const {restaurants} = data
      const convertedRestaurants = restaurants.map(each =>
        this.convertRestaurantObjects(each),
      )
      this.setState({
        restaurantApiStatus: restaurantsApiStatusConstants.success,
        allRestaurants: convertedRestaurants,
        loadFooter: true,
      })
    } else if (response.ok === false) {
      this.setState({
        restaurantApiStatus: restaurantsApiStatusConstants.failure,
      })
    }
  }

  renderRestaurantsView = () => {
    const {allRestaurants, showNoRes} = this.state
    return (
      <>
        {showNoRes ? (
          <p>No Restaurants Found</p>
        ) : (
          <ul className="home-restaurant-list">
            {allRestaurants.map(each => (
              <AllRestaurantsListItem key={each.id} item={each} />
            ))}
          </ul>
        )}
      </>
    )
  }

  restaurantsDisplayLoading = () => (
    <div className="home-loader" testid="restaurants-list-loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  noRestaurantsView = () => (
    <div className="home-no-res-container">
      <p className="home-no-res-para">No Restaurants Found!</p>
    </div>
  )

  displayCarouselImages = () => {
    const {carouselData} = this.state

    const settings = {
      dots: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      speed: 700,
      infinite: true,
      dotsClass: 'slick-dots',
      autoplay: true,
      autoplaySpeed: 3000,
      adaptiveHeight: true,
    }
    return (
      <div className="home-slider-container">
        <Slider {...settings}>
          {carouselData.map(each => (
            <img
              src={each.image_url}
              alt="offer"
              key="carousel-image"
              className="home-carousel-image"
            />
          ))}
        </Slider>
      </div>
    )
  }

  carouselDisplayLoading = () => (
    <div className="home-loader" testid="restaurants-offers-loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  onRenderDisplayCarousel = () => {
    const {carouselApiStatus} = this.state

    switch (carouselApiStatus) {
      case carouselApiStatusConstants.success:
        return this.displayCarouselImages()

      case carouselApiStatusConstants.inProgress:
        return this.carouselDisplayLoading()

      default:
        return null
    }
  }

  changeTheSortByOptionValue = event => {
    this.setState(
      {selectedSortByValue: event.target.value},
      this.getAllRestaurantsData,
    )
  }

  onSearchRestaurant = event => {
    this.setState({searchInput: event.target.value}, this.getAllRestaurantsData)
  }

  popularRestaurantsView = () => {
    const {selectedSortByValue} = this.state
    return (
      <>
        <div className="home-popular-restaurants-container">
          <div className="home-heading-container">
            <h1 className="home-main-heading">Popular Restaurants</h1>
            <p className="home-main-para">
              Select Your favourite restaurant special dish and make your day
              happy...
            </p>
          </div>
          <div className="home-search-input-container">
            <label className="home-search-label" htmlFor="searchInput">
              Search The Restaurant
            </label>
            <input
              type="search"
              id="searchInput"
              className="home-search-element"
              onChange={this.onSearchRestaurant}
              placeholder="Search Restaurant Here.."
            />
          </div>

          <div className="home-filter-container">
            <BsFilterLeft className="home-filter-logo" />
            <p className="home-sort-label">Sort By</p>
            <select
              id="sortBy"
              onChange={this.changeTheSortByOptionValue}
              value={selectedSortByValue}
              className="home-select-element"
            >
              {sortByOptions.map(eachOption => (
                <option key={eachOption.id}>{eachOption.displayText}</option>
              ))}
            </select>
          </div>
        </div>
        <hr />
      </>
    )
  }

  onRenderDisplayRestaurants = () => {
    const {restaurantApiStatus} = this.state

    switch (restaurantApiStatus) {
      case restaurantsApiStatusConstants.success:
        return this.renderRestaurantsView()
      case restaurantsApiStatusConstants.inProgress:
        return this.restaurantsDisplayLoading()
      case restaurantsApiStatusConstants.failure:
        return this.noRestaurantsView()
      default:
        return null
    }
  }

  render() {
    const {loadFooter} = this.state
    return (
      <>
        <div className="home-container">
          <NavBar />
          <div className="home-main-container">
            {this.onRenderDisplayCarousel()}
            {this.popularRestaurantsView()}
            {this.onRenderDisplayRestaurants()}
            <Counter pageChangeFunction={this.getActivePage} />
          </div>
          {loadFooter && <Footer />}
        </div>
      </>
    )
  }
}
export default Home
