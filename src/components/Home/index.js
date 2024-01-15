import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Cookie from 'js-cookie'
import {IoSearchOutline, IoClose} from 'react-icons/io5'
import Context from '../../context/Context'
import Header from '../Header'
import HeaderSide from '../HeaderSide'
import HeaderUpper from '../HeaderUpper'
import {HomeCard, LowerCard} from './StyledComponents'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {listVideos: [], apistatus: apiStatusConstants.initial, searchQ: ''}

  componentDidMount() {
    this.getListVideo()
  }

  getListVideo = async () => {
    this.setState({apistatus: apiStatusConstants.inProgress})
    const jwtToken = Cookie.get('jwt_token')
    const {searchQ} = this.state
    const apiUrl = `https://apis.ccbp.in/videos/all?search=${searchQ}`
    const options = {
      method: 'GET',
      headers: {authorization: `Bearer ${jwtToken}`},
    }
    const response = await fetch(apiUrl, options)
    const resData = await response.json()
    if (response.ok) {
      const UpdateData = resData.videos.map(eachItem => {
        console.log('updata')
        return {
          channel: {
            ...eachItem.channel,
            profileImageUrl: eachItem.channel.profile_image_url,
          },
          id: eachItem.id,
          publishedAt: eachItem.published_at,
          thumbnailUrl: eachItem.thumbnail_url,
          title: eachItem.title,
          viewCount: eachItem.view_count,
        }
      })
      this.setState({
        listVideos: UpdateData,
        apistatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apistatus: apiStatusConstants.failure})
    }
  }

  renderSuccess = () => {
    const {listVideos} = this.state

    return (
      <ul>
        {listVideos.map(eachItem => (
          <Link key={eachItem.id} to={`/videos/${eachItem.id}`}>
            <li key={eachItem.id}>
              <div>
                <img alt={eachItem.title} src={eachItem.thumbnailUrl} />
                <div>
                  <img
                    alt={eachItem.channel.name}
                    src={eachItem.channel.profileImageUrl}
                  />
                  <p>{eachItem.channel.name}</p>
                </div>
                <p>{eachItem.viewCount}</p>
                <p>{eachItem.publishedAt}</p>
              </div>
            </li>
          </Link>
        ))}
      </ul>
    )
  }

  renderLoad = () => (
    <div data-testid="loader">
      <Loader />
    </div>
  )

  renderFail = () => (
    <div>
      <img
        alt="failure view"
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We are having some trouble</p>
      <button onClick={this.getListVideo} type="button">
        Retry
      </button>
    </div>
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

  searchText = event => {
    this.setState({searchQ: event.target.value})
  }

  render() {
    const {searchQ} = this.state

    return (
      <Context.Consumer>
        {value => {
          const {isDark} = value
          console.log(isDark)
          return (
            <HomeCard data-testid="home">
              <div>
                <Header />
                <HeaderUpper />
              </div>
              <LowerCard>
                <HeaderSide />
                <div>
                  <div>
                    <button data-testid="close" type="button">
                      c
                      <IoClose />
                    </button>
                    <p>Buy Nxt Watch Premium</p>
                  </div>
                  <div>
                    <input
                      value={searchQ}
                      onChange={this.searchText}
                      type="search"
                    />
                    <button onClick={this.getListVideo} type="button">
                      d <IoSearchOutline />
                    </button>
                    {this.renderView()}
                  </div>
                </div>
              </LowerCard>
            </HomeCard>
          )
        }}
      </Context.Consumer>
    )
  }
}

export default Home
