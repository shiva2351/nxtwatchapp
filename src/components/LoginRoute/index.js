import {Component} from 'react'
import Cookie from 'js-cookie'
import {Redirect} from 'react-router-dom'
import {FormElement, Container, Card, LoginBtn} from './StyledComponents'

class LoginRoute extends Component {
  state = {username: '', password: '', errorMsg: '', pType: 'password'}

  formSubmit = async event => {
    event.preventDefault()
    const {username, password} = this.state

    const options = {method: 'POST', body: JSON.stringify({username, password})}
    const apiUrl = 'https://apis.ccbp.in/login'
    const response = await fetch(apiUrl, options)
    const resData = await response.json()
    console.log(response, resData)
    if (response.ok) {
      this.loginSuccess(resData.jwt_token)
    } else {
      this.loginFail(resData.error_msg)
    }
  }

  loginFail = msg => {
    this.setState({errorMsg: msg})
  }

  loginSuccess = jwtToken => {
    const {history} = this.props
    Cookie.set('jwt_token', jwtToken, {expires: 10})
    history.replace('/')
  }

  fUser = event => {
    this.setState({username: event.target.value})
  }

  fPass = event => {
    this.setState({password: event.target.value})
  }

  fCheckBox = () => {
    this.setState(preState => {
      const {pType} = preState
      if (pType === 'text') {
        return {pType: 'password'}
      }
      return {pType: 'text'}
    })
  }

  render() {
    const {username, password, errorMsg, pType} = this.state
    const jwtToken = Cookie.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <Container>
        <Card>
          <img
            alt="website logo"
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
          />
          <FormElement onSubmit={this.formSubmit}>
            <div>
              <label htmlFor="user">Username</label>
              <input
                value={username}
                onChange={this.fUser}
                id="user"
                type="text"
              />
            </div>
            <div>
              <label htmlFor="pass">Password</label>
              <input
                value={password}
                onChange={this.fPass}
                id="pass"
                type={pType}
              />
            </div>
            <div>
              <input onChange={this.fCheckBox} type="checkbox" id="check" />
              <label htmlFor="check">Show password</label>
            </div>
            <LoginBtn type="submit">Login</LoginBtn>
            {errorMsg !== '' && <p>*{errorMsg}</p>}
          </FormElement>
        </Card>
      </Container>
    )
  }
}

export default LoginRoute
