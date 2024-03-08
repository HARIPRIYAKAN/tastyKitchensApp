import {GiHamburgerMenu} from 'react-icons/gi'
import {AiOutlineCloseCircle} from 'react-icons/ai'
import {useState} from 'react'

import './index.css'
import NavLinks from './NavLinks'

const MobileNavigation = () => {
  const [open, setOpen] = useState(false)

  const hamburgerIcon = (
    <GiHamburgerMenu
      className="mobile-navigation-hamburger"
      size="35px"
      onClick={() => setOpen(!open)}
    />
  )
  const closeIcon = (
    <AiOutlineCloseCircle
      className="mobile-navigation-hamburger"
      size="35px"
      onClick={() => setOpen(!open)}
    />
  )

  const closeMobileMenu = () => setOpen(false)
  return (
    <nav className="mobile-navigation">
      {open ? closeIcon : hamburgerIcon}
      {open && <NavLinks isMobile="true" closeMobileMenu={closeMobileMenu} />}
    </nav>
  )
}
export default MobileNavigation
