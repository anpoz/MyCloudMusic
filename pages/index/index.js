//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    playlists: null
  },
  onLoad: function () {
    wx.request({
      url: 'http://192.168.31.224:3000/top/playlist/highquality?limit=30',
      success: (res) => {
        if (res.statusCode = 200) {
          console.log(res.data.playlists);
          this.setData({
            playlists: res.data.playlists
          });
        }
      }
    })
  }
})
