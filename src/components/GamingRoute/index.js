import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookie from 'js-cookie'
import Header from '../Header'
import HeaderUpper from '../HeaderUpper'
import {GameCard} from './StyledComponents'
import Context from '../../context/Context'
import HeaderSide from '../HeaderSide'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class GamingRoute extends Component {
  state = {apistatus: apiStatusConstants.initial, videoList: []}

  componentDidMount() {
    this.getTrendingList()
  }

  getTrendingList = async () => {
    const apiUrl = 'https://apis.ccbp.in/videos/gaming'
    const jwtToken = Cookie.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {authorization: `Bearer ${jwtToken}`},
    }
    const response = await fetch(apiUrl, options)
    const resData = await response.json()
    console.log(resData)
    if (response.ok) {
      const {videos} = resData
      const UpdateData = videos.map(eachItem => ({
        id: eachItem.id,
        publishedAt: eachItem.published_at,
        thumbnailUrl: eachItem.thumbnail_url,
        title: eachItem.title,
        viewCount: eachItem.view_count,
      }))

      console.log(UpdateData)
      this.setState({
        videoList: UpdateData,
        apistatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apistatus: apiStatusConstants.failure})
    }
  }

  renderFail = () => (
    <div>
      <img
        alt="failure view"
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We are having some trouble</p>
      <button onClick={this.getTrendingList} type="button">
        Retry
      </button>
    </div>
  )

  renderLoad = () => (
    <div data-testid="loader">
      <Loader />
    </div>
  )

  renderSuccess = () => {
    const {videoList} = this.state
    return (
      <div>
        <h1>Gaming</h1>
        <ul>
          {videoList.map(eachItem => (
            <li key={eachItem.id}>
              <img alt={eachItem.title} src={eachItem.thumbnailUrl} />
            </li>
          ))}
        </ul>
      </div>
    )
  }

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
            <GameCard data-testid="gaming" isDark={isDark}>
              <div>
                <HeaderUpper />
                <Header />
              </div>
              <div>
                <HeaderSide />
                {this.renderView()}
              </div>
            </GameCard>
          )
        }}
      </Context.Consumer>
    )
  }
}

export default GamingRoute
