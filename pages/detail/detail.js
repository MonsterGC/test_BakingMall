const app = getApp()
Page({
  data: {
    zan: '../../images/zan01.png',
    imgUrl: 'http://img4.imgtn.bdimg.com/it/u=1289705826,2231372602&fm=26&gp=0.jpg',
    proName: '樱花芝士蛋糕',
    proPrice: '11.00',
    yunfei: '0.00',
    ci: '48.00',
    isShow: false,
    buynum: 1,
    detailsPicUrl: [
      'http://img4.imgtn.bdimg.com/it/u=1289705826,2231372602&fm=26&gp=0.jpg',
      'https://blackboy.club/image/2.jpg',
      'https://blackboy.club/image/3.jpg',
      'https://blackboy.club/image/4.jpg',
      'https://blackboy.club/image/5.jpg',
      'https://blackboy.club/image/6.jpg',
    ],
  },
  isShow: function() {
    this.setData({
      isShow: true
    })
  },
  isClose: function() {
    this.setData({
      isShow: false
    })
  },
  changeNum: function(e) {
    var that = this;
    if (e.target.dataset.alphaBeta == 0) {
      if (this.data.buynum <= 1) {
        buynum: 1
      }
      else {
        this.setData({
          buynum: this.data.buynum - 1
        })
      };
    } else {
      this.setData({
        buynum: this.data.buynum + 1
      })
    };
  },
  tel: function() {
    wx.makePhoneCall({
      phoneNumber: '13336535215' //仅为示例，并非真实的电话号码
    })
  },
  zang : function() {
    if (zan == '../../images/zan01.png') {
      this.setData({
        zan: '../../images/zan02.png'
      })
    } else {
      this.setData({
        zan: '../../images/zan01.png'
      })
    }
  },
  zhuye :function(){
    wx.navigateTo({
      url: '../../pages/index/index'
    })
  }
})