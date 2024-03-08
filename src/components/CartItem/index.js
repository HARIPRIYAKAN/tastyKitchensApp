import {Component} from 'react'
import {BiRupee} from 'react-icons/bi'
import {HiOutlineMinusSm} from 'react-icons/hi'
import {BsPlus} from 'react-icons/bs'

import './index.css'

class CartItem extends Component {
  increment = () => {
    const {eachCartItem, incrementQuantity} = this.props
    incrementQuantity(eachCartItem.id)
  }

  decrement = () => {
    const {eachCartItem, decrementQuantity} = this.props
    decrementQuantity(eachCartItem.id)
  }

  render() {
    const {eachCartItem} = this.props

    // const price = eachCartItem.cost * eachCartItem.quantity
    return (
      <li>
        <div testid="cartItem" className="cart-list-item">
          <img
            src={eachCartItem.imageUrl}
            alt="cart-item"
            className="cart-item-image"
          />
          <div className="cart-name-details-container">
            <h1 className="cart-item-name">{eachCartItem.name}</h1>
            <div className="each-item-counter-container">
              <button
                testid="decrement-quantity"
                type="button"
                className="minus-icon-container"
                onClick={this.decrement}
              >
                <HiOutlineMinusSm className="minus-icon" />
              </button>
              <p testid="item-quantity" className="count-value">
                {eachCartItem.quantity}
              </p>
              <button
                testid="increment-quantity"
                type="button"
                className="plus-icon-container"
                onClick={this.increment}
              >
                <BsPlus className="plus-icon" />
              </button>
            </div>
            <div className="cart-item-rate-container">
              <BiRupee className="cart-item-rupee" />
              <p className="cart-item-cost">{eachCartItem.cost}</p>
            </div>
          </div>
        </div>
      </li>
    )
  }
}
export default CartItem
