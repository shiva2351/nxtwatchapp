import react from 'react'

const Context = react.createContext({
  isDark: false,
  ChangeTheme: () => {},
  savedList: [],
  AddVideos: () => {},
})

export default Context
