import {withRouter, Link} from 'react-router-dom'
import MobileNavigation from './MobileNavigation'
import Navigation from './Navigation'

import './index.css'

const logoUrl =
  'https://res.cloudinary.com/dlm3dx684/image/upload/v1706889412/Frame_274_1_qljn3b.png'

const NavBar = () => (
  <div className="navbar">
    <Link to="/" style={{textDecoration: 'none'}}>
      <div className="navbar-logo-container">
        <img src={logoUrl} alt="website logo" className="navbar-logo-image" />
        <h1 className="navbar-main-heading">Tasty Kitchens</h1>
      </div>
    </Link>
    <Navigation />
    <MobileNavigation />
  </div>
)

export default withRouter(NavBar)
