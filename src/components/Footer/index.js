// import {Component} from 'react'

import {
  FaInstagram,
  FaPinterestSquare,
  FaTwitterSquare,
  FaFacebookSquare,
} from 'react-icons/fa'

import './index.css'

const url =
  'https://res.cloudinary.com/dlm3dx684/image/upload/v1706896934/Frame_275_emqto6.png'

export default function Footer() {
  return (
    <div className="footer-container">
      <div className="footer-log-heading">
        <img src={url} alt="website-footer-logo" className="footer-img" />
        <h1 className="footer-main-heading">Tasty Kitchens</h1>
      </div>
      <p className="footer-para">
        The only thing we are serious about is food. Contact us on
      </p>
      <div className="footer-contacts">
        <FaPinterestSquare
          className="footer-logos"
          testid="pintrest-social-icon"
        />
        <FaInstagram className="footer-logos" testid="instagram-social-icon" />
        <FaTwitterSquare
          className="footer-logos"
          testid="twitter-social-icon"
        />
        <FaFacebookSquare
          className="footer-logos"
          testid="facebook-social-icon"
        />
      </div>
    </div>
  )
}
