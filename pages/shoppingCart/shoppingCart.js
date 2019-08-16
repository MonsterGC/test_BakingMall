const app = getApp()
// pages/shopcart/shopcart.js
Page({
  data: {
    isHaveAddress: false,
    isHaveCoupons: false,
    addressInfo: null,
    allPrice: 0,//总共需要支付的价格
    cartShopList: [
      {
        shopImg: "http://img1.imgtn.bdimg.com/it/u=3493316355,3854297252&fm=26&gp=0.jpg",
        shopTitle: "樱花芝士蛋糕",
        shopSelectInfo: "樱花芝士蛋糕",
        shopPrice: "11.00",
        shopCount: 1,
      },
      {
        shopImg: "http://img2.imgtn.bdimg.com/it/u=122667300,122761628&fm=26&gp=0.jpg",
        shopTitle: "黑森林蛋糕卷",
        shopSelectInfo: "黑森林蛋糕卷",
        shopPrice: "10.00",
        shopCount: 2,
      }
    ]

  },
  //商品数量减少
  itemCountSub: function (e) {
    var index = e.currentTarget.dataset.index;
    var list = this.data.cartShopList;
    if (list[index].shopCount > 0) {
      list[index].shopCount = --list[index].shopCount;
      this.setData({
        cartShopList: list,
      });
    }
    //计算总价格
    this.allShopPrice();

  },

  //商品数量增加
  itemCountAdd: function (e) {
    var index = e.currentTarget.dataset.index;
    var list = this.data.cartShopList;
    list[index].shopCount = ++list[index].shopCount;

    this.setData({
      cartShopList: list,
    });
    //计算总价格
    this.allShopPrice();
  },


  /**
   * 计算总价格
   */
  allShopPrice: function () {
    var shopList = this.data.cartShopList;
    var shopPrice = 0.0;
    for (var key in shopList) {
      shopPrice += shopList[key].shopPrice * shopList[key].shopCount;
    }
    this.setData({
      allPrice: shopPrice,
    });
  },

  onItemClick: function (e) {
    var index = e.currentTarget.dataset.itemIndex;
    wx.navigateTo({
      url: '../../pages/shopinfo/shopinfo?id=' + e.currentTarget.dataset.itemIndex,
    })
  },

  goToPay: function () {
    wx.requestPayment({
      timeStamp: 'String1',
      nonceStr: 'String2',
      package: 'String3',
      signType: 'MD5',
      paySign: 'String4',
      success: function (res) {
        // success
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },


  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
    var otherAddressInfo = getApp().globalData.otherAddressInfo;
    if (otherAddressInfo == null) {
      var addressList = wx.getStorageSync('address');
      for (var key in addressList) {
        if (addressList[key].isDefult) {
          this.setData({
            addressInfo: addressList[key],
            isHaveAddress: true,
          });
        }
      }
      if (this.data.addressInfo == null && addressList.length > 0) {
        this.setData({
          addressInfo: addressList[0],
          isHaveAddress: true,
        });
      }
    } else {
      this.setData({
        addressInfo: otherAddressInfo,
        isHaveAddress: true,
      });
    }


    //计算总价格
    this.allShopPrice();



  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
    getApp().globalData.otherAddressInfo = null;
  }
})