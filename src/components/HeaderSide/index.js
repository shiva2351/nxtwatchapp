import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import Cookie from 'js-cookie'
import {NavCard} from './StyledComponents'

import Context from '../../context/Context'

class HeaderSide extends Component {
  getLogOut = () => {
    const {history} = this.props
    Cookie.remove('jwt_token')
    history.replace('/login')
  }

  render() {
    return (
      <Context.Consumer>
        {value => {
          const {isDark} = value
          return (
            <NavCard isDark={isDark}>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                  <Link to="/trending">Trending</Link>
                  <Link to="/gaming">Gaming</Link>
                  <Link to="/saved-videos">Saved videos</Link>
                </li>
                <li>
                  <p>CONTACT US</p>
                  <p>Enjoy! Now to see your channels and recommendations!</p>
                  <img
                    alt="facebook logo"
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                  />
                  <img
                    alt="twitter logo"
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                  />
                  <img
                    alt="linked in logo"
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                  />
                </li>
              </ul>
            </NavCard>
          )
        }}
      </Context.Consumer>
    )
  }
}

export default withRouter(HeaderSide)
