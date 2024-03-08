import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

const NavLinks = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <ul className="nav-links-list-container">
      <Link to="/">
        <li
          className="nav-links-list-item"
          onClick={() => props.isMobile && props.closeMobileMenu()}
        >
          Home
        </li>
      </Link>
      <Link to="/cart">
        <li onClick={() => props.isMobile && props.closeMobileMenu()}>Cart</li>
      </Link>
      <li onClick={() => props.isMobile && props.closeMobileMenu()}>
        <button
          type="button"
          className="nav-links-logout-button"
          onClick={onClickLogout}
        >
          Logout
        </button>
      </li>
    </ul>
  )
}

export default withRouter(NavLinks)
