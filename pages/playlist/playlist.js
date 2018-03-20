// pages/playlist/playlist.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: null,
    songlists: [],
    subscribedCount: '',
    coverImgUrl: null,
    backgroundUrl: null,
    name: '',
    nickname: '',
    avatarUrl: null,
    playCount: '',
    tags: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let id = this.data.id;
    wx.request({
      url: app.globalData.baseUrl + '/playlist/detail?id=' + id,
      dataType: 'json',
      success: (res) => {
        console.log(res.data);
        res.data.result.tracks.forEach((e) => {
          // 处理歌手数组
          let arr = [];
          let strings = e.artists.forEach((e) => {
            arr.push(e.name);
          })
          e.singers = arr.join('/');
          // 转换歌曲时长
          e.durationStr = this.sec_to_time(e.duration);
        });
        this.setData({
          songlists: res.data.result.tracks,
          subscribedCount: res.data.result.subscribedCount.toLocaleString(),
          coverImgUrl: res.data.result.coverImgUrl,
          backgroundUrl: res.data.result.creator.backgroundUrl,
          name: res.data.result.name,
          nickname: res.data.result.creator.nickname,
          avatarUrl: res.data.result.creator.avatarUrl,
          playCount: res.data.result.playCount.toLocaleString(),
          tags: res.data.result.tags.join('，')
        });
      }
    });
  },
  sec_to_time: function (s) {
    let t = '';
    if (s > -1) {
      let hour = Math.floor(s / 3600000);
      let min = Math.floor(s / 60000) % 60;
      let sec = s / 1000 % 60;
      if (hour > 0) {
        if (hour < 10) {
          t = '0' + hour + ":";
        } else {
          t = hour + ":";
        }
      }

      if (min < 10) { t += "0"; }
      t += min + ":";
      if (sec < 10) { t += "0"; }
      t += sec.toFixed(0);
    }
    return t;
  },
  onShareAppMessage: function (res) {
    return {
      title: this.data.name,
      path: '/playlist/playlist?id=' + this.data.id,
      success: function (res) {
        // 转发成功
        wx.showToast({
          title: '分享成功'
        })
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})