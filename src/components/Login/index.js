import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

const smallImageUrl =
  'https://res.cloudinary.com/dlm3dx684/image/upload/v1709367872/Rectangle_1457_1_rrokhk.png'
const largeImageUrl =
  'https://res.cloudinary.com/dlm3dx684/image/upload/v1706894381/Rectangle_1456_lubkek.png'
const logoUrl =
  'https://res.cloudinary.com/dlm3dx684/image/upload/v1706889412/Frame_274_1_qljn3b.png'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  successLogin = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  failedLogin = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const apiLoginUrl = 'https://apis.ccbp.in/login'

    const {username, password} = this.state

    if (!username.trim() && !password.trim()) {
      this.setState({
        showSubmitError: true,
        errorMsg: 'Please enter a valid Username & Password',
      })

      return
    }

    if (!username.trim()) {
      this.setState({showSubmitError: true, errorMsg: 'Username is required'})
      return
    }

    if (!password.trim()) {
      this.setState({showSubmitError: true, errorMsg: 'Password is required'})
      return
    }

    // const userDetails = {
    //   username: 'rahul',
    //   password: 'rahul@2021',
    // }

    const userDetails = {username, password}

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiLoginUrl, options)
    const data = await response.json()

    if (response.ok === true) {
      this.successLogin(data.jwt_token)
    } else {
      this.failedLogin(data.error_msg)
    }
  }

  renderUsernameField = () => {
    const {username} = this.state
    return (
      <>
        <label htmlFor="username" className="login-label-element">
          USERNAME
        </label>
        <input
          type="text"
          id="username"
          className="login-input-element"
          onChange={this.onChangeUsername}
          value={username}
          placeholder="USER NAME"
        />
      </>
    )
  }

  renderPasswordField = () => {
    const {password} = this.state
    return (
      <>
        <label htmlFor="password" className="login-label-element">
          PASSWORD
        </label>
        <input
          type="password"
          id="password"
          className="login-input-element"
          onChange={this.onChangePassword}
          value={password}
          placeholder="PASSWORD"
        />
      </>
    )
  }

  render() {
    const {showSubmitError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-bg-container">
        <img
          src={largeImageUrl}
          alt="website login"
          className="login-large-img"
        />
        <div className="login-container">
          <img src={logoUrl} className="login-logo" alt="website logo" />
          <h1 className="login-large-heading">Tasty Kitchens</h1>
          <img
            className="login-small-img"
            src={smallImageUrl}
            alt="website login"
          />
          <h1 className="login-heading">Login</h1>
          <form className="login-form-container" onSubmit={this.onSubmitForm}>
            <div className="input-container">{this.renderUsernameField()}</div>
            <div className="input-container">{this.renderPasswordField()}</div>

            {showSubmitError ? (
              <p className="login-error-msg">{errorMsg}</p>
            ) : null}
            <button className="login-button" type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }
}
export default Login
