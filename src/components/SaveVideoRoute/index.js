import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import {TrendCard} from './StyledComponents'
import Context from '../../context/Context'
import HeaderUpper from '../HeaderUpper'
import HeaderSide from '../HeaderSide'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class SaveVideoRoute extends Component {
  state = {apistatus: apiStatusConstants.initial}

  componentDidMount() {
    this.setState({apistatus: apiStatusConstants.success})
  }

  renderFail = () => (
    <div>
      <h1>No saved videos found</h1>
      <p>Save your videos by clicking a button</p>
      <img
        alt="no saved videos"
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
      />
    </div>
  )

  renderLoad = () => (
    <div data-testid="loader">
      <Loader />
    </div>
  )

  updateState = () => {
    this.setState({apistatus: apiStatusConstants.failure})
  }

  renderSuccess = () => (
    <Context.Consumer>
      {value => {
        const {savedList} = value
        console.log(savedList)
        if (savedList.length <= 0) {
          return this.renderFail()
        }
        return (
          <div>
            <h1>Saved videos</h1>
            <ul>
              {savedList.map(eachItem => (
                <Link key={eachItem.id} to={`/videos/${eachItem.id}`}>
                  <li key={eachItem.id}>
                    <img alt="video thumbnail" src={eachItem.thumbnailUrl} />
                    <div>
                      <p>{eachItem.title}</p>
                      <p>{eachItem.channel.name}</p>
                      <div>
                        <p>{eachItem.viewCount}</p>
                        <p>{eachItem.publishedAt}</p>
                      </div>
                    </div>
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        )
      }}
    </Context.Consumer>
  )

  renderView = () => {
    const {apistatus} = this.state

    switch (apistatus) {
      case apiStatusConstants.success:
        return this.renderSuccess()
      case apiStatusConstants.inProgress:
        return this.renderLoad()
      case apiStatusConstants.failure:
        return this.renderFail()
      default:
        return null
    }
  }

  render() {
    return (
      <Context.Consumer>
        {value => {
          const {isDark} = value
          return (
            <TrendCard data-testid="savedVideos" isDark={isDark}>
              <div>
                <HeaderUpper />
                <Header />
              </div>
              <div>
                <HeaderSide />
                {this.renderView()}
              </div>
            </TrendCard>
          )
        }}
      </Context.Consumer>
    )
  }
}

export default SaveVideoRoute
