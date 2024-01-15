import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import Cookie from 'js-cookie'
import Popup from 'reactjs-popup'
import {IoMenu, IoExitOutline, IoSunnyOutline, IoMoon} from 'react-icons/io5'
import {Image, NavCard, HeadPop} from './StyledComponents'

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
                <li>
                  <Link to="/">
                    <Image
                      alt="website logo"
                      src={
                        isDark
                          ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
                          : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
                      }
                    />
                  </Link>
                </li>

                <li>
                  <button
                    data-testid="theme"
                    onClick={ChangeTheme}
                    type="button"
                  >
                    {isDark ? <IoSunnyOutline /> : <IoMoon />}
                  </button>

                  <Popup
                    modal
                    trigger={
                      <button className="trigger-button" type="button">
                        T<IoMenu />
                      </button>
                    }
                  >
                    {close => (
                      <HeadPop isDark={isDark}>
                        <button onClick={() => close()} type="button">
                          X
                        </button>
                        <Link to="/">Home</Link>
                        <Link to="/trending">Trending</Link>
                        <Link to="/gaming">Gaming</Link>
                        <Link to="/saved-videos">Saved videos</Link>
                      </HeadPop>
                    )}
                  </Popup>
                  <Popup
                    modal
                    trigger={
                      <button type="button">
                        d<IoExitOutline />
                      </button>
                    }
                  >
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
