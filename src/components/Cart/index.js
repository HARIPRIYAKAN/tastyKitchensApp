import {Component} from 'react'
import {Link} from 'react-router-dom'
import {FaCheckCircle} from 'react-icons/fa'
import {BiRupee} from 'react-icons/bi'

import NavBar from '../NavBar/NavBar'
import CartItem from '../CartItem'
import Footer from '../Footer'

import './index.css'

const cartEmptyUrl =
  'https://res.cloudinary.com/dlm3dx684/image/upload/v1707034440/cooking_1_jpdmsv.png'

const cartStatusConstants = {
  initial: 'INITIAL',
  cartItemsFound: 'SUCCESS',
  noCartItems: 'FAILURE',
  paymentSuccess: 'PAYMENT',
}

class Cart extends Component {
  state = {cartData: [], cartStatus: cartStatusConstants.initial}

  componentDidMount() {
    window.scrollTo(0, 0)
    this.getTheCartData()
  }

  incrementCartItemQuantity = id => {
    const cartData = JSON.parse(localStorage.getItem('cartData'))
    const updatedCartData = cartData.map(eachItem => {
      if (eachItem.id === id) {
        console.log(eachItem.quantity)
        const updatedQuantity = eachItem.quantity + 1
        return {...eachItem, quantity: updatedQuantity}
      }
      return eachItem
    })
    localStorage.setItem('cartData', JSON.stringify(updatedCartData))
    this.getTheCartData()
  }

  decrementCartItemQuantity = id => {
    const cartData = JSON.parse(localStorage.getItem('cartData'))
    const updatedCartData = cartData.map(eachItem => {
      if (eachItem.id === id) {
        if (eachItem.quantity > 0) {
          console.log(eachItem.quantity)
          const updatedQuantity = eachItem.quantity - 1
          console.log('updated:>>', updatedQuantity)
          return {...eachItem, quantity: updatedQuantity}
        }
      }
      return eachItem
    })
    console.log('updatedCartData :>> ', updatedCartData)

    this.removeCartItem(updatedCartData)
  }

  removeCartItem = updatedData => {
    const updatedCartData = updatedData.filter(
      eachCartItem => eachCartItem.quantity > 0,
    )
    console.log(updatedCartData)
    localStorage.setItem('cartData', JSON.stringify(updatedCartData))
    this.getTheCartData()
  }

  calculateTheTotalAmount = () => {
    const {cartData} = this.state

    const amountList = cartData.map(each => each.quantity * each.cost)

    const totalAmount = amountList.reduce((a, b) => a + b)
    return totalAmount
  }

  getTheCartData = () => {
    const cartData = JSON.parse(localStorage.getItem('cartData')) || []
    if (cartData.length === 0) {
      this.setState({
        cartStatus: cartStatusConstants.noCartItems,
      })
    } else {
      const cartItems = cartData.map(each => ({
        cost: each.cost,
        quantity: each.quantity,
        id: each.id,
        imageUrl: each.imageUrl,
        name: each.name,
      }))
      this.setState({
        cartStatus: cartStatusConstants.cartItemsFound,
        cartData: cartItems,
      })
    }
  }

  goToHomePage = () => {
    const {history} = this.props
    history.replace('/')
  }

  placeOrder = () => {
    this.setState({cartStatus: cartStatusConstants.paymentSuccess})
    localStorage.clear('cartData')
  }

  cartEmptyView = () => (
    <div className="cart-empty-view-container">
      <img src={cartEmptyUrl} alt="empty cart" className="cart-empty-image" />
      <h1 className="cart-empty-name">No Order Yet!</h1>
      <p className="cart-empty-description">
        Your cart is empty. Add something from the menu.
      </p>
      <Link to="/" style={{textDecoration: 'none'}}>
        <button type="button" className="cart-order-now-button">
          Order Now
        </button>
      </Link>
    </div>
  )

  paymentSuccessfulView = () => (
    <div className="cart-success-container">
      <FaCheckCircle className="cart-circle" />
      <h1 className="cart-success-name">Payment Successful</h1>
      <p className="cart-success-description">
        Thank you for ordering Your payment is successfully completed.
      </p>
      <Link to="/" style={{textDecoration: 'none'}}>
        <button type="button" className="cart-goto-home-button">
          Go To Home Page
        </button>
      </Link>
    </div>
  )

  cartItemsView = () => {
    const {cartData} = this.state
    const totalAmount = this.calculateTheTotalAmount()
    return (
      <>
        <div className="cart-container">
          <div className="cart-items-container">
            <div className="cart-desktop-heading-container">
              <h1 className="cart-headings">Item</h1>
              <h1 className="cart-headings">Quantity</h1>
              <h1 className="cart-headings">Price</h1>
            </div>
            <ul className="mobile-cart-items-container">
              {cartData.map(eachItem => (
                <CartItem
                  key={eachItem.id}
                  eachCartItem={eachItem}
                  incrementQuantity={this.incrementCartItemQuantity}
                  decrementQuantity={this.decrementCartItemQuantity}
                />
              ))}
            </ul>
            <hr className="cart-horizontal-line" />
            <div className="cart-total-container">
              <h1 className="cart-order-heading">Order Total:</h1>
              <div className="cart-total-amount-container">
                <BiRupee className="cart-total-rupee" />
                <p className="cart-total-amount" testid="total-price">
                  {totalAmount}.00
                </p>
              </div>
            </div>
            <button
              type="button"
              className="cart-place-order-button"
              onClick={this.placeOrder}
            >
              Place Order
            </button>
          </div>
          <Footer />
        </div>
      </>
    )
  }

  onRenderDisplayCartPage = () => {
    const {cartStatus} = this.state

    switch (cartStatus) {
      case cartStatusConstants.cartItemsFound:
        return this.cartItemsView()
      case cartStatusConstants.noCartItems:
        return this.cartEmptyView()
      case cartStatusConstants.paymentSuccess:
        return this.paymentSuccessfulView()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <NavBar />
        <div className="cart-background-container">
          {this.onRenderDisplayCartPage()}
        </div>
      </div>
    )
  }
}
export default Cart
