//index.js
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tradeMode: 'widthFix',
    
      tradeArray: [{
        tradeSrc: 'https://blackboy.club/image/1.jpg',
        tradeTitle: '樱花芝士蛋糕',
        tradePrice: '11.0',
        tradeSalnum: '863'
      }, {
          tradeSrc: 'https://blackboy.club/image/14.jpg',
        tradeTitle: '黑森林蛋糕卷',
        tradePrice: '10.0',
        tradeSalnum: '533'
        }, {
          tradeSrc: 'https://blackboy.club/image/10.jpg',
          tradeTitle: '法棍',
          tradePrice: '7.0',
          tradeSalnum: '733'
        }, {
          tradeSrc: 'https://blackboy.club/image/11.jpg',
          tradeTitle: '欧包',
          tradePrice: '7.0',
          tradeSalnum: '533'
        }, {
          tradeSrc: 'https://blackboy.club/image/17.jpg',
          tradeTitle: '蔓越莓饼干',
          tradePrice: '38.0',
          tradeSalnum: '533'
        }, {
          tradeSrc: 'https://blackboy.club/image/8.jpg',
          tradeTitle: '巧克力味曲奇饼干',
          tradePrice: '38.0',
          tradeSalnum: '263'
        }, {
          tradeSrc: 'https://blackboy.club/image/9.jpg',
          tradeTitle: '巧克力布丁',
          tradePrice: '7.0',
          tradeSalnum: '263'
        }, {
          tradeSrc: 'https://blackboy.club/image/4.jpg',
          tradeTitle: '杏仁布丁',
          tradePrice: '7.0',
          tradeSalnum: '237'
        }]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  tradeClick: function () {
    wx.navigateTo({
      url: '../../pages/detail/detail'
    })
  }

})
