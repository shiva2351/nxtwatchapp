import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import Cookie from 'js-cookie'
import Popup from 'reactjs-popup'
import {IoSunnyOutline, IoMoon} from 'react-icons/io5'
import {Image, NavCard} from './StyledComponents'

import Context from '../../context/Context'

class Header extends Component {
  getLogOut = () => {
    const {history} = this.props
    Cookie.remove('jwt_token')
    history.replace('/login')
  }

  render() {
    return (
      <Context.Consumer>
        {value => {
          const {ChangeTheme, isDark} = value
          return (
            <NavCard isDark={isDark}>
              <ul>
                <Link to="/">
                  <li>
                    <Image
                      alt="website logo"
                      src={
                        isDark
                          ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
                          : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
                      }
                    />
                  </li>
                </Link>
                <li>
                  <button
                    data-testid="theme"
                    onClick={ChangeTheme}
                    type="button"
                  >
                    {isDark ? <IoSunnyOutline /> : <IoMoon />}
                  </button>
                  <button type="button">
                    <img
                      alt="profile"
                      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                    />
                  </button>
                  <Popup modal trigger={<button type="button">Logout</button>}>
                    {close => (
                      <div>
                        <p>Are you sure, you want to logout</p>
                        <button onClick={() => close()} type="button">
                          Cancel
                        </button>
                        <button onClick={this.getLogOut} type="button">
                          Confirm
                        </button>
                      </div>
                    )}
                  </Popup>
                </li>
              </ul>
            </NavCard>
          )
        }}
      </Context.Consumer>
    )
  }
}

export default withRouter(Header)
