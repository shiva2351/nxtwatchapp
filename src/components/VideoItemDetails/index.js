import {Component} from 'react'
import Cookie from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BiLike, BiDislike, BiListPlus} from 'react-icons/bi'
import ReactPlayer from 'react-player'
import {VideoCard, LikeBtn, DisLikeBtn, SaveBtn} from './StyledComponents'
import Header from '../Header'
import HeaderSide from '../HeaderSide'
import Context from '../../context/Context'
import HeaderUpper from '../HeaderUpper'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class VideoItemDetails extends Component {
  state = {
    videoDetails: {},
    apistatus: apiStatusConstants.initial,
    isLike: 'initial',
  }

  componentDidMount() {
    this.getVideoDetails()
  }

  renderFail = () => (
    <div>
      <img
        alt="failure view"
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>
        We are having some trouble to complete your request. Please try again.
      </p>
      <button onClick={this.getVideoDetails} type="button">
        Retry
      </button>
    </div>
  )

  getVideoDetails = async () => {
    this.setState({apistatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookie.get('jwt_token')
    console.log(id)
    const apiUrl = `https://apis.ccbp.in/videos/${id}`
    const options = {
      method: 'GET',
      headers: {authorization: `Bearer ${jwtToken}`},
    }
    const response = await fetch(apiUrl, options)
    const resData = await response.json()
    if (response.ok) {
      const UpdateData = {
        channel: {
          ...resData.video_details.channel,
          subscriberCount: resData.video_details.channel.subscriber_count,
          profileImageUrl: resData.video_details.channel.profile_image_url,
        },
        id: resData.video_details.id,
        publishedAt: resData.video_details.published_at,
        thumbnailUrl: resData.video_details.thumbnail_url,
        title: resData.video_details.title,
        viewCount: resData.video_details.view_count,
        videoUrl: resData.video_details.video_url,
        description: resData.video_details.description,
      }
      this.setState({
        videoDetails: UpdateData,
        apistatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apistatus: apiStatusConstants.failure})
    }
  }

  DisBtn = () => {
    this.setState(preState => {
      const {isLike} = preState
      console.log(isLike === false)
      if (isLike === 'initial') {
        return {isLike: 'DISLIKE'}
      }
      if (isLike === 'LIKE') {
        return {isLike: 'DISLIKE'}
      }
      return {isLike: 'initial'}
    })
  }

  LikeBtn = () => {
    this.setState(preState => {
      const {isLike} = preState
      console.log(isLike)
      if (isLike === 'initial') {
        return {isLike: 'LIKE'}
      }
      if (isLike === 'DISLIKE') {
        return {isLike: 'LIKE'}
      }
      return {isLike: 'initial'}
    })
  }

  renderLoad = () => (
    <div data-testid="loader">
      <Loader />
    </div>
  )

  renderSuccess = () => {
    const {videoDetails, isLike} = this.state
    const {
      channel,
      id,

      publishedAt,
      title,
      viewCount,
      videoUrl,
      description,
    } = videoDetails

    return (
      <Context.Consumer>
        {value => {
          const {AddVideos, savedList} = value
          const isSaved = savedList.find(eachItem => eachItem.id === id)

          const saveBtn = () => {
            AddVideos(videoDetails)
          }
          return (
            <>
              <ReactPlayer url={videoUrl} />
              <p>{title}</p>
              <div>
                <p>{viewCount}</p>
                <p>{publishedAt}</p>
              </div>
              <div>
                <LikeBtn isLike={isLike} onClick={this.LikeBtn} type="button">
                  Like
                </LikeBtn>
                <BiLike />
                <DisLikeBtn isLike={isLike} onClick={this.DisBtn} type="button">
                  Dislike
                </DisLikeBtn>
                <BiDislike />
                <SaveBtn onClick={saveBtn} type="button">
                  {isSaved === undefined ? 'Save' : 'Saved'}
                </SaveBtn>
                <BiListPlus />
              </div>
              <hr />
              <div>
                <p>{channel.subscriberCount}</p>
                <img alt="channel logo" src={channel.profileImageUrl} />
                <p>{channel.name}</p>
              </div>
              <p>{description}</p>
            </>
          )
        }}
      </Context.Consumer>
    )
  }

  renderView = () => {
    const {apistatus} = this.state

    switch (apistatus) {
      case apiStatusConstants.success:
        return this.renderSuccess()
      case apiStatusConstants.failure:
        return this.renderFail()
      case apiStatusConstants.inProgress:
        return this.renderLoad()
      default:
        return null
    }
  }

  render() {
    const {isLike} = this.state
    console.log(isLike === 'LIKE')
    return (
      <Context.Consumer>
        {value => {
          const {isDark} = value
          return (
            <VideoCard data-testid="videoItemDetails" isDark={isDark}>
              <div>
                <Header />
                <HeaderUpper />
              </div>
              <div>
                <HeaderSide />
                {this.renderView()}
              </div>
            </VideoCard>
          )
        }}
      </Context.Consumer>
    )
  }
}

export default VideoItemDetails
