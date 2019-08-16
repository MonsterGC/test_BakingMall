const app = getApp()
const util = require('../../utils/util.js')
Page({
  data: {
    tabArr: {
      curHdIndex: 0,
      curBdIndex: 0,
    },
    allorder: [{
      myId: '1',
      myAllpay: '123',
      prepayId: '121',
      myState: '1',
      goodlist: [{
        goId: "011",
        ogPicture: "http://img4.imgtn.bdimg.com/it/u=2566788399,3835904051&fm=26&gp=0.jpg",
        goName: "樱花芝士蛋糕",
        ogGoodsum: "2",
        unit_all_price: "14"
      },
      {
        goId: "012",
        ogPicture: "http://img2.imgtn.bdimg.com/it/u=3384580086,3529574250&fm=11&gp=0.jpg",
        goName: "樱花芝士蛋糕",
        ogGoodsum: "1",
        unit_all_price: "7"
      }]
    }, {
      myId: '2',
      myAllpay: '123',
      prepayId: '121',
      myState: '2',
      goodlist: [{
        goId: "011",
        ogPicture: "",
        goName: "",
        ogGoodsum: "2",
        unit_all_price: "14"
      },
      {
        goId: "012",
        ogPicture: "http://img4.imgtn.bdimg.com/it/u=1289705826,2231372602&fm=26&gp=0.jpg",
        goName: "樱花芝士蛋糕",
        ogGoodsum: "1",
        unit_all_price: "7"
      }]
      }, {
        myId: '3',
        myAllpay: '123',
        prepayId: '121',
        myState: '2',
        goodlist: [{
          goId: "011",
          ogPicture: "http://img3.imgtn.bdimg.com/it/u=3426634289,2087123480&fm=26&gp=0.jpg",
          goName: "樱花芝士蛋糕",
          ogGoodsum: "2",
          unit_all_price: "14"
        },
        {
          goId: "012",
          ogPicture: "http://img1.imgtn.bdimg.com/it/u=113951070,2195643211&fm=26&gp=0.jpg",
          goName: "樱花芝士蛋糕",
          ogGoodsum: "1",
          unit_all_price: "7"
        }]
      }],
    currentmyid: '',
    goodids: [],
    myAllpay: ''
  },

  tabFun: function (e) {
    var _datasetId = e.target.dataset.id;
    var _obj = {};
    _obj.curHdIndex = _datasetId;
    _obj.curBdIndex = _datasetId;
    this.setData({
      tabArr: _obj
    });
    this.orderEnquirie();
  },
  // 查看详情
  toOrderDetail: function (e) {
    var id = e.currentTarget.id;
    wx.navigateTo({
      url: '../order_detail/order_detail?id=' + id,
    })
  },
  onLoad: function (options) {
    var _datasetId = options.datasetId;
    var _obj = {};
    _obj.curHdIndex = _datasetId;
    _obj.curBdIndex = _datasetId;
    this.setData({
      tabArr: _obj
    });
    this.orderEnquirie();
  },
  onShow: function (options) {
    this.orderEnquirie();
  },
  // 用户查看订单接口实现（待付款、待收货 、已完成 ）
  orderEnquirie: function () {
    var that = this;
    var status = this.data.tabArr.curBdIndex == 0 ? 4 : this.data.tabArr.curBdIndex == 1 ? 1 : this.data.tabArr.curBdIndex == 2 ? 2 : this.data.tabArr.curBdIndex == 3 ? 3 : 0;
    wx.request({
      url: util.getUrl() + '/orderEnquirie',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        "switch_code": status,
        "session_meid": app.globalData.session_meid
      },
      success: function (res) {
        var list = res.data.extend.ordergoods;
        var detail = that.data.detail;
        that.setData({
          allorder: list,
        });
      }
    })
  },
  //去支付
  topay: function (e) {
    this.checkGoodStockBeforeBuy(e);
  },
  // 确认收货
  tobesure: function (e) {
    var that = this;
    wx.showModal({
      title: '确认收货',
      content: '是否确认收货？',
      success: function (res) {
        if (res.confirm) {
          var thatmyid = e.currentTarget.dataset.id;
          that.setData({ currentmyid: thatmyid });
          that.changeOrderState(2);
        }
      },
    });
  },
  // 删除订单
  deleteOrderOne: function (e) {
    var that = this;
    var thatmyid = e.currentTarget.dataset.id;
    var list = that.data.allorder;
    wx.showModal({
      title: '温馨提示',
      content: '确认要取消当前订单吗？',
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: util.getUrl() + '/order/deleteOrderOne',
            method: 'POST',
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            data: {
              "myid": thatmyid
            },
            success: function (res) {
              var msg = res.data.extend.msg;
              list.splice(thatmyid, 1);
              that.setData({
                allorder: list
              });
              that.orderEnquirie();
              wx.showToast({
                title: msg,
                icon: 'success',
                duration: 2000
              })
            }
          })
        }
      }
    })
  },
  // 去支付判断商品库存量的接口
  checkGoodStockBeforeBuy: function (e) {
    var that = this;
    var goodids = '';
    var num = '';
    var myAllpay = 0.0;
    var prepayId = '';
    var thatmyid = e.currentTarget.dataset.id;
    for (var i = 0; i < that.data.allorder.length; i++) {

      if (that.data.allorder[i].myId == thatmyid) {

        myAllpay = that.data.allorder[i].myAllpay;
        prepayId = that.data.allorder[i].prepayId;
        for (var j = 0; j < that.data.allorder[i].goodlist.length; j++) {

          goodids += that.data.allorder[i].goodlist[j].goId;
          goodids += ';';
          num += that.data.allorder[i].goodlist[j].ogGoodsum;
          num += ';';
        }
      }
    }
    goodids = (goodids.substring(goodids.length - 1) == ';') ? goodids.substring(0, goodids.length - 1) : goodids;
    num = (goodids.substring(num.length - 1) == ';') ? num.substring(0, num.length - 1) : num;
    wx.request({
      url: util.getUrl() + '/checkGoodStockBeforeBuy',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        "goodIds": goodids,
        "buySums": num
      },
      success: function (res) {
        that.setData({
          currentmyid: thatmyid,
          goodids: goodids,
          myAllpay: myAllpay,
          prepayId: prepayId
        });
        var code = res.data.code;
        if (code == 200) {
          wx.login({
            success: function (res) {
              that.sign(that.data.prepayId);
            }
          });
        }
      }
    })
  },
  //签名
  sign: function (prepay_id) {
    var that = this;
    wx.request({
      url: util.getUrl() + '/getSign',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: { 'repay_id': prepay_id },
      success: function (res) {
        that.requestPayment(res.data);
      }
    })
  },
  //申请支付
  requestPayment: function (obj) {
    var that = this;
    wx.requestPayment({
      'timeStamp': obj.timeStamp,
      'nonceStr': obj.nonceStr,
      'package': obj.package,
      'signType': obj.signType,
      'paySign': obj.paySign,
      'success': function (res) {
        that.handleSuccessResult(res);
      }
    })
  },
  handleSuccessResult: function (res) {
    var that = this;
    wx.showModal({
      title: '支付后台处理返回信息',
      content: '支付成功',
      showCancel: false,
      success: function () {
        that.changeOrderState(1);
      }
    });
  },
  // 改变订单的状态 （去支付（只有支付成功才处理，不成功没有调用） ，确认收货 ）
  changeOrderState: function (operation) {
    var that = this;
    var myId = that.data.currentmyid;
    wx.request({
      url: util.getUrl() + '/changeOrderState',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        'myId': myId,
        'operation': operation
      },
      success: function (res) {
        that.orderEnquirie();
      }
    })
  }
});