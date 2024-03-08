import {Component} from 'react'
import {BiRupee} from 'react-icons/bi'
import {AiFillStar} from 'react-icons/ai'
import {HiOutlineMinusSm} from 'react-icons/hi'
import {BsPlus} from 'react-icons/bs'

import './index.css'

class FoodItem extends Component {
  state = {
    isFound: false,
    quantity: 0,
  }

  componentDidMount() {
    this.findTheCartItemInList()
  }

  findTheCartItemInList = () => {
    const cartData = JSON.parse(localStorage.getItem('cartData')) || []
    const {foodItem} = this.props
    const cartItem = cartData.filter(each => each.id === foodItem.id)
    if (cartItem.length !== 0) {
      if (cartItem[0].quantity > 0) {
        this.setState({quantity: cartItem[0].quantity, isFound: true})
      } else if (cartItem[0].quantity < 1) {
        this.removeCartItem()
        this.setState({quantity: cartItem[0].quantity, isFound: false})
      }
    }
  }

  incrementCartItemQuantity = () => {
    const cartData = JSON.parse(localStorage.getItem('cartData'))
    const {foodItem} = this.props
    const updatedCartData = cartData.map(eachItem => {
      if (eachItem.id === foodItem.id) {
        const updatedQuantity = eachItem.quantity + 1
        return {...eachItem, quantity: updatedQuantity}
      }
      return eachItem
    })
    localStorage.setItem('cartData', JSON.stringify(updatedCartData))
    this.findTheCartItemInList()
  }

  decrementCartItemQuantity = () => {
    const cartData = JSON.parse(localStorage.getItem('cartData'))
    const {foodItem} = this.props
    const updatedCartData = cartData.map(eachItem => {
      if (eachItem.id === foodItem.id) {
        if (eachItem.quantity > 0) {
          const updatedQuantity = eachItem.quantity - 1
          return {...eachItem, quantity: updatedQuantity}
        }
      }
      return eachItem
    })
    localStorage.setItem('cartData', JSON.stringify(updatedCartData))
    this.findTheCartItemInList()
  }

  removeCartItem = () => {
    const cartData = JSON.parse(localStorage.getItem('cartData'))
    const {foodItem} = this.props
    const updatedCartData = cartData.filter(
      eachCartItem => eachCartItem.id !== foodItem.id,
    )
    localStorage.setItem('cartData', JSON.stringify(updatedCartData))
    this.findTheCartItemInList()
  }

  addCartItem = () => {
    const cartData = JSON.parse(localStorage.getItem('cartData')) || []
    const {foodItem} = this.props
    const cartItem = {...foodItem, quantity: 1}
    cartData.push(cartItem)
    localStorage.setItem('cartData', JSON.stringify(cartData))
    this.findTheCartItemInList()
    this.setState({isFound: true})
  }

  render() {
    const {foodItem} = this.props
    const {isFound, quantity} = this.state
    return (
      <li className="food-item-list-item" testid="foodItem">
        <img
          src={foodItem.imageUrl}
          alt="food-item"
          className="food-item-restaurant-image"
        />
        <div className="food-item-item-details">
          <h1 className="food-item-item-name">{foodItem.name}</h1>
          <div className="food-item-item-rate-container">
            <BiRupee className="food-item-item-rupees" />
            <p className="food-item-item-cost">{foodItem.cost}</p>
          </div>
          <div className="food-item-item-rating-container">
            <AiFillStar className="food-item-item-star" />
            <p className="food-item-item-rating-text">{foodItem.rating}</p>
          </div>
          {isFound ? (
            <div
              className="food-item-each-item-counter-container"
              id={foodItem.id}
            >
              <button
                type="button"
                className="food-item-minus-icon-container"
                testid="decrement-count"
                onClick={this.decrementCartItemQuantity}
              >
                <HiOutlineMinusSm className="food-item-minus-icon" />
              </button>
              <button
                type="button"
                className="food-item-count-value"
                testid="active-count"
              >
                {quantity}
              </button>
              <button
                type="button"
                className="food-item-plus-icon-container"
                testid="increment-count"
                onClick={this.incrementCartItemQuantity}
              >
                <BsPlus className="food-item-plus-icon" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              className="food-item-add-button"
              onClick={this.addCartItem}
            >
              Add
            </button>
          )}
        </div>
      </li>
    )
  }
}
export default FoodItem
