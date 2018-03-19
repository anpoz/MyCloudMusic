//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    playlists: []
  },
  onLoad: function () {
    wx.request({
      url: 'http://192.168.1.2:3000/top/playlist/highquality?limit=10',
      dataType: 'json',
      success: (res) => {
        let data = res.data;
        if (typeof res.data === 'string') {
          data = JSON.parse(res.data);
          console.log(data);
        }
        if (res.statusCode = 200) {
          this.setData({
            playlists: data.playlists
          });
        }
      }
    });
  }
})
