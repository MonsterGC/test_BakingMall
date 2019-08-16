// pages/suggest/suggest.js
Page({
  data: {
    zishu: 0
  },
  areanumber: function (e) {
    this.setData({
      zishu: e.detail.value.length
    })
  },
  onLoad: function (options) {

  }
})