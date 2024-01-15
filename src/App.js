import {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import './App.css'
import LoginRoute from './components/LoginRoute'
import Context from './context/Context'
import NotFound from './components/NotFound'
import Home from './components/Home'
import ProtectedRoute from './components/ProtectedRoute'
import VideoItemDetails from './components/VideoItemDetails'
import TrendingRoute from './components/TrendingRoute'
import GamingRoute from './components/GamingRoute'
import SaveVideoRoute from './components/SaveVideoRoute'

class App extends Component {
  state = {isDark: false, savedList: []}

  AddVideos = videoObject => {
    this.setState(preState => {
      const {savedList} = preState
      const videoInList = savedList.find(
        eachItem => eachItem.id === videoObject.id,
      )
      console.log('kk', savedList)
      if (videoInList !== undefined) {
        const filterList = savedList.filter(
          eachItem => eachItem.id !== videoInList.id,
        )
        return {savedList: filterList}
      }
      return {savedList: [...savedList, videoObject]}
    })
  }

  ChangeTheme = () => {
    this.setState(prevState => ({isDark: !prevState.isDark}))
  }

  render() {
    const {isDark, savedList} = this.state

    return (
      <Context.Provider
        value={{
          isDark,
          ChangeTheme: this.ChangeTheme,
          savedList,
          AddVideos: this.AddVideos,
        }}
      >
        <Switch>
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/trending" component={TrendingRoute} />
          <ProtectedRoute exact path="/gaming" component={GamingRoute} />
          <ProtectedRoute
            exact
            path="/saved-videos"
            component={SaveVideoRoute}
          />
          <ProtectedRoute
            exact
            path="/videos/:id"
            component={VideoItemDetails}
          />
          <Route exact path="/login" component={LoginRoute} />
          <Route exact path="/notfound" component={NotFound} />
          <Redirect to="/notfound" />
        </Switch>
      </Context.Provider>
    )
  }
}

export default App
