import {Link} from 'react-router-dom'
import {FaStar} from 'react-icons/fa'

import './index.css'

const AllRestaurantsListItem = props => {
  const {item} = props
  const {imageUrl, name, cuisine, id, userRating} = item
  const {rating, totalReviews} = userRating
  return (
    <Link
      to={`/restaurant/${id}`}
      style={{textDecoration: 'none'}}
      testid="restaurant-item"
    >
      <li className="all-restaurants-list-item">
        <img src={imageUrl} alt="restaurant" className="all-restaurant-image" />
        <div className="restaurant-details-container">
          <h1 className="restaurant-name">{name}</h1>
          <p className="restaurant-cuisine">{cuisine}</p>
          <div className="restaurant-ratings-container">
            <FaStar size="13px" color="#FFCC00" />
            <p className="restaurant-rating">{rating}</p>
            <p className="restaurant-reviews">({totalReviews} ratings)</p>
          </div>
        </div>
      </li>
    </Link>
  )
}
export default AllRestaurantsListItem
