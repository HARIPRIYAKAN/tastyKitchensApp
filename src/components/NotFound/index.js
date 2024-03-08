import {Link} from 'react-router-dom'
import NavBar from '../NavBar/NavBar'

import './index.css'

const notFoundUrl =
  'https://res.cloudinary.com/dlm3dx684/image/upload/v1706895523/erroring_1_ln8fvk.png'

const NotFound = () => (
  <div className="not-found-bg-container">
    <NavBar />
    <div className="not-found-container">
      <img alt="not found" src={notFoundUrl} />
      <h1 className="not-found-heading">Page Not Found</h1>
      <p className="not-found-para">
        we are sorry, the page you requested could not be found. Please go back
        to the homepage
      </p>
      <Link to="/" style={{textDecoration: 'none'}}>
        <button type="button" className="not-found-button">
          Home Page
        </button>
      </Link>
    </div>
  </div>
)

export default NotFound
