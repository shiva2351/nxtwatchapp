import {Component} from 'react'
import Context from '../../context/Context'
import {NotFoundCard} from './StyledComponents'

class NotFound extends Component {
  render() {
    return (
      <Context.Consumer>
        {value => {
          const {isDark} = value
          return (
            <NotFoundCard isDark={isDark}>
              <img
                alt="not found"
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png"
              />
              <h1>Page Not Found</h1>
              <p>we are sorry, the page you requested could not be found.</p>
            </NotFoundCard>
          )
        }}
      </Context.Consumer>
    )
  }
}

export default NotFound
