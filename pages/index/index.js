//index.js
//获取应用实例
const app = getApp()

Page({
  onPullDownRefresh: function () {
    wx.startPullDownRefresh()
  },
  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      'http://img4.imgtn.bdimg.com/it/u=1851905119,3456325795&fm=26&gp=0.jpg',
      'http://img4.imgtn.bdimg.com/it/u=1106472475,3792440977&fm=26&gp=0.jpg',
      'hhttp://img2.imgtn.bdimg.com/it/u=2102437529,932935515&fm=26&gp=0.jpg',
      'https://blackboy.club/images/l4.jpg',
      'https://blackboy.club/images/l5.jpg',
      'https://blackboy.club/images/l6.jpg'
    ],
    shuyu:'自然烘焙欢迎你',
    teltoo:'终于等到你了，请问有什么可以帮助到您',
    iconArray: [{
      "iconUrl": 'http://img4.imgtn.bdimg.com/it/u=1289705826,2231372602&fm=26&gp=0.jpg',
        "iconText": '爆款特卖'
      },
      {
        "iconUrl": 'http://img2.imgtn.bdimg.com/it/u=2102437529,932935515&fm=26&gp=0.jpg',
        "iconText": '商品动态'
      },
      {
        "iconUrl": 'http://img0.imgtn.bdimg.com/it/u=3092618437,3670056891&fm=26&gp=0.jpg',
        "iconText": '优惠卷'
      },
      {
        "iconUrl": 'http://img3.imgtn.bdimg.com/it/u=3426634289,2087123480&fm=26&gp=0.jpg',
        "iconText": '联系我们'
      }
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    tradeMode: 'widthFix',
    baokuang:[
      {
        url:'http://img2.imgtn.bdimg.com/it/u=1245231126,2255486876&fm=26&gp=0.jpg',
        title:'喜迎XX 特价X天 草莓慕斯蛋糕 天然绿色无污染 送礼佳品买的放心...',
        money:'78.00',
        money2:'100.00'
      },
      {
        url: 'http://img1.imgtn.bdimg.com/it/u=2811252916,1838885419&fm=26&gp=0.jpg',
        title: '喜迎XX 特价X天 草莓慕斯蛋糕 天然绿色无污染 送礼佳品买的放心...',
        money: '68.00',
        money2: '100.00'
      },
      {
        url: 'http://img4.imgtn.bdimg.com/it/u=3785356171,1700862517&fm=26&gp=0.jpg',
        title: '喜迎XX 特价X天 草莓慕斯蛋糕 天然绿色无污染 送礼佳品买的放心...',
        money: '5665.00',
        money2: '8888.00'
      },
      {
        url: 'https://blackboy.club/image/4.jpg',
        title: '喜迎XX 特价X天 草莓慕斯蛋糕 天然绿色无污染 送礼佳品买的放心...',
        money: '888.00',
        money2: '1000.00'
      },
      {
        url: 'https://blackboy.club/image/5.jpg',
        title: '喜迎XX 特价X天 草莓慕斯蛋糕 天然绿色无污染 送礼佳品买的放心...',
        money: '68.00',
        money2: '100.00'
      },
      {
        url: 'https://blackboy.club/image/6.jpg',
        title: '喜迎XX 特价X天 草莓慕斯蛋糕 天然绿色无污染 送礼佳品买的放心...',
        money: '20.00',
        money2: '27.00'
      },
      {
        url: 'https://blackboy.club/image/7.jpg',
        title: '喜迎XX 特价X天 草莓慕斯蛋糕 天然绿色无污染 送礼佳品买的放心...',
        money: '40.00',
        money2: '56.00'
      },
      {
        url: 'https://blackboy.club/image/8.jpg',
        title: '喜迎XX 特价X天 草莓慕斯蛋糕 天然绿色无污染 送礼佳品买的放心...',
        money: '38.00',
        money2: '45.00'
      }        
    ]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  tel:function(){
    wx.makePhoneCall({
      phoneNumber: '13336535215' 
    })
  },
  xiangchi:function(){
    wx.navigateTo({
      url: '../../pages/detail/detail'
    })
  }

})