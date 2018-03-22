//app.js
App({
  onLaunch: function () {
  },
  config:{
    host: 'http://198.13.36.138:3000'
    // host: 'http://192.168.31.224:3000'
  },
  globalData: {
    userInfo: null,
    tracks: [],
    duration: 0,
    playing: false,
    currentPos: 0
  }
})